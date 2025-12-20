---
title: "Saxo Bank"
source: "https://zorro-project.com/manual/en/saxo.htm"
---

# Saxo Bank

# Saxo Bank Plugin

Saxo Bank is a Danish broker that provides currencies, stocks, and ETFs. The Saxo Bank plugin was designed specifically to work with Saxo Bank's V2 Web API. You need [Zorro S](restrictions.md) for using the plugin.

For using the Saxo plugin you need either a valid API token, or a Client ID and Secret. The steps:

*   On the Saxo Bank OpenAPI website, create a live or demo "application" for your trading sessions.
*   In the form on the application website, enter **[http://127.0.0.1:31022/](http://127.0.0.1:31022/)** for the Redirect URL.
*   If you have a permanent **token**, enter it in the **User** field, and keep the **Password** field empty.
*   If you have no token, enter the **client ID** in the User field, and the **secret** in the password field.
*   Start the session. With client ID and secret, you will be redirected to a website where you enter your **user ID** and **password**.
*   Zorro will then automatically request a token and start trading.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>Token or Client ID, normally a large hexadecimal string</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>Empty or Secret, normally a large hexadecimal string</td></tr></tbody></table>

Example [account list](account.htm#account) entries:

```c
Name,Server,AccountId,User,Pass,Assets,CCY,Real,NFA,Plugin
SaxoToken,Saxo,EUR,tokenabcdefg123456xyz,0,AssetsSaxo,USD,1,14,Saxo
SaxoDemo,Saxo,EUR,abcdef0123456789,00123456abcdef,AssetsSaxo,USD,0,14,Saxo
```

### Supported broker commands

The Saxo plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **GET\_DELAY**
*   **SET\_DELAY**
*   **GET\_WAIT**
*   **SET\_WAIT**
*   **SET\_PATCH**

### Remarks

*   The SAXO API is NFA compliant. The [NFA flag](018_TradeMode.md) must be set, no long and short positions must be open simultaneously, and positions must be closed in FIFO compliant way. [Virtual hedging](019_Hedge_modes.md) mode is recommended.

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MT4 bridge](mt4plugin.md), [Sierra bridge](sierra.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))