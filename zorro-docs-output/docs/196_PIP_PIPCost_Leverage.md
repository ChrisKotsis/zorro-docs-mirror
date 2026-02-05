---
title: "PIP, PIPCost, Leverage, ..."
source: "https://zorro-project.com/manual/en/pip.htm"
---

# PIP, PIPCost, Leverage, ...

# Asset prices and parameters 2

## PIP

The minimum price step of the current [asset](013_Asset_Account_Lists.md) in units of the counter currency, f.i. **0.0001** for **EUR/USD**, or **0.01** for a stock in dollars, or **0.25** for the E-Mini S&P futures contract. Also named point size or tick size. Can be used to set a price limit in pips, f.i. **Stop = 10\*PIP**. For converting a price difference to pips, divide it by **PIP**.

## PIPCost

Value of 1 pip profit or loss per [lot](lots.htm#lot) in units of the account currency; determined by the lot size (**LotAmount**) and the exchange rate of account currency and counter currency. This value should normally remain constant during the simulation for not adding artifacts to the strategy performance figures; but if desired for special purposes, it can be calculated by script to fluctuate with the exchange rate (see example below). When the asset price rises or falls by **x**, the equivalent profit or loss in account currency is **x \* Lots \* PIPCost/PIP**. The counter currency exchange rate - its value in account curreny units - is **PIPCost / (PIP \* LotAmount)**.

## MarginCost

Required margin for puchasing and holding 1 [lot](lots.htm#lot) of the current asset in units of the account currency.Either directly taken from the asset list, or calculated from the leverage by **MarginCost = Asset price \* PIPCost / PIP / Leverage**. The number of lots at a given margin is **[Margin](190_Margin_Risk_Lots.md) / MarginCost**. For options and futures, **MarginCost** is calculated per underlying unit. The variable is updated in real time when the asset list contains a negatve MarginCost parameter that represents [Leverage](013_Asset_Account_Lists.md). For special margin requirements, f.i. for covered options or [option combos](096_contract.md), set this variable in the script to the maximum of initial, maintenance, and end-of-day margin per underlying unit before entering the trade.

## Leverage

Asset value divided by margin cost. Determines the account's buying power, i.e. the asset amount that can be purchased with account currency. **MarginCost** and **Leverage** can be converted into each other:  **Leverage** = **Asset price \* LotAmount \* CCValue / MarginCost** or **Leverage = Asset price \* PIPCost / PIP / MarginCost**, where **CCValue** is the value of the counter currency in account currency units. For brokers that support the [SET\_LEVERAGE](113_brokerCommand.md) command, **Leverage** and **MarginCost** must be set on the fly before entering a trade.

## LotAmount

The number of units or contracts per [Lot](lots.htm#lot) with the current asset. Determines the minimum order size and can depend on the account. For stock options,  **LotAmount** is the multiplier (normally **100**). For currencies, the lot amount of a micro lot account is **1000** units; of a mini lot account **10000** units; and of a a standard lot account **100000** units. Some brokers offer also lot sizes that are a fraction of a contract, f.i. **0.1** contracts per lot for CFDs or diginal coins. Some brokers, especially for digital coins, allow arbitrary lot amounts and support the [SET\_AMOUNT](113_brokerCommand.md) broker command.

## LotLimit

Maximum number of [Lots](lots.htm#lot) with the current asset (default: **1000000000/LotAmount**). Can be set to a smaller number for safety reasons. If the number of lots exceeds this limit, for instance due to a script bug, the order is not executed and an error message is issued.

## InitialPrice

The initial asset price taken from the [asset list](013_Asset_Account_Lists.md). Can be set to the first historical price and used to adapt parameters (such as **MarginCost**) to asset price changes in the backtest (f.i. **MarginCost = InitialMarginCost \* priceClose() / InitialPrice**). 

## AskPrice

The last ask price of the current asset.

## BidPrice

The last bid price of the current asset.

## AskSize

The last ask volume of the current asset in live trading mode (if available) or in a backtest with [T2 data](history,htm).

## BidSize

The last bid volume of the current asset in live trading mode (if available) or in a backtest with [T2 data](history,htm). 

### Type:

**var**, **read/only** if not mentioned otherwise (edit the [Asset List](account.md) for permanently changing asset parameters).

## AssetBar

Bar number of the last received price quote of the current [asset](013_Asset_Account_Lists.md), from **1** (first bar) up to **[Bar](180_Bar_NumBars.md)** (current bar). Can be used to determine if there was a quote in the current bar.

### Type:

**int**, read/only  
 

### Remarks:

*   Asset specific parameters are only valid after selecting the [asset](013_Asset_Account_Lists.md).
*   When Zorro is connected to a broker, it loads the current asset parameters from the broker's server if available. Otherwise they are taken from the current [asset list](013_Asset_Account_Lists.md) (normally **History\\AssetsFix.csv**). The asset list can be edited with a spreadsheet program or a text editor for simulating different brokers, accounts, and assets in backtests; or it can be automatically updated to the parameters of the current broker account.

### Examples:

```c
**_// set stop / profit target at a fixed pip distance_
Stop = 10\*PIP**;  
TakeProfit = 40\*PIP;
```
```c
_// let profits fluctuate with the account currency_ _exchange rate_
function convertProfits(string Rate)  
{  
  char OldAsset\[15\]; 
  strcpy(OldAsset,Asset); _// store original asset_  
  if(!asset(Rate)) return;  
  var Price = price();  
  asset(OldAsset);  
  if(Price > 0.)  
    PIPCost = PIP\*LotAmount/Price;  
}

_// call this function from run(), f.i._ 
convertProfits("EUR/USD"); _// when account currency = EUR and counter currency = USD._
```

### See also:

[Stop](188_Stop_Profit_Trail_Entry.md), [Spread](191_Spread_Commission.md), [Lots](190_Margin_Risk_Lots.md), [price](022_Price_History.md), [asset](013_Asset_Account_Lists.md), [asset parameters](013_Asset_Account_Lists.md), [EasyLanguage parameters](021_Conversion_from_other_platforms.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))