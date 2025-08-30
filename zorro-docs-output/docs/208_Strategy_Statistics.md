---
title: "Strategy Statistics"
source: "https://zorro-project.com/manual/en/statistics.htm"
---

# Strategy Statistics

# Strategy performance statistics

The following system variables can be evaluated in the script or the [objective](108_objective_parameters.md) or [evaluate](137_evaluate.md) function. Some become available only at the end of a simulation or a live trading session, so they are only available to [objective](108_objective_parameters.md) or [evaluate](137_evaluate.md). Other variabes are updated at any bar during the test or live session, and thus can be evaluated in the script and affect the algorithm. There is also a set of [trade statistics](winloss.md) that can be evaluated anytime. The statistics variables can be used for calculating individual performance metrics, and printing them to the [performance report](012_Performance_Report.md).  
 

## DrawDownMax

Maximum drawdown, the largest difference between a balance peak and the lowest subsequent equity valley during the simulation period, in account currency units. Updated at any bar.

## DrawDownPercent

Maximum drawdown as above, in percent of the preceding balance peak. Updated at any bar.

## MAEDepth

Maximum adverse excursion, the largest difference between an equity peak and the lowest subsequent equity valley during the simulation period, in account currency units. Updated at any bar.

## AEDepth

Current adverse excursion, the difference between the last equity peak and the current equity value, in account currency units. Updated at any bar.

## MarginMax

Maximum margin sum of open trades during the simulation period, in account currency units. Updated at any trade.

## RiskMax

Maximum possible loss sum of all open trades during the simulation period, in account currency units. The possible loss is calculated by the stop loss distance of a trade, or estimated at 10% of the price if no stop loss was used. Updated at any trade.

## SpreadCost

Total loss by bid-ask spreads during the simulation period, in account currency units. Updated at any trade.

## SlippageCost

Total win or loss by simulated slippage during the simulation period, in account currency units. Updated at any trade.

## RollCost

Total win or loss by rollover and margin interest during the simulation period, in account currency units. Updated at any trade.

## CommissionCost

Total loss by commissions during the simulation period, in account currency units. Updated at any trade.

## InterestCost

Total loss by interest charged by the broker. Updated any day.

## ReturnMean

Mean of all bar returns on investment. The bar return on investment is the equity difference to the previous bar, divided by [Capital](190_Margin_Risk_Lots.md). If **Capital** is not set, the sum of normalized maximum drawdown and maximum margin is used. Only available at the end.

## ReturnStdDev

Standard deviation of all bar returns on investment. Can be used together with **ReturnMean** for calculating the annualized **Sharpe Ratio** (**Sharpe = ReturnMean/ReturnStdDev\*InMarketBars\*(365.25\*24\*60)/NumMinutes**) and other metrics. Only available at the end.

## ReturnUlcer

Ulcer Index in percent; worst drawdown after an equity peak. Only available at the end.

## ReturnR2

R2 coefficient; the similarity of the equity curve with a straight line ending up at the same profit.Only available at the end.

## ReturnLR

Gross profit by linear regression of the equity curve. Only available at the end.  

## ReturnCBI

The last [CBI](ddscale.md) value based on previously stored backtest data.Only available at the end.  
   

## DrawDownBars

Total number of bars spent in drawdown, updated at any bar. For the percentage spent in drawdown, divide by the duration of the test, **([Bar-StartBar](numbars.md))**. 

## DrawDownBarsMax

Maximum length of a drawdown in bars. Only available at the end.

## LossStreakMax

Maximum number of losses in a row. Only available at the end.

## NumOpenMax

Maximum number of simultaneously open trades. Updated at any bar.

## InMarketBars

Total number of bars with open trades. Updated at any bar.

## InMarketSum

Sum of the durations of all trades, in bars. Updated at any trade. Can be bigger than the duration of the test when several positions are simultaneously open.

## NumMinutes

Total duration of the backtest period; can be used for normalizing metrics to 3 years or for calculating profit per period. The backtest years are **NumMinutes/(365.25\*24\*60)**. For annualizing a result, multiply it with the inverse of this formula.

### Type:

**int** for numbers that count something, otherwise **var**. Read/only.  
 

## ResultsAtBar

Array in chronological order containing the sums of wins and losses of all open and closed trades at every bar, in account currency units. **(var)ResultsAtBar\[Bar\]** is the end result of the simulation.

### Type:

**float\*** pointer, or **0** when no results were calculated.

## ProfileAtBar

Array in chronological order containing the blue equity, balance, or pip return profile from the chart, at every bar. 

## DrawDownAtBar

Array in chronological order containing the red underwater profile from the chart, at every bar.

### Type:

**var\*** pointer, or **0** when no profile was calculated. 

## ResultsDaily

Array in chronological order containing the balance or equity (dependent on the [BALANCE](mode.md) flag) at the end of every day, in account currency units. **ResultsDaily\[Day\]** is the end result. This array is at the end of the simulation automatically saved to a **.dbl** file for the [CBI](ddscale.md) calculation, and to a **.csv** file for further evaluation.

### Type:

**var\*** pointer, or **0** when no daily results were calculated.

### Remarks:

*   In \[Train\] mode the parameters are based on trades with 1 lot and include phantom trades, unless set up otherwise with [TrainMode](016_OptimalF_money_management.md).
*   More statistics parameters can be retrieved from the [win/loss statistics](winloss.md) at the end of the simulation.
*   Trade dependent metrics can be calculated by enumerating all trades of the simulation with a [for(all\_trades)](fortrades.md) loop, and summing up the desired [trade parameters](018_TradeMode.md). Equity curve dependent metrics can be calculated from the **ResultsAtBar** or **ResultsDaily** arrays.
*   All statistics variables are normally reset when the strategy is restarted or a new session is started. If the [SAV\_STATS](loadstatus.md) flag is set, statistics is continued from the previous session.

### Example:

```c
_// print the annualized Sharpe Ratio to the performance report_ 
function evaluate()
{ 
  if(NumWinTotal == 0) return;
  var MySharpe = ReturnMean/ReturnStdDev;
_// roughly adjust to annual in-market bars_
  MySharpe \*= sqrt(InMarketBars/NumYears);
  printf(TO\_REPORT,"\\nMy Sharpe: %.2f",MySharpe);
}
```

### See also:

[Trade statistics](winloss.md), [Cold Blood Index](ddscale.md), [for(trades)](fortrades.md), [NumBars](180_Bar_NumBars.md), [performance report](012_Performance_Report.md) [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))