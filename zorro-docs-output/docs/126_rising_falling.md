---
title: "rising, falling"
source: "https://zorro-project.com/manual/en/rising.htm"
---

# rising, falling

## rising (vars Data) : bool

## falling (vars Data) : bool

Determines if a series rises or falls, i.e. if **Data\[0\]** is above or below **Data\[1\]**.

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td>Data series.</td></tr></tbody></table>

### Returns:

**true** if the series rises or falls, **false** otherwise.

### Modifies

**rMomentum** - **Data** movement in percent per time frame; indicates the 'speed' of the rising or falling.

### Remarks:

*   The **data** series must have a minimum length of **2**.
*   For a fuzzy logic version, use [risingF](087_Fuzzy_Logic.md)/[fallingF](087_Fuzzy_Logic.md).
*   For a single value, use the [changed](162_ifelse_valuewhen.md) function.
*   For checking if the series was rising **n** bars before, use **rising(Data+n)**.
*   For checking the amount of rising or falling over a given time period, use the [slope](124_slope_line.md) function.

### Example:

```c
function run()
{
  ...
  vars Price = series(price());
  if(rising(Price)) 
    enterLong();
  else
    exitLong();
}
```

### See also:

[crossOver](121_crossOver_crossUnder.md)/[Under](121_crossOver_crossUnder.md), [peak](122_peak_valley.md)/[valley](122_peak_valley.md), [risingF](087_Fuzzy_Logic.md)/[fallingF](087_Fuzzy_Logic.md), [slope](124_slope_line.md), [changed](162_ifelse_valuewhen.md), [series](091_series.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))