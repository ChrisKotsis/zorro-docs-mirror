---
title: "PlotMode"
source: "https://zorro-project.com/manual/en/plotmode.htm"
---

# PlotMode

## PlotMode

Determines what's plotted at the end of a test or when clicking \[Result\]. Use [setf](168_setf_resf_isf.md) and [resf](168_setf_resf_isf.md) for setting and resetting the flags.

### Flags:

**PL\_LONG**  - begin the chart already with the [LookBack](181_LookBack_UnstablePeriod.md) period. Otherwise the chart begins a few bars before the test or trade period.  
**PL\_ALL**  - plot all asset specific curves, regardless of the selected asset (except for price curve and trades).  
**PL\_ALLTRADES** - plot all trades, regardless of the selected asset.  
**PL\_FINE** - plot equity and price curve in higher resolution.  
**PL\_LINE** - enforce a line rather than candles for the price curve.  
**PL\_DIFF** - plot the equity/balance difference to the initial value, rather than the total value. For better visibility of small equity changes when [Capital](190_Margin_Risk_Lots.md) is invested.  
**PL\_FILE** - export the chart to a **.png** image, rather than opening the [chart viewer](011_Chart_Viewer_Debugger.md). The file name is composed from the script name, an optional asset name, and the [LogNumber](numtotalcycles.md).  
**PL\_TITLE** - print the chart title in the upper right area of the chart.  
**PL\_BENCHMARK** - plot the equity as a line, instead of a bar graph, for comparing equity curves with benchmarks.  
**PL\_DARK** - use a dark theme with a black background for the chart.  

### Type:

**int**

### Example:

```c
function run()
{
  ...
  setf(PlotMode,PL\_ALL|PL\_FINE);
  ...
}
```

### See also:

[plot](146_plot_plotBar.md), [PlotScale](204_PlotBars_PlotWidth.md), [Colors](206_Colors.md), [setf](168_setf_resf_isf.md), [resf](168_setf_resf_isf.md), [mode](018_TradeMode.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))