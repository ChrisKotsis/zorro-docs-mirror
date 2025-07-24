---
title: "LifeTime, EntryTime, ..."
source: "https://zorro-project.com/manual/en/timewait.htm"
---

# LifeTime, EntryTime, ...

# Trade parameters 2 - time limits

## LifeTime

Trade time limit in bars. After the given number of bars (default: **0** for no time limit), the trade closes at the open of the next bar. Trades are only closed when the market is open. If the entry happens intrabar due to an [Entry](188_Stop_Profit_Trail_Entry.md) or **OrderDelay** setting, **LifeTime** \= **1** causes a trade duration of 1 bar plus the remainder of the opening bar. The life time of open trades is extended by [enter](buylong.md) commands that do not open a trade due to [MaxLong/MaxShort](190_Margin_Risk_Lots.md) or due to a margin or risk limit. Open trades of the same component get then automatically the life time that the new trade would have. 

## EntryTime

Pending order lifetime in bars. When an [enter](buylong.md) command is given, wait the given number of bars (default: **1**) until the [entry limit](188_Stop_Profit_Trail_Entry.md) is met. If that does not happen during that time, the trade is removed and a "Missed Entry" message is printed to the log file.

### Range:

Number of bars.

### Type:

**int** 

## OrderDelay

Order entry delay in seconds. Open the trade either after the given delay time (default: **0** - no delay), or when the [entry limit](188_Stop_Profit_Trail_Entry.md) is met, whatever happens first. The delay can be given in high resolution (0.000001 = 1 microsecond). Useful for splitting a large order into smaller portions ("iceberg trades"), for an adaptive entry/exit algorithm or for simulating latency in [HFT fill mode](198_Fill_modes.md).

## OrderDuration

[GTC order](018_TradeMode.md) duration in seconds. The order is automatically cancelled after the given time even when the trade is not completely filled. The broker API must support the [SET\_ORDERTYPE](113_brokerCommand.md) and [DO\_CANCEL](113_brokerCommand.md) commands. This variable affects all open GTC trades.

### Range:

Second units, f.i. **1.23 == 1230 ms**.

### Type:

**var**

### Remarks:

*   All time limits must be set before calling [enterLong](buylong.md)/[enterShort](buylong.md), except for **OrderDuration**, which can be changed anytime. The life time of a trade can be modified afterwards either directly by setting [TradeExitTime](018_TradeMode.md) in a TMF, or indirectly by updating the life time of open trades with the [MaxLong/Short](190_Margin_Risk_Lots.md) mechanism.
*   **LifeTime** and **EntryTime** units are bar periods and not affected by [TimeFrame](177_BarPeriod_TimeFrame.md).
*   **OrderDelay** can prevent that orders are entered on minute/hour boundaries when many automated systems open their positions and cause high slippage. This can achieve a better entry price, especially when combined with an [entry limit](188_Stop_Profit_Trail_Entry.md). **OrderDelay** can also be used for inserting artificial delays between trades that are opened at the same bar. A delay of about 30 seconds between trades is often required by trade copy services such as ZuluTrade™, or useful for opening large positions in several steps ('iceberg trades').
*   **OrderDelay** is not recommended in combination with [Virtual Hedging](hedge.htm#). As it opens and closes trades not at bar boundaries, it can cause trades to be opened and closed shortly afterwards by another trade in opposite direction after the given delay. This causes loss of spread and commission.
*   The effect of **OrderDelay** on the performance is simulated in [TICKS](018_TradeMode.md) mode only. For simulating **OrderDuration**, use **TICKS** mode and pending trades in the backtest.

### Examples (see also Grid.c and Hacks&Tricks):

```c
_// Use an entry limit and an entry delay for not entering trades at the same time
// Call this function before entering a trade_
void setDelay(var Seconds)
{
	static int PrevBar = 0;
	static var Delay = 0;
	if(Bar != PrevBar) { _// reset delay at any new bar_
		Delay = 0;
		PrevBar = Bar;
	}
	Delay += Seconds; _// increase delay within the bar_
	OrderDelay = Delay;
	Entry = -0.2\*PIP \* sqrt(Delay); _// entry limit for additional profit_
}
```

### See also:

[bar](005_Bars_and_Candles.md), [enterLong/](buylong.md)[Short](buylong.md), [Stop](188_Stop_Profit_Trail_Entry.md), [Entry](188_Stop_Profit_Trail_Entry.md), [TickTime](187_TickTime_MaxRequests.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))