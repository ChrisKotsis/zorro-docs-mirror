---
title: "Oanda"
source: "https://zorro-project.com/manual/en/oanda.htm"
---

# Oanda

# Oanda Plugin

You can trade with Oanda™ either through the [MT4 bridge](mt4plugin.md), or with a direct API connection using the Oanda plugin. Oanda API trading is not permitted in several countries. Otherwise, the API connection is preferable due to higher speed, lower spreads, and the ability to trade currencies with minimum volume of a single unit. Oanda is a 'dealing desk' broker with a large selection of index and commodity CFDs, free historical price data, a free API, no minimum monthly investment, no minimum lot size, and a simple margin and fee structure. Especially trading with minimum volume opens interesting possibilities, for instance running strategy tests on real Oanda accounts with tiny lot sizes, instead of demo accounts. 

For opening an Oanda demo account for API access, visit [http://www.oanda.com](http://www.oanda.com), and select an **fxTrader** practice account. If you have the choice between enabled or disabled hedging, select disabled for reducing transaction costs. Demo accounts have limitations in downloading historical price data. For opening a live account, use the affiliate link of the [download page](http://zorro-project.com/download.php) for claiming your free Zorro S subscription (details and conditions [here](restrictions.md)). You will need an **Access Token** for trading through the API. For this, sign in on the Oanda website with your user name, then select Other Action / Manage API Access for getting your token. It's a long hexadecimal string that serves as a password. Make sure to store it for later use. You will need to revoke your token and generate a new one when you create a sub-account. The access token must be put into Zorro's password field for connecting to Oanda.

Zorro login fields:

<table class="auto-style1"><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>Oanda Account ID, or empty for using the default primary account</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>Oanda Access Token</td></tr></tbody></table>

[Asset list](013_Asset_Account_Lists.md) examples: **AssetsFix.csv**, **AssetsOanda.csv**, **AssetsOandaEUR.csv**

[Accounts.csv](013_Asset_Account_Lists.md) example entries:

<table cellpadding="2" cellspacing="0" class="auto-style2"><tbody><tr><td class="auto-style1" style="height: 19px"><strong>Name</strong></td><td class="auto-style1" style="height: 19px"><strong>Server</strong></td><td class="auto-style1" style="height: 19px"><strong>Account</strong></td><td class="auto-style1" style="height: 19px"><strong>User</strong></td><td class="auto-style1" style="height: 19px"><strong>Pass</strong></td><td class="auto-style1" style="height: 19px"><strong>Assets</strong></td><td class="auto-style1" style="height: 19px"><strong>CCY</strong></td><td class="auto-style1" style="height: 19px"><strong>Real</strong></td><td class="auto-style1" style="height: 19px"><strong>NFA</strong></td><td class="auto-style1" style="height: 19px"><strong>Plugin</strong></td></tr><tr><td class="auto-style1" style="height: 22px">Oanda Demo</td><td class="auto-style1" style="height: 22px">Oanda</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">123-4567-890989-765</td><td class="auto-style1" style="height: 22px">1a2b3c4e5d6f</td><td class="auto-style1" style="height: 22px">AssetsOanda</td><td class="auto-style1" style="height: 22px">USD</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">Oanda</td></tr><tr><td class="auto-style1">Oanda Real</td><td class="auto-style1">Oanda</td><td class="auto-style1">0</td><td class="auto-style1">456-7890-989765-123</td><td class="auto-style1">1c2d3e4f5x6y</td><td class="auto-style1">AssetsOanda</td><td class="auto-style1">USD</td><td class="auto-style1">1</td><td class="auto-style1">0</td><td class="auto-style1">Oanda</td></tr></tbody></table>

### Oanda asset symbols

Currency names can be directly used for Oanda symbols, but most CFD names must be converted to a specific symbol in the [asset list](013_Asset_Account_Lists.md). An asset list **AssetsOanda.csv** with the main CFD symbols is included for this purpose. A list of available assets can be found at [https://www.oanda.com/forex-trading/markets/live](https://www.oanda.com/forex-trading/markets/live). Click on the asset to get its symbol name. Note that some assets are not available in all countries, f.i. no CFDs in the US. Maximum allowed leverage varies from country to country.

### Extra data

The Oanda plugin supports the following additional data streams:

*   [marketVal](022_Price_History.md): Bid/Ask spread in historical data.
*   [marketVol](022_Price_History.md): Tick frequency in historical data.

### Supported broker commands

The Oanda plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_PATCH**
*   **SET\_DIAGNOSTICS**
*   **SET\_WAIT**
*   **GET\_MAXREQUESTS**  
    

More commands, f.i. for retrieving order book data, can be implemented on user request.

### Known Oanda API issues

The Oanda plugin uses the Oanda REST API. Compared with other broker APIs, the REST API is well structured, easy to implement, supports full trade management and allows unrestricted price history access. Known issues of the Oanda API are:

*   **API permission**. Residents of the EU and certain other countries are not permitted to trade with the Oanda API. In that case, orders are rejected with messages like **"account\_new\_positions\_locked"** or similar. You can then only use the [MT4 bridge](mt4plugin.md) to trade with Oanda.  
     
*   **Historical price data.** Oanda delivers no full resolution tick data, but a maximum of 24 ticks per minute. For this reason T1 data from Oanda has a smaller file size and lower resolution than T1 data from other brokers. On the other hand, Oanda's price history loads fast and goes far back. With demo accounts the access to historical data is limited.  
      
*   **Asset parameters.** The Oanda V20 API does not return rollover rates, so swap and commission must be identified on the Oanda website and manually entered in the asset list.  
       
    
*   **Rate limit violation.** Oanda is limited in the number of simultaneous connections and in the request rate. For reducing the number of requests per second, increase [TickTime](187_TickTime_MaxRequests.md) and/or reduce [MaxRequests](187_TickTime_MaxRequests.md) if you get "rate limit violation" error messages.  
     
*   **Compliance/Hedging.** Oanda accounts with disabled hedging require special settings. They are NFA compliant, but Oanda works around most NFA issues on their side of the API, so the [NFA](mode.htm#nfa) flag needs not be set. [Hedge](019_Hedge_modes.md) must be either disabled (**Hedge = 0**) or in virtual hedging mode (**Hedge = 4 or 5**), otherwise closing trades will cause error messages. Oanda API 2.0 requires stop loss orders to have a unique size, therefore stop loss limits are handled on the Zorro side. Partial closing is supported by the API.  
       
    
*   **Multiple instances.** Due to the NFA compliance, multiple Zorro instances can only trade on the same Oanda account when they trade different assets. Otherwise one Zorro would close positions opened by the other Zorrol. For trading several systems at the same time with the same assets, use sub-accounts.  
     
*   **Shorthand Tickets.** Oanda uses 64-bit trade tickets, which can be theoretically a 20-digit number. Zorro deals with them internally, but displays only the last 10 digits on the trade status page.  
     
*   **Instrument trading halted.** Trades can not be opened and closed outside trading hours. The trading hours of CFDs and currencies can be found on the [Oanda website](https://oanda.secure.force.com/AnswersSupport?urlName=Hours-of-Operation-1436196464451&language=en_US).  
     
*   **Internal server error.** Oanda servers occasionally go offline; during that time all API functions return a message that Oanda engineers are on their way to fix the problem. This situation normally lasts only a few minutes and is handled by Zorro.  
     
*   **No hibernation**. The PC must not be reset, restarted, switched off, hibernate, or go in suspend mode while connected to the Oanda API. If it still happens, close and restart Zorro for unfreezing the API.  
       
    
*   **API vs FxTrade.** Parameters such as equity or trade profit are updated by the Oanda API more frequently than by the FxTrade platform. This can cause the impression that the API returns a different account equity. Don't worry, a single account can have only one equity value, but equity changes appear in the API lists and thus on the Zorro window faster and at different times than in the FxTrade platform.  
     

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MTR4 bridge](mt4plugin.md), [IB bridge](062_DefineApi_LoadLibrary.md), [FXCM plugin](230_FXCM.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))