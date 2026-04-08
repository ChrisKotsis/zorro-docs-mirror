---
title: "TDA / Schwab"
source: "https://zorro-project.com/manual/en/tdamtrade.htm"
---

# TDA / Schwab

# TD Ameritrade / Schwab Plugin

[TD Ameritrade](http://alpaca.markets/), now acquired by **Schwab**, is a commision-free brokerage for stocks, ETFs, and options. The TDAmTrade plugin allows the Zorro trading engine to communicate with TD Ameritrade through the TD Ameritrade REST API.

The TDAmTrade plugin was developed by Clyde W. Ford and can be downloaded from the author's GitHub page [https://github.com/cwford/TDAmTrade\_Zorro\_Plugin](https://github.com/cwford/TDAmTrade_Zorro_Plugin), It is free for non-commercial use. The license conditions and step-by-step installation instructions can also be found on GitHub.

Zorro login fields for TD Ameritrade:

<table style="border: 1px solid #000000"><tbody><tr><td style="background-color: #CCCCCC"><strong>User:</strong></td><td>Consumer key</td></tr><tr><td style="background-color: #CCCCCC; height: 20px;"><strong>Password:</strong></td><td style="height: 20px">(empty)</td></tr></tbody></table>

### Remarks

*   You can trade stocks, ETFs, and options, but no futures, future options, or currency pairs (Forex). The TD Ameritrade API does not allow trading these instruments at the present time.
*   TD Ameritrade does not have a true Demo mode. The API does not support "paper trading". In demo mode the plugin will authenticate the user and run through a number of self-diagnostic tests.
*   The plugin uses asset designators as described on the [Symbols](014_Asset_Symbols.md) page.
*   The plugin was written in C#. The code base is well-documented and free for non-commercial use to modify and adapt. The source code can be downloaded from the Github page.
*   This plugin was not developed by oP group and is not subject to Zorro support. For questions or reporting problems, please contact the author on his GitHub account or on the [Zorro user forum](http://www.opserver.de/ubb7/ubbthreads.php?ubb=showflat&Number=465410#Post465410).

### Supported broker commands

The plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_PATCH**
*   **GET\_COMPLIANCE**
*   **GET\_POSITION**
*   **GET\_OPTIONS**
*   **SET\_SYMBOL**
*   **SET\_COMBO\_LEGS**

Supplemental commands:

*   **SHOW\_RESOURCE\_STRING** (Show a globalized resource string from the plug-in)
*   **REVIEW\_LICENSE** (Display the plug-in license and force re-acceptance)
*   **GET\_ASSET\_LIST** (Retrieve a list of subscribed assets)
*   **GET\_TEST\_ASSETS** (Get the test assets included in the Settings file. See Setting file for more.)
*   **SET\_VERBOSITY** (Set the diagnostic verbosity level. See Verbosity level for more.)
*   **SET\_TESTMODE** (Set whether the plug-in is in testing mode.)
*   **SET\_SELL\_SHORT** (Set what to do if selling more shares of an asset than owned)
*   **SET\_LANGUAGE** (Set the language used by the plug-in. See the section on globalization for more.)

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), **[brokerCommand](113_brokerCommand.md)**

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))