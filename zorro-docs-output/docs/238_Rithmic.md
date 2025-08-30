---
title: "Rithmic"
source: "https://zorro-project.com/manual/en/rithmic.htm"
---

# Rithmic

# Rithmic Plugin

[Rithmic](https://www.rithmic.com/apis), LLC is a leading provider of direct market access (DMA) trade execution services. The Rithmic R API allows a trading algo to access real-time price, place orders and manage portofolios.

The Rithmic plugin was developed by Kun Zhao and licensed under the MIT License. It can be downloaded from the author's [GithHub page](https://github.com/kzhdev/rithmic_zorro_plugin/releases), Place the 32-bit or 64-bit **rithmic.dll** file into the **Plugin** or **Plugin64** folder under Zorro's root path, and place the **rithmic\_ssl\_cert\_auth\_params** file into Zorro's root path. Enter the Rithmic specific settings to **Zorro.ini** or **ZorroFix.ini** as described on Github. Generate an API key for your account on the Rithmic website.

Zorro login fields for Rithmic:

<table style="border: 1px solid #000000"><tbody><tr><td style="background-color: #CCCCCC"><strong>User:</strong></td><td>Rithmic User ID</td></tr><tr><td style="background-color: #CCCCCC; height: 20px;"><strong>Password:</strong></td><td style="height: 20px">Rithmic Password</td></tr></tbody></table>

### Remarks

*   The Symbol field in the asset list must have a Symbol column with a dot followed by the exchange symbol at the end.  
    Example: **ESH5, 5993.75, 0.25, 0.0, 0.0, 0.25000, 0.01, -98.7, 0, 1.00, 0.0, \*.CME**
*   Market and limit orders are supported.
*   The source code of the plugin can be downloaded from [https://github.com/kzhdev/Rithmic\_zorro\_plugin](https://github.com/kzhdev/rithmic_zorro_plugin)
*   This plugin was not developed by oP group. For support or reporting problems, please contact the author on his GitHub account or on the [Zorro user forum](http://www.opserver.de/ubb7/ubbthreads.php?ubb=showflat&Number=465410#Post465410).

### Supported broker commands

The plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_PATCH**
*   **GET\_COMPLIANCE**
*   **GET\_BROKERZONE**
*   **GET\_MAXTICKS**
*   **GET\_POSITION** (Example: **brokerCommand(GET\_POSITION, "ESH5.CME");**)
*   **SET\_ORDERTEXT**
*   **SET\_SYMBOL**
*   **SET\_ORDERTYPE** (0 - IOC, 1 - FOK, 2 - GTC)
*   **SET\_PRICETYPE** (1- quotes, 2 - trades)
*   **SET\_DIAGNOSTICS**
*   **DO\_CANCEL**

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), **[brokerCommand](113_brokerCommand.md)**

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))