---
title: "Spread, Commission, ..."
source: "https://zorro-project.com/manual/en/spread.htm"
---

# Spread, Commission, ...

# Asset parameters 1 - profits and costs

## Spread

Difference between [ask and bid price](trading101.htm#spread) of the current [asset](013_Asset_Account_Lists.md); by default taken from the [asset list](013_Asset_Account_Lists.md) when offline, or from the current ask and bid price when connected to a broker. The trade profit is reduced by the spread. For using historical spreads in the backtest, set **Spread = [marketVal()](022_Price_History.md);** before entering or exiting a trade. For a backtest with no transaction costs, set **Spread = 0**. **Spread** is ignored for [Options and futures](096_contract.md) that use the ask-bid spread of the selected contract. **Spread** is also ignored in binary trading mode ([BINARY](mode.md) flag). 

## Slippage

Simulated slippage in seconds (default = **5**), effective in \[Test\] mode for entering and exiting trades and for entry and exit limits. Has no effect on [contracts](096_contract.md), in \[Train\] mode, in 'naive' [Fill](198_Fill_modes.md) mode, or when **Penalty** is nonzero. Slippage is simulated by filling orders not at the current price, but at the most likely price after the given number of seconds. The price is estimated by extrapolation of the next candle. Different bar periods and bar offsets therefore produce different slippage, but of similar magnitude. The larger the **Slippage** variable, the larger is the price range and thus the fill price deviation from the current price.  
   Slippage has normally a negative effect on trend trading systems, but can also be in favor of the trader, especially with counter-trend or mean-reversion systems. It is recommended to test systems with and without slippage for determining its effect on the result. **Slippage** at **0** disables extra slippage, but entry, stop, or takeprofit fill prices can still deviate from the given limit (see [Fill](fill.md) algorithm). Setting **Slippage** to a negative amount simulates asymmetric slippage that is always in adverse direction. 

## Penalty

Alternative fixed slippage in counter currency units, for special purposes (default = **0**). Puts a 'penalty' on open and close prices of subsequent trades. Effective in \[Test\] and \[Train\] modes for entering and exiting trades and for entry and exit limits. Overrides the slippage simulation and the [fill algorithm](198_Fill_modes.md) when nonzero. Positve penalty reduces the trade profit, negative penalty increases it.

## Commission

Broker's fee for opening and closing a trade, taken from the [asset list](013_Asset_Account_Lists.md), in account currency units per 10000 contracts for currencies, per contract for all other assets, per underlying unit for options, or as percent of the trade volume when negative. The trade profit is reduced by this amount when the position is closed. Commission is automatically reduced by 50% for expired [options](096_contract.md) (since fees are usually not charged for expiration), and is initialized to zero in [binary](018_TradeMode.md) trading mode (since binary brokers get their commission via payout, see below). When set in the script, it must be set individually for every traded asset. Commission is equivalent to an additional spread with a size in pips of **Commission\*LotAmount/10000/PIPCost** for currencies, and **Commission\*LotAmount/PIPCost** for all other assets. If a negative percent value is given (f.i. **\-0.25** for 0.25%), the commission of a trade is **\-Percent/100 \* PIPCost/PIP \* Price \* Lots**.  

## RollShort

## RollLong

Daily rollover interest (also called **'swap**') per 10000 contracts for currencies, or per contract for all other assets. Taken from the [assets list](013_Asset_Account_Lists.md) when offline, otherwise the broker's current rollover value is used when provided by the API. The rollover is daily interest paid to or received from the broker for borrowing or lending margin. For instance, when you hold a EUR/USD long position, you receive interest from the broker for lending the EUR and pay interest for borrowing the USD - the difference is the rollover. Negative rollover contributes to the losses, positive rollover to the profits. As to be expected, negative rollover values are more frequent and greater than positive rollover values. For CFDs, rollover is usually trend compensating - for instance, upwards trending index CFDs get a negative **RollLong** for eliminating long-term trend profit. Rollover can affect the performance of long-term strategies and cause an asymmetry between long and short trades when positions are hold for several weeks.  

## Interest

Annual interest on margin loan, in percent; reduces the account balance in the simulation. Set this in the script when interest is not calculated per swap/rollover, but per total maintenance margin. Usual values (2019) are 1.5% for EUR accounts and 3% for USD accounts. The interest calculation assumes no rollover and equal leverage of all traded assets.  

## PriceOffset

Amount added to historical or live prices of the current asset, for special purposes such as shifting negative prices to the positive scale. Set it after selecting the asset, but before loading history for affecting historical prices. Set **Detrend = NOPRICE** for preventing that negative prices are treated as erroneous.

## WinPayout

## LossPayout

Payout in percent of the invested [Margin](190_Margin_Risk_Lots.md) for binary trading ([set(BINARY)](018_TradeMode.md)). Winning trades win the invested amount plus the **WinPayout**, losing trades lose the invested amount minus the **LossPayout**. The payout variables must be set individually for every traded asset. **Spread** and **Commission** should be set to **0** for normal binary trades.

### Type:

**var**

### Remarks:

*   The accumulated trading costs by spread, slippage, commission and rollover interest are displayed on the [Performance Report](012_Performance_Report.md).
*   When Zorro is connected to a broker, it loads the current asset parameters, including transactions costs, from the broker API. When not connected, or when asset parameters are not available online, they are loaded from the [Asset List](013_Asset_Account_Lists.md). This file can be selected or edited with a text editor for simulating different brokers, accounts, and assets in backtests.
*   Spread and transaction costs are asset specific. The asset must be selected with [asset()](013_Asset_Account_Lists.md) before modifying any asset specific parameters.
*   The roundturn cost of a currency pair trade - without rollover and slippage - is **Lots\*(Commission\*LotAmount/10000 + Spread\*PIPCost/PIP)**. For all other assets it's **Lots\*(Commission\*LotAmount + Spread\*PIPCost/PIP)**.
*   Transaction costs can be disabled for test purposes. For a simulation with no slippage and costs at all, enter the following command after selecting the asset: **Spread = Commission = RollLong = RollShort = Slippage = Penalty = 0**. [Fill mode](198_Fill_modes.md) can be set at 0 for closing all trades exactly at the stop or profit limit.
*   For complex commission calculations that are neither a flat fee nor a percentage, calculate commission in the script and set the **Commission** variable to the result before entering a trade. For instance, when the total commission is a fixed 1$ when buying less than 50 shares, and 2 cents per share otherwise, set **Commission = ifelse(Lots < 50, 1.0/Lots, 0.02);**.
*   **RollLong/Short** is added to the trading cost in \[Test\] and \[Train\] mode for any trade that was longer open than 12 hours at any new day, including Saturday and Sunday. This is only an approximation to the real rollover cost, as brokers have many different algorithms to calculate rollover. If you need to simulate rollover very precisely, use a [data set](125_sortData_sortIdx.md) of historical rollover costs, and add them to the trading costs by script using the broker's algorithm.
*   **Interest** is subtracted from the account balance in \[Test\] and \[Train\] mode on any trading day at a rate of 1/252 of the annual interest.  If you need to simulate interest very precisely, adapt it to historical riskfree yield rates as retrieved with the [yield](096_contract.md) function.
*   In live trading, slippage is caused by the delay between the price quote that triggers the trade signal, and the order execution. A large contribution to slippage is Internet latency, between 10 and 1000 ms dependent on server location. Broker servers can add up to 30 seconds to latency. It was reported that MT4 and MT5 servers are set up by some brokers to generate artificial latency and slippage for entering and exiting at less favourable prices. Zorro trade handling and script code does not noticeably contribute to latency.
*   Since spread and rollover are taken from an 'account snapshot' when the asset list was generated, they can be very different to the current, as well as to historical spread and rollover. This can falsify backtests f.i. when trades are open a long time and accumulate a large rollover. For being on the safe side, set **RollShort** and **RollLong** to their minimum (**RollLong = RollShort = min(RollLong,RollShort);**) and **Spread** to a high percentile of a one-day sample.

### Examples:

```c
_// ignore broker spread, set constant spread for performance calculation_ 
Spread = 3\*PIP; 

_// allow negative prices by shifting them to the positive range_
assetAdd("Neg"); _// select asset with negative prices_
Detrend = NOPRICE; _// prevent treating them as erroneous_
PriceOffset = 1000; _//  shift them_
asset("Neg"); _// load the shifted prices_
```

### See also:

[enterLong/Short](buylong.md), [price](022_Price_History.md), [Stop](188_Stop_Profit_Trail_Entry.md), [](timewait.md)[Lots](190_Margin_Risk_Lots.md), [Margin](190_Margin_Risk_Lots.md), [PIP](192_PIP_PIPCost_Leverage.md), [asset lists](013_Asset_Account_Lists.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))