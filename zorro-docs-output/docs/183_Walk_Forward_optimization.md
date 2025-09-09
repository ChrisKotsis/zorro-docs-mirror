---
title: "Walk-Forward optimization"
source: "https://zorro-project.com/manual/en/numwfocycles.htm"
---

# Walk-Forward optimization

# Walk Forward Optimization

Walk Forward Optimization (WFO in short) is a variant of cross-validation for time series and was first published by Robert Pardo as a backtest method for algorithmic trading strategies. It trains and tests the strategy in several cycles using a data frame that "walks" over the simulation period. This allows an [out-of-sample backtest](https://zorro-project.com/backtest.php) that still uses most of the historical data. WFO is not restricted to backtests, but can be continued In live trading and regularly adapt the strategy parameters to the current market situation. In this way, a WFO trained strategy is essentially a 'parameter-less' system.  
  
For greatly reducing the backtest time with WFO, Zorro separates test and training and stores all trained parameters, trading rules, or machine learning models separately for any WFO cycle. This way a backtest needs not perform all optimizations again. It automatically switches between sets of parameters or rules. To activate WFO in a strategy script, only the following variable needs to be set:

## NumWFOCycles

Number of cycles in a **Walk Forward Optimization / Analysis** (default = **0** = no Walk Forward Optimization). If **NumWFOCycles** is set to a positive number at or above **2**, rolling walk forward optimization is enabled with the given number of cycles; if it is set to a negative number at or below **\-2**, anchored walk forward optimization is enabled. In Walk Forward Optimization, a data frame consisting of a training and test period is shifted over the simulation period in the given number of cycles (see image for ).  
  

<table border="0" align="center" cellspacing="3"><tbody><tr><td><div align="center"><strong>WFOCycle</strong></div></td><td colspan="9" bgcolor="#CCCCCC"><div align="center"><strong>Simulation period</strong></div></td></tr><tr><td><div align="center"><strong>1</strong></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="3" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test1</strong></div></td><td><div align="center"></div></td><td><div align="center"></div></td><td><div align="center"></div></td></tr><tr><td><div align="center"><strong>2</strong></div></td><td width="40"><div align="center"></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="3" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td><td bgcolor="#FF9900"><div align="center"><strong>Test2</strong></div></td><td><div align="center"></div></td><td><div align="center"></div></td></tr><tr><td><div align="center"><strong>3</strong></div></td><td><div align="center"></div></td><td width="40"><div align="center"></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="3" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td><td bgcolor="#FF9900"><div align="center"><strong>Test3</strong></div></td><td><div align="center"></div></td></tr><tr><td><div align="center"><strong>4</strong></div></td><td><div align="center"></div></td><td><div align="center"></div></td><td width="40"><div align="center"></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="3" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td><td bgcolor="#FF9900"><div align="center"><strong>Test4</strong></div></td></tr><tr><td><div align="center"><strong>5</strong></div></td><td><div align="center"></div></td><td><div align="center"></div></td><td><div align="center"></div></td><td>&nbsp;</td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="3" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td></tr><tr><td align="center"><strong>OOS Test</strong></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="4" bgcolor="#FF9900"><div align="center"><strong>Test5</strong></div></td><td><div align="center"></div></td><td><div align="center"></div></td><td><div align="center"></div></td></tr><tr><td align="center"><strong>WFO Test</strong></td><td width="40"><div align="center"></div></td><td width="40"><div align="center"></div></td><td width="40"><div align="center"></div></td><td width="40" bgcolor="#FFFF00"><div align="center"><strong>Look</strong></div></td><td width="40" bgcolor="#FFFF00"><div align="center"><strong>Back</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test1</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test2</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test3</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test4</strong></div></td></tr></tbody></table>

Rolling Walk Forward Optimization (**NumWFOCycles** **\= 5**)  
 

<table border="0" align="center" cellspacing="3"><tbody><tr><td><div align="center"><strong>WFOCycle</strong></div></td><td colspan="9" bgcolor="#CCCCCC"><div align="center"><strong>Simulation period</strong></div></td></tr><tr><td><div align="center"><strong>1</strong></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="3" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td><td bgcolor="#FF9900"><div align="center"><strong>Test1</strong></div></td><td><div align="center"></div></td><td><div align="center"></div></td><td><div align="center"></div></td></tr><tr><td><div align="center"><strong>2</strong></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="4" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td><td bgcolor="#FF9900"><div align="center"><strong>Test2</strong></div></td><td><div align="center"></div></td><td><div align="center"></div></td></tr><tr><td><div align="center"><strong>3</strong></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="5" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td><td bgcolor="#FF9900"><div align="center"><strong>Test3</strong></div></td><td><div align="center"></div></td></tr><tr><td><div align="center"><strong>4</strong></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="6" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td><td bgcolor="#FF9900"><div align="center"><strong>Test4</strong></div></td></tr><tr><td><div align="center"><strong>5</strong></div></td><td colspan="2" bgcolor="#FFFF00"><div align="center"><strong>LookBack</strong></div></td><td colspan="7" bgcolor="#00FF00"><div align="center"><strong>Training</strong></div></td></tr><tr><td align="center"><strong>WFO Test</strong></td><td width="40"><div align="center"></div></td><td width="40"><div align="center"></div></td><td width="40"><div align="center"></div></td><td width="40" bgcolor="#FFFF00"><div align="center"><strong>Look</strong></div></td><td width="40" bgcolor="#FFFF00"><div align="center"><strong>Back</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test1</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test2</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test3</strong></div></td><td width="40" bgcolor="#FF9900"><div align="center"><strong>Test4</strong></div></td></tr></tbody></table>

Anchored Walk Forward Optimization (**NumWFOCycles** **\= -5**)  

[Strategy parameters](107_optimize.md) and [trade rules](advisor.md) are generated separately for every cycle in \[Train\] mode, and are separately loaded for every test segment in \[Test\] mode. This way, the strategy test is guaranteed to be out of sample - it uses only parameters and rules that were generated in the preceding training cycle from data that does not occur in the test. This simulates the behavior of real trading where parameters and rules are generated from past price data. A Walk Forward Test gives the best prediction possible of the strategy performance over time.

## WFOPeriod

Alternative to **NumWFOCycles**; number of bars of one WFO cycle (training + test), f.i. **5\*24** for a one-week WFO cycle with 1-hour bars. For getting a fixed test period of **N** bars, set **WFOPeriod** to **N\*100/(100-DataSplit)**. Since the number of WFO cycles now depends on the number of bars in the history, [asset](013_Asset_Account_Lists.md) must be called before. The WFO period is automatically adjusted so that the simulation period covers an integer number of WFO cycles. 

## WFOSelect

Set this to a certain WFO cycle number for selecting only this cycle in a training or test; otherwise the process runs over all cycles. Setting it to **\-1** selects the last cycle that's normally used for live trading.

### Type:

**int**

## WFOCycle

The number of the current WFO cycle, from **1** to **NumWFOCycles**. Automatically set during WFO test and training.

## WFOBar

The bar number inside the current WFO cycle, starting with **0** at the begin of the cycle. Can be used to determine when the cycle starts: **if(WFOBar == 0)**. Automatically set during a WFO test.

## ISPeriod

Number of bars of the in-sample (training) period of a WFO cycle. Automatically set in the [FIRSTRUN](013_Asset_Account_Lists.md) of a WFO test.

## OOSPeriod

Number of bars of the out-of-sample (test) period of a WFO cycle. Automatically set in the [FIRSTRUN](013_Asset_Account_Lists.md) of a WFO test.

### Type:

**int, read/only**

### Remarks:

*   WFO theory is explained in the [Training](007_Training.md) chapter and in more detail in the [Black Book](247_Links_Books.md). In training, every WFO cycle is a separate simulation run including [INITRUN](018_TradeMode.md) and [EXITRUN](018_TradeMode.md). In backtesting all WFO cycles are tested in a single simulation run. In live trading, only the data trained in the last WFO cycle is used.
*   Due to the preceding training cycle, the overall test period is reduced by WFO (see diagrams above). For a longer test period, increase the number of WFO cycles and/or reduce **DataSplit**. The length of a test and training cycle can be found in the [performance report](012_Performance_Report.md) under "WFO Test Cycles" and "WFO Train Cycles". The WFO test starts at [StartDate](100_tradeUpdate.md) plus one WFO training cycle.
*   When changing the number of WFO cycles or the backtest period, the system must be trained again. Otherwise the WFO test and training cycles will be out of sync. For avoiding unintended changes of the test period when new price data becomes available, set a fixed [StartDate](100_tradeUpdate.md) and [EndDate](100_tradeUpdate.md).
*   If **[DataSplit](dataslope.md)** is not set otherwise, WFO uses a default training period of **85%** and a default test period of **15%**.
*   [DataSlope](dataslope.md) can improve the parameter quality with anchored WFO cycles.
*   Use [DataHorizon](dataslope.md) to prevent trade triggering by parameter changes or test bias when training is based on future prices or future trade returns, as for some [machine learning](advisor.md) algorithms.
*   WFO training is much faster than normal training when using [multiple CPU cores](numcores.md).
*   For executing code at the begin of every WFO cycle, check **if(WFOBar == 0) ...** .
*   The optimal number of WFO cycles depends on the strategy, the backtest period, and the time frame. Normally a WFO cycle should cover about six to twelve months. Large time frames or infrequent trading require a small number of long WFO cycles for getting enough trades per cycle. Very market-dependent strategies with fast expiring parameters require a high number of short WFO cycles. If the strategy performance highly varies with small changes of **NumWFOCycles**, a periodic seasonal effect can be the reason. Try to determine and eliminate seasonal effects before optimizing a strategy. Use the [WFOProfile](020_Included_Scripts.md) script for finding the most robust number of WFO cycles for your strategy.
*   Parameters and rules by WFO are stored in files in the **Data** folder. The number of the cycle is added to the file name, except for the last WFO cycle. F.i. a parameter WFO of a script "**Trade.c**" and 4 cycles will generate the following parameter files in the **Data** folder: **Trade\_1.par**, **Trade\_2.par**, **Trade\_3.par**, **Trade.par**, **Trade.fac**. \[Test\] mode reloads the parameters and rules for every segment during the test cycle. \[Trade\] mode uses the parameters and rules from the last WFO cycle, without an attached number.
*   Normally the [LookBack](181_LookBack_UnstablePeriod.md) period precedes only the first WFO cycle in \[Test\] mode. Subsequent cycles just continue series and indicators. If the [RECALCULATE](018_TradeMode.md) flag is set, a dedicated lookback period precedes every WFO cycle. The content of all [series](091_series.md) is discarded and recalculated from the parameters and rules of the new cycle. This increases the test time, but produces a slightly more realistic test by simulating the start of a new trade session at every WFO cycle.
*   While live trading a walk-forward optimized strategy, it is recommended to [re-train](009_Retraining.md) the last cycle perodically for making the strategy independent on parameter settings. The best time period between retraining is the time of a WFO test cycle.
*   The last WFO cycle (cycle **5** in the figure above) has no test period. It can be a few bars longer than the other cycles to ensure training until the very **EndDate**. If **SelectWFO** is set to **\-1** in \[Test\] mode, the out-of-sample period before the training is tested (**OOS Test** in the figure; rolling WFO only). The OOS test often generates low profit, but can inform about the long-term performance of the strategy when it is not re-trained.
*   Anchored WFO can be used to test the lifetime of parameters or rules. If anchored WFO generates a better result than rolling WFO, the strategy is longlived and does not need to be retrained often. Normally, rolling WFO produces better results, meaning that the market changes and that parameters / rules must be adapted from time to time.
*   Use the [plotWFOCycle](147_plotProfile.md) and [plotWFOProfit](147_plotProfile.md) functions for analyzing the profit curve over one or several WFO cycles.

### Examples:

```c
_// anchored WFO, 10 cycles_ 
function run()
{
  NumWFOCycles = -10;
  DataSplit = 80; _// 20% test cycle_
  DataSlope = 2;  _// more weight to more recent data_
  set(PARAMETERS,TESTNOW); _// run a test immediately after WFO_
  ...
}

_// set WFO period and DataSplit from a fixed test and training cycle_
function setWFO1(int TestDays,int TrainDays)
{
  WFOPeriod = (TestDays+TrainDays) \* 1440/BarPeriod;
  DataSplit = 100\*TrainDays/(TestDays+TrainDays);
}

_// set **NumWFOCycles** from a fixed test cycle in days
// (DataSplit and LookBack should be set before)_
function setWFO2(int TestDays)  
{  
  asset(Asset); _// requires NumBars, so asset must be set_  
  int TestBars = TestDays \* 1440/BarPeriod;  
  var Split = ifelse(DataSplit > 0,DataSplit/100.,0.85);
  int TrainBars = TestBars \* Split/(1.-Split);  
  int TotalBars = NumBars-LookBack;  
  NumWFOCycles = (TotalBars-TrainBars)/TestBars + 1;  
}

_// set a fixed date for the WFO test start
// modifies StartDate, needs EndDate and TestDate in YYYYMMDD_
function setWFO3(int TestDate)
{
  var Split = ifelse(DataSplit > 0,DataSplit/100.,0.85);
  var TrainDays; 
  if(WFOPeriod > 0)
    TrainDays = Split\*WFOPeriod\*BarPeriod/1440;
  else if(NumWFOCycles > 1)
    TrainDays = Split/(1.-Split)\*(dmy(EndDate)-dmy(TestDate))/(NumWFOCycles-1);
  else return;
  StartDate = ymd(dmy(TestDate)-TrainDays);
}
```

### See also:

[Training](007_Training.md), [Tutorial](tutorial_fisher.md), **[DataSplit](dataslope.md)**, [DataHorizon](dataslope.md), [NumSampleCycles](numsamplecycles.md), **[NumTotalCycles](numtotalcycles.md)**, [](tutorial_fisher.md)[](numparameters)[NumOptCycles](016_OptimalF_money_management.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))