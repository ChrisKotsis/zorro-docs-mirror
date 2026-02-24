---
title: "Binance Futures"
source: "https://zorro-project.com/manual/en/binancefutures.htm"
---

# Binance Futures

# Binance Futures Plugin

**Binance** is a Shanghai founded digital currency exchange that supports all major crypto currencies and crypto futures. The Binance Futures plugin is for trading cryptocurrency futures. For trading plain coins (spot market), use the [Binance](219_Binance.md) plugin.

If you already have a Binance account for the spot market, you can extend it to futures. You will need a new API key and secret for trading futures. This key will then also work for logging in to the spot market. Make sure that your account is in one-way mode (no hedging), since the plugin assumes single-side positions.

There are two Binance Futures plugins. One was developed by a Zorro user and is available on [Github](https://github.com/mioxtw/BinanceFuturesZorroPlugin). The other one is included in the Zorro setup and described here. It requires [Zorro S](restrictions.md) and an account list. It uses the Websocket API for streaming market data and the REST API for all other fuctions. There are two sorts of futures available that are treated slightkly differently: USDT futures, paid in dollar equivalents, and COIN futures, paid in crypto coins. Real mode uses the Binance production server, demo mode the test server. Thus, 4 different endpoints are available that can be set in the **Server** field of the account list:

USDT futures production endpoint: **wss://fstream.binance.com**  
COIN futures production endpoint: **wss://dstream.binance.com**  
USDT futures test endpoint: **wss://stream.binancefuture.com**  
COIN futures test endpoint: **wss://dstream.binancefuture.com**

Zorro login fields for Binance Futures:

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>API Key</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>API Secret</td></tr></tbody></table>

[Accounts.csv](013_Asset_Account_Lists.md) example entries:

<table cellpadding="2" cellspacing="0" class="hidden-xs"><tbody><tr><td><strong>Name</strong></td><td><strong>Server</strong></td><td><strong>Account</strong></td><td><strong>User</strong></td><td><strong>Pass</strong></td><td><strong>Assets</strong></td><td><strong>CCY</strong></td><td><strong>Real</strong></td><td><strong>NFA</strong></td><td><strong>Plugin</strong></td></tr><tr><td>BinFut-USDT</td><td>wss://fstream.binance.com</td><td>USDT</td><td>(Key)</td><td>(Secret)</td><td>AssetsBF</td><td>USDT</td><td>1</td><td>14</td><td>BinanceFutures</td></tr><tr><td>BinFut-COIN</td><td>wss://dstream.binance.com</td><td>BTC</td><td>(Key)</td><td>(Secret)</td><td>AssetsBF</td><td>BTC.8</td><td>1</td><td>14</td><td>BinanceFutures</td></tr></tbody></table>

### Binance Futures symbols

Binance Fututures has inconsistent symbols across all endpoints, but the plugin takes care of this. It uses the below symbology:  
  
Perpetual Futures: **AAABBB**, e.g. **"BTCUSDT"**  
Expiring Futures: **AAABBB-FUT-YYYYMMDD**, e.g. **"BTCUSDT-FUT-20210326"**  
Alternatively, use the [contract](096_contract.md) functions for futures, using the currency pair "BTCUSDT" as the underlying.

### Supported broker commands

The plugin supports the [brokerCommand](113_brokerCommand.md) f function with the following commands:

*   **SET\_PATCH**
*   **GET\_COMPLIANCE**
*   **GET\_MAXTICKS**
*   **GET\_HEARTBEAT**
*   **GET\_POSITION**
*   **SET\_SYMBOL**
*   **GET\_DELAY**
*   **SET\_DELAY**
*   **GET\_WAIT**
*   **SET\_WAIT**
*   **GET\_BOOK**
*   **SET\_ORDERTYPE** (0:IOC, 1:FOK, 2:GTC)
*   **GET\_FUTURES**
*   **DO\_CANCEL**
*   **SET\_SERVER**

There are 2 plugin specific commands:

*   **2001**: Reconnects the websocket at any time for any reason.
*   **2002**: Returns number of milliseconds since the plugin received any message from the websocket server.
    

### Remarks

*   **Maximum request rate.** For limiting the request rate, use **SET\_DELAY** for delaying client account and position requests. Don't use **MaxRequests**, since it would also throttle price requests that however have no limit due to the websocket implementation.  
      
*   **Minimum request rate.** The Binance server was reported to time out when no price requests are received for a certain time. On scripts with long bar periods, make sure to set [TickTime](187_TickTime_MaxRequests.md) so that a price request is sent every 5..10 seconds.  
     
*   **Balance and Equity**. The returned balance is the current position of the account currency (default: **BTC**). The equity is the sum of all currency positions converted to the account currency.  
       
*   **Asset parameters**. Spread, price, PIP, and LotAmount are available from the API. All other data must be manually entered as described under [asset list](013_Asset_Account_Lists.md). For assets with variable leverage, set up [Leverage](192_PIP_PIPCost_Leverage.md) and [MarginCost](192_PIP_PIPCost_Leverage.md) by script before entering a trade. Example USDT asset list entries, assuming 100:1 leverage and 0.25% commission:
    ```c
    Name,Price,Spread,RollLong,RollShort,PIP,PIPCost,Margin,Market,LotAmount,Commission,Symbol
    BTCUSDT,57125,3.5,0,0,0.01,0.00001000,-1,0,0.001,-0.25,BTCUSDT
    BTCUSDT-210326,57125,3.5,0,0,0.01,0.00001000,-1,0,0.001,-0.25,BTCUSDT-FUT-20210326
    ETHUSDT,1991,0.05,0,0,0.01,0.00001000,-1,0,0.001,-0.25,ETHUSDT
    ETHUSDT-210626,1991,0.05,0,0,0.01,0.00001000,-1,0,0.001,-0.25,ETHUSDT-FUT-20210326
    ```
    Example COIN asset list entries:  
    ```c
    Name,Price,Spread,RollLong,RollShort,PIP,PIPCost,Margin,Market,LotAmount,Commission,Symbol
    BTCUSD,57125,3.5,0,0,0.1,0.00017505,-1,0,1,-0.25,BTCUSD
    BTCUSD-210326,57125,3.5,0,0,0.1,0.00017505,-1,0,1,-0.25,BTCUSD-FUT-20210326
    ETHUSD,1991,0.05,0,0,0.01,0.00005023,-1,0,1,-0.25,ETHUSD
    ETHUSD-210326,1991,0.05,0,0,0.01,0.00005023,-1,0,1,-0.25,ETHUSD-FUT-20210326
    ```
    In the above examples, the **Name** column uses a shortened version of the futures contract name. The **Symbol** column must follow the above nomenclature.  
     
*   **Contract specifications.** For USDT Futures the order volume is in units of base currency. **LotAmount** can be less than or greater than 1. For COIN Futures the order volume is per contract. A contract is worth a multiple of the counter currency, such as 10 USD, 100 USD, depending on the contract. **LotAmount** is normally 1.  
     
*   **Funding.** On the USDT exchange, you must have the counter currency to trade; on the COIN exchange, you must have the base currency to trade.  
     
*   **Compliance.** Binance Futures requires the **NFA** flag.  
      
    
*   **Stability.** Users reported irregular breakdowns of the Binance Futures server, causing loss of connection with the websocket API. Two commands have been added for reconnecting automatically by script in such a case, for instance in a [tock](089_tick_tock.md) function. Example: **if(brokerCommand(2002,0) > 120000) brokerCommand(2001,0);** will reconnect when the connection was lost for more than 2 minutes.  
    

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [brokerCommand](113_brokerCommand.md), [Binance plugin](219_Binance.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))