---
title: "exitLong, exitShort, exitTrade"
source: "https://zorro-project.com/manual/en/selllong.htm"
---

# exitLong, exitShort, exitTrade

## exitLong(_string Filter, var Price, int Lots_)

## exitShort(_string Filter, var Price__, int Lots_)

Exits all long or all short trades that match the given filter condition (see below), at market or at a given price limit, until the given number of lots is closed.

## exitTrade(TRADE\*_,_ _var Price, int Lots_): int

Exits a particular trade completely or partially at market or at a given price limit. Returns 0 when the order failed, otherwise nonzero.

## cancelTrade(int Id)

## cancelTrade(TRADE\*)

Cancels an open trade with a particular identifier or **TRADE\*** pointer without sending a close order to the broker and without modifying the statistics or the balance. If the trade was still open on the broker side, it will become orphaned and is not anymore under Zorro control. Use this function for removing an externally closed position that was not transmitted to Zorro, for instance on [NFA](mode.htm#nfa) compliant accounts.

### Parameters:

<table border="0"><tbody><tr><td><strong>Filter</strong></td><td><strong>0</strong> or <strong>""</strong> for closing all trades with the current algo/asset component (default).<br>An <a href="algo.htm">algo name</a> for closing all trades with the given algo and the current asset.<br>An <a href="asset.htm">asset name</a> for closing all trades with the given asset and the current algo.<br><strong>"c"</strong> for closing all <a href="contract.htm">call</a> trades with the current component.<br><strong>"p"</strong> for closing all <a href="contract.htm">put</a> trades with the current component.<br><strong>"cp"</strong> for closing all <a href="contract.htm">contract</a> trades with the current component.<br><strong>"u"</strong> for closing all underlying trades with the current component.<br><strong>"*"</strong> for closing all trades with the current asset.<br><strong>"**"</strong> for closing all trades.</td></tr><tr><td><strong>TRADE*</strong></td><td>A pointer to the trade to be closed, or <strong>ThisTrade</strong> for closing the current trade in a <a href="fortrades.htm">trade enumeration loop</a>.</td></tr><tr><td><strong>Price</strong></td><td>Optional price or distance to current price for selling the position, or <strong>0</strong> (default) for selling at market. A positive price or price distance constitutes an exit stop, a negative price is an exit limit (similar to <a href="stop.htm">Entry</a>). An exit stop closes the position when the asset price is at or worse than the given price, like a stop loss; an exit limit closes the position when the asset price is at or better than the given price, like a profit target.</td></tr><tr><td><strong>Lots</strong></td><td>Optional number of lots to be closed, or <strong>0</strong> (default) for closing all open lots. Partially closing trades is not available with some brokers.</td></tr><tr><td><strong>Id</strong></td><td>Identifier of the trade to be cancelled. Either the full number as assigned by the broker, or the last 4 digits as displayed in the Zorro window.</td></tr></tbody></table>

### Remarks:

*   Optional parameters can be omitted. F.i. **exitLong()** exits all long positions with the current asset and algo at market.
*   Long trades exit at the best bid price, short trades at the best ask price from the order book or the historical data. The real exit price in live trading can differ from the current ask or bid price due to slippage.
*   If an exit stop or exit limit is given, the position is closed as soon as the target price is reached, no matter how long it takes. An exit stop overrides a more distant [stop loss](188_Stop_Profit_Trail_Entry.md), an exit limit overrides a previous [profit target](188_Stop_Profit_Trail_Entry.md). The **exitLong/Short** function can thus be used to tighten the stop loss or to change the profit target of open trades (see example).
*   Before closing a trade, check the business hours of the broker. Not all assets can be traded 24 hours per day. Trading is normally disabled during [weekends](200_BarMode.md), during the [LookBack](181_LookBack_UnstablePeriod.md) period, or in the inactive periods of [TimeFrame](177_BarPeriod_TimeFrame.md), [**SKIP**](018_TradeMode.md), or **[DataSplit](dataslope.md)**.
*   If the market was closed when exiting a trade in \[Test\] or \[Train\] mode, the trade will be closed when the market opens again.
*   If the close order is rejected by the broker in \[Trade\] mode, the reason - such as **"Outside market hours"** - is printed to the log and the message window. With the [MT4/5 bridge](mt4plugin.md) the reason can be seen in the MT4/5 Experts Log. The number of rejected orders is stored in the [NumRejected](winloss.md) variable. There can be several reasons for the broker API to refuse closing a trade, for instance NFA compliance, FIFO compliance, a wrong asset name, an invalid trade size, a closed market, or no liquidity. Check the requirements of your account and set the [NFA](018_TradeMode.md) flag and [Hedge](019_Hedge_modes.md) mode accordingly.  
      Zorro will repeat a rejected close order in increasing time intervals until it is eventually executed (except for [options](contract.md) or when [OrderLimit](188_Stop_Profit_Trail_Entry.md) is used). If the position can not be closed after 4 working days, Zorro will assume that is was already externally closed and remove the trade from its internal list. If the market is not open due to holidays or weekend, a message **"Can't exit at weekends"** is printed and the position is closed as soon as the market opens again.
*   Some cryptocurrency brokers deduct their commission from an open position, and subsequently reject the close order due to insufficient funds. In that case make sure to have a small additional amount on the account for covering the commissions.
*   When no **price** was given, pending positions - positions either immediately entered before, or positions with an [entry](188_Stop_Profit_Trail_Entry.md) stop or limit - are also closed.
*   The price at which the trade is closed in the backtest can be affected with the [Fill](198_Fill_modes.md) variable.
*   If an [order](111_order.md) function is defined in the script, it is called with **2** for the first argument and the **TRADE\*** pointer for the second argument at the moment when the sell order is sent to the broker. This function can f.i. open a message box for manually exiting the trade, or control another broker's user interface.

### Example:

```c
exitShort(0,1.234); _// exits all short trades with the current Algo/Asset as soon as the price is at or above 1.234 (exit stop)._
```

### See also:

[enterLong/](buylong.md)[Short](buylong.md), [Entry](188_Stop_Profit_Trail_Entry.md), [Hedge,](019_Hedge_modes.md) [Fill](198_Fill_modes.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))