---
title: "objective, parameters"
source: "https://zorro-project.com/manual/en/objective.htm"
---

# objective, parameters

# User-supplied optimization targets and algorithms

This page is about user-defined methods and objectives for backtest-based [parameter optimization](107_optimize.md). For other sorts of optimization, for instance training neural nets or user-specific models, use [adviseLong(NEURAL, ...)](advisor.md) with a user-supplied **neural()** function.

## objective(): var

A user-supplied **objective** **function** - also known as **'fitness function'** - can be used for calculating the optimization target by analyzing the preceding training run. It is called at the end of every optimization step and supposed to return a performance metric based on the [statistics](116_Statistics_Transformations.md) or [trade results](winloss.md) of that step. If required, it can also be used to store results in a [file](158_File_access.md) or [dataset](125_sortData_sortIdx.md) for further evaluation, such as plotting a 3D parameter chart. A default **objective** function is located in the **default.c** file. It uses the Pessimistic Return Ratio (PRR) for the optimization target, requires at least 10 trades, and treats the highest win and worst loss as outliers:

```c
_// optimizing objective based on PRR_
var objective()
{
  if(NumWinTotal < 2 || NumWinTotal+NumLossTotal < MinTrades) 
    return 0.; _// needs at least 10 trades, 2 of them positive_
  var wFac = 1./sqrt(1.+NumWinTotal); 
  var lFac = 1./sqrt(1.+NumLossTotal);
  var Win = WinTotal, Loss = LossTotal;
_// remove possible outlier wins/losses_
  if(NumLossTotal > 1) {
    Loss -= (NumLossTotal-1)\*LossMaxTotal/NumLossTotal;
    Win -= (NumWinTotal-1)\*WinMaxTotal/NumWinTotal;
  }
_// return PRR
_  return (1.-wFac)/(1.+lFac)\*(1.+Win)/(1.+Loss);
}
```

For some strategies, for instance binary options, the above PRR is not the best optimization target. For alternative targets, put an individual **objective** function in your script. It will override the default **objective**. Examples:

```c
_// alternative objective function based on Calmar ratio_
var objective()
{
  return(WinTotal-LossTotal)/fix0(DrawDownMax);
}

_// alternative objective function based on Sharpe ratio_
var objective()
{
  if(!NumWinTotal && !NumLossTotal) return 0.;
  return ReturnMean/fix0(ReturnStdDev);
}

_// alternative objective function that just hunts for max profit_
var objective()
{
  return WinTotal-LossTotal;
}

_// alternative objective function for binary options_
var objective()
{
  return ((var)(NumWinLong+NumWinShort))/max(1,NumLossLong+NumLossShort);
}
```
  

## parameters(): int

Alternatively to Zorro's own [Ascent](016_OptimalF_money_management.md), [Genetic](016_OptimalF_money_management.md), or [Brute Force](016_OptimalF_money_management.md) algorithms, parameters can be optimized with an external optimization algorithm in an external DLL, R package, or Python library, or with a script-based algorithm  ([Zorro S](restrictions.md) 2.32 or above). For this a **parameters** function must be supplied and the [ASCENT](016_OptimalF_money_management.md), [BRUTE](016_OptimalF_money_management.md), [GENETIC](016_OptimalF_money_management.md) flags must be off. The **parameters** function is automatically called after the initial run ([INITRUN](is.md)) of any optimization step. Its purpose is setting up the **Value** elements of the [Parameters](016_OptimalF_money_management.md) list for the subsequent training. The **Value**s can be either directly calculated or retrieved with a function from an external library. The **parameters** function is supposed to return **0** when the last step is reached and the optimization is finished after that step.

Below an example of a **parameters** function for a script-based brute force optimization. The condition **StepCycle == 1** intializes the parameters, afterwards they are counted up until all have reached their maximum.

```c
int parameters()
{
_// set up parameters for brute force optimization
_  int i;
  for(i=0; i<NumParameters; i++) {
    if(StepCycle == 1 || Parameters\[i\].Value >= Parameters\[i\].Max)
      Parameters\[i\].Value = Parameters\[i\].Min;
    else { _// count up_
      Parameters\[i\].Value += Parameters\[i\].Step;
      break;
    } 
  }
_// last step reached?_
  for(i=0; i<NumParameters; i++)
    if(Parameters\[i\].Value < Parameters\[i\].Max)
      return 1;  _// not yet_
  return 0; _// yes, optimization complete_
}
```

The **objective** function now got the job not only to return the performance metric, but also to store the best result in the [BestResult](016_OptimalF_money_management.md) variable and its parameter values in the **Best** elements of the **Parameters** list. Alternatively, the best parameter values can be retrieved from an external library in the **objective** call after the last optimization step.

```c
var objective()
{
_// calculate performance metric from profit factor
_  var Result = ifelse(LossTotal > 0,WinTotal/LossTotal,10);
_// store best result and best parameters
_  int i;
  if(BestResult < Result) {
    BestResult = Result;
    for(i=0; i<NumParameters; i++)
      Parameters\[i\].Best = Parameters\[i\].Value;
  }
  return Result;
}
```
 

### Remarks:

*   A bit of optimization theory is described under [Training](007_Training.md). All optimization modes, such as portfolio component optimization, walk forward optimization, or data-split optimization, can be used with internal as well as external optimization algorithms.
*   In external optimization mode, [optimize](107_optimize.md) calls return the default parameter values in the **INITRUN**. Afterwards they return the values set up by the **parameters** function.
*   The [OptimizeByScript](020_Included_Scripts.md) script contains an example of a script-based brute force optimization.

### Example: Using an external optimization library

```c
_// assumed library functions:
// set\_experiment(Parameters) // initialize the module with a list of parameters
// get\_suggested(Parameters) // return suggested parameter assignment
// set\_observation(Result) // deliver the result from the suggested parameters
// get\_optimized(Parameters) // return the best parameter set_

int MaxSteps = 1000; _// optimization budget_

int parameters()
{
_// initialize librariy and send parameter boundaries
_  if(StepCycle == 1)
    set\_experiment(Parameters);
_// get parameter assignment for the current step
_  get\_suggested(Parameters); 
_// optimization complete?_
  if(StepCycle == MaxSteps) 
    return 0;	_// yes_
  else return 1;
}

var objective()
{
_// calculate performance metric from profit factor_
  var Result = ifelse(LossTotal > 0,WinTotal/LossTotal,10);
  BestResult = max(Result,BestResult);
_// send result to library
_  set\_observation(Result);
_// after the last step, get best parameter set 
_  if(StepCycle == MaxSteps) 
    get\_optimized(Parameters);  
  return Result;
}
```

### See also:

[Training](007_Training.md), [TrainMode](016_OptimalF_money_management.md), [optimize](107_optimize.md), [NumParameters](016_OptimalF_money_management.md), [advise](advisor.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))