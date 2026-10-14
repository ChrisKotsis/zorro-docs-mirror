---
title: "Deribit"
source: "https://zorro-project.com/manual/en/deribit.htm"
---

# Deribit

# Deribit Plugin

**[Deribit](https://www.deribit.com/)** is a cryptocurrency derivatives exchange. It trades futures and options on Bitcoin (BTC) and Etherium (ETH). For speed reasons the Deribit plugin uses uses the Websocket API for most functionality and REST for historical data. Deribit has a production and a test API; the plugin connects in real mode to the production API and in test mode to the testnet API.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>Client ID</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>Client Secret</td></tr></tbody></table>

[Accounts.csv](013_Asset_Account_Lists.md) example entry:

<table cellpadding="2" cellspacing="0" class="auto-style2"><tbody><tr><td class="auto-style1" style="height: 19px"><strong>Name</strong></td><td class="auto-style1" style="height: 19px"><strong>Server</strong></td><td class="auto-style1" style="height: 19px"><strong>Account</strong></td><td class="auto-style1" style="height: 19px"><strong>User</strong></td><td class="auto-style1" style="height: 19px"><strong>Pass</strong></td><td class="auto-style1" style="height: 19px"><strong>Assets</strong></td><td class="auto-style1" style="height: 19px"><strong>CCY</strong></td><td class="auto-style1" style="height: 19px"><strong>Real</strong></td><td class="auto-style1" style="height: 19px"><strong>NFA</strong></td><td class="auto-style1" style="height: 19px"><strong>Plugin</strong></td></tr><tr><td class="auto-style1" style="height: 22px">Deribit-Real</td><td class="auto-style1" style="height: 22px">Production</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">AssetsDeribit</td><td class="auto-style1" style="height: 22px">USD</td><td class="auto-style1" style="height: 22px">1</td><td class="auto-style1" style="height: 22px">14</td><td class="auto-style1" style="height: 22px">Deribit.dll</td></tr><tr><td class="auto-style1" style="height: 22px">Deribit-Demo</td><td class="auto-style1" style="height: 22px">Testnet</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">AssetsDeribit</td><td class="auto-style1" style="height: 22px">USD</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">14</td><td class="auto-style1" style="height: 22px">Deribit.dll</td></tr></tbody></table>

### Deribit asset symbols

Deribit has 4 types of symbols: Index, Perpetual Futures, Futures, and Options.  
  
Index: Coin name, either "BTC" or "ETH".  
Perpetual Futures: \[Coin\]-PERPETUAL, e.g. "ETH-PERPETUAL".  
Futures: \[Coin\]-DDMMMYY, where MMM is a 3-letter capitalized string, e.g. "BTC-26MAR21".  
Options: \[Coin\]-DDMMMYY-\[Strike\]-\[P/C\], e.g. "ETH-25JUN21-340-C".  
For options and futures, the [contract](096_contract.md) functions can be used with "BTC" or "ETH" as the underlying.

### Supported broker commands

The Deribit plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_AMOUNT**
*   **GET\_MAXTICKS**
*   **SET\_SYMBOL** ("BTC" or "ETH")
*   **GET\_BOOK**  (selected/subscribed assets only, otherwise no output)
*   **SET\_DIAGNOSTICS**
*   **GET\_COMPLIANCE**
*   **GET\_DELAY**
*   **SET\_DELAY** (affects only REST requests)
*   **GET\_WAIT**
*   **SET\_WAIT**
*   **DO\_CANCEL**
*   **SET\_ORDERTYPE** (default=GTC, 2=GTC, 10=FOK, 11=IOC)
*   **GET\_POSITION**
*   **GET\_OPTIONS**
*   **GET\_FUTURES**
*   **GET\_TRADES**

### Known Deribit API issues

*   **Rate limitation.** Deribit has a strange and complex rate limiting policy. To avoid bans, **SET\_DELAY** was preconfigured to sufficiently slow responses. **SET\_DELAY** affects all REST requests, but no websocket streams.   
      
*   **Asset parameters.** All data besides spread and price must be manually entered in the [asset list](013_Asset_Account_Lists.md). Example entries:  
    ```c
    Name,Price,Spread,RollLong,RollShort,PIP,PIPCost,MarginCost,Leverage,LotAmount,Commission,Symbol
    BTC,57125,3.5,0,0,0.0001,0.0001,0,0,0.0001,0,\*
    BTC-PERPETUAL,57125,3.5,0,0,0.05,0.0000111643,0.0000022329,0,10,-0.25,\*
    BTC-26MAR21,57125,3.5,0,0,0.05,0.0000111643,0.0000022329,0,10,-0.25,\*
    ETH,1991,0.05,0,0,0.0001,0.0001000000,0,0,0.0001,0,\*
    ETH-PERPETUAL,1991,0.05,0,0,0.05,0.0000011164,0.0000004466,0,1,-0.25,\*
    ETH-26MAR21,1991,0.05,0,0,0.05,0.0000011164,0.0000004466,0,1,-0.25,\*
    ```
    
*   **Orders.** Deribit requires the [NFA](018_TradeMode.md) flag. The default order type is GTC; other order types are supported, but rejected under many circumstances. You need BTC funds to trade BTC derivatives and ETH funds to trade ETH derivatives. For futures the order volume is in USD of the underlying, multiples of 10 for BTC and multiples of 1 for ETH. Quotes are in BTC/USD and ETH/USD. For options: the order volume is in BTC of underlying. Premiums are in BTC.

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [Binance](219_Binance.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))