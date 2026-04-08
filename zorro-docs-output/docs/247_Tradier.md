---
title: "Tradier"
source: "https://zorro-project.com/manual/en/tradier.htm"
---

# Tradier

# Tradier Plugin

Tradier is a US based brokerage for stocks, ETFs, and options with a REST based API for trading and market data. The Tradier plugin allows trading on real accounts and receiving data. For using it you need a Tradier Developer account. There are two types of Developer accounts: Sandbox (demo mode) and Brokerage (real mode). For real mode a Tradier Brokerage account is also required.

A free sandbox account can be opened at [hhttps://developer.tradier.com](https://developer.tradier.com) for receiving delayed market data. Paper trading and account data for sandbox accounts is not yet available, but shall come soon.

The steps to get a brokerage developer account:

*    Open a Tradier Brokerage account at [https://brokerage.tradier.com](https://brokerage.tradier.com) (login with username).
*   Open a Tradier Developer account at [https://developer.tradier.com](https://developer.tradier.com) (login with email).
*   Email Tradier customer support for a Brokerage Developer access token. Refer clearly to both accounts.
*    Support will email a link to the access token. The link will disappear after the first click. Copy the access token and keep it safe.
*   Log in to the \*brokerage\* dashboard. Your account ID is on the top left of the screen.

Zorro login for Tradier:

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>UsUser</strong></td><td>Brokerage account ID, or empty in Sandbox mode.</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>Brokerage or Sandbox access token.</td></tr></tbody></table>

### Remarks

*   Tradier does not support trades, only orders and positions. It uses UUIDs as order identifiers. The [NFA](018_TradeMode.md) flag is required. [Hedge](019_Hedge_modes.md) must be either at 0, 4, or 5, and several Zorros cannot trade the same assets on the same account because long and short positions can not be opened simultaneously. Partial closing is supported by the API.
*   For resuming old trades when starting a new session, read the positions with the [GET\_POSITON](113_brokerCommand.md) command and convert them to trades by script.
*   Tradier supports pending orders. Pending orders to open a position can be traced with BrokerTrade, pending orders to close a position are cancelled after the number of milliseconds given by [SET\_WAIT](113_brokerCommand.md) if not filled.
*   Tradier is limited in the number of simultaneous connections and in the price retrieval rate. For reducing the number of requests per second, increase **TickTime** and/or reduce **MaxRequests**.
*   Tradier only provides a limited amount of intraday historical data (10 days for M1). Systems with a long lookback period need a different data source and the [PRELOAD](018_TradeMode.md) flag.

### Supported broker commands

The plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_PATCH**
*   **SET\_WAIT**
*   **GET\_COMPLIANCE**
*   **GET\_MAXTICKS**
*   **GET\_MAXREQUESTS**
*   **GET\_POSITION**
*   **GET\_OPTIONS**
*   **GET\_UNDERLYING**
*   **SET\_SYMBOL**
*   **SET\_MULTIPLIER** 
*   **SET\_COMBO\_LEGS**
*   **SET\_ORDERTYPE** (1 = GTC, 4 = DAY)
*   **GET\_UUID**
*   **SET\_UUID**

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MTR4 bridge](mt4plugin.md), [IB bridge](062_DefineApi_LoadLibrary.md), [FXCM plugin](230_FXCM.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))