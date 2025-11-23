---
title: "System strings"
source: "https://zorro-project.com/manual/en/script.htm"
---

# System strings

# Predefined and user-supplied strings

 

## RootName

Name root for the exported parameters, rules, and factors (default = script name). Can be changed for sharing training data with other scripts. If [LogNumber](numtotalcycles.md) is nonzero, the logs are also saved under the **DataName**. The name must not contain spaces or special characters. 

## Algo

The current algorithm identifier (read/only), set up by the [algo](095_algo.md) function or a [TMF](018_TradeMode.md). Algo identifiers should be short and must not contain spaces or special characters.

## Asset

The current asset name (read/only), set up initially by the \[Asset\] scrollbox. Is automatically changed at runtime with the [asset](013_Asset_Account_Lists.md) function, a [tick](089_tick_tock.md) function, a [TMF](018_TradeMode.md) or a [trade loop](fortrades.md). 

## AssetPrev

The name of the previously selected asset; in a [trade loop](fortrades.md) the name of the asset that was selected before the loop.

## AssetBox

The name of the currently visible asset in the \[Asset\] scrollbox (read/only).

## Assets

NULL-terminated **string** array, automatically populated with the names of all available assets in the [asset list](013_Asset_Account_Lists.md) (read/only). Can be used either as a [**loop**](109_loop.md) parameter, or used for enumerating assets, f.i. **for(N = 0; Assets\[N\]; N++)**. The asset names are valid after the first [asset](013_Asset_Account_Lists.md) or [assetList](013_Asset_Account_Lists.md) call. The number of assets in the list is returned by [assetList](013_Asset_Account_Lists.md).

## Algos

User-supplied NULL-terminated **string** array, containing algo names to be used as a [**loop**](109_loop.md) parameter.

## Account

The name selected with the \[Account\] scrollbox, f.i **"Demo**" or **"FXCM"**.

## Factors

Name suffix and extension of the file containing the [OptimalF](016_OptimalF_money_management.md) factors; can be set for selecting between different sets of factors. If not set up otherwise, the file begins with the script name and ends with **".fac"**, f.i. **"Z12.fac"**. Set **Factors** f.i. to **"oos.fac"** for reading the factors from the file **"Z12oos.fac"**.  

## History

User-supplied string with path, name suffix, and extension of the historical data files, for selecting between different sets and types (**.t1**, **.t2**, **.t6**, **.t8**) of price histories. If not set, **.t6** and the [HistoryFolder](007_Training.md) path is assumed. A **'\*'** character at the begin of the string represents the asset name with optional year number, **'?'** represents the asset name with no year number, and **'#'** represents the appended year number. **History** must be set before the first [asset()](013_Asset_Account_Lists.md) or [assetHistory()](loadhistory.md) call, but can be set differently for different assets. Examples (for AAPL 2015):**  
History = "\*eod.t6";** reads price history from **AAPL\_2015eod.t6**; if not found, uses **AAPLeod.t6**.  
**History = "\*adj#.t6";** reads price history from **AAPLadj\_2015.t6**; if not found, uses **AAPLadj.t6.  
History = "?.t6";** reads price history from **AAPL.t6**.  
**History = "History\\\\Temp[\\\\\*.t1](file://*.t1)";** reads tick data history from **History\\Temp\\AAPL\_2015.t1**.  
**History = "D:\\\\Data\\\\Options[\\\\\*.t8](file://*.t8)";** reads underlying price history from option chains in **D:\\Data\\Options\\AAPL.t8**.

## Curves

User-supplied string with path, name, and extension of the file containing the exported equity or balance curves of all [optimize](107_optimize.md) parameter variants in \[Train\] mode (see [export](export.htm#balance)). Also used for storing the daily equity curve in \[Test\] mode. The [LOGFILE](018_TradeMode.md) flag must be set for exporting curves. If the file already exists, the curves are appended to the end. If **Curves** is not set, no curves are exported in \[Train\] mode, and in \[Test\] mode the equity/balance curve is exported to a **\*.dbl** file in the **Log** folder.

## SymbolTrade

The trading [symbol](014_Asset_Symbols.md) of the current asset as set up in the asset list, or the plain asset name when the asset has no assigned trading symbol. Does not contain the optional broker or price source name. Can be modified with [strcpy](str_.md) (see example).

## SourceTrade

The trading [account](013_Asset_Account_Lists.md) name assigned to the current asset as set up in its [symbol](014_Asset_Symbols.md), or an empty strig for the currently selected account. This account is used for sending orders and [broker commands](113_brokerCommand.md). Can be modified with [strcpy](str_.md).

## SymbolLive

## SourceLive

## SymbolHist

## SourceHist

The symbols and account names assigned to the current asset for live and historical prices. Can be modified with [strcpy](str_.md).

## ZorroFolder

The folder in which Zorro was installed, with trailing backslash, f.i. **"C:\\Program Files\\Zorro\\"** (read/only). This is not necessarily the root folder of the data files - see the remarks about [UAC](started.htm#uac).

## LogFolder

The folder for the log files and reports; if not set, they are stored in the **Log** folder.

## WebFolder

The folder for the HTML page that displays the trade status. If not set up otherwise, the HTML documents are generated in the **Log** folder. Can be set up in the [Zorro.ini](007_Training.md) file.

### Type:

**string**  
 

### Remarks:

*   Make sure not to assign temporary strings to the above string constants. Temporary strings will lose their content after the next command. For making them permanent, copy them to a static **char** array of sufficient size.
*   Make very sure not to assign new content to read/only strings. This will not only not work, it can even cause subsequent errors when system strings are overwritten.
*   More strings, performance data and trade lists, broker/account info, and file contents are available through the [report](012_Performance_Report.md) function.

### Examples:

```c
Script = "MyScriptV2"; _// store and load parameters under "MyScriptV2.par"_
History = "\*s1.t6";   _ // read historical data from f.i. "EURUSD\_2013s1.t6"_
History = "?.t6";   _ // enforce historical data with no year number, f.i. "EURUSD.t6"_
WebFolder = "C:\\\\inetpub\\\\vhosts\\\\httpdocs\\\\trading";  _// VPS web folder_
assetAdd(Asset,strf("%s:%s",NewSource,SymbolLive)); _// change source of current asset_
```
```c
_// change a future's symbol quarterly expiration date_
void updateSymbol()
{
  string ExpDate = strstr(SymbolTrade,"FUT-");
  if(!ExpDate) return; _// no future 
_  int OldExpiry = atoi(ExpDate+4);
  int Month = month(wdate(NOW)); 
  Month = ((Month+2)/3)\*3; _// next quarter: 3, 6, 9, 12
_  int NewExpiry = ymd(nthDay(year(NOW),Month,FRIDAY,3));
  if(OldExpiry == NewExpiry) return;
  memcpy(ExpDate+4,sftoa(NewExpiry,8),8);
  strcpy(SymbolLive,SymbolTrade);
  strcpy(SymbolHist,SymbolTrade);
  printf("#\\n%s new contract",SymbolLive);
}
```

### See also:

[algo](095_algo.md), [asset](013_Asset_Account_Lists.md), [report](012_Performance_Report.md), [LogNumber](numtotalcycles.md), [included scripts](020_Included_Scripts.md)