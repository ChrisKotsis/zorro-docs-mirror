---
title: "Cold Blood Index"
source: "https://zorro-project.com/manual/en/ddscale.htm"
---

# Cold Blood Index

# Cold Blood Index

It is essential for risk control to permanently observe automated trading systems and detect as early as possible if a market change rendered the algorithm unprofitable. The Cold Blood Index (**CBI**) can distinguish between normal drawdowns that are common to algo trading systems, and loss of profitability due to due to a substantial market change.  
  For this purpose, the live trading profit/loss curve is daily compared with the backtest profit-loss curve. The drawdown probability is calculated based on the algorithm published on [Financial Hacker](http://www.financial-hacker.com/the-cold-blood-index/), and displayed in the trade log and on the status page. A drawdown of low probability indicates a deviation from the backtest due to a a market change. This information can be used for deciding whether to stop the trading algorithm, or to continue it in cold blood.

The drawdown probability is calculated with the following function:

## CBI (var\* Data, int Length, int Shuffle, var Depth, int Width, int Horizon): var

Returns the probability in percent (**0..100**) of encountering a drawdown of the given **Depth** and **Width** within a given time **Horizon**. For this, the drawdown is compared with the **Data** array that is supposed to contain a profit/loss curve from a backtest or a previous trading session.

### Returns:

Probability in percent (**0..100**). A low probability (less than 2%) indicates a deviation from the backtest. 

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td>Data array with profit/loss values, f.i. from the <a href="export.htm#pnl">pnl.dbl</a> curve stored in a backtest.</td></tr><tr><td><strong>Length</strong></td><td>Length of the data array, positive for an array in time descending order and negative for ascending order.</td></tr><tr><td><strong>Shuffle</strong></td><td>Number of shuffled profit/loss curves to evaluate, or <strong>1</strong> for only evaluating the original curve. The returned probability is calculated from the original and the shuffled curves.</td></tr><tr><td><strong>Depth</strong></td><td>Drawdown depth, the difference of an equity or balance peak with the subsequent equity or balance valley, in the same scale as the values in the <strong>Data</strong> array.</td></tr><tr><td><strong>Width</strong></td><td>Drawdown duration, the time distance between the highest peak and the subsequent deepest valley, in the same units as the time distance of the points in the <strong>Data</strong> array, usually bar periods or days.</td></tr><tr><td><strong>Horizon</strong></td><td>Live trading time in in the same units as the <strong>Data</strong> array, usually bar periods or days. Must be equal or above <strong>Width</strong> and smaller than <strong>Length</strong>.</td></tr></tbody></table>

## CBIScale

Drawdown scale for the automatic CBI calculation in \[Trade\] mode (**default = 1** = no scaling). The drawdown depth is divided by this scale factor for calculating the **CBI**.

### Type:

**var**

## ReturnCBI

Current CBI value in  \[Trade\] mode (see remarks).

### Type:

**var, read/only**  
 

### Remarks:

*   Enough data should be available for meaningful results. Have **Length** **\>> Width** and **Horizon** **\> 30**.
*   **ReturnCBI** is automatically calculated and displayed in \[Trade\] mode when [Verbose](199_Verbose.md) is at 2 or above, when a [backtest profit/loss curve](export.htm#pnl) (**\*pnl.dbl**) is present in the **Data** folder, when trades have been opened and when a drawdown longer than 3 days was encountered. It is recalculated once per day. The **Shuffle** parameter is 5% the [Montecarlo](montecarlo.md) variable, so the default is 10 (original plus 9 shuffled curves). In \[Test\] mode the CBI is recorded in the **.log** file. Note that the CBI in live trading is only valid when the trade volume is the same as in the backtest and when no trades are resumed from previous sessions.
*   Use [seed](084_random_seed.md) to get always the same result when shuffling is used.
*   When the volume per trade is different to the backtest, use either volume-independent [PIPRETURN](018_TradeMode.md) curves or set **CBIScale** the current average trade volume divided by the average trade volume in the backtest (see example).
*   The [Z systems](zsystems.md) display the CBI on their trade status pages. For this, run a backtest with the **Capital** slider at the same position as in live trading at session start. When the system runs on a VPS, make sure that the **\*.dbl** file from the backtest is copied to the **Data** folder on the server.  
       
    

### Examples:

```c
_//scale drawdowns for CBI according to invested capital_
var Invest = slider(1,5000,0,10000,"Investment","Invested capital");
static var InitialInvest = 0;
if(is(INITRUN)) InitialInvest = Invest; _// store the initial investment that was also used in the backtest_ 
if(InitalInvest > 0) CBIScale = Invest/InitialInvest;
```
```c
_//Check the Cold Blood Index at a Z12 Drawdown of $800 in_ 
_//$500 in the last 60 of 100 trading days_
void main()
{
  var\* PnLs = file\_content("Data\\\\Z12\_pnl.dbl");
  int Length =  file\_length("Data\\\\Z12\_pnl.dbl")/sizeof(var);
  var P = CBI(PnLs,-Length,1,500,60,100);
  printf("\\nCBI = %.0f%%",P);
}
```

### See also:

[Trading](004_Trading_Strategies.md), [Cold Blood Index](http://www.financial-hacker.com/the-cold-blood-index/), [randomize](130_randomize.md), [ScholzBrake](190_Margin_Risk_Lots.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))