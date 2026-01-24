---
title: "phantom"
source: "https://zorro-project.com/manual/en/phantom.htm"
---

# phantom

## phantom (int Dir, int FastPeriod, int SlowPeriod) : int

Indicator for 'equity curve trading'. Detects from the equity curve if the market is in an unprofitable state and trading with the current asset/algo combination is not advised. Can be used to switch from live trading to phantom trading by setting the [TR\_PHANTOM](018_TradeMode.md) flag.

### Parameters:

<table border="0"><tbody><tr><td><strong>Dir</strong></td><td><strong>1</strong> for long trading, <strong>-1</strong> for short trading, <strong>0</strong> for both.</td></tr><tr><td><strong>FastPeriod</strong></td><td>Lowpass period for the short-term component equity curve.</td></tr><tr><td><strong>SlowPeriod</strong></td><td>Lowpass period for the long-term component equity curve.</td></tr></tbody></table>

### Returns

**1** when the short-term component equity is falling and below its long-term curve, otherwise **0**.

### Remarks:

*   This function creates [series](091_series.md) and thus must be called in a fixed order in the script.
*   The source code can be found in **indicators.c**.

### Example:

```c
if(phantom(0,5,50)) setf(TradeMode,TR\_PHANTOM);
else resf(TradeMode,TR\_PHANTOM);
```

### See also:

[predict](131_predict.md), [Phantom Trading](018_TradeMode.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))