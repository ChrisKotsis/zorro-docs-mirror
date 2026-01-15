---
title: "DTN / IQFeed"
source: "https://zorro-project.com/manual/en/iqfeed.htm"
---

# DTN / IQFeed

# DTN IQFeed

[DTN IQFeed](http://www.iqfeed.net)™ is a tick-by-tick unfiltered datafeed for almost all available symbols, with direct connection to the exchanges. The IQFeed plugin ([Zorro S](restrictions.md) required) connects to the IQFeed client application and can retrieve live and historical data. Please note: for using the IQFeed plugin you need to activate it by email to [Support](mailto:support@opgroup.de). The annual activation fee is EUR 65.

Installing IQFeed:

*   Open an account and subscribe the desired markets on [http://www.iqfeed.net](http://www.iqfeed.net/). You will get a login ID - normally a 6 digit number - and a password.
*   Download the IQFeed Client from the [DTN Download Page](http://www.iqfeed.net/index.cfm?displayaction=support&section=download) and install it into its default folder. Start one of the included apps to make sure that it works.
*   On Zorro S, select IQFeed and enter your login ID and password.  
    

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>IQFeed login ID</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>IQFeed password</td></tr></tbody></table>

[Accounts.csv](013_Asset_Account_Lists.md) example entry

<table cellpadding="2" cellspacing="0" class="auto-style2"><tbody><tr><td class="auto-style1" style="height: 19px"><strong>Name</strong></td><td class="auto-style1" style="height: 19px"><strong>Broker</strong></td><td class="auto-style1" style="height: 19px"><strong>Account</strong></td><td class="auto-style1" style="height: 19px"><strong>User</strong></td><td class="auto-style1" style="height: 19px"><strong>Pass</strong></td><td class="auto-style1" style="height: 19px"><strong>Assets</strong></td><td class="auto-style1" style="height: 19px"><strong>CCY</strong></td><td class="auto-style1" style="height: 19px"><strong>Real</strong></td><td class="auto-style1" style="height: 19px"><strong>NFA</strong></td><td class="auto-style1" style="height: 19px"><strong>Plugin</strong></td></tr><tr><td class="auto-style1">IQFeed</td><td class="auto-style1">IQFeed</td><td class="auto-style1">0</td><td class="auto-style1">123456</td><td class="auto-style1">asdfghjk</td><td class="auto-style1">MyAssetsIQF</td><td class="auto-style1">0</td><td class="auto-style1">0</td><td class="auto-style1">0</td><td class="auto-style1">IQFeed.dll</td></tr></tbody></table>

### Remarks

*   For looking up an asset symbol, enter the root name on the [IQfeed Symbol Guide](https://iqfeed.net/symbolguide/index.cfm?symbolguide=lookup&displayaction=support&section=guide&web=iqfeed) web page.
*   For getting prices from IQFeed and trading with a broker, use an [Account list](013_Asset_Account_Lists.md) with a composed [symbol](014_Asset_Symbols.md) that sets up IQFeed for live and historical data, and the broker for trading.

### Supported broker commands

The plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **GET\_MAXTICKS**
*   **SET\_SYMBOL**
*   **GET\_OPTIONS**
*   **GET\_FUTURES**
*   **GET\_FOP**
*   **GET\_BOOK**

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [IB plugin](062_DefineApi_LoadLibrary.md), [MT4 bridge](mt4plugin.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))