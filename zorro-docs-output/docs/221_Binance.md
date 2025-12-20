---
title: "Binance"
source: "https://zorro-project.com/manual/en/binance.htm"
---

# Binance

#   Binance Plugin

**Binance** is a Shanghai founded digital currency exchange that supports about 200 crypto currencies and partially free API access. The Binance API plugin ([Zorro S](restrictions.md) required) can be used to trade cryptocurencies with or without a Binance account; in the latter case only price data and history is available.  For trading **Binance Futures** a [different plugin](binancefutures.md) is available. 

For opening a Binance account, visit [https://binance.com/](https://binance.com/) and apply. Demo accounts are not available - you must really deposit some bitcoin or dollar amount. You can set up the bitcoin symbol and the number of decimals to display in prices in the [account list](013_Asset_Account_Lists.md). For acessing your account via API, you must have 2-factor authentication enabled, and need a public and a private key since all API commands must be hash signed. The steps:

*   Register on Binance, open an account, and log in. Activate 2-factor authentication.
*   On your account page, select API, then Create New Key to create your API key.

You're now all set to trade with the Binance plugin. The plugin uses API version v3 for trading, and v1 for history.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>&nbsp; Binance API key, or empty for accessing live prices only</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>&nbsp; Binance Secret, or empty for accessing live prices only</td></tr></tbody></table>

[Accounts.csv](013_Asset_Account_Lists.md) example entry:

<table cellpadding="2" cellspacing="0" class="hidden-xs"><tbody><tr><td><strong>Name</strong></td><td><strong>Server</strong></td><td><strong>AccountId</strong></td><td><strong>User</strong></td><td><strong>Pass</strong></td><td><strong>Assets</strong></td><td><strong>CCY</strong></td><td><strong>Real</strong></td><td><strong>NFA</strong></td><td><strong>Plugin</strong></td></tr><tr><td>Binance</td><td>https://api.binance.com/api/</td><td>BTC</td><td>p56FCpjgjK8untAd</td><td>btlBm98grhROzJ</td><td>AssetsBinance</td><td>BTC.B8</td><td>1</td><td>14</td><td>Binance.dll</td></tr></tbody></table>

### Binance asset symbols

The Binance plugin requires symbols in the usual forms XXX/BTC or XXXBTC, where BTC is the exchange account currency and XXX the currency to trade. An asset list **AssetsBinance.csv** with the main cryto currencies is included.

### Supported broker commands

The Binance plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_PATCH**
*   **SET\_DELAY**
*   **GET\_DELAY**
*   **SET\_WAIT**
*   **GET\_WAIT**
*   **GET\_COMPLIANCE**
*   **SET\_SERVER** (default: **https://api.binance.com/api/**)
*   **SET\_AMOUNT**
*   **GET\_POSITION** (single coins only, no pairs)
*   **GET\_MAXREQUESTS**
*   **GET\_MAXTICKS**
*   **SET\_ORDERTYPE** (limit orders only; 0 = FOK, 1 = IOC, 2 = GTC, +4 = LIMIT\_MAKER)
*   **SET\_VOLTYPE** (types 0,3,5,6; live prices only)
*   **SET\_SYMBOL**
*   **DO\_CANCEL** (symbol must be set before)

FOK and GTC orders are supported. More commands can be implemented on user request.

### Known Binance API issues

*   **Price history.** Only 500 minutes are available, so for long lookback periods the price history must be downloaded from a different source.  
     
*   **Minimum price request rate.** It was reported that the Binance server can time out when no price requests are received for a certain time. On scripts with long bar periods, make sure to set [TickTime](187_TickTime_MaxRequests.md) so that a price request is sent every 5..10 seconds.  
      
*   **Asset parameters.** All data besides spread and price must be manually entered in the asset list. The **PIP** size and **LotAmount** can be set arbitrarily, since Binance has no minimum lot size, but a minimum trade volume; on error messages like **DUST TRADE DISALLOWED MIN VALUE 50K** increase the trade volume or the **LotAmount** in the asset list. Make sure that **PIPCost** is adapted to **LotAmount**. Example asset list entry:  
    **ETH/BTC,0.01,0.0001,0,0, 0.000001,0.000001, 0,1,1,0,ETHBTC**  
       
    
*   **Order filling.** The API supports market orders and limit orders. If a FOK order is not immediately filled, it is cancelled and the limit can be adapted for the next try. GTC orders stay pending until they are either completely filled, or cancelled with the **DO\_CANCEL** command. If an order is partially filled, the [TradeLots](018_TradeMode.md) and [TradeUnits](018_TradeMode.md) values of the open trade are accordingly adapted. Positions can be read with the **GET\_POSITION** command.  
     
*   **Compliance.** Binance requires the [NFA](018_TradeMode.md) flag. Only long positions are supported; for short trades the account must already contain a sufficient position of the asset. Otherwise an error message like **INSUFFICIENT FUNDS** is issued.  
     
*   **Servers**. The standard API URL is **https://api.binance.com/api/**. If there are performance issues with this URL, these alternative URLs are also available: **https://api1.binance.com/api/**; **https://api2.binance.com/api/**; **https://api3.binance.com/api/**. Some US accounts require **https://api.binance.us/api/**. The testnet URL is **[https://testnet.binance.vision/api/](https://testnet.binance.vision/api/)** (only some symbols are supported by the testnet). You can set up the URL in the **Server** field (see above); leave the field empty for the default server.  
     
*   **Trading hours.** Binance trades 24/7. For trading on the weekend, set [BarMode](200_BarMode.md) accordingly in your script.  
     
*   **Trade and account parameters.** Trade profit is not available via API and estimated by Zorro from the trading costs entered in the asset list. Account requests return the BTC balance by default (different account currencies can be set up in the **AccountId** column of the account list). The balance is reduced by opening a long position, and increased by closing the position. The value of open trades (**TradeVal**) is calculated from all open positions in BTC resp. in the **AccountId** currency.

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [Kraken](234_Kraken.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))