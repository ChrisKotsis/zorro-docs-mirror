---
title: "phantom"
source: "https://zorro-project.com/manual/en/phantom.htm"
---

# phantom

## phantom (int Dir, int FastPeriod, int SlowPeriod) : int

Indicator for 'equity curve trading'. Detects from the equity curve if the market has changed and trading with the current asset/algo combination is not advised. Can be used to switch from live trading to phantom trading by setting the [TR\_PHANTOM](018_TradeMode.md) flag.

### Parameters:

<table border="0"><tbody><tr><td><strong>Dir</strong></td><td><strong>1</strong> for long trading, <strong>-1</strong> for short trading, <strong>0</strong> for both.</td></tr><tr><td><strong>TimeFrame</strong></td><td>The number of bars in the series to be compared, or <strong>0</strong> for using the length of the pattern. Determines the horizontal size of the pattern.</td></tr><tr><td><strong>Scale</strong></td><td>The vertical size of the pattern (f.i. <strong>10*PIP</strong> for detecting a 10 pips tall pattern)<strong></strong>. Use a negative scale for inverting the pattern.</td></tr><tr><td><strong>Pattern</strong></td><td>The pattern shape to be detected in the series, given by an array of positive values that starts with the oldest value and ends with <strong>0</strong> as an end mark.</td></tr></tbody></table>

### Returns

Similarity between **Data** and **Pattern** in percent, normally in the **20..80** range.

### Remarks:

*   This function creates [series](091_series.md) and thus must be called in a fixed order in the script.
*   The source code can be found in **indicators.c**.

### Example:

```c
_//detect 10-pip 10-bar cup formations in the price curve_
function run()
{
  vars Price = series(price());
  static var cup\[10\] = { 6,3,2,1,1,1,2,3,6,0 };
  plot("Cup Similarity",frechet(Price, 0, 10\*PIP, cup),NEW,RED);
}
```

### See also:

[predict](131_predict.md), [Phantom Trading](018_TradeMode.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))