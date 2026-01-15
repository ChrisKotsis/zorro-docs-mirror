---
title: "for(open_trades), ..."
source: "https://zorro-project.com/manual/en/fortrades.htm"
---

# for(open_trades), ...

# Enumeration loops

## for(current\_trades) { ... }

A [for](012_Performance_Report.md) loop that cycles through all open and pending trades with the current [asset](013_Asset_Account_Lists.md) and [algo](095_algo.md), starting with the earliest trade; useful f.i. for closing trades in a FIFO compliant way.

## for(last\_trades) { ... }

A [for](012_Performance_Report.md) loop that cycles backwards through the internal list of open, pending, closed, and cancelled trades with the current [asset](013_Asset_Account_Lists.md) and [algo](095_algo.md), starting with the last trade.

## for(open\_trades) { ... }

A [for](012_Performance_Report.md) loop that cycles through all open and pending trades of all assets and algos, starting with the earliest trade.

## for(closed\_trades) { ... }

A [for](012_Performance_Report.md) loop that cycles backwards through all closed trades of all assets and algos, starting with the latest trade.

## for(all\_trades) { ... }

A [for](012_Performance_Report.md) loop that cycles through the internal list of all trades; useful for a detailed trade statistic after the simulation.

## for(past\_trades) { ... }

A [for](012_Performance_Report.md) loop that cycles backwards through the internal list of all trades, starting with the latest trade; useful for equity curve trading.

## for(listed\_assets) { ... }

A [for](012_Performance_Report.md) loop that cycles through all assets from the [asset list](013_Asset_Account_Lists.md), in the same order as in the list, and selects one after the other without loading itss history.

## for(used\_assets) { ... }

A [for](012_Performance_Report.md) loop that cycles through all assets used in the script in alphabetical order, and selects one after the other.

## for(all\_algos) { ... }

A [for](012_Performance_Report.md) loop that cycles through all asset/algo combinations used in the script, and selects one component after the other, 

## break\_trades

## break\_assets

## break\_algos

Special [break](acrt-break.md) macros for aborting a trade, asset, or algo enumeration loop. Use **return\_trades** for returning from inside a trade loop. All macros are defined in **variables.h**.

### Type:

**Macro**

### Remarks:

*   The above enumeration loops are [macros](060_define_undef.md) defined in **include\\variables.h**. Unlike a normal [for](012_Performance_Report.md) loop, enumeration loops cannot be nested, and they must not be aborted by **break** or **return** statements. The **break\_trades**, **break\_assets**, **break\_algos** macros can be used to abort these loops. The asset list can alternatively be enumerated, with no restrictions, with a normal loop like this: **for(i=0; Assets\[i\]; i++) { asset(Assets\[i\]); ... }** ).
*   The predefined **Itor** variable starts at **0** and is incremented at any loop. It can be used for counting cycles or indexing arrays.
*   The asset that was selected at loop begin is stored in [AssetPrev](020_Included_Scripts.md) and automatically re-selected after the end of the loop.
*   Trades are sorted in the order of entering, either forwards or backwards dependent on loop type.
*   The code inside a **for(...trades)** loop sets the [ThisTrade](018_TradeMode.md) pointer to the loop trade and has access to all its [trade variables](018_TradeMode.md). When called inside a [TMF](018_TradeMode.md), all [trade variables](018_TradeMode.md) inside the enumeration loop refer to the current loop trade, while outside the loop they refer to the trade of the TMF. All asset specific variables in the trade loop - [Asset](020_Included_Scripts.md), [Spread](191_Spread_Commission.md), etc. - are set to the trade asset. Algo specific variables (f.i. [AlgoVar](algovar.md)) and component specific variables (f.i. [trade statistics](winloss.md)) are not set up in the loop; if this is desired, call [algo(TradeAlgo)](095_algo.md) inside a trade loop.
*   Asset loops select the asset name and parameters, but don't initialize the asset or load its history. Call [asset(**Asset**)](013_Asset_Account_Lists.md) and/or [algo(...)](095_algo.md) for evaluating component specific [trade statistics](winloss.md) in the loop.
*   Use an **if(TradeIsPending)**, **if(TradeIsOpen)**, or **if(TradeIsClosed)** condition, or a combination of them, to filter out the desired trades in a trade enumeration loop. When [virtual hedging](019_Hedge_modes.md) is used, **open\_trades** includes phantom as well as pool trades. Make sure to distinguish them with **if([TradeIsPool](trade.md))**. You don't want to modify pool trades.
*   Enumeration loops must normally not modify themselves. For instance, a loop over all open trades must not change the number of open trades. As an exception, a new trade can be opened inside a trade enumeration loop. But since this will add a new cycle to that loop, be careful not to create an endless loop this way. It is also allowed to close the current trade in the loop by **[exitTrade](selllong.md)(ThisTrade)**.

### Example:

```c
_// find all pending trades with the current asset and all algos_
int numPending(bool isShort)
{
  int num = 0;
  for(open\_trades)
    if(0 == strcmp(Asset,AssetPrev) 
      && TradeIsPending && TradeIsShort == isShort)
        num++;
  return num;
}
 
_// sum up the profit/loss of all open trades with the current asset_
var val = 0;
for(open\_trades)
  if(0 == strcmp(Asset,AssetPrev) && TradeIsOpen && !TradeIsPhantom)
    val += TradeProfit;

_// increase the stop of all winning trades slowly over time_
for(open\_trades) {  
  if(TradeIsOpen && TradeProfit > 0 && !TradeIsPool)  
    TradeStopLimit -= 0.02 \* TradeStopDiff;  
}  

_// lock 80% profit of all winning trades_
for(open\_trades) {
  if(TradeIsOpen && !TradeIsPool && TradeProfit > 0) {
    TradeTrailLock = 0.80;
    if(TradeIsShort)
      TradeTrailLimit = max(TradeTrailLimit,TradePriceClose);
    else
      TradeTrailLimit = min(TradeTrailLimit,TradePriceClose);
  }
}

_// sum up open profits of all assets and the current algo_
var ProfitSum = 0;
for(used\_assets) {
  asset(Asset); _// select the current component
_  ProfitSum += ProfitOpen;
}
```

### See also:

[bar](005_Bars_and_Candles.md), [enterLong](buylong.md)/[Short](buylong.md), [trade variables](018_TradeMode.md), [results](104_results.md), [loop](109_loop.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))