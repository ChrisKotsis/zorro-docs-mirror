---
title: "Bittrex"
source: "https://zorro-project.com/manual/en/bittrex.htm"
---

# Bittrex

# Bittrex Plugin

Bittrex™ is a US based digital currency exchange that supports about 200 crypto currencies and provides free API access. With [Zorro S](restrictions.md), the Bittrex API plugin can be used with or without a Bittrex account; in the latter case only price data is available. For the interested, the source code of the Bittrex API plugin is available in the **Source** folder, and its implementation is described on [Financial Hacker](https://financial-hacker.com/crypto-trading-with-rest-part-1).

For opening a Bittrex account, visit [https://bittrex.com/](https://bittrex.com/) and apply. Demo accounts are not available - you must really deposit some amount. You can set up the bitcoin symbol and the number of decimals to display in prices in the [account list](013_Asset_Account_Lists.md). For acessing your account via API, you will need a public key and a private secret since all API commands must be hash signed. The steps:

*   Login to Bittrex and click the Settings tab in the toolbar.
*   Select 2-Factor Authentication on the left. Now a QR code will appear on your screen with instructions.
*   On your smartphone, start the Google Authenticator app. Click the pencil icon in the top right, click Scan Barcode, and hold the phone camera up to the QR code on the screen. This will scan the image and then provide a code token to be entered.
*   On the PC, enter the code token in the field and click Submit. You will now have 2-Factor Authentication enabled.
*   Go back up to the Settings page and click on API Keys. Click on Add New Key to create your API key.
*   Select the permissions of the key. For trading, enable "READ INFO", "TRADE LIMIT", and "TRADE MARKET". Withdrawal permission is not necessary.
*   Now enter your latest 2-Factor Authentication code token as above, and press Update Keys. You will now be displayed your API key and the private key, named 'Secret'.
*   Enter these keys in the **User** and **Password** column of your [account list](013_Asset_Account_Lists.md) (or alternatively, memorize them).

You're now all set to trade with the Bittrex plugin. The plugin uses API version 3.0.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>Bittrex API key, or empty for accessing live prices only</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>Bittrex Secret, or empty for accessing live prices only</td></tr></tbody></table>

### Bittrex asset symbols

Bittrex requires symbols in the form XXX-BTC, where BTC is the account currency and XXX the currency to trade. Symbols in the form XXX/BTC are automatically converted.

### Supported broker commands

The Bittrex plugin supports [brokerRequest](113_brokerCommand.md) and [brokerCommand](113_brokerCommand.md) with the following commands:

*   **SET\_PATCH**
*   **SET\_AMOUNT**
*   **SET\_VOLTYPE**
*   **SET\_PRICETYPE**
*   **SET\_ORDERTYPE**
*   **GET\_POSITION**
*   **GET\_MAXREQUESTS**
*   **SET\_UUID**
*   **GET\_UUID**
*   **DO\_CANCEL**

More commands can be implemented on user request.

### Known Bittrex API issues

*   **Price history.** Only a few days are available in high resolution. When a trading system needs a long lookback period, price history must be downloaded from other sources and used with the [PRELOAD](018_TradeMode.md) flag.  
      
*   **Asset parameters.** The plugin reads price, spread, volume, pip size, pip cost, and lot amount from the API. Commission is usually 0.25% of the asset value. Bittrex has a minimum trade volume, which determines the returned **LotAmount**, and a 'precision' parameter that determines **PIP** and **PIPCost**. An example asset list - AssetsBittrex - is included.  
       
    
*   **Order filling.** Bittrex supports market and limit orders. Positions can be read with the **GET\_POSITION** command.  
     
*   **Compliance.** Bittrex requires the [NFA](018_TradeMode.md) flag. Only long positions are supported; for short trades the account must already contain a sufficient position of the asset. Otherwise an error message like **INSUFFICIENT FUNDS** is issued.  
      
*   **Trade Tickets.** Bittrex uses a UUID, a long string, instead of an ID number.   
     
*   **Trading hours.** Bittrex trades 24/7. Still, it makes sense to exclude the weekend from trading, since trades seem to happen more randomly at that time and strategies tend to be unprofitable.  
     
*   **Trade and account parameters.** Trade profit is not available via API and estimated by Zorro from the trading costs entered in the asset list. Account requests return the BTC balance by default (the account currency can be set up in the Account column of the account list). The balance is reduced by opening a long position, and increased by closing the position. Equity is estimated by Zorro through summing up the open trades. Example account list entry:  
    **Bittrex,Bittrex,BTC,1234567890abcdef,fedcba0987654321,AssetsBittrex,BTC.B8, 1,14,Bittrex.dll,  
    ** 

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MTR4 bridge](mt4plugin.md), [IB](062_DefineApi_LoadLibrary.md), [Binance](219_Binance.md) 

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))