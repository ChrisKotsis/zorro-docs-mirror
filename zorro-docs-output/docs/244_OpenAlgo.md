---
title: "OpenAlgo"
source: "https://zorro-project.com/manual/en/openalgo.htm"
---

# OpenAlgo

# OpenAlgo Plugin

 **OpenAlgo™** is aan open-source, self-hosted algo-trading bridge that exposes a local REST API to Indian brokers such as Zerodha, Finvasia (Shoonya), Kotak Neo, Angel One, Flattrade, Dhan, and others.. The OpenAlgo bridge allows to retrieve data and place trades through the OpenAlgo API, similar to the [MT4 bridge](mt4plugin.md). It was developed by Akshay Khanna.

The OpenAlgo bridge is not included in the Zorro distribution. Get it from Github:

*   Download and install the release build from [https://github.com/akkhanna141/zorro-openalgo-plugin](https://github.com/akkhanna141/zorro-openalgo-plugin). Put the DLL in your **Plugin** directory.  
    
*   Start Zorro. Make sure that you now can select **OpenAlgo** from the \[Account\] scrollbox.

### Features (from the Github page)

*   Implements the full Zorro broker API (BrokerOpen, BrokerLogin, BrokerTime, BrokerAccount, BrokerAsset, BrokerHistory2, BrokerBuy2, BrokerSell2, BrokerTrade, BrokerCommand)
*   Is broker-agnostic by design: the active broker is selected inside the OpenAlgo UI, so any OpenAlgo user with a Zorro installation can use it by entering their OpenAlgo API key
*   Is in daily use against a live OpenAlgo installation - real orders, option trades, and position reconciliation have been tested

### Remarks

*   See description on the author's Githup page.
*   This plugin was not developed by oP group and is not subject to Zorro support. For questions or reporting problems, please contact the author on his GitHub account.

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MT4 bridge](mt4plugin.md), [TradeStation bridge](241_TradeStation_Bridge.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))