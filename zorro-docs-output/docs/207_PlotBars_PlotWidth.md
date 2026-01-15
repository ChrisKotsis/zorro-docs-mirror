---
title: "PlotBars, PlotWidth, ..."
source: "https://zorro-project.com/manual/en/plotbars.htm"
---

# PlotBars, PlotWidth, ...

# Chart variables

## PlotBars

Maximum number of bars to plot in the chart, or **0** for plotting all bars (default). A positive number plots the bars from the start, a negative number from the end. Enter a small number for increasing the scale of the chart and zoom in to the start or to the end.

## PlotStart

Start bar number of the chart. Can be used to start the chart at a certain bar, f.i. 10 bars before the opening a trade (for this set **PlotStart = Bar-10;** in the trade trigger code). If at **0** (default), the chart starts 10 bars before the end of the [LookBack](181_LookBack_UnstablePeriod.md) period. 

## PlotDate

Alternative start of the chart, as a date in the **yyyymmdd** format.

## PlotScale

Candle and symbol width in pixels (default **5**). Use a negative number for displaying hi-low bars instead of candlesticks. The candle type is automatically switched between black/white candles, hi/low bars, and plain lines dependent on this variable and the chart size.

## PlotText

Zoom threshold for visibility of text labels on the chart, in percent of a candle width (default = 1 = text visible on candles > 0.01 pixel). 

## PlotLabels

Distance in bars between x-axis labels in histograms (default = 0 = label at any bar). Use this for better readability of labels in tight histograms.

## PlotBorder

The size of the border around the chart where the axis labels are displayed, in pixels (default: **50**).

## PlotWidth

Maximum chart image width in pixels (default **2000**), or **0** for no chart. The candle width is accordingly reduced when the chart exceeds **PlotWidth**. Note that too-large chart images can't be displayed with most image viewers. The initial chart width in the interactive chart viewer is **600** pixels plus borders.

## PlotHeight1

Height of the main chart with the price bars in chart images, in pixels (default **480**). 

## PlotHeight2

Height of additional charts (**plot** with type=**NEW**), in pixels (default **160**). Also used for the parameter or contour charts in training, and for determining the proportions of additional charts in relation to the main chart in the interactive chart viewer.

## PlotPeriod

Period in minutes for updating the chart on the [trade status page](004_Trading_Strategies.md) (default: **60** = 1 hour).

### Range:

**0..999999**

### Type:

**int**

### Remarks:

See [plot](146_plot_plotBar.md). For removing chart elements such as price candles or equity curves, set their [Color](206_Colors.md) to 0.

### Example:

```c
function run()
{
  PlotBars = 2000;
  ...
}
```

### See also:

[plot](146_plot_plotBar.md), [PlotMode](203_PlotMode.md), [profile](147_plotProfile.md), [Color](206_Colors.md), [StartDate](100_tradeUpdate.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))