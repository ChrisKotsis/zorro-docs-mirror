---
title: "BarMode"
source: "https://zorro-project.com/manual/en/barmode.htm"
---

# BarMode

## BarMode

Determines bar creation and trading behavior when the market is inactive, as on weekends, outside market hours, and on business holidays. By default, any bar contains at least one valid price quote. When no price quotes arrive due to market inactivity, or when it's weekend or a holiday, no bars are created. This behavior can be changed with the following **BarMode** flags. Use **|** or **+** for combining flags and [setf](168_setf_resf_isf.md) and [resf](168_setf_resf_isf.md) for setting and resetting single flags.

### Flags:

<table><tbody><tr><td><strong>BR_FLAT</strong></td><td>Generate bars even when they contain no price quote. These bars get flat candles with the close price of the last quote. For special purposes only; price and indicators series should normally skip flat periods. This flag affects bar creation and must be set before the first <a href="asset.htm">asset</a> call.</td></tr><tr><td><strong>BR_WEEKEND</strong></td><td>Don't generate bars that end on holidays or at or after <strong><a href="date.htm">EndWeek</a></strong> and before <strong><a href="date.htm">StartWeek</a></strong> in the bar time zone (<a href="assetzone.htm">BarZone</a>), even when they contain price quotes. This flag is set by default. It is for intraday bars, but also affects EOD bars. It affects bar creation and must be set or reset before the first <a href="asset.htm">asset</a> call.</td></tr><tr><td><strong>BR_MARKET</strong></td><td>Don't generate bars that end at or after <a href="date.htm">EndMarket</a> and before <a href="date.htm">StartMarket</a> in the bar time zone (<a href="assetzone.htm">BarZone</a>), even when they contain price quotes. This flag is for intraday bars only. It affects bar creation and must be set before the first <a href="asset.htm">asset</a> call.</td></tr><tr><td><strong>BR_NOSHIFT</strong></td><td>Don't shift data <a href="series.htm">series</a> on intraday bars that end at or after <a href="date.htm">EndMarket</a> and before <a href="date.htm">StartMarket</a> in the bar time zone (<a href="assetzone.htm">BarZone</a>). This prevents series-based indicators from updating or generating trade signals outside market hours. Start and end time and zone can be individually set up in the <a href="account.htm">asset list</a>.</td></tr><tr><td><strong>BR_LOCAL</strong></td><td>Automatically set <a href="date.htm">Start/EndMarket</a> on any <a href="asset.htm">asset</a> call to the local asset market hours (<a href="date.htm">AssetMarketStart/End</a>), converted from <a href="assetzone.htm">AssetMarketZone</a> to <a href="assetzone.htm">BarZone</a>.&nbsp;</td></tr><tr><td><strong>BR_LEISURE</strong></td><td>Don't enter or manage trades at or after <a href="date.htm">EndMarket</a> and before <a href="date.htm">StartMarket</a>, on holidays, and on weekends by <strong><a href="date.htm">EndWeek</a></strong>/<strong><a href="date.htm">StartWeek</a> </strong>in the bar time zone (<a href="assetzone.htm">BarZone</a>).</td></tr><tr><td><strong>BR_SLEEP</strong></td><td>Don't request or process price quotes when the market is closed due to <strong>BR_WEEKEND</strong> and <strong>BR_MARKET</strong>. Since no prices are updated, <a href="tick.htm">tick</a> functions will not run and price-dependent events will not to be triggered during that time. Use this for special purposes only.</td></tr><tr><td><strong>BR_LOGOFF</strong></td><td>Log off on weekends or when the market is closed. <strong>BR_SLEEP</strong> and <strong>BR_WEEKEND</strong> must be set. Broker API <a href="brokercommand.htm">settings</a>, such as order texts or price or volume types, are usually reset when logging off. Use this for special purposes only, such as working around server maintenance or API unresponsiveness on weekends. Some broker APIs do not support logging off during a trading session; in that case <strong>BR_LOGOFF</strong> will suspend the session until it is manually restarted.</td></tr></tbody></table>

  

### Type:

**int**

### Remarks:

*   When **BR\_FLAT** is not set, the historical time stamps of the first [asset](013_Asset_Account_Lists.md) in a portfolio strategy determine the bar creation. The order of assets does not matter for bar creation when **BR\_FLAT** is set.
*   When **BR\_MARKET** is set, make sure that the timestamp of at least one bar per day falls within market hours - otherwise the day will have no valid bar (see [Error 014](errors.md)).
*   When **BR\_LEISURE** is set, but the system is supposed to trade around the clock on working days, set **StartMarket = EndMarket = 0;**.
*   When no bars are generated due to weekends, holidays, or market closure, the \[Status\] window displays "Closed".
*   For trading assets even at weekends, such as cryptocurrencies, reset **BR\_WEEKEND** before sampling bars.
*   When **BR\_MARKET** or **BR\_WEEKEND** are used, make sure that weekend and market hours are also set up correctly in UTC or in the **BarZone**. When multiple assets have different market hours, set them up before selecting the asset.
*   For not updating prices after or before a certain time, use a [tick](089_tick_tock.md) function and the [NOPRICE](018_TradeMode.md) flag.

### Example:

```c
function run()
{
  ...
  StartWeek = 10400; _// start Monday 4 am_
  EndWeek = 51900; _// end Friday 7 pm_
  BarMode = BR\_WEEKEND+BR\_SLEEP; _// don't process quotes during the weekend and don't generate bars
_  ...
}
```

### See also:

[Bars](005_Bars_and_Candles.md), [BarPeriod](177_BarPeriod_TimeFrame.md), [NumBars](180_Bar_NumBars.md), [BarZone](assetzone.md), [MinutesPerDay](181_LookBack_UnstablePeriod.md), [AssetZone](assetzone.md), **[StartWeek/EndWeek](100_tradeUpdate.md), [Holidays](100_tradeUpdate.md)**

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))