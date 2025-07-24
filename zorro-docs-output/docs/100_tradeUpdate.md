---
title: "tradeUpdate"
source: "https://zorro-project.com/manual/en/tradeupdate.htm"
---

# tradeUpdate

## tradeUpdate(TRADE\*, int NewLots, var NewStop, var NewTP, int NewLifeTime)

Resizes or updates parameters of a particular open or pending trade.

## tradeUpdatePool()

Updates pool trades to the current open virtual trades in [virtual hedging](019_Hedge_modes.md) mode. Automatically performed after any trade with **Hedge** = **4**, or once per bar with **Hedge** = **5**. Must be called by script with **Hedge = 6**.

### Parameters:

<table border="0"><tbody><tr><td><strong>TRADE*</strong></td><td>Pointer to the trade to be updated, or <strong>0</strong> to update pool trades to the current open virtual trades.</td></tr><tr><td><strong>NewLots</strong></td><td>New number of lots, or <strong>0</strong> for not resizing. For reducing the trade size, partial closing must be supported by the broker; for increasing the trade size, <a href="hedge.htm">virtual hedging</a> must be enabled.</td></tr><tr><td><strong>NewStop</strong></td><td>New stop loss limit, or <strong>0</strong> for no change.</td></tr><tr><td><strong>NewTP</strong></td><td>New profit target, or <strong>0</strong> for no change.</td></tr><tr><td><strong>NewLifeTime</strong></td><td>New life time in number of bars, or <strong>0</strong> for no change.</td></tr></tbody></table>

### Returns:

**0** when the operation failed, otherwise nonzero.

### Remarks:

*   Only the positions of virtual trades can be increased. Pool trades take over the new size either at the next bar or when calling **tradeUpdate()**.

### Example:

```c
function double\_all\_trades()
{
  if(Hedge < 4) return;
  for(open\_trades) 
    if(TradeIsVirtual))
      tradeUpdate(ThisTrade,2\*TradeLots,0,0,0);
  tradeUpdatePool(); _// adapt pool trades_
}
```

### See also:

[exitTrade](selllong.md), [enterTrade](buylong.md), [Lots](190_Margin_Risk_Lots.md), **[Stop](188_Stop_Profit_Trail_Entry.md)**, [LifeTime](timewait.md), [TMF](018_TradeMode.md), [Fill](198_Fill_modes.md), [Hedge](019_Hedge_modes.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))