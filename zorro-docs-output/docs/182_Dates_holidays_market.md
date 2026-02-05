---
title: "Dates, holidays, market"
source: "https://zorro-project.com/manual/en/date.htm"
---

# Dates, holidays, market

# Time/date periods

## StartDate

Start of the simulation; determines the begin of the backtest or of the preceding training period. The variable can be set in different ways:  
\- A 4-digit year number (f.i. **2006**) gives the number of the historical data file with which the simulation begins (f.i. **EURUSD\_2006.t6**). If the data file has no year number (f.i. **MSFT.t6**), the simulation starts with the earliest record in the file that matches the year number.  
\- A date in **yyyymmdd** format starts the simulation at a certain date (f.i. **20090401** = April 1st, 2009). The [LookBack](181_LookBack_UnstablePeriod.md) period is added in front of the date and begins accordingly earlier. Due to the lookback period, **StartDate = 2006** is not the same as **StartDate = 20060101**.  
\- **StartDate = NOW** sets the start date to the current day, and executes the [run](088_run.md) function in \[Trade\] mode immediately after the lookback period, regardless of the current time. Useful for strategies that do not run permanently, but are only started for modifying a portfolio.  
\- **StartDate = 0** (default) starts the simulation with **NumYears** before the current year.

## EndDate

End of the simulation, either 4 digits for determining the number of the last historical price data file (similar to **StartDate**), or a date in **yyyymmdd** format for ending the backtest at that date (f.i. **20091231** = December 31, 2009), or **NOW** for the current day. If at **0** (default), the simulation runs until the end of the available price history. In January it runs until the end of the price history of the previous year.

## NumYears

Number of years of the simulation if no **StartDate** or **EndDate** is given (default: **6** years; max 32 years). The current year counts as one full year. Set **NumYears** to **\-1** for not loading any prices by [assetHistory](loadhistory.md).

## MaxBars

Maximum number of bars of the simulation (default: **0** = no limit). The simulation ends either at **EndDate** or after the given number of bars (including the [LookBack](lookback.md) period), whichever happens earlier.  
 

## UpdateDays

Interval in days for automatically [downloading price data](loadhistory.md) from the selected broker (default: **0** = don't automatically download price data). The download process starts when calling [asset()](013_Asset_Account_Lists.md) the first time in a \[Test\] or \[Train\] cycle and the price history is older than the given number of days. Zorro will then log in to the broker, download recent price data in M1 or T1 format dependent on [History](020_Included_Scripts.md), and add it to the price history. This variable can be used for getting fresh data in a [retraining](009_Retraining.md) or [retesting](009_Retraining.md) process. It has no effect in \[Trade\] mode. Set **UpdateDays** to **\-1** for loading prices even when the history is up to date.

## ReTrainDays

Interval in days for automatically [retraining](009_Retraining.md) a live trading system ([Zorro S](restrictions.md) required; default: **0** = no automatic retraining). Set this to the duration of the [WFO test period](numwfocycles.md) for keeping a WFO trained system in sync with the market when it trades unsupervised for a long time. The retraining interval starts with the session start.

## GapDays

Maximum allowed gap in days in the historical prices and in [downloaded](loadhistory.md) price data (default: **0** = no gap checking). Set this to **2** or above in order to check the price curve for gaps and inconsistencies, and give an [Error 047](errors.md) message if any are detected. Weekends and **Holidays** are except from gap checking. Gaps of 1 day are normal in historical prices when market holidays are not set up in the **Holidays** array (see below).  
 

## StartWeek

## EndWeek

Start and end of the business week in **dhhmm** local time in the [BarZone](assetzone.md), where **d** = day number (**1** = Monday .. **7** = Sunday) **hh** = hour and **mm** = minute. Default: Start **72300** (Sunday 23:00), end **52000** (Friday 20:00). Used to determine the weekend for [BarMode](200_BarMode.md) flags. 

## StartMarket

## EndMarket

Daily global market opening and closing time in **hhmm** local time in the [BarZone](assetzone.md), **hh** = hour and **mm** = minute. Default: **0930**. Used for local time functions ([day](day.md), [market](month.md), etc.) and for trading and sampling of bars, dependent on [BarMode](200_BarMode.md). Automatically converted from **AssetMarketStart/End** (see below) when [BR\_LOCAL](200_BarMode.md) is set. 

## AssetMarketStart

## AssetMarketEnd

Local market opening and closing time of the selected asset, in **hhmm** local time in the [AssetMarketZone](assetzone.md). Initially read from the **Market** field in the [asset list](013_Asset_Account_Lists.md); can also be set by script. Used for intraday trading in [BR\_LOCAL](200_BarMode.md) mode. 

### Type:

**int**  
 

## Holidays

Pointer to an **int** array of holiday dates either in **yyyymmdd** or in **mmdd** 3- or 4-digit format, ending with 0. Default: **{ 101, 1225, 0 }**. Can be set to a 0-terminated array for defining local stock market holidays. The **yyyymmdd** format specifies a holiday only in a certain year, **mmdd** for all years. In the backtest, holidays are treated like weekends.

### Type:

**int\***  
 

## Now

Date/time variable in [DATE](month.md) format for passing a certain point in time to the [contractUpdate](096_contract.md) function or to the **NOW** argument of [date/time](month.md) functions. When at **0** (default), the current PC date and time is used for **NOW**.

## DayOffset

Time period in [DATE](month.md) format to be added to the current time in \[Trade\] mode for special purposes, such as a quick test of the live behavior at a particular day, or at weekend or market closure (see also [Troubleshooting](trouble.md)). Set it to **1** or adding a day, or to **1./24** for adding one hour to the current time, or increase it by **1./24** at any 1-hour bar for trading a system in double speed. Affects also the lookback period and the time of a connected server; does not affect timestamps of historical data.

### Type:

**var**  
 

### Remarks:

*   The earliest possible **StartDate** is determined by the availability of historical price data. M1 data back to 2002 can be downloaded from the [Zorro website](https://zorro-project.com%20). In 2002 the EUR replaced national currencies, therefore forex backtests before that date make normally not much sense.
*   **StartDate** and **EndDate** can be used to 'zoom' the backtest to a certain period and examine the trade behavior of that period in more detail.
*   If the **StartDate** lies before the history start of the first asset, the simulation oe lookback period begins with the first bar of the historical data. If [COMMONSTART](018_TradeMode.md) is set, the simulation begins with the latest history start of any asset. The simulation ends with the earliest history end of all assets or with **EndDate**, whichever is earlier.
*   **StartWeek**, **EndWeek**, **StartMarket**, **EndMarket**, **AssetMarketStart**, **AssetMarketEnd** have normally little effect on bar generation, since historical data contains anyway no price ticks during market closure, weekends, or holidays. However they can be used to limit trading time or to determine market hours in combination with [BR\_FLAT](200_BarMode.md). Note that they are normally not identical to real market open and close times, since they only suppress or enable bars or indicators. For actions precisely on market open or close, use one-minute bars or the [tick](089_tick_tock.md) function. 
*   All variables that affect bar generation, such as **StartDate**, **EndDate**, **NumYears**, **Holidays**, **UpdateDays** etc. must be set before [loading price data](loadhistory.md) or calling [asset](013_Asset_Account_Lists.md) the first time.
*   WFO parameters and rules are only valid for the simulation period with which they were created. If the period is changed, the strategy must be trained again. When re-training the last WFO cycle for live trading, set **EndDate** to **0** or **NOW**, otherwise the training period would end with **EndDate**.
*   The initial run of a strategy ([INITRUN](mode.md)) has no valid date or time until the the start and end date are set and the first asset is loaded.
*   For simulating a 'fast forward' mode in a live trading test, use a [tock](089_tick_tock.md) function that adds a time period to **DayOffset** at every minute. For instance, **DayOffset += 9./1440** adds 9 minutes per minute, and thus lets time pass 10 times faster.

### Example:

```c
StartDate = 20150901; _// start the simulation in September 2015_  
EndDate = 20160901; _// and simulate one year_.
static int USHolidays\[10\] = { 101, 218, 419, 704, 527, 902, 1128, 1225, 0 };
Holidays = USHolidays; _// set up US holidays_
BarMode = BR\_WEEKEND;
```

### See also:

[bar](005_Bars_and_Candles.md), [BarPeriod](177_BarPeriod_TimeFrame.md), [LookBack](181_LookBack_UnstablePeriod.md), [Detrend](197_Detrend_shuffling.md), [time/date functions](month.md), [PlotDate](204_PlotBars_PlotWidth.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))