---
title: "TradeMode"
source: "https://zorro-project.com/manual/en/trademode.htm"
---

# TradeMode

# Trade Mode, Phantom Trades, Equity Curve Trading

**Phantom trades** are "what-if" trades that are not sent to the broker. Instead the win or loss of a phantom trade is calculated from the price curve and the current slippage and trading costs. It is recorded in the [Short](winloss.md)/[Long](winloss.md) statistics, but not in the [Total](winloss.md) statistics. This way the performances of phantom and real trades can be evaluated separately. Phantom trades are used for equity curve trading or for [Virtual Hedging](019_Hedge_modes.md).

Equity curve trading is a method of limiting losses by skipping unfavorable market periods. The strategy monitors the equity curves of any component of a portfolio strategy. When unusual losses are recognized, real trading with that component is suspended. For detecting whether it's worth to resume trading, the subsequent trades are then entered in **phantom mode** until their returns indicate that the market is getting profitable again. In this way the strategy switches in and out of phantom mode dependent on the market situation.

Several methods can be used for determining if the market it profitable or not. In the example below, the equity curve is permanently compared with its own long-term average by lowpass filtering. It the equity is below average and still falling, trading switches to phantom mode; it goes back to normal as soon as the equity curve is rising again. Other methods may be based on the balance instead of the equity curve, or on the ratio of winning to losing trades.

Equity curve trading does not improve the performance when there is no clear distinction between profitable and unprofitable market periods or when the strategy filters unprofitable periods anyway. But it can often improve the perception of a live trading system, and can prevent losses by expiration of market inefficiencies. An example of a system that suddenly became unprofitable is the 'Luxor' strategy in the [script examples](020_Included_Scripts.md); here equity curve trading would have saved the day by stopping trading in December 2011.

Phantom trades and the overall trade behavior can be controlled with the following variable:

## TradeMode

Determines with the flags listed below how trades are placed. Use [setf](168_setf_resf_isf.md) and [resf](168_setf_resf_isf.md) for setting and resetting flags.

### Range:

<table style="width: 100%"><tbody><tr><td><strong>TR_PHANTOM</strong></td><td>Enter trades in phantom mode. The trades are simulated and not sent to the broker API.<strong></strong></td></tr><tr><td><strong>TR_GTC</strong></td><td>Enter trades in GTC (good-till-cancelled) mode, if supported by the broker API. Keeps the order active until filled or cancelled by the broker.</td></tr><tr><td><strong>TR_AON</strong></td><td>Enter trades in AON (all-or-nothing) mode, if supported by the broker API.</td></tr><tr><td><strong>TR_POS</strong></td><td>Check the position before exiting trades, and cancel the trade when the position was zero. <a href="brokercommand.htm">GET_POSITION</a> must be supported.</td></tr><tr><td><strong>TR_FILLED</strong></td><td>Treat the trade as completely filled when trade status and filled orders are unavailable by the API.</td></tr><tr><td><strong>TR_FRC</strong></td><td>Do not round stops and limits to the PIP value; for broker APIs that support any limit value.</td></tr><tr><td><strong>TR_EXTEND</strong></td><td>Renew the life time of open trades that are updated by entering trades with <strong>0</strong> lots or by exceeding a <a href="lots.htm">MaxLong/MaxShort</a> limit.</td></tr></tbody></table>

  

### Type:

**int**

### Remarks:

*   **TR\_GTC** prevents Zorro from cancelling the order when it is not immediately executed. Use this for orders that take a long time for execution, for instance option combos. The broker plugin must support the [SET\_ORDERTYPE](113_brokerCommand.md) command with order type 2.
*   If a GTC order is not immediately filled, the partial fill amount is contained in the [TradeLots](018_TradeMode.md) variable. If the trade status is unavailable via broker API, either use **TR\_GTC|TR\_FILLED** for treating all accepted GTC trades as completely filled. Or retrieve the current position size via **GET\_POSITION** and calculate the fill amount from it. You can find an example under [TMF](018_TradeMode.md).

### Example (equity curve trading):

```c
_// don't trade when the equity curve goes down
// and is below its own lowpass filtered value_
function checkEquity()
{
_// generate equity curve including phantom trades_
  vars EquityCurve = series(EquityLong+EquityShort);
  vars EquityLP = series(LowPass(EquityCurve,10));
  if(EquityLP\[0\] < LowPass(EquityLP,100) && falling(EquityLP))
    setf(TradeMode,TR\_PHANTOM); _// drawdown -> phantom trades_
  else
    resf(TradeMode,TR\_PHANTOM); _// profitable -> normal trades_
}
```

### See also:

[NFA](018_TradeMode.md), [Hedge](019_Hedge_modes.md), [Fill](198_Fill_modes.md), [broker arbitrage](brokerarb.md), [setf](168_setf_resf_isf.md), [resf](168_setf_resf_isf.md)  
[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))