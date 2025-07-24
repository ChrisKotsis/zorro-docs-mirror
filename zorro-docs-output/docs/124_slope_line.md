---
title: "slope, line"
source: "https://zorro-project.com/manual/en/slope.htm"
---

# slope, line

## slope (int Type, vars Data, int TimePeriod) : var

Connects the two highest maxima or lowest minima of the **Data** series within the given **TimePeriod**, and returns the slope of the connecting line. This function can be used to calculate traditional divergence or convergence (triangle) patterns.

### Parameters:

<table border="0"><tbody><tr><td><strong>Type</strong></td><td><strong>PEAK</strong> for a line through the maxima, <strong>VALLEY</strong> for a line through the minima.</td></tr><tr><td><strong>Data</strong></td><td>Time <a href="series.htm">series</a>.</td></tr><tr><td><strong>TimePeriod</strong></td><td>Period to be examined.</td></tr></tbody></table>

### Returns:

Slope (movement per bar, positive for a rising, negative for a falling line), or **0** if the series is flat or no minima/maxima are found.

### Modifies

**rMin, rMinIdx** - value and bar offset of the lower connecting point.  
**rMax, rMaxIdx** - value and bar offset of the higher connecting point.  
 

## line (int Offset) : var

Returns the value of a straight line at the bar with the given **Offset** (0 = current bar). The line is defined as connecting the **rMin**, **rMinIdx**, **rMax**, **rMaxIdx** coordinates which can be either set directly, or generated with **slope** or with [Min/Max/MinIndex/MaxIndex](116_Statistics_Transformations.md). 

### Parameters:

<table border="0"><tbody><tr><td><strong>Offset</strong></td><td>Bar offset</td></tr></tbody></table>

### Returns:

Value of the line at the given **Offset**.

### Remarks:

*   The **slope** function is used for the [Support](033_W4a_Indicator_implementation.md), [Resistance](033_W4a_Indicator_implementation.md), and [Divergence](033_W4a_Indicator_implementation.md) indicators.
*   Source code in **indicators.c**.

### Example:

```c
var HighsDn\[10\] = { 1,1,1,2,1,1,1,3,1,1 }; _// mind the reverse order_
var LowsUp\[10\] = { 1,1,1,0.7,1,1,1,0.5,1,1 };

function main()
{
  printf("\\nSlope dn %.3f",slope(PEAK,HighsDn,10));
  printf("\\nSlope up %.3f",slope(VALLEY,LowsUp,10));
}
```

### See also:

[crossOver](121_crossOver_crossUnder.md), [crossUnder](121_crossOver_crossUnder.md), [rising](123_rising_falling.md), [falling](123_rising_falling.md), [peak](122_peak_valley.md), [valley](122_peak_valley.md), [peakF](087_Fuzzy_Logic.md), [valleyF](087_Fuzzy_Logic.md), [predict](131_predict.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))