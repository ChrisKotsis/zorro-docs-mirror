---
title: "Finvasia"
source: "https://zorro-project.com/manual/en/finvasia.htm"
---

# Finvasia

# Finvasia Plugin

Finvasia is an India-based broker. It supports many Indian Exchange products, including stocks, options, futures, and options on futures. It offers a REST API. Real mode and Demo mode is available, the latter for simulated trading via the Sandbox endpoint.

Login procedure: For the sandbox account, log in using PAN for username. For a real account, first log in using PAN, and when the message complains about a missing OTP, request an OTP via the Shoonya web portal. You will be emailed your OTP password. With Zorro still open, enter it into the User field, replacing the contents. Once you log out, you will need to request yet another OTP and manually enter it into the User field. Once a trading session has ended and you enter yet another, you will yet again need to request and enter another OTP into the User field.

Zorro login fields for Finvasia:

<table style="border: 1px solid #000000"><tbody><tr><td style="background-color: #CCCCCC"><strong>User:</strong></td><td>[OTP or PAN]</td></tr><tr><td style="background-color: #CCCCCC; height: 20px;"><strong>Password:</strong></td><td style="height: 20px">[uid] [pwd] [vendor_code] [apikey] [imei] <em>(with a space in between each item)</em></td></tr></tbody></table>

[Accounts.csv](013_Asset_Account_Lists.md) example entry:  
 

<table cellpadding="2" cellspacing="0" class="auto-style2"><tbody><tr><td class="auto-style1" style="height: 19px"><strong>Name</strong></td><td class="auto-style1" style="height: 19px"><strong>Server</strong></td><td class="auto-style1" style="height: 19px"><strong>Account</strong></td><td class="auto-style1" style="height: 19px"><strong>User</strong></td><td class="auto-style1" style="height: 19px"><strong>Pass</strong></td><td class="auto-style1" style="height: 19px"><strong>Assets</strong></td><td class="auto-style1" style="height: 19px"><strong>CCY</strong></td><td class="auto-style1" style="height: 19px"><strong>Real</strong></td><td class="auto-style1" style="height: 19px"><strong>NFA</strong></td><td class="auto-style1" style="height: 19px"><strong>Plugin</strong></td></tr><tr><td class="auto-style1">Finvasia-Demo</td><td class="auto-style1">0</td><td class="auto-style1">0</td><td class="auto-style1">15678</td><td class="auto-style1">Test1234 Pwd VndCode key1234 cde4321</td><td class="auto-style1">AssetsFV</td><td class="auto-style1">INR</td><td class="auto-style1">0</td><td class="auto-style1">14</td><td class="auto-style1">Finvasia</td></tr><tr><td class="auto-style1">Finvasia-Real</td><td class="auto-style1">0</td><td class="auto-style1">0</td><td class="auto-style1">15678</td><td class="auto-style1">Real1234 Pwd VndCode key1234 cde4321</td><td class="auto-style1">AssetsFV</td><td class="auto-style1">INR</td><td class="auto-style1">1</td><td class="auto-style1">14</td><td class="auto-style1">Finvasia</td></tr></tbody></table>

 

### Remarks

*   For asset symbols, either the Finvasia TradingSymbol itself can be used, or IB-style symbols for options("-OPT-"), futures("-FUT-"), and futures options("-FOP-"). Examples:  
    "ZOMATO-EQ" is Zomato stock on NSE exchange.  
    "ZOMATO" is Zomato stock on BSE exchange.  
    "TCS29SEP22P4540" is the same as "TCS-OPT-20220929-4540-P", on the NFO exchange.  
    "GOLDM26OCT22P49100" is the same as "GOLD-FOP-20221026-49100-P", on the MCX exchange.  
    "COTTON31JAN23" is the same as "COTTON-FUT-20230131", on the MCX exchange.
*   Finvasia requires the NFA flag.
*   Finvasia does not supply historical data via API. Either use [PRELOAD](018_TradeMode.md) or wait for enough lookback to accumulate.
*   If combo orders fail, call **brokerCommand(5002,0)** (see below) to place leg orders individually.

### Supported broker commands

The plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

**SET\_FUNCTIONS  
SET\_DIAGNOSTICS** (0: off, 1: on)  
**SET\_PRICETYPE** (NOTE: bid-ask data sometimes MISSING, prefer 2=last trade price)  
**GET\_DELAY  
SET\_DELAY  
GET\_WAIT  
SET\_WAIT  
SET\_SYMBOL  
GET\_COMPLIANCE  
SET\_PATCH  
SET\_ORDERTYPE** (0: day, 2: GTC, 16:EOS)  
**SET\_COMBO\_LEGS** (only works if account supports prctyp="2L" or "3L", see custom command 5002)  
**GET\_POSITION  
GET\_FUTURES  
GET\_OPTIONS  
GET\_FOP  
DO\_CANCEL  
GET\_UNDERLYING**

Supplemental commands:

**5001**  Set Finvasia product for next order, such as "C", "M", "I", "H", or "B".  
**5002**  **0** (default): allow combo orders. **1**: BANS combo orders in lieu of independent leg orders.

All data besides spread and price must be manually entered in the asset list. Example asset list entries:

```c
Name,Price,Spread,RollLong,RollShort,PIP,PIPCost,MarginCost,Market,Multiplier,Commission,Symbol
ZOMATO\_BSE,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,ZOMATO
ZOMATO\_NSE,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,ZOMATO-EQ
RENUKA\_BSE,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,RENUKA
RENUKA\_NSE,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,RENUKA-EQ
TATASTEEL\_BSE,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,TATASTEEL
TATASTEEL\_NSE,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,TATASTEEL-EQ
RECLTD,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,RECLTD
TCS,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,TCS
MRF,100,0.05,0,0,0.05,0.05,0,UTC:0315-1000,1,0.01,MRF
GOLD,25000,1,0,0,1,1,0,UTC:0330-1825,1,0.01,GOLD
CRUDEOIL,2500,0.1,0,0,0.1,0.1,0,UTC:0330-1825,1,0.01,CRUDEOIL
```

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), **[brokerCommand](113_brokerCommand.md)**

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))