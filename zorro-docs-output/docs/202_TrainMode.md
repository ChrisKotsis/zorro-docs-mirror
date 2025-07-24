---
title: "TrainMode"
source: "https://zorro-project.com/manual/en/opt.htm"
---

# TrainMode

# Training variables

## TrainMode

Training method; affects the way how parameters, factors, rules, or machine learning models are generated in the training process. The following flags can be set:

### Flags:

<table width="98%" border="0" cellspacing="1" cellpadding="0"><tbody><tr><td><strong>ASCENT</strong></td><td>Ascent parameter optimization and <a href="training.htm">parameter chart</a> export. Evaluates the effect of any parameter on the strategy separately. Starts with the first parameter and applies the results of already optimized parameters and the defaults of the rest. Seeks for 'plateaus' in the parameter space, while ignoring single peaks. This is normally the best algorithm for a robust strategy, except in special cases with highly irregular parameter spaces or with interdependent parameters.</td></tr><tr><td><strong>BRUTE</strong></td><td>Brute force parameter optimization and parameter spreadheet export (<a href="restrictions.htm">Zorro S</a> required). Evaluates all parameter combinations, exports them to a <strong>*par.csv</strong>&nbsp; file in the <strong>Log</strong> folder, and selects the most profitable combination that is not a single peak. Can take a long time when many parameters are optimized or when parameter ranges have many steps. Useful when parameters affect each other in complex ways, or when it is necessary to evaluate results from any parameter combination. Brute force optimization tends to overfit the strategy, so out-of-sample testing or walk-forward optimization is mandatory.</td></tr><tr><td><strong>GENETIC</strong></td><td>Genetic parameter optimization (<a href="restrictions.htm">Zorro S</a> required). A population of parameter combinations is evolved toward the best solution in an iterative process. In each iteration, the best combinations are stochastically selected, and their parameters are then pair-wise recombined and randomly mutated to form a new generation. This algorithm is useful when a large number of parameters - 5 or more per component - must be optimized, or when parameters affect each other in complex ways. It will likely overfit the strategy, so out-of-sample or walk-forward testing is mandatory.</td></tr><tr><td><strong>TRADES</strong></td><td>Use trade sizes by <a href="lots.htm">Lots</a>, <a href="lots.htm">Margin</a>, etc. Large trades get then more weight in the optimization process. Set this flag in special cases when the trade volume matters, f.i. for optimizing the money management or for portfolio systems that calculate their capital distribution by script. Otherwise trade sizes are ignored in the training process for giving all trades equal weights.</td></tr><tr><td><strong>NOMAX</strong></td><td>Include trades that exceed <a href="trademode.htm">MaxLong/MaxShort</a>. Otherwise the limits are observed in training.</td></tr><tr><td><strong>PHANTOM</strong></td><td>Exclude <a href="trademode.htm">phantom trades</a>. Otherwise phantom trades are treated as normal trades in the training process.</td></tr><tr><td><strong>PEAK</strong></td><td>Optimize toward the highest single peak in the parameter space, rather than toward hills or plateaus. This can generate unstable strategies and is for special purposes only. For instance when optimizing not a parameter range, but a set of different algorithms or different assets.</td></tr><tr><td><strong>ALLCYCLES</strong></td><td>Generate individual <a href="optimalf.htm">OptimalF</a> factor files for all WFO cycles, instead of a single file for the whole simulation. This produces low-quality factors due to less trades, but prevents backtest bias.</td></tr></tbody></table>

  

## NumParameters

Number of parameters to [optimize](107_optimize.md) for the current asset/algo component that was selected in a [loop](109_loop.md) (only, valid after the first [INITRUN](mode.md)).

## ParCycle

Current parameter or current generation, runs from **1** to **NumParameters** in Ascent mode, or from **1** to **Generations** in Genetic mode (only, valid after the first [INITRUN](mode.md)).

## StepCycle

Number of the optimize step, starting with **1** (only, valid after the first [INITRUN](mode.md)). The number of step cycles depends on the number of steps in a parameter range and of the population in a genetic optimization. Counts up after any step until the required number is reached or **StepNext** is set to 0. 

## StepNext

Set this to **0** for early aborting the optimization (**int**).

## NumTrainCycles

Number of training cycles (**int**, default = **1**) for special purposes, such as training a combination of interdependent rules and parameters in a given order (see [Training](training.md)). In any cycle, set either [RULES](018_TradeMode.md), or [PARAMETERS](018_TradeMode.md), or both, dependent on training method. Not to be confused with [WFO cycles](numwfocycles.md) or **Generations**.

## TrainCycle

The number of the current training cycle from **1** to **NumTrainCycles**, or **0** in \[Test\] or \[Trade\] mode (**int,** read/only). The training mode of the current cycle can be determined with the [PARCYCLE](013_Asset_Account_Lists.md), [RULCYCLE](013_Asset_Account_Lists.md), [FACCYLE](013_Asset_Account_Lists.md) flags.

## LogTrainRun

Set this to a identifier number for logging a particular training run. The identifier is a 5-digit number in the format **WFSPO**, where **W** = WFO cycle, **F** = first loop iteration, **S** = second loop iteration, **P** = parameter number, and **O** = optimize step. At **11111** the very first training run is logged. 

## Population

Maximum population size for the genetic algorithm (**int,** default = 50). Any parameter combination is an individual of the population. The population size reduces automatically when the algorithm converges and only the fittest individuals and the mutants remain.

## Generations

Maximum number of generations for the genetic algorithm (**int,** default = 50). Evolution terminates when this number is reached or when the overall fitness does not increase for 10 generations.

## MutationRate

Average number of mutants in any generation, in percent (**int,** default = 5%). More mutants can find more and better parameter combinations, but let the algorithm converge slower.

## CrossoverRate

Average number of parameter recombinations in any generation, in percent (**int,** default = 80%). 

## BestResult

Highest [objective](108_objective_parameters.md) return value so far (**var**, starting with **0**).

## Parameters

Pointer to a list of **PARAMETER** structs for the current asset/algo component. The **Min, Max,** and **Step** elements are set up in the list after the first [INITRUN](018_TradeMode.md) in \[Train\] mode. The **PARAMETER** struct is defined in **trading.h**.

### Remarks:

*   **TrainMode** must be set up before the first [optimize](107_optimize.md) call.
*   Training methods for machine learning or rules generating are set up with the [advise](advisor.md) function.
*   Alternative optimization algorithms from external libraries or individual optimization targets can be set up with the [parameters](108_objective_parameters.md) and [objective](108_objective_parameters.md) functions.
*   [Parameter charts](007_Training.md) are only produced by **Ascent** optimization when [LOGFILE](018_TradeMode.md) is set. It is recommended to do first an Ascent training for determining the parameter dependence of a strategy. Afterwards the final optimization can done with a different algorithm if requried.
*   [Parameter spreadsheets](209_Export.md) are exported by **Brute Force** optimization. They can be used for generating 2-d parameter heatmaps or 3-d parameter surfaces with Excel or other programs.
*   Percent steps (4th parameter of the **optimize** function) are replaced by 10 equal steps for brute force and genetic optimization.
*   In genetic optimization, parameter combinations that were already evaluated in the previous generation are not evaluated again and are skipped in the log. This lets the algorithm run faster with higher generations.
*   Genetic optimization is also possible with the free Zorro version using the [Z Optimizer tool](https://zorro-project.com/download.php) from the Download page.
*   When parameters are trained several times by using **NumTrainCycles**, each time the start values are taken from the last [optimization](107_optimize.md) cycle in [Ascent](016_OptimalF_money_management.md) mode. This sometimes improves the result, but requires a longer time for the training process and increases the likeliness of [overfitting](007_Training.md). To prevent overfitting, use not more than 2 subsequent parameter training cycles.

### Example:

```c
setf(TrainMode,TRADES+PEAK);
```

### See also:

[Training](007_Training.md), [optimize](107_optimize.md), [advise](advisor.md), [OptimalF](016_OptimalF_money_management.md), [objective](108_objective_parameters.md), [setf](168_setf_resf_isf.md), [resf](168_setf_resf_isf.md)  
[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))