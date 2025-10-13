---
title: "asset, assetList, ..."
source: "https://zorro-project.com/manual/en/asset.htm"
---

# asset, assetList, ...

## asset (string Name) : int

Selects an asset from the [asset list](013_Asset_Account_Lists.md), and loads its price history in the initial run from the broker or historical data. On subsequent script starts, price data is not loaded again unless [PRELOAD](018_TradeMode.md) was set or the \[Edit\] button was clicked. [Price](022_Price_History.md) and trade functions, and all asset related variables ([Spread](spread.md), [Symbol](020_Included_Scripts.md), [AssetVar](196_AlgoVar_AssetVar_AssetStr.md) etc.) are automatically switched to the new asset. Sets [AssetPrev](020_Included_Scripts.md) to the previous asset name. Must be called in the first run (**[INITRUN](is.md)**) for any asset used in the script.  

### Parameters:

<table border="0"><tbody><tr><td><strong>Name</strong></td><td>The name of the asset, as in the <a href="account.htm">asset list</a> or the [<span class="tast">Asset</span>] selector. An empty string <strong>""</strong> or a name beginning with <strong>'#'</strong> creates a dummy asset with flat price history. Up to 15 characters, uppercase, with no blanks and no special characters except for slash '/' and underline '_'.</td></tr></tbody></table>

### Returns:

**0** when the **Name** string is **NULL** or empty, or when the asset or its prices are not available; otherwise nonzero.

### Usage:

**asset("EUR/USD");** selects the EUR/USD pair.  
 

## assetAdd (string Name)

## assetAdd (string Name, string Symbol)

## assetAdd (string Name, var Price, var Spread, var RollLong, var RollShort, var PipVal, var PipCost, var MarginCost, var Leverage, var LotAmount, var Commission, string Symbol)

Selects an asset and optionally updates its parameters in the [INITRUN](173_Status_flags.md). If the asset was not yet in the [asset list](013_Asset_Account_Lists.md), it is added and also appears in the \[Asset\] scrollbox. Unlike **asset()**, the asset history is not yet loaded and the asset is not yet subscribed. For creating a dummy asset for test purposes, let **Name** begin with a **'#'** hash - this will generate artificial bars with a flat price history. Selecting an asset before loading its price history can be useful when asset specific parameters like [Centage](contracts.md) affect the subsequent history download or its [Symbol](014_Asset_Symbols.md), price source, or assigned account has to be set up by script.  

### Parameters:

<table border="0"><tbody><tr><td><strong>Name</strong></td><td>Name of the asset. A name beginning with <strong>'#'</strong> creates a dummy asset that will also appear in the scrollbox.</td></tr><tr><td><strong>Symbol</strong></td><td>Symbol of the asset, with optional source, in the format described under <a href="account.htm">asset list</a>.</td></tr><tr><td><strong>Price, ...</strong></td><td>Optional asset parameters as described under <a href="account.htm">asset list</a>. When at <strong>0</strong>, the parameter is not changed.</td></tr></tbody></table>

### Usage:

**assetAdd("AAPL",150,0.01,0,0,0.01,0.01,0,2,1,0.02,"STOOQ:AAPL.US");**  
 

## assetList (string Filename, _string Select_): int

Loads an alternative [asset list](013_Asset_Account_Lists.md), adds its assets to the \[Asset\] scrollbox, and selects an asset from the new list. Any asset used in the script must be either in that list, or added by script with **assetAdd**. The asset list must be loaded in the first run (**[INITRUN](is.md)**) of the script.before its assets can be selected. If this function is not called, the default list of the currently selected [account](013_Asset_Account_Lists.md) is used; if no such list exists, it's the **AssetsFix.csv** list with some Forex pairs and CFDs. If **Select** is omitted or **0**, a default asset - usually the first asset in the list - is selected.  

### Parameters:

<table border="0"><tbody><tr><td><strong>FileName</strong></td><td>File name of the asset list, f.i. <strong>"AssetsIB"</strong>. The <strong>.csv</strong> extension and the path can be omitted for asset lists in the <strong>History</strong> folder.</td></tr><tr><td><strong>Select</strong></td><td>Name of the asset to be selected in the scrollbox at first run, f.i. <strong>"EUR/USD"</strong>. <strong>0</strong> for selecting a default asset.</td></tr></tbody></table>

### Returns:

Number of loaded assets, or **0** when no assets were loaded. The number of assets is also available through [NumAssetsListed](195_NumAssetsListed.md).

### Usage:

**assetList("Strategy[\\\\MyNewAssets.csv",0](file://MyNewAssets.csv%22,0));**   
 

## assetSelect ()

Sets the \[Asset\] scrollbox to the current asset.  
 

## assetType (string Name) : int

Attempts to determine the type of an asset from its name. If the name begins and ends with the 3-letter abbreviation of a currency, it is identified as Forex; if it ends with a number, it is identified as an index.  

### Parameters:

<table border="0"><tbody><tr><td><strong>Name</strong></td><td>Name of the asset</td></tr></tbody></table>

### Returns:

**0** when the type can not be identified; otherwise **FOREX** (1) or **INDEX** (2).  
 

### Remarks:

*   The place of an **asset** call (if any) in the script matters. All variables and flags that affect the creation of bars, such as **[BarPeriod](177_BarPeriod_TimeFrame.md)**, [BarZone](assetzone.md), [LookBack](181_LookBack_UnstablePeriod.md), [Detrend](197_Detrend_shuffling.md), **[StartDate](100_tradeUpdate.md)**, **[EndDate](100_tradeUpdate.md)**, [TICKS](018_TradeMode.md), [BarMode](200_BarMode.md), [UpdateDays](100_tradeUpdate.md), [AssetList](020_Included_Scripts.md), [History](020_Included_Scripts.md) etc. must be set before calling **asset()**. Otherwise the simulation period is unknown at asset loading and either a default period is used, or the script will produce an [Error 030](errors.md) message. All parameters specific to an asset, such as [Spread](191_Spread_Commission.md), [Commission](191_Spread_Commission.md), etc., as well as all functions that use asset parameters or prices, such as [price()](022_Price_History.md), [optimize()](107_optimize.md), [advise()](advisor.md), etc. must be used after calling **asset()**.
*   Calling **asset** by script is not the same as selecting the asset with the Asset scroll box. If the script contains no **asset** call, the scroll box asset is selected \_after\_ the [INITRUN](013_Asset_Account_Lists.md), and its name is appended to the [training](007_Training.md) files for being able to train different assets separately. Call **asset(Asset)** for loading the asset selected by the Scrollbox already in the [INITRUN](013_Asset_Account_Lists.md).
*   In multi-asset scripts the order of asset() calls matters. Bars are created from the historical ticks of the first asset. Gaps in the price history of the first asset are therefore reflected in the price data of all further assets. When [BR\_FLAT](200_BarMode.md) is not set, price histories have normally gaps during weekends, holidays, or outside market hours. Therefore select first the asset with the most complete price history (for instance, a currency pair that is traded 24 hours). When a subsequent asset has a gap where the first asset has none, the gap is filled from the price data of previous bar. This produces a different price curve and can cause indicators to behave differently in multi-asset portfolios, dependent on asset order. Otherwise use [BR\_FLAT](200_BarMode.md) or don't combine assets with different market hours.
*   Every **asset** call switches the [asset parameters](191_Spread_Commission.md), [asset variables](196_AlgoVar_AssetVar_AssetStr.md), [trade statistics](winloss.md) and [OptimalF](016_OptimalF_money_management.md) factors to the values of the selected asset. At begin of the simulation, [asset parameters](191_Spread_Commission.md) are loaded from the [asset list](013_Asset_Account_Lists.md). If the asset is not found in the list, an error message will be displayed and defaults are substituted for the asset parameters.
*   If an **asset** call fails, the failed asset is not selected and **0** is returned. Check the return value to make sure that only valid and available assets are traded.
*   Any asset can have up to 3 different broker symbols and 3 different sources for trading, for retrieving live prices, and for downloading historical prices. The symbols can be given in the **Symbol** field in the [asset list](013_Asset_Account_Lists.md), or by script in the [SymbolTrade](020_Included_Scripts.md), [SymbolLive](020_Included_Scripts.md), [SymbolHist](020_Included_Scripts.md) parameters. The current asset name is stored in the **[Asset](020_Included_Scripts.md)** string.
*   The [Assets](020_Included_Scripts.md) array contains the names of all available assets. For selecting all assets of the [asset list](013_Asset_Account_Lists.md) in a [loop](109_loop.md), use **while(asset(loop(Assets)))**. For enumerating assets without **loop** call, use [for(used\_assets)](fortrades.md) or [for(listed\_assets)](fortrades.md).
*   The trading time zone of an asset can be set up with [AssetMarketZone](assetzone.md) and [AssetFrameZone](assetzone.md). Trading can be restricted to market times with the [BR\_LEISURE](200_BarMode.md) flag.
*   Artificial assets can be created by combining the prices from a 'basket' of several real assets (see example)[](246_Tips_Tricks.md).
*   When the asset name is an empty string or begins with a hash - like **asset("")** or **asset("#USD")** - a dummy asset is created with default parameters and flat price history (usually with all prices at 50). This is useful when a real asset is not needed, like for testing filters or indicators with artificial price curves. The price history can be modified with [priceSet](022_Price_History.md) or [priceQuote](022_Price_History.md). For viewing the price curve of a dummy asset, use **assetAdd()** for adding it to the scrollbox.
*   When loading price data, the prices are checked for plausibility dependent on the [Outlier](outlier.md) parameter. Invalid prices, such as extreme outliers, are automatically corrected or removed. Setting **[Detrend](197_Detrend_shuffling.md) = NOPRICE;** before calling **asset()** prevents that asset and price data is checked and outliers are removed.
*   If only a single asset is selected in the script, the \[Asset\] scrollbox is automatically set to that asset. If multiple assets are selected, the \[Asset\] scrollbox is unchanged and determines the price in the \[Status\] window and the price curve in the resulting chart.
*   For adding new assets to the available asset set, see the description under [Asset List](account.htm#step).
*   Assets must be subscribed before their prices are available. The **asset** function subscribes the asset automatically, but some brokers have a limit to the number of subscribed assets. Some platforms, for instance [MT4](mt4plugin.md), need a long time after subscribing an asset before prices are available.
*   Any asset allocates computer memory (see also [memory](memory.md)). This is normally uncritical in training or live trading, which is restricted to single assets and short lookback periods. But it can become critical in high resolution backtests with large portfolios. The memory requirement per asset in bytes can be estimated with the formula **Years / BarPeriod \* 15 MB**, where **Years** is the number of backtest years (use **1** for live trading). The [LEAN](018_TradeMode.md) and [LEANER](018_TradeMode.md) flags reduce the memory requirement by about 50%, the **TICKS** flag increases it by 32 bytes per historical price quote. [plot](146_plot_plotBar.md) commands allocate 8..24 bytes per bar and asset. When the total memory requirement for backtesting large time periods exceeds ~3 GB, use **Zorro64** with a [C++ script](dlls.md) for the backtest. Alternatively, split the portfolio in separate smaller sub-portfolios, or split the time period in separate shorter tests. 

### Examples:

```c
_// trade multiple strategies and assets in a single script_
function run()
{
  BarPeriod = 240;
  StartDate = 2010;
  set(TICKS); _// set relevant variables and flags before calling asset()_
  
_// call different strategy functions with different assets_
  asset("EUR/USD");
  tradeLowpass();
  tradeFisher();
  
  asset("GBP/USD");
  tradeAverage();
  
  asset("SPX500");
  tradeBollinger();  
}
```
```c
_// set all asset symbols to a new source_
if(Init) {
  assetList("MyAssetList.csv");
  for(listed\_assets)
    assetAdd(Asset,strf("MyNewSource:%s",SymbolLive));
}
```
```c
_// Basket trading - generate a snythetic asset "USD" 
// combined from the USD value of EUR, GBP, and AUD_
var priceUSD()
{
  var p = 0;
  asset("GBP/USD"); p += price();
  asset("AUD/USD"); p += price();
  asset("EUR/USD"); p += price();
  return p;
}

_// basket trade function with stop limit_
int tradeUSD(var StopUSD)
{
  if((TradeIsLong && priceUSD() <= StopUSD) 
    or (TradeIsShort && priceUSD() >= StopUSD)) 
      return 1; _  // exit the trade_
  else return 0;  _// continue the trade_
}

_// open a trade with the synthetic asset and a stop loss_  
void enterLongUSD(var StopDistUSD)
{
  var StopUSD = priceUSD()-StopDistUSD;
  asset("GBP/USD"); enterLong(tradeUSD,StopUSD);
  asset("AUD/USD"); enterLong(tradeUSD,StopUSD);
  asset("EUR/USD"); enterLong(tradeUSD,StopUSD);
}

void enterShortUSD(var StopDistUSD)
{
  var StopUSD = priceUSD()+StopDistUSD;
  asset("GBP/USD"); enterShort(tradeUSD,StopUSD);
  asset("AUD/USD"); enterShort(tradeUSD,StopUSD);
  asset("EUR/USD"); enterShort(tradeUSD,StopUSD);
}
 
_// plot a price curve of the synthetic asset
// (the plot command is linked to the last used asset -
// so "EUR/USD" must be selected in the scrollbox)_
function run() 
{
  set(PLOTNOW);
  plot("USD",priceUSD(),0,RED);
}
```

### See also:

[enterLong/](buylong.md)[Short](buylong.md), [loop](109_loop.md), [algo](095_algo.md), [Asset](020_Included_Scripts.md), [AssetZone](assetzone.md), [AssetVar](196_AlgoVar_AssetVar_AssetStr.md), [Detrend](197_Detrend_shuffling.md), [assetHistory](loadhistory.md), [price](022_Price_History.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))