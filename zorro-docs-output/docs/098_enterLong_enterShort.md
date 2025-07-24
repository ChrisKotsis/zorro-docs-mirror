---
title: "enterLong, enterShort"
source: "https://zorro-project.com/manual/en/buylong.htm"
---

# enterLong, enterShort

## enterLong (_int Lots, var Entry, var Stop, var TakeProfit, var Trail, var TrailSlope, var TrailLock, var TrailStep_): TRADE\*

## enterShort (_int Lots, var Entry, var Stop, var TakeProfit, var Trail, var TrailSlope, var TrailLock, var TrailStep_): TRADE\*

Enters a long or short trade with optional parameters. Entry and exit conditions are handled by Zorro.

## enterLong (_function, var V0, ... var V7_): TRADE\*

## enterShort (_function, var V0, ... var V7_): TRADE\*

Enters a long or short script-managed trade with optional user-defined parameters. Entry and exit conditions are handled by a user-provided algorithm in the given trade management function ([TMF](trade.md)) dependent on the variables **v0** .. **v7**.

## enterTrade (TRADE\*): TRADE\*

Enters an open, pending, or closed trade from a **TRADE** struct. Inserts the trade only in the internal trade list; does not send any order to the broker. The asset name can be given through [TradeStr\[0\]](018_TradeMode.md) resp. the **Skill** element of the **TRADE** struct; if it is not set, the current asset is used. The position size (**nLots**) and the **TR\_SHORT** and **TR\_OPEN** flags must be set in the **TRADE** struct; other elements are optional. The algo identifier is taken from the **TRADE** struct; if it has none, it is set to the current [algo](095_algo.md). This function can be used for running backtests from a list of trades (see [Simulate](scripts.md) script) or for reading positions from the broker API and converting them to trades.   
 

### Parameters:

<table border="0"><tbody><tr><td><strong>Lots</strong></td><td>Optional number of lots when nonzero; overrides the global <a href="stop.htm"></a><a href="lots.htm">Lots</a>, <a href="lots.htm">Amount</a>, <a href="lots.htm">Margin</a>, and <a href="lots.htm">Risk</a> variables. A negative number reverses the trade direction: <strong>enterLong</strong> then opens a short trade and <strong>enterShort</strong> opens a long trade.</td></tr><tr><td><strong>Entry</strong></td><td>Optional entry stop when &gt; 0, entry limit when &lt; 0 (overrides the global <a href="stop.htm">Entry</a>).</td></tr><tr><td><strong>Stop</strong></td><td>Optional stop loss when nonzero (overrides the global <a href="stop.htm"></a><a href="stop.htm">Stop</a>).</td></tr><tr><td><strong>TakeProfit</strong></td><td>Optional profit target when nonzero (overrides the global <a href="stop.htm"></a><a href="stop.htm">TakeProfit</a>).</td></tr><tr><td><strong>Trail</strong></td><td>Optional trail limit when nonzero (overrides the global <a href="stop.htm"></a><a href="stop.htm">Trail</a>).</td></tr><tr><td><strong>TrailSlope</strong></td><td>Optional trailing speed when nonzero (overrides the global <a href="stop.htm"></a><a href="stop.htm">TrailSlope</a>).</td></tr><tr><td><strong>TrailLock</strong></td><td>Optional profit lock percentage when nonzero (overrides the global <a href="stop.htm"></a><a href="stop.htm">TrailLock</a>).</td></tr><tr><td><strong>TrailStep</strong></td><td>Optional autotrailing step width when nonzero (overrides the global <a href="stop.htm"></a><a href="stop.htm">TrailStep</a>).</td></tr><tr><td><strong>function</strong></td><td>Optional pointer of an <strong>int</strong> function for micro-managing the trade (see <a href="trade.htm">TMF</a>).</td></tr><tr><td><strong>V0 ... V7</strong></td><td>Up to 8 optional numerical variables as further arguments to the TMF.</td></tr></tbody></table>

### Returns:

**TRADE\*** - a pointer to the created trade struct (see **include\\trading.h** for the definition of the **TRADE** struct), or **0** when no trade could be entered because the trade volume was zero, trading was disabled (f.i. weekend, time frame, or lookback period), or the trade was rejected by the broker. For pending trades a nonzero pointer is always returned.

### Remarks:

*   In the backtest, the result of entering a trade can be either a pending trade, an opened trade, or a skipped trade. If no [Entry](188_Stop_Profit_Trail_Entry.md) limit is given, trades are opened at the current price or at the next open price, dependent on [Fill](198_Fill_modes.md) mode. If a trade is pending, Zorro continues to attempt opening the trade within the time period given by [EntryTime](timewait.md).
*   In live trading, order filling depends on the broker API and the market situation. Normally the order is cancelled when not filled within a wait time given by [SET\_WAIT](113_brokerCommand.md) (default: about 30-60 seconds dependent on broker API). This behavior can be changed with the [SET\_ORDERTYPE](113_brokerCommand.md) command. Partial fills are allowed for IOC ("immediate-or-cancel") or GTC ("good-till-cancelled") orders. A GTC order stays active in the background until it is either complete, or is cancelled by expiration or by an [exit](selllong.md) command.
*   Long trades open at the best ask price, short trades at the best bid price from the order book or the historical data. But the real fill price - the price at which the trade is entered - normally differs to the current ask or bid price. The difference is the **slippage**. It can be simulated in the backtest with the [Slippage](191_Spread_Commission.md) variable. To prevent an unfavorable fill price in live trading, you can use limit orders instead of market orders. Some broker plugins, f.i. the IB plugin, support limit orders. They are normally guaranteed to be filled at the price set up through the [OrderLimit](188_Stop_Profit_Trail_Entry.md) variable.
*   When function parameters are **0** or omitted in the parameter list, [global trade parameters](188_Stop_Profit_Trail_Entry.md) are used. When no trade management function and only global parameters are used, the parentheses can be empty.
*   If a [contract](096_contract.md) is selected and the [Multiplier](contracts.md) is set, the function opens an option or future position instead of a position of the underlying.
*   Trades are automatically skipped during [weekends](200_BarMode.md) or outside market hours, during the [LookBack](181_LookBack_UnstablePeriod.md) period, in the inactive period of [**SKIP**](018_TradeMode.md) or **[DataSplit](dataslope.md)**, or when the current bar is not the end of a [TimeFrame](177_BarPeriod_TimeFrame.md). For trading inside a time frame, set **TimeFrame = 1**, enter the trade, then set **TimeFrame** back to its previous value.
*   Trades are also not opened when [Lots](190_Margin_Risk_Lots.md) is **0**, or **[Margin](190_Margin_Risk_Lots.md)** or **[Risk](190_Margin_Risk_Lots.md)** are too low, or the [MaxLong](190_Margin_Risk_Lots.md) / [MaxShort](190_Margin_Risk_Lots.md) limits are reached in \[Test\] and \[Trade\] mode, or when the [Algo](095_algo.md) name ends with **":L"** for short trades or with **":S"** for long trades. However reverse positions are then still closed and the stop limits, profit targets, and life times of open trades with the same asset and algo are updated to the current values. This way, already open trades behave as if they were just opened by the recent signal. If this mechanism is not desired, limit the number of trades with negative [MaxLong](190_Margin_Risk_Lots.md) / [MaxShort](190_Margin_Risk_Lots.md) limits.
*   If a trade is rejected by the broker, the reason by the broker API - such as **"Outside market hours"** - is normally printed to the log. When trading with the [MT4/5 bridge](mt4plugin.md), the reason can be seen in the MT4/5 Experts Log. The number of rejected orders is stored in the [NumRejected](winloss.md) variable. There can be many reasons for the broker API to reject a trade, for instance not enough capital on the account, not enough free margin, a wrong asset name, a closed or illiquid market, an asset that cannot be shorted, or a stop loss that is too tight, too far, or not an integer multiple of a pip. Zorro will not attempt to open the trade again unless either enforced by script, or when it's a [pool trade](019_Hedge_modes.md). Pool trades will be rebalanced at any bar until they match the virtual trades.
*   A returned nonzero **TRADE\*** pointer means that the trade is processed, but is no guarantee that the position is really opened - it could still be pending or is rejected later by the broker. This is indicated by flags in the **TRADE** struct. The returned **TRADE\*** pointer can be assigned to [ThisTrade](018_TradeMode.md) (f.i. **ThisTrade = enterLong();**). If **ThisTrade** is nonzero, all its trade variables - for instance, [TradeIsOpen](018_TradeMode.md) - are available for checking the state of the trade.
*   A **[trade management function](018_TradeMode.md)** (**TMF**) is automatically called every tick - i.e. whenever the price changes - with the the optional variables (**V0** .. **V7**) as arguments. It can evaluate the current price and other [trade variables](018_TradeMode.md) for managing the position or adjusting stop and profit limits. Note that **V0** .. **V7** are for numbers only; they internally stored as [float](aarray.md) variables with 32-bit precision.
*   Open, pending, and closed trades can be enumerated with the [for(open\_trades)](fortrades.md) and [for(all\_trades)](fortrades.md) macros.
*   Every trade is linked to an algorithm identifier that can be set up through the **[Algo](095_algo.md)** string. Identifiers are useful when the script trades with several different algorithms; they are then used for selecting [strategy parameters](107_optimize.md) or [capital allocation factors](016_OptimalF_money_management.md) belonging to a certain trade algorithm, or to exit or identifiy particular trades. The [performance report](012_Performance_Report.md) lists strategy results separated by their algorithm identifiers.
*   Entry and exit conditions can be either set individually per trade, or set up globally through the [Entry](188_Stop_Profit_Trail_Entry.md), **[Stop](188_Stop_Profit_Trail_Entry.md)**, **[TakeProfit](188_Stop_Profit_Trail_Entry.md)**, and **[Trail](188_Stop_Profit_Trail_Entry.md)** variables for all subsequent trades. If the stop loss is too close, too far, to or on the wrong side of the price, the trade can be rejected by the broker. Make sure that the stop loss has sufficient distance to the current price ([priceClose()](022_Price_History.md)). A timed exit can be set up with [LifeTime](timewait.md).
*   If [TICKS](018_TradeMode.md) is not set and the price hits the entry limit, the profit target, and/or the stop loss in the same bar, the simulation assumes a pessimistic outcome. The limits are evaluated in the order entry - stop - profit target. If **TICKS** is set, the price curve inside the bar is evaluated for determining which limit is met first.
*   Opening a trade automatically closes opposite trades when [Hedge](019_Hedge_modes.md) is **0** or **1** (i.e. **enterLong** can automatically close short positions and **enterShort** can automatically close long positions). If the trade was not opened because the [Entry](188_Stop_Profit_Trail_Entry.md) limit was not met within [EntryTime](timewait.md), opposite trades are not closed; if the trade was not opened because [Lots](190_Margin_Risk_Lots.md) is **0** or **[Margin](190_Margin_Risk_Lots.md)** or **[Risk](190_Margin_Risk_Lots.md)** are too low, opposite trades are still closed.
*   The trade size is determined by the [Margin](190_Margin_Risk_Lots.md), [Risk](190_Margin_Risk_Lots.md), [Amount](190_Margin_Risk_Lots.md), or **[Lots](190_Margin_Risk_Lots.md)** variables.
*   The [TR\_PHANTOM](018_TradeMode.md) flag causes the trade to be executed in "phantom mode". Phantom trades are not sent to the broker and do not contribute to the [Total](winloss.md) statistics, but their projected wins and losses contribute to the [Short](winloss.md) and [Long](winloss.md) statistics. This can be used to filter trades based on the current win/loss situation ("equity curve trading").
*   If an [order](111_order.md) function is defined in the script, it is called with **1** for the first argument and the **TRADE\*** pointer for the second argument at the moment when the buy order is sent to the broker. This function can f.i. open a message box for manually entering the trade, or control another broker's user interface.
*   When converting scripts from other trading software, keep in mind that other trading programs use sometimes different names for trade functions. For instance, TradeStation® uses "Sell Short" for entering a short position and "Buy To Cover" for exiting a short position.
*   In \[Trade\] mode, all open trades are stored in a **.trd** file in the **Data** folder. The stored trades are automatically continued when the strategy is started again, for instance after a computer crash.

### Example 1: Simple SMA crossing

```c
function run()
{
  vars Price = series(priceClose());
  vars SMA100 = series(SMA(Price,100));
  vars SMA30 = series(SMA(Price,30));
 
  if(crossOver(SMA30,SMA100))
    enterLong();
  else if(crossUnder(SMA30,SMA100))
    enterShort();
}
```

### Example 2: Grid trading script

```c
_// helper function for finding trades at a grid line_
bool noTradeAt(var Price,var Grid,bool IsShort) 
{
  for(open\_trades)
    if((TradeIsShort == IsShort)
      and between(TradeEntryLimit,Price-Grid/2,Price+Grid/2))
        return false; _// trade found_
  return true; _// no open/pending trade at that price_
}
  
function run() 
{
  BarPeriod = 1440;
  Hedge = 2; 
  EntryTime = ExitTime = 500;  
  var Price;
  var Grid = 100\*PIP; _// grid spacing_
  var Current = priceClose();
_// place pending trades at 5 grid lines above and below the current price_
  for(Price = 0; Price < Current+5\*Grid; Price += Grid) {
    if(Price < Current-5\*Grid)
      continue;
    if(Price < Current and noTradeAt(Price,Grid,true))
      enterShort(0,Price,0,Grid);      
    else if(Price > Current and noTradeAt(Price,Grid,false))
      enterLong(0,Price,0,Grid);
  }
}
```

### Example 3: Using a trade management function

```c
_// TMF that adjusts the stop in a special way_ 
int TrailingStop()  
{  
_// adjust the stop only when the trade is in profit_  
  if(TradeProfit > 0)  
_// place the stop at the lowest bottom of the previous 3 candles_
    TradeStopLimit = max(TradeStopLimit,LL(3));  
_// plot a line to make the stop limit visible in the chart_  
  plot("Stop",TradeStopLimit,MINV,BLACK);
_// return 0 for checking the limits_  
  return 0;  
}

_// using the trade function_
function run()
{
  ...
  Lots = 1;
  Stop = 10\*PIP;
  Algo = "SIG";
  if(crossOver(MySignal,MyThreshold))
    enterLong(TrailingStop);
  ...
}
```

### See also:

[exitLong](selllong.md)/[Short](selllong.md), [tradeUpdate](100_tradeUpdate.md), [Lots](190_Margin_Risk_Lots.md), [Risk](190_Margin_Risk_Lots.md), [Entry](188_Stop_Profit_Trail_Entry.md), **[Stop](188_Stop_Profit_Trail_Entry.md)**, [EntryTime](timewait.md), [ExitTime](timewait.md), [BarMode](200_BarMode.md), [TMF](018_TradeMode.md), [Fill](198_Fill_modes.md), [Hedge](019_Hedge_modes.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))