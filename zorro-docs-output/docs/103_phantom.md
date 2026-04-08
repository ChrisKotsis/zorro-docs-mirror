---
title: "phantom"
source: "https://zorro-project.com/manual/en/phantom.htm"
---

# phantom

## phantom (int Dir, int FastPeriod, int SlowPeriod) : int

Function for 'equity curve trading'. Detects from the equity curve if the market is in an unprofitable state and trading with the current asset/algo combination is not advised. Phantom trading is automatically activated for the current algo/asset component when its short-term filtered equity curve is below its long-term equity curve, and both are falling.

### Parameters:

<table border="0"><tbody><tr><td><strong>Dir</strong></td><td><strong>1</strong> for long trades, <strong>-1</strong> for short trades, <strong>0</strong> for both.</td></tr><tr><td><strong>FastPeriod</strong></td><td>Lowpass period for filtering the equity curve.</td></tr><tr><td><strong>SlowPeriod</strong></td><td>Lowpass period for further filtering the fast-term filtered equity curve.</td></tr></tbody></table>

### Returns

**3** when phantom trading is active for the current component, **2** when it was just activated, **1** when it was just deativated, otherwise **0**.

### Remarks:

*   This function creates [series](091_series.md) and thus must be called in a fixed order in the script.
*   Pending trades are not affected. They can be switched to phantom mode in a loop that sets their TR\_PHANTOM flag.
*   The source code can be found in **indicators.c**.

### Example:

```c
switch(phantom(0,5,10)) { _// short and long phantom trading
_  case 2: printf("#\\n%s %s phantom trading activated",Asset,Algo);
  case 1: printf("#\\n%s %s phantom trading deactivated",Asset,Algo);
}
```

### See also:

[predict](131_predict.md), [Phantom Trading](018_TradeMode.md), [TR\_PHANTOM](018_TradeMode.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))