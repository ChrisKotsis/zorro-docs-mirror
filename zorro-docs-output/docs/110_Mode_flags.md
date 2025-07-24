---
title: "Mode flags"
source: "https://zorro-project.com/manual/en/mode.htm"
---

# Mode flags

# System Flags

Zorro's behavior can be set up through **system flags** - that are internal "switches" that can be either set (activated) or reset (deactivated). By default, they are normally off. Flags that affect the bar generation, such as **TICKS**, must be set in the initial run at start of the script before selecting any assets. The other flags can be set or reset at any point. Some flags are [status flags](013_Asset_Account_Lists.md) and can be read only. Flags are set, reset, or read with the following functions:

## set (int Flag1_, int Flag2..., int Flag10_)

Sets or resets the given system flags (up to 10). A flags is reset by adding **|OFF** to the flag name. For instance, **set(PARAMETERS,TICKS|OFF);** sets the **PARAMETERS** flag and resets the **TICKS** flag.

## is (int Flag): int

Returns nonzero (or **true**) when the given system flag is set, otherwise zero or **false**.   

The main system flags:

## SKIP1

## SKIP2

## SKIP3

Do not [enter](buylong.md) trades in the first, second, or third of every 3 weeks of the historical price data (the period can be set up with [DataSkip](dataslope.md)). These flags can be used for out-of-sample testing by separating test data from training data while still covering the same time period. These flags must be set in the [INITRUN](013_Asset_Account_Lists.md).  
   

## PEEK

Allow peeking in the future through negative [price](022_Price_History.md) function offsets; \[Test\] and \[Train\] mode only. Sometimes required for [advise](advisor.md) functions and price difference analysis.

## NOLOCK

Don't synchronize the API and file accesses of multiple trading Zorro instances, to prevent that they interfere with each other. Set this flag for speeding up API access when the trading Zorros don't share the broker API, or when the broker API allows simultaneous sccesses from multiple sources (MT4/MT5 does not). This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).

## NOWATCH

Ignore all [watch](166_watch.md) statements. Can be set for trading a script that is full of watches.

## NOSHIFT

Do not shift [dynamic series](091_series.md) and do not change their first element on **series()** calls. Useful for shifting series only under special conditions, f.i. for emulating [special bars](005_Bars_and_Candles.md) or for not updating indicators outside market hours.

## NOFACTORS

Don't calculate **OptimalF** factors in test and training. Useful when OptimalF calculation takes a long time due to a large number of trades. For training script-generated factors with a user-defined algorithm, set both **FACTORS** and **NOFACTORS** flags and set **OptimalF**, **OptimalFLong**, **OptimalFShort** to a script calculated value in the **[FACCYCLE](013_Asset_Account_Lists.md)** training run (**if(is(FACCYCLE)) ...**). 

## COMMONSTART

Delay the simulation until price history of all assets is available. Otherwise the simulation starts either at the [StartDate](100_tradeUpdate.md) or at the history begin of the first asset, whichever is later, and missing price history of other assets produce an [Error 055](errors.md) message. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).

## OPENEND

Do not close the remaining open trades at the end of a simulation cycle; leave them open and ignore their results. This has two purposes. In \[Test\] mode it eliminates the effect of prematurely closed trades on the performance report. In \[Train\] mode it prevents that parameters or rules are affected by the results of those trades.

## ALLCYCLES

Do not reset the statistics values inside the **STATUS** structs when a new [sample cycle](numsamplecycles.md) is started. The [Long/Short statistics](winloss.md) and the [portfolio analysis](012_Performance_Report.md) are then the result of all sample cycles so far. Print any sample cycle to the log; otherwise only the last cycle is logged. This flag is always set in \[Train\] mode. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).  
 

## TICKS

Tick-precise intrabar simulation. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md). If it is set, not only the Open, Close, High, and Low, but also the price curve inside any bar is evaluated for triggering entry, stop, trail, or takeprofit limits. [TMFs](018_TradeMode.md) are run on every [tick](bars.htm#tick) in the simulation, instead of only once per bar. This flag gives a more accurate simulation result, but also requires more time for a simulation cycle, and allocates more memory.  
  If this flag is not set, an intra-bar approximation is used for simulating entry and exit. In this approximation, a stop loss is always triggered earlier than a profit target, resulting in a slightly pessimistic simulation. Trades closed by [TMFs](018_TradeMode.md) are sold at the open price of the next bar. This less accurate simulation is sufficient in most cases, but **TICKS** should be used when trades enter and exit at the same bar, when stop loss, or takeprofit distances are small, or when trading is strongly affected by [tick](089_tick_tock.md) functions or [TMFs](018_TradeMode.md).

## LEAN

Use compressed historical data. [marketVal](022_Price_History.md) and [marketVol](022_Price_History.md) are not available, [.t1 data](022_Price_History.md) is stored without bid prices, and the open/close price of a bar is approximated by the center point of its first and last tick (except for EOD historical data). This flag can reduce memory requirement when market volume and candles are not needed by the strategy, and the historical data has a much higher resolution than one bar period, f.i. M1 data with 1-hour bars. This flag reduces the memory requirement for backtests by 30%. It must be set in the [INITRUN](013_Asset_Account_Lists.md) before calling [asset()](013_Asset_Account_Lists.md).

## LEANER

Use only the Close from historical price data; disregard Open, High, Low, and Mean. Indicators that require full candles, such as [ATR](033_W4a_Indicator_implementation.md) or [TypPrice](033_W4a_Indicator_implementation.md), can not be used. This flag is useful for strategies with hundreds or thousands of stocks, and reduces in combination with the **LEAN** flag the memory requirement by 50%. It must be set in the [INITRUN](013_Asset_Account_Lists.md) before calling [asset()](013_Asset_Account_Lists.md).

## RECALCULATE

Run a full [LookBack](181_LookBack_UnstablePeriod.md) period at the begin of every WFO cycle in \[Test\] mode. Discard the content of all [series](091_series.md) at lookback start, and recalculate them from the parameters and rules of the new cycle. Otherwise the series keep their values from the previous test cycle. **RECALCULATE** increases the test time, but simulates the start behavior of a new trading session a bit more realistically. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md). See also [DataHorizon](dataslope.md).

## PRELOAD

In \[Trade\] mode, use Zorro's historical price data for the [LookBack](181_LookBack_UnstablePeriod.md) period, rather than loading price data from the broker's price server or from external data sources. If historical data is not sufficient for filling the complete lookback period, the remaining data between the end of the history and the current time is still loaded from the broker or data source. This flag is useful for reducing the start time of a system, for overcoming history limitations of broker servers, or for very long lookback periods. Recent price history files from the current and the last year must be available in sufficient resolution and preferably from the same broker or data source. [LookBackResolution](181_LookBack_UnstablePeriod.md) can be used to enforce the same resolution for pre-loaded and live historical data. Use the [Download](020_Included_Scripts.md) script or the [assetHistory](loadhistory.md) function for getting the most recent data. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).  
  In \[Test\] mode this flag suppresses the warning message when the lookback period is too long for a normal trading session. It also causes historical data to be reloaded again for any [simulation cycle](numtotalcycles.md), which allows cycles with different bar periods or with shuffled or otherwise manipulated price data for generating reality check histograms.  
 

## PARAMETERS

\[Train\] mode: generate strategy parameters with [optimize](107_optimize.md) calls and store them in **Data/\*.par**. This flag must be set before calling [optimize](107_optimize.md). If this flag is not set, parameters are not generated in the training run, but still loaded from previously generated **\*.par** files.  
\[Test\] / \[Trade\] mode: load optimized parameters. If this flag is not set, the default parameters from the [optimize](107_optimize.md) calls are used.

## FACTORS

\[Train\] mode: generate [OptimalF](016_OptimalF_money_management.md) capital allocation factors and store them in **Data/\*.fac**. \[Test\] / \[Trade\] mode: load **OptimalF** factors for allocating capital. If this flag is not set, all **OptimalF** factors are **1**.  
**OptimalF** factors are normally generated from the whole backtest period. For generating them individually per WFO cycle, use the **[ALLCYCLES](016_OptimalF_money_management.md)** training mode.

## RULES

\[Train\] mode: use the [advise](advisor.md) machine learning functions to generate trade rules or machine learning models, and store them in **Data/\*.c** or **Data/\*.ml**. This flag must be set before calling [advise](advisor.md). Otherwise rules or models are not generated, but loaded from previously generated **\*.c** or **\*.ml** files.  
\[Test\] / \[Trade\] mode: load trade rules or machine learnign models and use them in the **advise** functions. If this flag is not set, the **advise** functions always return the value **100**.

## VCPP

Use the [Visual Studio C++ compiler](dlls.md), rather than the lite-C compiler, for compiling trade rules with the **RULES** flag. Default for the 64-bit version.  
 

## MARGINLIMIT

Don't enter a [trade](buylong.md) when even the minimum amount of 1 [Lot](190_Margin_Risk_Lots.md) exceeds twice the used [Margin](190_Margin_Risk_Lots.md) value, or when the trade margin plus the trade risk exceeds the account balance. Trades skipped due to too-high risk or too-low balance are indicated in the log. This flag has no effect in training mode or for [phantom trades](190_Margin_Risk_Lots.md) that are always executed regardless of the margin.

## RISKLIMIT

Don't enter a trade when even with the minimum amount of 1 [Lot](190_Margin_Risk_Lots.md), the trade risk is still higher than twice the than the allowed [Risk](190_Margin_Risk_Lots.md). Also don't enter a new trade in \[Trade\] mode when the total risk of all open trades exceeds the available margin left in the account. Setting this flag can reduce profit, as trades with a high stop loss distance are often profitable trades. Trades skipped due to too-high risk or too-low account are indicated in the log. This flag has no effect in training mode or for [phantom trades](190_Margin_Risk_Lots.md) that are always executed regardless of the risk.

## ACCUMULATE

Accumulate the [Margin](190_Margin_Risk_Lots.md) of trades skipped by **MARGINLIMIT** or **RISKLIMIT**, until the accumulated margin is high enough to overcome the limits. The trade is then executed and the accumulated margin is reset. This allows trading - although less frequently - with very small capital that would otherwise result in trade sizes of less than one lot. This flag has no effect in training mode**.**  
 

## BINARY

Simulate binary options for training and testing. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md). In binary mode the trade profit is not proportional to the price difference between entry and exit, but determined by the [WinPayout](191_Spread_Commission.md) or [LossPayout](191_Spread_Commission.md) of the selected asset. The stake can be set with the [Margin](190_Margin_Risk_Lots.md) variable for the backtest; in live trading the stake is set with the [Lots](190_Margin_Risk_Lots.md) variable or with an [order comment](113_brokerCommand.md), dependent on the broker. Rollover and commission are ignored for binary trades. [Spread](191_Spread_Commission.md) is **0** by default in binary mode, but can be set to a nonzero value for simulating an additional disadvantage. The trade time can be set through [ExitTime](timewait.md). Stop loss and profit targets are normally not set for binary trades, but can be used for betting on negative or positive excursions in special binary modes. Hedging should be enabled by **[Hedge](019_Hedge_modes.md) = 2** for preventing the premature close of opposite trades.

## NFA

Activate NFA Rule 2-43(b) compliant trading. This is required for most US based brokers, such as [IB](062_DefineApi_LoadLibrary.md). Zorro handles NFA compliant trading in a transparent way, so a strategy normally needs not be modified for NFA compliance. When the NFA flag is set, the following NFA restrictions are observed and worked around:

*   NFA brokers support only positions, but no individual trades. Trades are managed on the Zorro side.
*   Closing trades is not permitted. The [exit](selllong.md) functions open an opposite trade instead.
*   Stopping out trades is not permitted. Stops are managed on the Zorro side and open an opposite trade.
*   Simultaneous long and short positions are not permitted. On the Zorro side they are still possible with [virtual hedging](019_Hedge_modes.md).
*   First opened positions must be closed first (FIFO compliance). [Virtual hedging](019_Hedge_modes.md) takes also care of that.

The **NFA** flag must be set in the [INITRUN](013_Asset_Account_Lists.md). It is automatically set when the selected account has a nonzero [NFA parameter](013_Asset_Account_Lists.md) in the account list. Do not set this flag for non-NFA compliant accounts. You can find out if your account is NFA compliant by manually opening a long and short position of the same asset in the broker platform. If two positions are then really open, your account is not NFA compliant and you must not set the **NFA** flag. If the short position cancels the long one, your account is NFA compliant and the **NFA** flag must be set. [MT4/5 accounts](mt4plugin.md) are normally not NFA compliant even when the broker is located in the US; but they can be FIFO compliant and require exiting trades in the order of their entry.  
 

## EXE

Do not run the simulation, but compile the script to an executable in **.x** file format. Executable scripts start faster and can be used for distributing strategies without revealing the source code. If a **.c** and a **.x** script with the same name are found in the **Strategy** folder, the **.c** script has priority. [Zorro S](restrictions.md) required. The **EXE** flag must be set in the [INITRUN](013_Asset_Account_Lists.md); it can also be set by [command line](027_Command_Line_Options.md) or with the \[Action\] scrollbox.

## AUTOCOMPILE

Unless the script was changed, do not compile it again and do not reset sliders and global variables on subsequent runs. This flag is off by default so that global variables are always reset at start, but can also be set in [Zorro.ini](007_Training.md). 

## STEPWISE

Do not run, but single step through the simulation in \[Test\] mode. A click on \[Step\] moves one bar forward. \[Skip\] moves to the next opening or closing a position. The current chart and trade status will be displayed on every step in a browser window. For details see [debugging](011_Chart_Viewer_Debugger.md).

## STRAIGHT

Don't correct or check the lookback period and switch the [ta-lib indicators](033_W4a_Indicator_implementation.md) from time-descending [series](091_series.md) mode to time-ascending array mode. In this mode they accept any data array of sufficient length and can be used even when series are disabled.  
 

## LOGFILE

Generate and export [logs and statistics files](testing.htm#files) in the **Log** and **Data** folders, dependent on \[Test\], \[Train\], or \[Trade\] mode. This flag affects the backtest speed.It is always set in \[Trade\] mode. When [LogNumber](numtotalcycles.md) is set, the number is appended to the filenames, which allows different log files from the same script for comparing or appending. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).

## EXPORTED

Export charts and training curves in the **Log** and **Data** folders, dependent on \[Test\], \[Train\], or \[Trade\] mode (see [export](export.md)). This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).

## BALANCE

Use balance rather than equity for the profit curve in the chart, for the monthly profit table in the [performance report](012_Performance_Report.md), and for the values in the exported [profit/loss curves](020_Included_Scripts.md). This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).

## PIPRETURN

Use volume-independent returns in [pip](192_PIP_PIPCost_Leverage.md) units for the profit curve in the chart, for the monthly profit table in the [performance report](012_Performance_Report.md), and for the values in the exported [profit/loss curve](020_Included_Scripts.md). This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).

## MAECAPITAL

Do not calculate the required capital, annual return, and the 'underwater profile' on the chart from maximum drawdown, but from maximum adverse excursion (see [performance report](performance.md) for the difference). This is for comparing with results of other platforms and normally produces slightly higher required capital. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).  
 

## TESTNOW

Run a test immediately after training, without clicking \[Test\]. If the simulation is repeated multiple times by setting [NumTotalCycles](numtotalcycles.md), **TESTNOW** causes the price curve to be generated anew at the begin of every cycle. This is useful for testing different bar offsets or detrend modes. Since the test run uses the settings from the previous training, its result can differ from a normal test when static variables or parameters are different. This flag must be set in the [INITRUN](013_Asset_Account_Lists.md) and before calling [asset()](013_Asset_Account_Lists.md).

## PLOTNOW

Plot a chart immediately after testing, without clicking \[Result\]. Automatically set when the script plots a histogram with [plotBar](146_plot_plotBar.md). This flag must be set in the [INITRUN](013_Asset_Account_Lists.md).

### Remarks

*   In old scripts, flag combinations like **set(PARAMETERS+TICKS)** were used for setting several flags, **reset(TICKS)** for switching off a flag, and **mode(TICKS)** for checking the flag state. These methods are still supported, but for new scripts use **set(PARAMETERS,TICKS)** , **set(TICKS|OFF)**, and **is(TICKS)**.

### Example:

```c
function run()
{
  if(Train) set(SKIP3); _// leave every 3rd week for the test_
  if(Test) set(SKIP1,SKIP2,TICKS,FAST,LOGFILE); 
  ...
}
```

### See also:

[DataSkip](dataslope.md), [Status flags](013_Asset_Account_Lists.md), [setf](168_setf_resf_isf.md), [Zorro.ini](007_Training.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))