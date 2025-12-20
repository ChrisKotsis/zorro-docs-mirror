---
title: "Alpaca"
source: "https://zorro-project.com/manual/en/alpaca.htm"
---

# Alpaca

# Alpaca Plugin

[Alpaca](http://alpaca.markets/) is a commision-free brokerage for algorithmic trading. The Alpaca API allows a trading algo to access real-time price, place orders and manage portofolios through a REST or a streaming interface.

The Alpaca plugin was developed by Kun Zhao and uses V2 websocket for live data, and Alpaca V1 or alternatively Polygon.io data for historical data. It can be downloaded from the author's [GithHub page](https://github.com/kzhdev/alpaca_zorro_plugin/releases), Place the **Alpaca.dll** file into the **Plugin** folder under Zorro's root path, and enter the Alpaca specific settings to Zorro.ini or ZorroFix.ini as described on Github. Generate an API key for your account on the Alpaca website.

Zorro login fields for Alpaca:

<table style="border: 1px solid #000000"><tbody><tr><td style="background-color: #CCCCCC"><strong>User:</strong></td><td>Alpaca API key</td></tr><tr><td style="background-color: #CCCCCC; height: 20px;"><strong>Password:</strong></td><td style="height: 20px">Alpaca Secret</td></tr></tbody></table>

### Remarks

*   History is supported in M1, M5, M15, and D1 resolution.
*   Market and limit orders are supported.
*   The source code of the plugin can be downloaded from [https://github.com/kzhdev/alpaca\_zorro\_plugin](https://github.com/kzhdev/alpaca_zorro_plugin)
*   This plugin was not developed by oP group. For support or reporting problems, please contact the author on his GitHub account or on the [Zorro user forum](http://www.opserver.de/ubb7/ubbthreads.php?ubb=showflat&Number=465410#Post465410).

### Supported broker commands

The plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_PATCH**
*   **GET\_COMPLIANCE**
*   **GET\_MAXTICKS**
*   **GET\_MAXREQUESTS**
*   **GET\_LOCK**
*   **GET\_POSITION**
*   **SET\_ORDERTEXT**
*   **SET\_SYMBOL**
*   **SET\_ORDERTYPE** (1 - ICO, 2 - GTC, 3 - FOK (default), 4 - DAY, 5 - OPG, 6 - CLS)
*   **SET\_PRICETYPE** (1- quotes, 2 - trades)
*   **SET\_DIAGNOSTICS**

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), **[brokerCommand](113_brokerCommand.md)**

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))