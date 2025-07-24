---
title: "Oversampling"
source: "https://zorro-project.com/manual/en/numsamplecycles.htm"
---

# Oversampling

# Oversampling

Backtests become more accurate when more data is available and more trades can be opened. The problem: price data is normally in short supply. Oversampling the bars is a method to run multiple test cycles on slightly different price curves that are derived from the original curve and contain the same inefficiencies. This produces more trades, generates more realistic backtests, and allows to evaluate the effect of price curve randomness on the system performance.

Oversampling can be applied to training or backtest, either **per-bar** or **per-cycle**. Per-bar oversampling requires price data with higher resolution than the bar period, f.i. M1 data with 1-hour bars. Oversampling shifts the bar begin by a fraction of the bar period on any cycle. This results in different bars and - dependent on the strategy - more or less different trades with the same price curve.

For per-cycle oversampling, a time offset is added to the start of any cycle. It is normally used to detect start date/time dependences of the trading system in backtests.

A description of per-bar oversampling with an example can be found on [http://www.financial-hacker.com/better-tests-with-oversampling](http://www.financial-hacker.com/better-tests-with-oversampling/). The following variables activate and control oversampling:

## NumSampleCycles

Number of oversampling cycles (default = **0** = no oversampling). When set to a number **n** > 1, the simulation is repeated **n** times. For per-bar oversampling, the bars are resampled in any cycle with different [BarOffset](177_BarPeriod_TimeFrame.md) values. This generates a slightly different price curve for every cycle, while maintaining the trend, spectrum, and most other characteristics of the curve. For per-cycle oversampling, the **SampleOffset** is added to the start time of any test, training, or WFO run. The performance result is calculated from the average of all cycles. This way more data for test and training is generated and a more accurate result can be achieved.

## SampleOffset

Time offset in bars for per-cycle oversampling. The begin of a test or training cycle is automatically shifted by that time at any cycle. If at **0** (default), per-bar oversampling is used instead.

## SampleCycle

The number of the current cycle from **1** to **NumSampleCycles**. Automatically set at the begin of any cycle.

### Type:

**int**

### Remarks:

*   On bar periods of one or several hours, oversampling is often useful to get enough trades for properly optimizing and testing a strategy. Good values for **NumSampleCycles** are **2..6** for per-bar oversampling. Even higher oversampling factors won't increase the accuracy much further.
*   Oversampling starts with the highest offset and ends with offset 0. For instance, on a 60 minutes bar period and **NumSampleCycles = 4**, the 4 cycles get bar offset 45, 30, 15, and 0.
*   Oversampling must be activated before the first [asset](013_Asset_Account_Lists.md) call. It cannot be used when [BarOffset](177_BarPeriod_TimeFrame.md) is otherwise set or when the strategy is based on certain times or dates, f.i. strategies that always trade on the first of any month or on market opening or closing time.
*   For a histogram of the performance dependent on start time, **SampleOffset** in combination with **[NumTotalCycles](numtotalcycles.md)** can be used.
*   Oversampling increases the memory footprint, similar to the [TICKS](018_TradeMode.md) flag.
*   The performance of the separate cycles is displayed in the [performance report](012_Performance_Report.md) under **Cycle performance**. High performance differences between cycles normally indicates an unstable strategy. The global [statistics values](winloss.md) are the average over all sample cycles.
*   When the [ALLCYCLES](018_TradeMode.md) flag is set, the component specific [statistics values](winloss.md) and the [portfolio analysis](012_Performance_Report.md) are the sum over all bar cycles; they keep their values from the last cycle when a new cycle is started. Otherwise they are reset at the begin of every cycle and thus reflect the last cycle at the end of the simulation. The log contains all cycles when  [ALLCYCLES](018_TradeMode.md) is set; otherwise it contains only the last cycle.
*   In the [price chart](011_Chart_Viewer_Debugger.md), the trade symbols are taken from the last cycle. The equity curve is the average over all cycles.

### Examples:

```c
function run() {
  NumSampleCycles = 4; _// 4 cycles per-bar oversampling_
  ...

function run() {
  NumSampleCycles = 3; _// 3 cycles per-cycle oversampling_
  SampleOffset = 10;   _// with 10 bars start difference_ 
  ...
```

### See also:

[bar](005_Bars_and_Candles.md), [BarOffset](177_BarPeriod_TimeFrame.md), [NumWFOCycles](numwfocycles.md), **[NumOptCycles](016_OptimalF_money_management.md)**, **[NumTotalCycles](numtotalcycles.md)**, [](tutorial_fisher.md)[](numparameters)[ALLCYCLES](018_TradeMode.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))