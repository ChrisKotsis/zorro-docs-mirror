---
title: "Bar, NumBars, ..."
source: "https://zorro-project.com/manual/en/numbars.htm"
---

# Bar, NumBars, ...

## NumBars

Total number of bars in the simulation, determined from [Lookback](181_LookBack_UnstablePeriod.md), [StartDate](100_tradeUpdate.md) and [EndDate](100_tradeUpdate.md), [MaxBars](100_tradeUpdate.md), and from the available data in the price history files. Is **0** in the initial run before the first [asset](013_Asset_Account_Lists.md) call.

## NumTicks

Total number of ticks processed in the simulation, determined from the price history resolution. Is **0** in the initial run before the first [asset](013_Asset_Account_Lists.md) call.

## Bar

Current bar number including the lookback period and preceding history, usually from **0** to **NumBars-1**. The number is not necessarily counted up straight since bars can be skipped (see remarks).

## StartBar

Number of the first bar after the [lookback](181_LookBack_UnstablePeriod.md) period. **(Bar-StartBar)** is the current duration of the test or trade period in bars. **(StartBar-LookBack)** is the number of the first bar after the **INITRUN**.

## EndBar

Number of the last bar.

## AssetFirstBar

Number of the first valid bar of the selected asset. Can be different for asset whose histories begin later than the initial bar. 

## Day

Current trading day number of the simulation, starting with the end of the lookback period. Periods with no bars, such as weekends and holidays, are skipped.

### Type:

**int**, read/only

### Remarks:

*   **NumBars** and **StartBar** are only valid after the [asset](013_Asset_Account_Lists.md) history was loaded.
*   The **Bar** number is normally increased by **1** on every [run](088_run.md), but there are exceptions. When the simulation starts at a certain [StartDate](100_tradeUpdate.md) or when [WFO](numwfocycles.md) cycles are trained, bars from the price history preceding the [LookBack](181_LookBack_UnstablePeriod.md) period are skipped and **Bar** can start with a high number after the initial run. **Bar** can even 'jump back' at the begin of any backtest WFO cyle when the [RECALCULATE](018_TradeMode.md) flag is used.
*   The number of bars spent in drawdown, and other bar statistics at the end of the simulation can be found under [Strategy statistics](116_Statistics_Transformations.md).

### Example:

```c
printf("\\nBar %i of %i",Bar,NumBars);
```

### See also:

[Bars](005_Bars_and_Candles.md), [BarPeriod](177_BarPeriod_TimeFrame.md), [BarOffset](numsamplecycles.md), [LookBack](181_LookBack_UnstablePeriod.md), [StartDate](100_tradeUpdate.md), [run](088_run.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))