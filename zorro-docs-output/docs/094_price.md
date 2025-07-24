---
title: "price, ..."
source: "https://zorro-project.com/manual/en/price.htm"
---

# price, ...

# Price and Volume functions

## price(int offset) : var

Returns the **TWAP** (time-weighted average price) of the selected asset. TWAP is the mean of all price ticks of the bar or time frame with the given **offset**. For indicators the mean price is normally preferable to the close price, since it is less susceptible to random fluctuations and makes systems more robust and less dependent on the data feed.

## priceO(int offset) : var

## priceC(int offset) : var

## priceH(int offset) : var

## priceL(int offset) : var

Returns the open, close, maximum and minimum price of the current asset and the bar or time frame with the given **offset**. **priceC(0)** returns the current price.

## priceReal() : var

Returns the current real price when OHLC prices have been artificially calculated by [special bars](005_Bars_and_Candles.md). The [TICKS](018_TradeMode.md) flag must be set.  

## marketVal(int offset) : var

## marketVol(int offset) : var

Returns additional market data, such as spread, quote size, trade volume, accumulated volume, tick rate, or quote frequency - see remarks and examples below. The type of data returned depends in live trading on the [Broker API](brokerplugin.md), and in backtesting on the **fVal** and **fVol** fields in **.t6** historical data, or on the ask-bid difference and volume field in **.t1** or **.t2** data. Normally **marketVal** returns the average historical spread of the last bar period, and **marketVol** returns the average historical trade volume of the last bar period. For the total historical volume of a bar, multiply **marketVol()** with **BarPeriod** divided by the historical data resolution in minutes. The **market** functions require [Zorro S](restrictions.md) and no [LEAN](018_TradeMode.md) flag.  

### Parameters:

<table border="0"><tbody><tr><td><strong>offset</strong></td><td>Bar or time frame number for which the prices are returned, relative to the current bar or time frame. <strong>0</strong> for the the current bar or time frame. Negative offsets return prices of future bars or time frames when the <a href="mode.htm">PEEK</a> flag is set; otherwise they give an error message.</td></tr></tbody></table>

### Returns:

Price or raw market data.  
 

## seriesO(): vars

## seriesH(): vars

## seriesL(): vars

## seriesC(): vars

Returns pointers to a temporary open, high, low, and close price [series](091_series.md) of the current asset. Can be used as a price series parameter to any function or indicator, or for referencing a price **N** bars ago (example: **var PreviousClose = (seriesC())\[1\];** - mind the parentheses). Unlike real series, they don't consume memory and can be conditionally called. Temporary series do not support [TimeFrame](177_BarPeriod_TimeFrame.md) and [special bars](005_Bars_and_Candles.md), and keep their content only until the next [indicator](033_W4a_Indicator_implementation.md) call.  
  

## priceSet (int offset_,_ var Open, var High, var Low, var Close)

Modifies the open, high, low, close, and mean price of the current asset at the given bar, for [dummy assets](013_Asset_Account_Lists.md), artificial price curves, displaying special candles, or using a different price source. Use **offset = -1** for modifying the prices of the next bar when trades should be entered at the modified prices. Does not affect intrabar prices in [TICKS](018_TradeMode.md) mode.

## priceQuote (var Timestamp, var Quote) : int

Enters a new price quote of the current [asset](013_Asset_Account_Lists.md) in the system; especially for [HFT simulation](198_Fill_modes.md) or when prices are not available from the broker connection. Filters outliers and updates the current best ask ([AskPrice](pip.md)) and best bid ([AskPrice](pip.md) - [Spread](+)). Increases [Bar](180_Bar_NumBars.md) after every [BarPeriod](177_BarPeriod_TimeFrame.md) when no [run](088_run.md) function is used. Price quotes are also printed to the log when [Verbose](199_Verbose.md) is at 3 or above, so be careful with **Verbose** for preventing awfully large log files.

### Parameters:

<table border="0"><tbody><tr><td><strong>offset</strong></td><td>Optional bar number for which the prices are returned, in time frames before the current time frame. If <strong>0,</strong> the price of the current bar is returned. Negative offsets return future prices when the <a href="mode.htm">PEEK</a> flag is set; otherwise they give an error message.</td></tr><tr><td><strong>Timestamp</strong></td><td>The exchange timestamp of the quote in DATE format. Quotes older than the previous quote are ignored.</td></tr><tr><td><strong>Quote</strong></td><td>The price. <strong>Quote &gt; 0</strong> indicates an ask price, <strong>Quote &lt; 0</strong> a bid price.</td></tr></tbody></table>

### Returns:

1 if the price quote was accepted, 0 if an [Outlier](187_TickTime_MaxRequests.md) was detected or the timestamp was outdated.  
  

## priceRecord ()

Appends the current OHLC candle and the current spread and volume of the current asset to the begin of the price history in **.t1** or **.t6** format; only in \[Trade\] mode and after the **INITRUN**. This allows recording live prices for [re-training](009_Retraining.md) or other purposes.  
 

### Remarks:

*   The **priceO**, **priceH**, **priceL**, **priceC** functions can be also used under the names **priceOpen**, **priceHigh**, **priceLow**, **priceClose**.
*   At the initial run of the strategy before an [asset](013_Asset_Account_Lists.md) is selected, all price functions return **0**. After switching to a different [asset](013_Asset_Account_Lists.md), the price and market functions automatically change to the prices and market data of that asset. In backtesting or training prices are affected by [Detrend](197_Detrend_shuffling.md) flags.
*   If not otherwise mentioned, all prices are ask prices. This way stops, entry limits, or profit targets can be calculated without a distinction between long and short trades. Zorro automatically handles conversion from Ask to Bid when entering or exiting trades, calculating trade profit, or setting limit levels. For getting the bid price, subtract [Spread](191_Spread_Commission.md); for getting the pip value of a price, divide by **[PIP](192_PIP_PIPCost_Leverage.md)**. The current bid/ask mean price is **priceClose() - 0.5\*Spread**. More variants of prices - i.e. the Center Price, the Typical Price, the Haiken Ashi Price, the VWAP etc. - can be found on the [indicators](033_W4a_Indicator_implementation.md) page. Live prices can be switched between different types (f.i. quotes and trades) with the [SET\_PRICETYPE](113_brokerCommand.md) command when supported by the broker.
*   For changing the price range of an asset, f.i. for shifting negative prices to the positive scale, use [PriceOffset](191_Spread_Commission.md).
*   When loading price data, the prices are checked for plausibility dependent on the [Outlier](outlier.md) parameter. Invalid prices, such as negative values or outliers, are automatically corrected or removed. Setting **[Detrend](197_Detrend_shuffling.md) = NOPRICE** before calling **asset()** prevents that asset and price data is checked and invalid prices are removed.
*   When connected to a broker or exchange, prices are updated at any incoming tick; when connected to an online [price source](loadhistory.md), at any bar. Outliers and stock splits are detected and can be evaluated with the [PriceJump](outlier.md) variable. Outliers are removed, splits are logged.
*   If the [LEAN](018_TradeMode.md) flag is set and M1 historical data is used, open and close prices of a bar are not explicitely stored for preserving memory. They are derived from the mean prices of its first and last M1 tick.
*   If [LookBack](nhistory.md) is not explicitely set, it is automatically expanded to the biggest **offset** value. If **offset** is higher than the current bar number ([Bar](numbars.md)), the price of the first bar is returned.
*   When using multiple time frames in the strategy ([TimeFrame](barperiod.md) variable), the **offset** parameter gives the number of time frames rather than the number of bars. The function **priceOpen** returns the price from the begin of the time frame, **priceClose** from its end, **priceHigh, priceLow** the maximum and minimum price within the time frame, and **price** the current average of the time frame. Synchronizing time frames (**TimeFrame = 0**) to certain events or dates is not supported by price functions; use price [series](091_series.md) for that when required.
*   In live trading, **marketVal** and **marketVol** return spread and volume from the [broker API](brokerplugin.md), when available. If volume is not available, a proxy is returned, such as the tick frequency. The type of returned volume is described on the specific broker page (f.i. [IB](ib.md)).Some broker APIs support the [SET\_VOLTYPE](113_brokerCommand.md) command for setting up the volume source between ask/bid or trade volumes. Historical volume is often the sum of quote sizes or trade volumes of the current minute or current day. Live volume is often the accumulated trade volume of the current day or trading session. The functions return the current value when **Offset** is 0, otherwise the average of the time frame. Depending on which sort of raw volume they return, it can be converted by script to the total volume per time frame. For instance, to convert accumulated volume to per-minute volume, subtract the volume from 1 bar ago from the current volume, and divide by **BarPeriod.** See examples below.  
      In test and train modes, **marketVol** returns the **fVol** element of **.t6** historical data, or otherwise 0. The **marketVal** function returns the **fVal** element of .t6 data, and the ask-bid spread of .t1 or .t2 data, otherwise 0.
*    Depending on the broker, live volume can be different to historical volume where delayed transactions, busted trades, combos and unreportable trades are filtered out. Likewise, outliers are often filtered out of historical price data. Trade signals should therefore not rely on comparing live volume with historical volume or live volatility with historical volatility.
*   For basket trading, artificial assets can be created by combining the prices from several real assets. An example can be found under [Tips & Tricks](246_Tips_Tricks.md).
*   For evaluating live or historical order book data or BBO data, and for generating order flow profiles, use the [orderUpdate](133_orderCVD.md) function.
*   For calculating VWAP prices from a given time period, store prices and volumes in [series](091_series.md) and apply the [VWAV](033_W4a_Indicator_implementation.md) function.
*   If the [PEEK](018_TradeMode.md) flag is set, price functions can peek into the future by using negative offsets. This is often used for training machine learning algorithms (see [advise](advisor.md)) with historical price data. If [PEEK](018_TradeMode.md) mode is not set, negative offsets will generate an error message.
*   In a [TMF](buylong.md) or [tick](089_tick_tock.md) function, **priceC(0)** returns the last price quote, updated every live or historical tick when new price data becomes available. **marketVal(0)** returns the last ask-bid spread and **marketVol(0)** returns the last trade or quote volume if available.
*   If [.t1 data](022_Price_History.md) contains both ask and bid quotes, **marketVal** returns the recent ask-bid spread. In [.t6 data](022_Price_History.md) it returns the **fVal** value. The command **if(Test)** **Spread = max(0,marketVal());** can be used for backtesting with variable spread when it is available in the historical .t1, .t2, or .t6 data.
*   An example of using the **priceQuote** function for simulating a HFT system can be found on [Financial Hacker](http://www.financial-hacker.com/hacking-hft-systems/).

### Examples:

```c
BarPeriod = 60; _// set up 1 hour bars (60 minutes)_
TimeFrame = 4;
asset("EUR/USD");
vars EUR4Hs = series(price(0));	_// create a series of 4 hour EUR mean prices_
...
TimeFrame = frameSync(24);
asset("SPX500");
vars SPXDays = series(priceC(0));	_// create a series of daily S&P 500 close prices_
TimeFrame = 1;
...
```
```c
_// plot a daily spread histogram_
void run()
{
  BarPeriod = 10;
  PlotLabels = 4;
  plotBar("Spread",
    (60\*hour(0)+minute(0))/BarPeriod,tod(0),marketVal(0),AVG,RED);
}
```
```c
_// convert accumulated daily trade volume to per-bar volume_
var volumeDiff(var\* Buffer,var Volume)
{
_// Buffer\[1\] = previous accumulated volume_
  if(Buffer\[1\] > Volume) _// day change? Reset volume_
    Buffer\[1\] = 0;
  Buffer\[0\] = Volume-Buffer\[1\]; _// per-bar volume difference_
  Buffer\[1\] = Volume;
  return Buffer\[0\]; 
}

void run()
{
  BarPeriod = 1;
  LookBack = 0;
  
  assetList("AssetsIB");
  brokerCommand(SET\_PRICETYPE,2); _// trade prices
_  brokerCommand(SET\_VOLTYPE,4); _// trade volume
_  
  vars VBuffer = series(0,-2);
  var Volume = marketVol(0);
  if(Live) _// if marketVol is daily accumulated volume_
    Volume = volumeDiff(VBuffer,Volume);
  printf("# Vol %.0f",Volume);
}
```

### See also:

[enterLong](buylong.md)/[Short](buylong.md), [series](091_series.md), [asset](013_Asset_Account_Lists.md), **[Spread](191_Spread_Commission.md)**, [AskPrice](192_PIP_PIPCost_Leverage.md), [AskSize](192_PIP_PIPCost_Leverage.md), [Detrend](197_Detrend_shuffling.md), [dayHigh/Low](119_dayHigh_dayLow.md), [History](022_Price_History.md), [GET\_PRICE](113_brokerCommand.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))