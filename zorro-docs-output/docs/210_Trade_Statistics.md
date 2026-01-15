---
title: "Trade Statistics"
source: "https://zorro-project.com/manual/en/winloss.htm"
---

# Trade Statistics

# Trade statistics

The following system variables can be used to obtain trade statistics separately per asset, algorithm, and long/short trade direction. They can be evaluated in real time while trading, or at the end of a simulation cycle for calculating statistics in \[Test\] mode. All parameters are read/only. Most come in three flavors:

**...Long**: Results of all long trades with the current [asset](013_Asset_Account_Lists.md) and [algorithm](095_algo.md). Including [phantom trades](190_Margin_Risk_Lots.md), but not including [pool trades](019_Hedge_modes.md).  
**...Short**: Results of all short trades with the current asset and algorithm, including phantom trades, but no pool trades.  
**...Total**: Results of all trades with all assets and algorithms, not including phantom trades.

In \[Test\] mode the **...Long** and **...Short** results are from the current sample cycle only, which allows to produce statistics distributions of sample cycles. If the [ALLCYCLES](allcycles.md) flag is set, the **...Long** and **...Short** results are summed up from the all sample cycles. The **...Total** results are always summed up.

A set of overall [strategy statistics](116_Statistics_Transformations.md) is available after the end of a simulation, and can be evaluated in the [objective](107_optimize.md) or the [evaluate](137_evaluate.md) function. For calculating various statistics of the last N trades, use the [results](104_results.md) function.  
 

## WinLong

## WinShort

## WinTotal

Sum of profits of all trades won so far. When using [oversampling](numsamplecycles.md) or [phantom trades](190_Margin_Risk_Lots.md), **WinLong** or **WinShort** can be higher than **WinTotal**. 

## PipsTotal

Profit of all won trades minus loss of all lost trades, in volume neutral PIP units. For converting a component profit to a profit in average PIP units, multiply it with **PipsTotal/(WinTotal-LossTotal)**.

## LossLong

## LossShort

## LossTotal

Sum of losses by all trades lost so far. The accumulated balance, i.e. the return of all closed trades is **WinTotal - LossTotal**. **WinTotal** or **LossTotal** can be modified by script for simulating additional wins or losses in the backtest. The current profit factor, clipped at 10, is **ifelse(LossTotal > 0,WinTotal/LossTotal,10)**.

## LossGlobal

Sum of losses by all trades of all Zorro instances that have set the [ScholzBrake](lots.htm#scholz) and are trading real accounts on the same PC. This variable is only available in \[Trade\] mode. It is increased by any loss, and updated to the other Zorro instances once per bar and on any trade.

## WinValLong

## WinValShort

## WinValTotal

Open profit of all currently winning trades.

## LossValLong

## LossValShort

## LossValTotal

Open loss amount of all currently losing trades. The accumulated equity, i.e. the current profit of all open and closed trades is **WinTotal - LossTotal + WinValTotal - LossValTotal**.

## PipsValTotal

Open profit of all open trades in volume neutral PIP units. For converting a component open profit to a profit in average PIP units, multiply it with **PipsValTotal/(WinValTotal-LossValTotal)**. 

## ProfitClosed

Realized component profit so far; **WinLong-LossLong+WinShort-LossShort**.

## ProfitOpen

Unrealized component profit so far; **WinValLong-LossValLong+WinValShort-LossValShort**.

## ProfitTotal

Realized and unrealized total profit so far; **WinTotal-LossTotal+WinValTotal-LossValTotal**. .

## WinMaxLong

## WinMaxShort

## WinMaxTotal

Maximum profit of a trade so far.

## LossMaxLong

## LossMaxShort

## LossMaxTotal

Maximum loss of a trade so far.

## NumWinLong

## NumWinShort

## NumWinTotal

Number of trades closed with a profit so far, including partially closed trades. The average return per profitable trade is **WinTotal/NumWinTotal**.

## NumLossLong

## NumLossShort

## NumLossTotal

Number of trades closed with a loss so far, including partially closed trades. The average return per trade is **(WinTotal-LossTotal)/(NumWinTotal+NumLossTotal)**. The total number of closed trades is **NumWinTotal+NumLossTotal**.

## LossStreakLong

## LossStreakShort

## LossStreakTotal

Current number of losses in a row, or **0** if the last trade was a winner. Can be reset by script.

## WinStreakLong

## WinStreakShort

## WinStreakTotal

Current number of wins in a row, or **0** if the last trade was lost. Can be reset by script.

## LossStreakValLong

## LossStreakValShort

## LossStreakValTotal

Accumulated loss of the current loss streak, or **0** if the last trade was a winner.

## WinStreakValLong

## WinStreakValShort

## WinStreakValTotal

Accumulated profit of the current win streak, or **0** if the last trade was lost.

## NumWinningLong

## NumWinningShort

Number of currently open winning trades with the current asset and algorithm, including phantom trades.

## NumLosingLong

## NumLosingShort

Number of currently open losing trades with the current asset and algorithm, including phantom trades.

## NumOpenLong

## NumOpenShort

Number of currently open trades with the current asset and algorithm, including phantom trades.

## NumLongTotal

## NumShortTotal

## NumOpenTotal

## NumOpenPhantom

Numbers of currently open trades with all assets and algorithms. The total open volume can be determined through [MarginTotal](193_Balance_Equity.md) and the account leverage.

## NumPendingLong

## NumPendingShort

## NumPendingTotal

Number of currently pending trades, i.e. trades that have just been entered, or that have not yet reached their [Entry](188_Stop_Profit_Trail_Entry.md) Stop or Limit within their [EntryTime](timewait.md) period. **NumPendingTotal** includes pending phantom trades in [Virtual Hedging](019_Hedge_modes.md) mode, as they also trigger real trades.

## NumRejected

Number of rejected open or close orders in live trading, due to lack or market liquidity, broker connection failure, market closures, holidays, or other reasons.

## LotsPool

## LotsVirtual

## LotsPhantom

Open position of the current asset, positive when long and negative when short. The variables hold the difference of long and short open lots of real trades (**LotsPool**), virtual trades in [virtual hedging](019_Hedge_modes.md) mode (**LotsVirtual**), and phantom trades (**LotsPhantom**). Only for the underlying, not for positions of [options](096_contract.md) and [combos](097_combo.md). Open account positions can be read from the broker API with the [GET\_POSITION](113_brokerCommand.md) command. 

### Type:

**int** for numbers that count something, otherwise **var**.

### Remarks:

*   The parameters are part of the **GLOBALS** struct and the **STATUS** structs. They are defined in **include\\variables.h**.
*   The parameters are only affected by trades opened with the current Zorro instance. Trades opened manually or with other platforms on the same account do not affect the trade statistics parameters.
*   The parameters are updated once per bar. Therefore they can be inaccurate when trades are opened or closed immediately before reading the variables, but are correct again at the next bar.
*   Every [algo](095_algo.md) and [asset](013_Asset_Account_Lists.md) call changes the component-dependent **...Long** and **...Short** statistics variables. They are set to the statistics of the selected asset and algorithm identifier. The **...Total** statistics variables are unaffected by [algo](095_algo.md) and [asset](013_Asset_Account_Lists.md) calls.
*   In a [TMF](018_TradeMode.md) or [trade loop](fortrades.md), the asset is automatically set to the asset of the trade, but the algo is not. For evaluating component-dependent statistics of a trade, select the trade algo by **algo(TradeAlgo);** (even when no different algos are used).
*   If a backtest or training runs over several [bar cycles](numsamplecycles.md), the **...Long** and **...Short** statistics variables are taken from the last bar cycle, while the [](numsamplecycles.md)**...Total** statistics variables are taken from the average of all bar cycles.
*   Win/loss metrics can be calculated from the above parameters. For instance, **AvgWin = WinValTotal/WinTotal; AvgLoss = LossValTotal/LossTotal; WinRate = WinTotal/(var)LossTotal** (check divisors for zero!). Trade-dependent metrics can be calculated by enumerating trades with [for(open\_trades)](fortrades.md) or [for(all\_trades)](fortrades.md), or with the [results](104_results.md) function. Asset-dependent metrics can be calculated with a [for(assets)](fortrades.md) loop that enumerates all assets used in the system.
*   Trade statistics are reset when the strategy is restarted. For preventing this, store them at the end of a live session and resume them in the next session with **setf(SaveMode,[SV\_STATS](loadstatus.md))**.

### Example:

```c
_// suspend trading after 4 losses in a row  
_if(LossStreakShort >= 4 || LossStreakLong >= 4)   
  setf(TradeMode,TR\_PHANTOM); _// phantom trades_  
else 
  resf(TradeMode,TR\_PHANTOM); _// normal trading_
```

### See also:

[Trade parameters](018_TradeMode.md), [Balance](193_Balance_Equity.md), [Lots](190_Margin_Risk_Lots.md), [for(trades)](fortrades.md), [strategy statistics](116_Statistics_Transformations.md), [performance report](012_Performance_Report.md), [results](104_results.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))