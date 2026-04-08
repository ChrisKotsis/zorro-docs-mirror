---
title: "Kraken"
source: "https://zorro-project.com/manual/en/kraken.htm"
---

# Kraken

# Kraken

**Kraken** is a San Francisco based digital currency broker. It supports about 40 crypto currencies and allows algorithmic trading with leverage and shorting. It offers a REST API and a Websocket API. For speed reasons, the Kraken plugin for Zorro uses Websocket whenever possible. Real mode and Demo mode is available, the latter for simulated trading only.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>Primary account currency, f.i. USD or XBT</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>PublicKey(space)PrivateKey</td></tr></tbody></table>

[Accounts.csv](013_Asset_Account_Lists.md) example entry:

<table cellpadding="2" cellspacing="0" class="auto-style2"><tbody><tr><td class="auto-style1" style="height: 19px"><strong>Name</strong></td><td class="auto-style1" style="height: 19px"><strong>Server</strong></td><td class="auto-style1" style="height: 19px"><strong>Account</strong></td><td class="auto-style1" style="height: 19px"><strong>User</strong></td><td class="auto-style1" style="height: 19px"><strong>Pass</strong></td><td class="auto-style1" style="height: 19px"><strong>Assets</strong></td><td class="auto-style1" style="height: 19px"><strong>CCY</strong></td><td class="auto-style1" style="height: 19px"><strong>Real</strong></td><td class="auto-style1" style="height: 19px"><strong>NFA</strong></td><td class="auto-style1" style="height: 19px"><strong>Plugin</strong></td></tr><tr><td class="auto-style1" style="height: 22px">Kraken-XBT</td><td class="auto-style1" style="height: 22px">Kraken</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">XBT</td><td class="auto-style1" style="height: 22px">PublicKey PrivateKey</td><td class="auto-style1" style="height: 22px">AssetsKraken</td><td class="auto-style1" style="height: 22px">XBT.B8</td><td class="auto-style1" style="height: 22px">1</td><td class="auto-style1" style="height: 22px">14</td><td class="auto-style1" style="height: 22px">Kraken.dll</td></tr></tbody></table>

### Kraken asset symbols

The Kraken plugin requires symbols in the usual form XXX/YYY, where YYY is the counter currency and XXX the currency to trade.

Volume is per-bar volume in historical data, accumulated session volume in live data.

### Supported data and commands

The Kraken plugin supports the following additional data streams:

*   [marketVal](022_Price_History.md): Not supported in historical data, bid-ask spread in live data.
*   [marketVol](022_Price_History.md): Trade volume per minute in historical M1 data; accumulated volume since midnight in live data.

The Kraken plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_AMOUNT**
*   **GET\_MAXTICKS**
*   **SET\_SYMBOL**
*   **GET\_BOOK**
*   **SET\_DIAGNOSTICS**
*   **GET\_COMPLIANCE**
*   **GET\_DELAY**
*   **SET\_DELAY**
*   **GET\_WAIT**
*   **SET\_WAIT**
*   **DO\_CANCEL**
*   **SET\_ORDERTYPE** (0=IOC, 2=GTC)
*   **SET\_LEVERAGE** (some coins only, see website)
*   **GET\_POSITION** (currency only; returns the balance of the given currency. See **GET\_ALL\_BALANCES**).

The following additional custom commands are supported:

*   **6001 (DO\_CANCEL\_ALL\_ORDERS)** - Indiscriminately closes all open orders on the account.
*   **6000 (GET\_ALL\_BALANCES)** - Reads all currency balances, see below.

Usage of the custom commands in Zorro scripts:  

```c
#define GET\_ALL\_BALANCES 6000  
#define DO\_CANCEL\_ALL\_ORDERS 6001  
typedef struct KRAKEN\_BALANCE {  
   char sCurrency\[8\];  
   double vBalance;  
} KRAKEN\_BALANCE;  
...

KRAKEN\_BALANCE KrakenBalances\[100\]; 
brokerCommand(GET\_ALL\_BALANCES,KrakenBalances);
```
  

### Known Kraken API issues

*   **Rate upper limit.** Kraken has a strange and complex rate limiting policy. To avoid bans, **SET\_DELAY** was preconfigured to sufficiently slow responses. **SET\_DELAY** affects all REST requests, but no open websocket streams.   
       
    
*   **Rate lower limit.** The Kraken server will time out when no price requests are received for a certain time. On scripts with long bar periods, make sure to reduce [TickTime](187_TickTime_MaxRequests.md) so that a price request is sent at least every 1..5 seconds (f.i.**TickTime = 250;**).  
      
*   **Asset parameters.** All data besides spread and price must be manually entered in the asset list. **PIP** size and **LotAmount** can be set arbitrarily, but Kraken has minimum lot sizes for some assets. Lots sizes and leverages can be taken from the [Kraken website](https://support.kraken.com/hc/en-us/articles/227876608-Margin-trading-pairs-and-their-maximum-leverage) and converted to the corresponding lot amounts and margin percentages (f.i. Leverage 5 = 20%). Example [asset list](013_Asset_Account_Lists.md) entries with leverages:  
    ```c
    BCH/USD,0.53794,0.0001,0,0,0.0001,0.0001,-33.33,0,0.00001,-0.25,\*
    ETH/USD,450.2,0.01,0,0,0.01,0.01,-20,0,0.00001,-0.25,\*
    ETH/XBT,0.0292241,0.00001,0,0,0.00001,0.00001,-20,0,0.00001,-0.25,\*
    LTC/ETH,0.13093,0.00001,0,0,0.00001,0.00001,0,0,0.00001,-0.25,\*
    LTC/USD,179,0.01,0,0,0.01,0.01,-33.33,0,0.00001,-0.25,\*
    LTC/XBT,0.003834,0.000001,0,0,0.000001,0.000001,-33.33,0,0.00001,-0.25,\*
    XBT/USD,44785.8,3.3,0,0,0.01,0.01,-20,0,0.00001,-0.25,\*
    ```
    
*   **Orders.** Kraken requires the [NFA](018_TradeMode.md) flag. Lot amounts are not fixed, but assets have individual minimum order sizes that can be found on the Kraken website. If less than the minimum size is ordered, the order is rejected with an error message like **"Invalid arguments:volume"**. Some assets support variable leverage that can be set up in the asset list as above, or with the [Leverage](192_PIP_PIPCost_Leverage.md) variable directly before entering the trade. Shorting an asset is usually only possible at leverage 2 or above.   
       
    
*   **Trading hours.** Kraken trades 24/7. For trading on the weekend, set [BarMode](200_BarMode.md) accordingly in your script.  
     

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [Binance](219_Binance.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))