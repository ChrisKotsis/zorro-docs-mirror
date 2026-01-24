---
title: "TradeStation Bridge"
source: "https://zorro-project.com/manual/en/tradestation.htm"
---

# TradeStation Bridge

# TradeStation Plugin

TradeStation is a Florida-based broker that supports many instruments, including stocks, options, futures, and futures options. The TradeStation plugin was designed specifically to work with TradeStation's v3 Web API. You need [Zorro S](restrictions.md) for using the plugin.

The TradeStation bridge was developed by Andrew Dolder. For using the bridge you need an API Key and API Secret. The steps:

*   Email TradeStation support and specifically request v3 keys.
*   Enter key and secret in the User and Password fields.
*   Log in with Zorro. You will be required to follow some high-security multi-factor authentication protocols.
*   Once that's completed, Zorro will print out the API Refresh Token in the log and then quit. \*\*Save the API Refresh Token\*\*.
*   Copy and paste the API Refresh Token into the password field with a space after the secret, as shown below. Save this permanently into your [Accounts.csv](013_Asset_Account_Lists.md) file, close the CSV file, and restart Zorro.
*    Henceforth, you will no longer need to follow authentication protocols, unless you change your API keys.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>API Key</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>API_Secret(space)Refresh_Token</td></tr></tbody></table>

For the first time authentication described above, the refresh token is not needed.

Example account list entries:

```c
Name,Server,AccountId,User,Pass,Assets,CCY,Real,NFA,Plugin
TS-firsttime,TradeStation,0,abcd,efgh,AssetsTS,USD,1,14,TradeStation.dll
TS-real-margin,TradeStation,1234M,abcd,efgh ijkl,AssetsTS,USD,1,14,TradeStation.dll
TS-real-futures,TradeStation,1234F,abcd,efgh ijkl,AssetsTS,USD,1,14,TradeStation.dll
TS-demo-margin,TradeStation,2345M,abcd,efgh ijkl,AssetsTS,USD,0,14,TradeStation.dll
TS-demo-futures,TradeStation,2345F,abcd,efgh ijkl,AssetsTS,USD,0,14,TradeStation.dll
```

Example asset list entries:

```c
Name,Price,Spread,RollLong,RollShort,PIP,PIPCost,MarginCost,Market,Multiplier\_LotAmount,Commission,Symbol
ESZ21,2576,0.25,0,0,0.25,0.25,160,0.04,-50,1,\*
ES-CONT,2576,0.25,0,0,0.25,0.25,160,0.04,-50,1,@ES
AAPL,118.44,0.01,0,0,0.01,0.01,0,2,-100,0.01,\*
AMZN,118.44,0.01,0,0,0.01,0.01,0,2,-100,0.01,\*
AXP,74.35,0.03,0,0,0.01,0.01,0,2,-100,0.01,\*
BA,146.78,0.05,0,0,0.01,0.01,0,2,-100,0.01,\*
SPX,4947.96,0.02,0,0,0.01,0.01,0,2,-100,0.01,$SPX.X
SPY,215,0.02,0,0,0.01,0.01,0,2,-100,0.01,\*
```

### Remarks

*   The returned volume is the session volume.

### Supported broker commands

The bridge supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_ORDERTYPE (0:DAY, 1: FOK, 2: GTC, 16:IOC)**
*   **SET\_PRICETYPE (1: Bid/Ask, 2: Last)**
*   **GET\_UUID**
*   **SET\_UUID**
*   **DO\_CANCEL**
*   **GET\_DELAY**
*   **SET\_DELAY**
*   **GET\_WAIT**
*   **SET\_WAIT**
*   **SET\_SYMBOL**
*   **GET\_COMPLIANCE**
*   **SET\_PATCH**
*   **GET\_MAXTICKS**
*   **GET\_POSITION**
*   **GET\_FUTURES**
*   **GET\_OPTIONS**
*   **GET\_FOP**
*   **GET\_UNDERLYING**
*   **SET\_COMBO\_LEGS**

Custom broker commands:

**2000**. Input: var, changes **SET\_UUID** order's limit price.  
**2001**. Changes **SET\_UUID** order to a market order..  
**2002**.Cancels all orders associated with symbol by **SET\_SYMBOL**.  
**2003**. Indiscriminately cancels all open orders.  
**2004**. For **SET\_UUID** order, returns 1 if order is still open, 0 if closed.  
**4000**. Output: char array of length NAMESIZE2. For **SET\_UUID** order, copies TradeStation SymbolID to output.  

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MT4 bridge](mt4plugin.md), [Sierra bridge](sierra.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))