---
title: "shift"
source: "https://zorro-project.com/manual/en/shift.htm"
---

# shift

## shift (vars Data, var Value, int Length)

Shift the first **Length** elements of **Data** by one position, then fill **Data\[0\]** with **Value**. 

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td>Series or array to be shifted.</td></tr><tr><td><strong>Value</strong></td><td>New value for the first element.</td></tr><tr><td><strong>Length</strong></td><td>Number of elements to be shifted. If negative, the array is shifted backwards.</td></tr></tbody></table>

### Remarks

*   The functions can be used to shift static series or var arrays conditionally or in a [tick](089_tick_tock.md) or [tock](089_tick_tock.md) function. Dynamic series are otherwise automatically shifted at any time frame.

### Example:

```c
function run()
{
  ...
  vars Data10 = series(0,-10); _// create a static series_
  if(SomeCondition) shift(Data10,NewValue,10);
  ...
```

### See also:

[series](091_series.md), [diff](128_diff.md), [rev](127_rev.md), [tick](089_tick_tock.md)  
 [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))