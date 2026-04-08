---
title: "cTrader"
source: "https://zorro-project.com/manual/en/ctrader.htm"
---

# cTrader

# cTrader Bridge

 **cTrader™** is a trading platform for Forex, CFDs, and digital coins, developed by Spotware. It provides manual trading, charting and technical analysis, copy trading, and algorithmic trading. The cTrader bridge allows to retrieve data and place trades through the cTrader Open API, similar to the [MT4 bridge](mt4plugin.md). It was developed by D�vid Bod�.

The cTrader bridge is not included in the Zorro distribution. Get it from Github:

*   Download and install the release build from [https://github.com/Boddav/ctrader-zorro-plugin](https://github.com/Boddav/ctrader-zorro-plugin). Put the DLL in your **Plugin** directory.  
    
*   Start Zorro. Make sure that you now can select **cTrader** from the \[Account\] scrollbox.

### Features (from the Github page)

*   Zorro 3.0 compatible (tested with version 2.73)
*   accounts.csv searched in the History/ folder first (Zorro convention), with Plugin/ folder fallback
*   OAuth2 with automatic token refresh and browser-based login flow
*   WebSocket connection to cTrader Open API (JSON protocol, port 5036)
*   Full Broker API v2: BrokerOpen, BrokerLogin, BrokerBuy2, BrokerTrade, BrokerHistory2, BrokerAsset, BrokerAccount, BrokerCommand
*   Market, Limit, Stop, and StopLimit orders with SL/TP modification
*   M1 bar and tick history download
*   Auto-reconnect with exponential backoff
*   Position reconciliation on login
*   Cross-currency profit/margin conversion (SymbolsForConversion API)
*   Expected margin per symbol (ExpectedMargin API)
*   Unrealized PnL tracking per position
*   175+ symbols (Forex, indices, commodities, crypto)
*   Demo and Live account support
*   C++17, Win32 x86, no external dependencies (winhttp, ws2\_32, oleaut32)

### Remarks

*   See description on the author's Githup page.
*   This plugin was not developed by oP group and is not subject to Zorro support. For questions or reporting problems, please contact the author on his GitHub account.

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MT4 bridge](mt4plugin.md), [TradeStation bridge](241_TradeStation_Bridge.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))