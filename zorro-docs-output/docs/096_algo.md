---
title: "algo"
source: "https://zorro-project.com/manual/en/algo.htm"
---

# algo

## algo (string name): int

Sets the algorithm identifier for identifying trades. Using algorithm identifiers is recommended in portfolio strategies that contain different trade algorithms; they are used to create separate [strategy parameters](107_optimize.md), [rules](advisor.md), and [capital allocation factors](016_OptimalF_money_management.md) per algorithm.

### Parameters:

<table border="0"><tbody><tr><td><strong>name</strong></td><td>The algorithm identifier (max. 15 characters, no spaces). If <strong>name</strong> ends with <strong>":L"</strong>, the algo is for long trades only; if it ends with <strong>":S"</strong> the algo is for short trades only.</td></tr></tbody></table>

### Returns:

**0** when the **name** string is **NULL** or empty, otherwise nonzero.

### Usage:

**algo("TREND:L");** sets up the identifier **"TREND:L"** for the current algorithm for long trades. Short trades are suppressed.

### Remarks:

*   The [assetList](013_Asset_Account_Lists.md) (if any) and an [asset](013_Asset_Account_Lists.md) must be selected before calling **algo()**.
*   For getting separate factors, parameters, or rules for long and short trades, call the same algorithm with two algo identifiers that end with **":L"** and **":S"**, like the trade names in the message window and parameter files. Long trades are then automatically suppressed on **":S"** algos and short trades on **":L"** algos, but reverse positions are still closed depending on [Hedge](019_Hedge_modes.md). Don't use **":L"** or **":S"** for symmetric strategies with the same factors, parameters, or rules for long and short trades, or for strategies that trade only long or only short.
*   The algorithm identifier is stored in the **[Algo](020_Included_Scripts.md)** string variable, and can be evaluated in strategies with the [strstr](str_.md) function.
*   Every **algo** call switches the [trade statistics parameters](winloss.md) and the [OptimalF](016_OptimalF_money_management.md) factors to the current statistics and factors of the selected algorithm identifier.
*   Any algo/asset combination is a **component** in a portfolio strategy. The [performance report](012_Performance_Report.md) lists strategy results separated by components. The **Component** variable is the number of the current component, starting with **0**, and can be used as an array index.
*   Algorithm specific data can be stored in the [AlgoVar](196_AlgoVar_AssetVar_AssetStr.md) variables.
*   For [training](107_optimize.md) algo dependent parameters separately, switch algos in a [loop](109_loop.md).

### Example:

```c
algo("TREND:L"); _// algorithm identifier for a trend trading algorithm with long trades_
...
if(short\_condition) 
  enterShort(ifelse(strstr(Algo,":L"),0,Lots)); _// suppress short trades when Algo ends with ":L"_
```

### See also:

[enterLong](buylong.md), [enterShort](buylong.md), [loop](109_loop.md), [string](aarray.md), [asset](013_Asset_Account_Lists.md), [Algo](020_Included_Scripts.md), [AlgoVar](196_AlgoVar_AssetVar_AssetStr.md), [TradeAlgo](018_TradeMode.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))