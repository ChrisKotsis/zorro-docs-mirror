---
title: "distribute, knapsack"
source: "https://zorro-project.com/manual/en/renorm.htm"
---

# distribute, knapsack

# Portfolio distribution functions

## distribute (var\* Weights, var\* Values, int N, int M, var\* Caps) : var

## distribute (var\* Weights, var\* Values, int N, int M, var Cap) : var

Calculate portfolio weights for a subset of **M** assets out of a **N-**asset portfolio. The **M** largest positive elements of the **Values** array are taken; the other elements are ignored. The resulting weights are stored in the **Weights** array and normalized so that they sum up to **1**. A weight limit can be applied either individually (**Caps** array) per element, or globally (**Cap**) for all elements. Weights are clipped at the limit, and the remainders are distributed among the other positive weights. The total weight sum can end up less than **1** if the weight limit restriction were otherwise violated or if the **Values** are all zero.This function is normally used to distribute asset weights in a portfolio dependent on individual parameters such as momentum.

### Parameters:

<table border="0"><tbody><tr><td><strong>Weights</strong></td><td>Output array&nbsp;of size <strong>N </strong>to receive <strong>M</strong> normalized weights. The other elements are <strong>0</strong>.</td></tr><tr><td><strong>Values</strong></td><td>Input array of size <strong>N</strong>, for instance projected profits, momentums, or Sharpe ratios of portfolio components.</td></tr><tr><td><strong>N</strong></td><td>Number of elements in the <strong>Weights</strong>, <strong>Values</strong>, and <strong>Caps</strong> arrays.</td></tr><tr><td><strong>M</strong></td><td>Max number of resulting nonzero weights, or <strong>0</strong> for distributing all <strong>N</strong> weights.</td></tr><tr><td><strong>Caps</strong></td><td>Array of weight limits in the <strong>0..1</strong> range, or <strong>0</strong> for no weight limit, or <strong>-1</strong> for ignoring the component.</td></tr><tr><td><strong>Cap</strong></td><td>Global limit in the <strong>0..1</strong> range to be applied to all weights, or <strong>0</strong> for no weight limits.</td></tr></tbody></table>

### Returns

Sum of weights after applying the limits.  
 

## assign (int\* Items, var\* Costs, var\* Weights, int N, var Budget) : var

Given current **Costs** and portfolio **Weights** of **N** assets, distribute the given **Budget** according to asset weights. The **Weights** array can be generated with the **distribute** or [markowitz](105_markowitz.md) functions. Due to the integer amounts, normally not the whole budget can be assigned. The function assigns in several steps as much of the budget as possible, and returns the rest.

### Parameters:

<table border="0"><tbody><tr><td><strong>Items</strong></td><td>Output array&nbsp;of size <strong>N </strong>to receive the weight-equivalent amounts for all assets.</td></tr><tr><td><strong>Costs</strong></td><td>Input array of size <strong>N</strong> containing the current asset cost, such as price or margin cost.</td></tr><tr><td><strong>Weights</strong></td><td>Input array of size <strong>N</strong> containing the normalized portfolio weights.The sum must be <strong>1</strong>.</td></tr><tr><td><strong>N</strong></td><td>Number of elements of the arrays.</td></tr><tr><td><strong>Budget</strong></td><td>Available capital to distribute, for instance the current account equity.</td></tr></tbody></table>

### Returns

Budget remainder that could not be assigned.  
   
 

## knapsack (int\* Items, var\* Costs, var\* Values, int N, var Budget, var Cap) : var

Given current **Costs** and expected **Values** of **N** assets, calculate the optimal asset amounts that maximize the total value, while keeping the total cost below the given **Budget**. The function performs an unbounded knapsack optimization. It can be used to optimally distribute small capital among a portfolio of stocks or ETFs. 

### Parameters:

<table border="0"><tbody><tr><td><strong>Items</strong></td><td>Output array&nbsp;of size <strong>N </strong>to receive the optimal amounts for all assets.</td></tr><tr><td><strong>Costs</strong></td><td>Input array of size <strong>N</strong> containing the current asset cost, such as price or margin cost.</td></tr><tr><td><strong>Values</strong></td><td>Input array of size <strong>N</strong> containing projected prices or expected profits.</td></tr><tr><td><strong>N</strong></td><td>Number of elements of the arrays.</td></tr><tr><td><strong>Budget</strong></td><td>Available capital to distribute, for instance the current account equity.</td></tr><tr><td><strong>Cap</strong></td><td>Maximum <strong>Budget</strong> weight per asset in the <strong>0..1</strong> range (f.i. <strong>0.5</strong> = max 50% of <strong>Budget</strong>), or <strong>0</strong> for no asset limits.</td></tr></tbody></table>

### Returns

Total expected value of the portfolio.  
 

### Remarks

*   For distributing small capital that is only sufficient for a few shares, calculate first the asset weights with the [markowitz](105_markowitz.md) or **distribute** functions, then use the weights as **Values** for a **knapsack** optimization.
*   For a large budget that can buy many shares, weight-based capital distribution is normally preferable to knapsack optimization. The knapsack algorithm allocates most of the capital to a few assets with the highest value/price ratio. This results sometimes in better backtest performance, but produces a less diversified portfolio with accordingly higher risk.
*   For a fixed ratio of different asset classes - for instance, 70% equities and 30% bonds - call **distribute** twice with stocks and bonds, then multiply the stock weights with **0.7** and the bond weights with **0.3**.
*   For optimizing a portfolio rebalancing system, make sure to [setf(TrainMode,TRADES)](016_OptimalF_money_management.md) because trade size matters. Make also sure to select an asset before calling [optimize](107_optimize.md).

### Examples (see also the Alice6 system from the Black Book):

```c
_// knapsack test_
void main() 
{
  var wt\[5\] = {30,40,70,80,90};
  var val\[5\] = {40,50,100,110,130};
  int Items\[5\];
  var Total = knapsack(Items,wt,val,5,500,0); 
  printf("\\nItems: %i %i %i %i %i => %.2f",
    Items\[0\],Items\[1\],Items\[2\],Items\[3\],Items\[4\],Total);
}
```
```c
_// portfolio rebalancing_
void run() 
{
  ...
  assetList("MyPortfolio"); _// max 100 assets_
  static var Weights\[100\],Strengths\[100\];
  if(month(0) != month(1)) _// rebalance any month
_  {
_// calculate asset strengths
_    while(asset(loop(Assets)))
      Strengths\[Itor1\] = RET(30\*PERIOD);
_// enter positions of the the 4 strongest assets
_    distribute(Weights,Strengths,NumAssetsListed,4,0);
    int i;
    for(i=0; i<NumAssetsListed; i++) {
      asset(Assets\[i\]);
      int NewShares = Balance \* Weights\[i\]/priceClose(0) - LotsPool;
      if(NewShares > 0)
        enterLong(NewShares);
      else if(NewShares < 0)
        exitLong("",0,-NewShares);
    }
  } 
}
```

### See also:

[renorm](cfilter.md), [OptimalF](016_OptimalF_money_management.md), [markowitz](105_markowitz.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))