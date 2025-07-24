---
title: "Ally Invest"
source: "https://zorro-project.com/manual/en/ally.htm"
---

# Ally Invest

# Ally Invest Plugin

Ally Invest is a low-commission stocks and options broker for US residents. Ally offered its users a REST API, which uses XML and JSON. Orders are placed in a FIXML-variant language. The Ally Invest plugin was developed by Andrew Dolder and supported trading on real accounts. Demo accounts are not yet offered by Ally Invest.

The latest plugin version can be found on on [https://github.com/AndrewAMD/AllyInvestZorroPlugin](https://github.com/AndrewAMD/AllyInvestZorroPlugin).

To login with the Ally Plugin, you will first need to set up API access with Ally Invest. After you have set up your account with Ally, you must do the following:

*   Go to [https://www.ally.com/invest/](https://www.ally.com/invest/)
*   Click Log In and enter your credentials
*   Click on your account (usually says "individual", depending on your type of account).
*   At the top, go to Tools -> Ally Invest API -> Manage Applications.
*   Create a "Personal Application", and follow the steps. Your new application should have been created instantly.
*   Scroll down. Under "Developer Applications", click on the application you created.
*   You should see four scrambled keys. You will need these for the password field.
*   Open Zorro. Set Account to "Real", and choose Ally Invest from the drop-down menus.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>Account number (not to be confused with the website login username).</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>Consumer Key - Consumer Secret - OAuth Token - OAuth Token Secret, in the exact order with no spaces or commas.</td></tr></tbody></table>

### Remarks

*   Ally Invest has currently suspended algorithmic trading. Until they re-enable it, this plugin is obsolete.
*   Historical data for stocks and currencies is only available in M1 and M5 formats. Officially, the API only provides 5 days of history, but in fact it appears to provide 1 year of history. No options history is available.
*   Individual trades are not managed by the API, only positions. The [NFA](018_TradeMode.md) flag needs to be set.
*   On holidays, the API might say that the market is open when it is closed. The broker has not solved this issue as of 2017-05.
*   The API will sometimes return ask/bid quotes of 0.00 after hours / on weekends.
*   The plugin might use the latest historical M1 data and treat it as a quote when quote is unavailable. However, it will declare a spread of zero.
*   The plugin was written in Win32 C/C++ using Visual Studio 2017. The source code can be found in the **Source** folder. The latest version can also be downloaded from [https://github.com/AndrewAMD/AllyInvestZorroPlugin](https://github.com/AndrewAMD/AllyInvestZorroPlugin). This project is MIT-licensed; see the LICENSE.txt and Readme.md in the source distribution for more details.
*   This plugin was not developed by oP group. For support or reporting problems, please contact the author on his above GitHub account or on the [Zorro user forum](http://www.opserver.de/ubb7/).

### Supported broker commands

The Plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_PATCH**
*   **GET\_COMPLIANCE**
*   **GET\_POSITION**
*   **GET\_OPTIONS**
*   **GET\_UNDERLYING**
*   **SET\_SYMBOL**
*   **SET\_MULTIPLIER** 
*   **SET\_COMBO\_LEGS**
*   **SET\_DIAGNOSTICS**

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MTR4 bridge](mt4plugin.md), [IB bridge](062_DefineApi_LoadLibrary.md), [FXCM plugin](230_FXCM.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))