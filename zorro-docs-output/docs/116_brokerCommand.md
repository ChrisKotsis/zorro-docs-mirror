---
title: "brokerCommand"
source: "https://zorro-project.com/manual/en/brokercommand.htm"
---

# brokerCommand

## brokerCommand (int Command, **intptr\_t** Parameter): var

## brokerCommand (int Command, string Text)

## brokerCommand (int Command, var\* Parameters)

Sets various broker plugin parameters or retrieves asset specific data for special purposes in a script in \[Trade\] mode. The functions can be optionally provided by the [broker plugin](brokerplugin.md); they return **0** when they are not supported or no broker connection is established. The number and types of parameters depend on **Command**. User specific commands to the broker API can be added.The following commands are predefined:  
   

| **
**Command**

** | 

**Parameter**

 | Internal | 

**Returns**

 |
| --- | --- | --- | --- |
| **GET\_TIME** | 0 |  | Last incoming quote time in the server time zone, OLE DATE format. |
| **GET\_DIGITS** | Symbol |   | Number of relevant digits after decimal point in the price quotes. |
| **GET\_STOPLEVEL** | Symbol |   | The 'safety net' [stop level](188_Stop_Profit_Trail_Entry.md) of the last order (non-NFA accounts only). |
| **GET\_TRADEALLOWED** | Symbol |   | Trade is allowed for the asset. |
| **GET\_MINLOT** | Symbol |   | Minimum permitted amount of a lot. |
| **GET\_LOTSTEP** | Symbol |   | Step for changing lots. |
| **GET\_MAXLOT** | Symbol |   | Maximum permitted amount of a lot. |
| **GET\_MARGININIT** | Symbol |   | Initial margin requirements for 1 lot. |
| 

**GET\_MARGINMAINTAIN**

 | Symbol |   | Margin to maintain open positions calculated for 1 lot. |
| **GET\_MARGINHEDGED** | Symbol |   | Hedged margin calculated for 1 lot. |
| **GET\_COMPLIANCE** | 0 |   | Account restrictions, a combination of the following flags: **1** - no partial closing; **2** - no hedging; **4** - FIFO compliance; **8** - no closing of trades; **15** - full NFA compliant account. |
| **GET\_SERVERSTATE** | 0 |   | State of the broker server: **1** - server connected; **2** - server disconnected; **3** - server was temporarily disconnected since the last **GET\_SERVERSTATE** command. |
| **GET\_NTRADES** | 0 |   | Number of all open trades in this account. |
| **GET\_POSITION** | Symbol | ✔ | Net open amount ([as in BrokerBuy2](brokerplugin.md)) of the given symbol; negative values for short positions. For brokers with varying lot amounts, call **SET\_AMOUNT** before. |
| **GET\_AVGENTRY** | 0 |   | Average entry price for the preceding **GET\_POSITION** command, or **0** when no position was open. The raw entry price from the broker is returned; in case of options it might be required to divide it by the Multiplier. |
| **GET\_FILL** | Trade ID |   | Deprecated; replaced by [BrokerTrade](brokerplugin.md).  Returned the current fill amount of the open order, or **\-1** when the order was not found or was not open anymore. |
| **GET\_ACCOUNT** | String |   | Fills the string with the account name. |
| **GET\_DATA** | String |   | General request to a REST API. The string contains the request, usually a JSON object. It can optionally begin with a '#' hash character and the last part of the post address ending with a blank, f.i. **"#data "**). The string is then filled with the response from the API. Returns the response size in characters, or 0 when no valid response was returned. |
| **GET\_PRICE** | 1 ... 3 |   | Returns a particular price after a **[BrokerAsset](brokerplugin.md)** call. The price type can be given in the argument**:  
4** - last traded price  
**5** - last ask price**  
6** - last bid price |
| **GET\_VOLUME** | 2 ... 7 | ✔ | Returns a particular volume after a **[BrokerAsset](brokerplugin.md)** call. The volume type can be given in the argument**:**  
**2** - tick frequency, if supported**  
4** - trade volume, often accumulative**  
5** - last ask size**  
6** - last bid size**  
7** - open interest, for options  |
| **GET\_BOOK** | T2\* | ✔ | Fills the given T2 array with current quotes from the order book. The asset is set with **SET\_SYMBOL**; bid prices are negative, the **time** field is optional. The last T2 element is set to 0 for indicating the end of the array. Returns the number of quotes. |
| **GET\_TRADES** | TRADE\* | ✔ | Fill the given **TRADE** array with the parameters of all open positions from the current account (see remarks). Return the number of positions. |
| **GET\_OPTIONS** | CONTRACT\* | ✔ | Fill the given **CONTRACT** array with the option chain of the underlying set with **SET\_SYMBOL** (see remarks). |
| **GET\_FUTURES** | CONTRACT\* | ✔ | Fill the given **CONTRACT** array with the futures chain of the underlying set with **SET\_SYMBOL** (see remarks). |
| **GET\_FOP** | CONTRACT\* | ✔ | Fill the given **CONTRACT** array with the options of futures chain of the underlying set with **SET\_SYMBOL** (see remarks). |
| **GET\_CHAIN** | int\[5000\] | ✔ | Fill the given **int** array with the options chain parameters of the underlying symbol previously set with **SET\_SYMBOL**:  
The first element gets the number of expirations, second the number of strikes, followed by the list of expirations in the YYYYMMDD format, followed by the list of strikes cast to **float**. Used by the [contractChain](096_contract.md) function. |
| **GET\_UNDERLYING** | 0 | ✔ | Get the underlying price for the preceding [brokerAsset](brokerplugin.md) call when the asset was an option. |
| **GET\_GREEKS** | var\[5\] |   | Get the greeks for a preceding [brokerAsset](brokerplugin.md) or [contractPrice](096_contract.md) call. Fills the parameter array with **P\[0\]** = Implied Volatility; **P\[1\]** = Delta; **P\[2\]** = Gamma; **P\[3\]** = Vega; **P\[4\]** = Theta. Greeks cannot be retrieved with 'fast' price type.0 |
| **SET\_DELAY** | Time in ms |   | Set delay in ms between commands sent to the broker (normally 20). |
| **SET\_WAIT** | Time in ms |   | Set maximum wait time in ms for confirmation after a command was sent to the broker. Default depends on the broker plugin; normally 60000. Increase the time when trades need longer than 1 minute to open. |
| **GET\_MAXTICKS** | 0 | ✔ | Return the maximum number of ticks to be filled by [BrokerHistory2](brokerplugin.md). If this command is not supported, it's 300 ticks. This command is called at login to set the [MaxTicks](187_TickTime_MaxRequests.md) variable. |
| **GET\_MAXREQUESTS** | 0 | ✔ | Return the maximum number of requests per second allowed by the broker API. Sets up [MaxRequests](187_TickTime_MaxRequests.md) if supported. |
| **GET\_HEARTBEAT** | 0 | ✔ | Return the maximum time in ms that the API tolerates without a request. Sets up [TickTime](187_TickTime_MaxRequests.md) if supported. |
| **GET\_BROKERZONE** | 0 | ✔ | Return the [time zone](month.md) of the timestamps set by the **BrokerHistory2** function. Return **0** for UTC. Used for setting [BrokerZone](assetzone.md). |
| **SET\_DIAGNOSTICS** | 0..4 |   | 0 disables diagnostics output, higher values enable diagnostics - the higher, the more messages. When enabled, communication between plugin and API and other plugin messages will be recorded in the log for diagnostic purposes. |
| **GET\_LOCK** | 0 |   | Returns 1 if broker API calls must be locked for synchonizing them among several connected Zorros; returns -1 if broker API need not be locked. In this case the **NOLOCK** flag is automatically set. |
| **SET\_LOCK** | 0, 1 |   | Set (1) or release (0) a lock for synchonizing commands among several connected Zorros (see remarks). Returns 0 if the lock was already set, otherwise 1. |
| **SET\_SLIPPAGE** | Pips |   | Set the maximum allowed slippage (**default = 5 pips**) in adverse direction for subsequently opening or closing trades. Higher allowed slippage causes less requotes, but allows trades to be entered at a worse price. Note that the allowed slippage is not guaranteed; trades can be still entered at higher slippage dependent on the brokerm, market access method, and server setup. |
| **SET\_SYMBOL** | Symbol | ✔ | Set the symbol for subsequent commands. |
| **SET\_MAGIC** | Number |   | Set a "magic number" for identifying trades opened by the current script. |
| **SET\_MULTIPLIER** | Number | ✔ | Set the multiplier for retrieving option and future chains. |
| **SET\_CLASS** | Name |   | Set the name of the trading class. Call this before setting the symbol for option and future chains; use an empty string (**""**) for all trading classes. |
| **SET\_AMOUNT** | var pointer | ✔ | Set the lot size for buy/sell orders; for assets with arbitrary lot sizes. Automatically sent before any order if the current [LotAmount](013_Asset_Account_Lists.md) is less than 1. |
| **SET\_LEVERAGE** | Number | ✔ | Set the leverage for buy/sell orders; for assets with adjustable leverage. Automatically sent before any order with the current [Leverage](190_Margin_Risk_Lots.md) value. |
| **SET\_PATCH** | Patch value |   | Work around broker API issues that cause wrong account or asset parameters. Retrieve the following parameters in trade mode not from the broker API, but from the [asset list](013_Asset_Account_Lists.md) or by calculating them on the Zorro side (numbers can be combined by addition):  
**1**  - [Balance](193_Balance_Equity.md) and [Equity](193_Balance_Equity.md);  
**2**  - [TradeProfit](018_TradeMode.md) of open trades;  
**4**  - [TradeProfit](018_TradeMode.md) of all trades;  
**8**  - Server time;  
**16** - [Rollover](191_Spread_Commission.md) and [Commission](191_Spread_Commission.md);  
**32** - [Leverage](192_PIP_PIPCost_Leverage.md) and [MarginCost](192_PIP_PIPCost_Leverage.md);  
**64** - [PIP](192_PIP_PIPCost_Leverage.md), [PIPCost](192_PIP_PIPCost_Leverage.md), [LotAmount](192_PIP_PIPCost_Leverage.md). |
| **SET\_HWND** | HWND | ✔ | Called before login with Zorro's [window handle](hwnd.md). The window handle can be used to trigger asynchronous events and send messages to Zorro with the **PostMessage** function. |
| **SET\_FUNCTIONS** | Function pointer | ✔ | Called before login with a pointer to Zorro's [function list](funclist.md), an array of function pointers in the order given by **include\\func\_list.h**. This allows the plugin to call Zorro functions, such as HTTP or hash functions for REST APIs, by their number (see example).  |
| **GET\_CALLBACK** | Address  
pointer | ✔ | Get the address of a plugin-supplied callback function that is called at any **WM\_APP+3** message; automatically called after login. |
| **SET\_BROKER** | Text |   | Set the broker or exchange name when a plugin supports multiple brokers or exchanges. Returns 0 when the name did not match any, otherwise nonzero. |
| **SET\_SERVER** | Text | ✔ | Send the optional URL in the account list **Server** field to the broker API. Automatically called before login. Can be used to set a different URL for REST endpoints. |
| **SET\_CCY** | Text | ✔ | Send the currency part of the account list CCY field to the broker API. Automatically called before any **BrokerAccount** call. |
| **SET\_COMMENT** | Text |   | Display the given text (255 characters max) in the broker platform, usually at the top of the chart window. |
| **SET\_COMBO\_LEGS** | 2, 3, 4 | ✔ | Declare the given number of following [option trades](096_contract.md) as a combo order. Most brokers offer reduced margin and commission on combos. To use, set the combo leg number and immediately call the [enter](buylong.md) commands for the contracts. The order will be processed after the last **enter** command is received. If the order fails, the last **enter** will return **0**. The script must then [cancel](selllong.md) the prior trades. All combo trades must have matching expiration dates  and underlying symbols; otherwise the order will not be accepted. |
| **SET\_ORDERTYPE** | 0 ... 11 | ✔ | Switch between order types and return the type if supported by the broker plugin, otherwise 0. Automatically called at any order entry depending on [TradeMode](018_TradeMode.md) and [StopFactor](188_Stop_Profit_Trail_Entry.md).  
**0**  - Broker default (highest fill probability)  
**1**  - AON (all.or-none); prevents partial fills  
**2**  - GTC (good-till-cancelled); order stays open until completely filled  
**3** -  AON+GTC  
**4** - Broker specific special order type  
**+8** - STOP; add a stop order at distance [Stop\*StopFactor](188_Stop_Profit_Trail_Entry.md) on NFA accounts (see remarks).  |
| **SET\_ORDERTEXT** | Text |   | Set an arbitrary order comment for the next order (255 characters max). Often also used for special orders, f.i. for trading binary options with MT4, or for special order types like "STP LMT" with IB. Reset with an empty string. |
| **SET\_ORDERGROUP** | Text |   | Set an order group name for the next orders (255 characters max). Often used for grouping orders together, f.i. for One-Cancels-Another (OCA) orders, depending in the broker. Reset with an empty string. |
| **SET\_PRICETYPE** | 0 ... 8 |   | Set the type of prices returned by **BrokerAsset** and **BrokerHistory2**, if applicable. Return the type if supported by the broker plugin, otherwise **0.  
0** - Broker default (normally ask or last trade price);**  
1** - enforce ask/bid quotes;**  
2** - enforce last trade price;**  
3** - special (broker specific);**  
4** - suppress price requests;**  
5** - enforce ask prices**,  
6** - enforce bid prices,**  
7** - adjusted last trade price (for historical data);**  
8** - fast price requests: ask, bid, or trade, whatever received first.  
The [spread](191_Spread_Commission.md) is normally only updated when ask/bid quotes are returned. |
| **SET\_VOLTYPE** | 0 ... 7 |   | Set the type of volume data returned by **BrokerAsset** and **BrokerHistory2**, if applicable. Return the type if supported by the broker plugin, otherwise **0.**  
**0** - Broker default, usually quote size;**  
1** - no volume;**  
2** - tick frequency;**  
3** - quote size (ask+bid);**  
4** - trade volume;**  
5** - ask size;**  
6** - bid size;**  
7** - open interest.  |
| **SET\_VALTYPE** | 0 .. 3 |   | Set the type of [marketVal](022_Price_History.md) data returned by **BrokerAsset** and **BrokerHistory2,** if applicable. Return the type if supported by the broker plugin, otherwise **0.  
1** - no data;  
**2** - spread;  
**3** - WAP. |
| **SET\_RESTART** | 0000..2359 |   | Set a restart time of the broker plugin. The API is released and restarted at the given HHMM time. |
| **GET\_UUID** | String | ✔ | Copies the UUID of the last opened trade to the given string. |
| **SET\_UUID** | String | ✔ | Sets the UUID for the next command from the given string. |
| **DO\_EXERCISE** | Lots | ✔ | Exercise the given number of contracts of the option type set with **SET\_SYMBOL**. |
| **DO\_CANCEL** | Trade ID | **✔** | Cancel the remaining unfilled amount of the order with the given trade ID. If ID == **0**, all open orders are cancelled. If ID == **\-1**, cancel the order with the UUID set before by **SET\_UUID**.  Otherwise, use a valid ID of an open position. Returns **1** when the order was cancelled, or **0** when the order was not found or could not be cancelled. |
| **PLOT\_HLINE** | var\[5\] |   | Place a horizontal line at a given price in the chart window of the broker platform. 5 parameters are used: **P\[0\]** = always 0; **P\[1\]** = price position; **P\[2\]** = line color; **P\[3\]** = line width; **P\[4\]** = line style. Return the identfier number of the line. |
| **PLOT\_TEXT** | var\[4\] |   | Place a text element at a price position at the right border of the chart window. 5 parameters are used: **P\[0\]** = always 0; **P\[1\]** = price position; **P\[2\]** = text color; **P\[3\]** = text size in points. Return the identfier number of the text element. |
| **PLOT\_MOVE** | var\[3\] |   | Move the graphical element with the identifier given by the first parameter **P\[0\],** the horizontal position given by **P\[1\]** and the vertical position given by **P\[2\]**. |
| **PLOT\_STRING** | Text |   | Set or modify the text content for the last created or moved text element. |
| **PLOT\_REMOVE** | Identifier |   | Delete the graphical element with the given identifier. |
| **PLOT\_REMOVEALL** | 0 |   | Remove all graphical elements from the chart. |
| **2000..2999** | var |   | User supplied command with a single numerical parameter. |
| **3000..3999** | P\[8\] |   | User supplied command with an array of 8 **var** parameters.. |
| **4000..5999** | char\* |   | User supplied command with a text string. |

### Parameters:

<table border="0"><tbody><tr><td style="width: 121px"><strong>Command</strong></td><td>Input, one of the commands from the list above.</td></tr><tr><td style="width: 121px"><strong>Parameter</strong></td><td>Input, parameter or data to the command. A 32 bit <strong>int</strong> or pointer for 32 bit plugins, or a 64 bit <strong>long int</strong> or pointer for 64 bit plugins.</td></tr><tr><td style="width: 121px"><strong>Parameters, P</strong></td><td>Input, array of up to 8 <strong>var</strong>s for commands that set or retrieve multiple parameters.</td></tr><tr><td style="width: 121px"><strong>Symbol</strong></td><td>Input, <strong>char*</strong>, broker symbol of an asset (see <a href="script.htm">Symbol</a>). Complex symbols, as for selected option contracts, can have the underlying, exchange, expiry, and other parameters coded in the name as described under <a href="ib.htm">IB Bridge</a>.</td></tr><tr><td style="width: 121px"><strong>Text</strong></td><td>Input, <strong>char*</strong>, for commands that require a text string.</td></tr></tbody></table>

 

### Returns:

**0** when the command is not supported by the broker plugin, otherwise the data to be retrieved.  
   

## brokerAsset (string Symbol, var\* pPrice, var\* pSpread, var \*pVol)

Call the [BrokerAsset](brokerplugin.md) function with the given **Symbol** (f.i. [SymbolLive](script.md)) and return the price, spread, and volume.

## brokerAccount (string Name, string AccountID, var \*pBalance, var \*pTradeVal, var \*pMarginVal);

Call the [BrokerAccount](brokerplugin.md) function for the [account list](013_Asset_Account_Lists.md) entry given by **Name** and an optional account identifer, and return the balance, open trade value, and allocated margin. Can be used to retrieve account information when trading with [multiple brokers](brokerarb.md).

## brokerRequest (string Path, string Method, string Data): string

Call the [BrokerRequest](brokerplugin.md) function for sending arbitrary HTTP requests to the connected REST API. **Path** is the relative URL including the query string, but without the endpoint root. If **Method** begins with '**$**', the request will be signed. **Data** is the optional request body. If no particulat **Method** and no body is given, a **GET** request is sent. The response is returned and can be evaluated.

## brokerTrades (int Filter): int

Call the **GET\_TRADES** command. Cancel all currently open trades, and replace them with the open positions on the broker account (if any).**  
Filter = 0** loads all positions,**  
Filter = 1** loads only positions matching the asset list,**  
Filter = 2** loads only positions of assets that were already selected in the script,  
**Filter = 4** loads only positions of the current asset and prevents the previous cancelling of open trades.  
Add **16** to **Filter** for adjusting [TradeUnits](018_TradeMode.md) and [TradePriceOpen](018_TradeMode.md) by the [Multiplier](contracts.md), as needed for option contracts with some broker APIs.  
The function returns the number of entered positions. It can synchronize script trades with the broker account. The account must support the **GET\_TRADES** command and have only open positions from the current Zorro script. The [enterTrade](buylong.md) function is used for entering the new trades. The entered trades are plain, without exit limits, TMFs, flags, TradeVars, or any other trade parameter that is not stored on the broker account. The algo identifiers of the trades are set to the current [algo](095_algo.md). For correctly updating the trades, all assets must have been used in the script.     

### Remarks:

*   Commands marked internal are automatically sent by Zorro to the broker plugin. They need normally not be used in the script. The other commands are not used by Zorro and available to the script. If a command is not supported, it returns **0**. Which of the commands are supported can be found on the description page of the broker plugin.
*   The **SET\_PATCH** command is always supported since it's handled on the Zorro side. It lets Zorro estimate account and trade parameters, rather than using the values from the broker API. This is required when the broker API calculates those parameters wrong, as was the case for the account balance, equity, and open trade profit in some FXCM API versions. Replacing those parameters has no effect on trading, but on the displayed equity and profit values on the Zorro panel. The estimated equity includes only the profit by trades of the current strategy, and thus is different to the account equity when other systems trade on the same account. The estimated trade result can also differ to the real result due to slippage and rollover.
*   For preventing the interruption of a command sequence by another Zorro instance -  f.i. for setting order parameters before sending the order - use either the **SET\_LOCK** command (if available) or the [lock](167_lock_unlock.md) function. They work like a Windows Mutex. Before the sequence, use **while(0 == brokerCommand(SET\_LOCK,1)) wait(5);** for waiting until the lock was released, and setting it then. Afterwards, **brokerCommand(SET\_LOCK,0)** releases the lock after sending the command sequence. If **SET\_LOCK** is not supported by the plugin, use the [lock/unlock](167_lock_unlock.md) functions in a simular way to lock the part of the code.
*   If the script connects to multiple brokers, commands are sent to the broker assigned to trading with the the current asset ([SourceTrade](script.md)).
*   Contract chains by **GET\_OPTIONS** or **GET\_FOP** are filled with the following data from the **CONTRACT** struct, which is defined in **include\\trading.h**:  
    **time:** a null-terminated string of up to 7 chars containing the trading class symbol (if available)  
    **fAsk**, **fBid**: the ask and bid price (if available)  
    **fStrike:**  the strike price  
    **fVal:** the multiplier (if available)  
    **Expiry:**  the expiration date in YYYYMMDD format  
    **Type:**   the contract type, **PUT, CALL, FUTURE, EUROPEAN, BINARY**; optionally an exchange identifier coded in the upper 16 bits.
*   Trade arrays by **GET\_TRADES** are filled with the following position data (the **TRADE** struct is defined in **include\\trading.h**):  
    **nId:**  a unique trade identifier (if available)  
    **nLots**: the position amount  
    **flags:**  **TR\_SHORT** for short positions  
    **fEntryPrice:** the average entry price if available; some brokers (IB) multiply the entry price with the options multiplier.  
    **fStrike:** the strike price if applicable  
    **tExitDate**:  the expiration date in **DATE** format (if applicable)  
    **nContract:**  the contract type if applicable, i.e. **PUT** or **CALL**; optionally an exchange identifier coded in the upper 16 bits. If the **FUTURE**, **EUROPEAN**, **BINARY** flags are not available via broker API, they must be set by script.  
    **sInfo**: the trading class symbol (if applicable)
*   Variables or text set up with **brokerCommand** keep their content until modified by another **brokerCommand**. Take care of this when a previous trading session has used this command to set a variable or text.
*   If the broker API provides no information about trades - as is the case for most NFA compliant APIs - make sure to keep the trades on the Zorro side and the broker side in sync. Don't close positions or cancel orders on one side only.
*   If the broker API supports a particular order type, the plugin returns the ordertype on the **SET\_ORDERTYPE** command; otherwise it returns **0**.
*   **SET\_ORDERTYPE** >= **8** places a separate stop order when supported by the broker. Dependent on the behavior of the broker API, this order might stay alive even when the original trade was closed. In that case cancel it manually: Send a **DO\_CANCEL** command with the stop order trade ID, which is normally the original trade ID +1. Otherwise the stop order might stay open and trigger an unwanted position in reverse direction.
*   Not all price types are supported with all assets. Check with your broker which prices types are supported, and make sure to use **SET\_PRICETYPE** only when available for the selected asset.Otherwise leave it at **0**
S*   Some commands send a 32 bit pointer as parameter, for instance to pass a **string** or one or several **double** variables to the plugin. The broker plugin can then cast it to the required type for getting the content, f.i. **double NewLotAmount = \*(double\*)Parameter;**
*   User defined commands for special broker API settings can be defined with a command number > 2000. Numbers below 2000 are reserved for predefined commands.

### Examples:

```c
brokerCommand(SET\_COMMENT,strf("Algo %s",Algo)); _// set a comment_

brokerCommand(SET\_PATCH,16+32); _// take swap, commission, leverage from the asset list_

var Greeks\[5\];
contractPrice(ThisContract);
brokerCommand(GET\_GREEKS,Greeks); _// get greeks of the current contract_
```
```c
_// Read all positions from an asset list ///////////////////////_
void main() 
{
  assetList("AssetsFix");
  string Name;
  while(Name = loop(Assets)) {
    var Position = brokerCommand(GET\_POSITION,Name);
    printf("\\n%6.4f %s",Position,Name);
    if(!wait(10)) break;
  }
}

_// read and print the order book_
void main() 
{
  static T2 Quotes\[MAX\_QUOTES\];
  brokerCommand(SET\_SYMBOL,"AAPL");
  int i,N = brokerCommand(GET\_BOOK,Quotes);
  printf("\\nOrderbook: %i quotes",N);
  for(i=0; i<N; i++)
    printf("\\nPrice %.2f Vol %.2f",(var)Quotes\[i\].fVal,(var)Quotes\[i\].fVol);
}

_// read JSON data string from the Coinigy REST API_
void main() 
{
  brokerCommand(SET\_BROKER,"GDAX");
  static char Buffer\[MAX\_BUFFER\];
  strcpy(Buffer,"#data "); _// target point
_  strcat(Buffer,"{\\n\\"exchange\_code\\": \\"GDAX\\",");
  strcat(Buffer,"\\n\\"exchange\_market\\": \\"BTC/USD\\",");
  strcat(Buffer,"\\n\\"type\\": \\"bids\\"\\n}");
  int Size = brokerCommand(GET\_DATA,Buffer);
  if(Size)
    printf("\\nResponse: %s",Buffer);
}
```
```c
_// Use Zorro HTTP functions in a REST API plugin_
int (\_\_cdecl \*http\_send)(const char\* url,const char\* data,const char\* header) = NULL;
long (\_\_cdecl \*http\_status)(int id) = NULL;
long (\_\_cdecl \*http\_result)(int id,char\* content,long size) = NULL;
int (\_\_cdecl \*http\_free)(int id) = NULL;
...
DLLFUNC double BrokerCommand(int command,intptr\_t parameter)
{
  switch(command) {
    case SET\_FUNCTIONS: {
      FARPROC\* Functions = (FARPROC\*)parameter;
      (FARPROC&)http\_send = Functions\[139\];
      (FARPROC&)http\_status = Functions\[142\];
      (FARPROC&)http\_result = Functions\[143\];
      (FARPROC&)http\_free = Functions\[144\];
      return 1.;
    }
    ...
  }
  return 0.;
}
```

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MTR4 bridge](mt4plugin.md), [FXCM plugin](230_FXCM.md), [IB plugin](062_DefineApi_LoadLibrary.md), [Oanda plugin](237_Oanda.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))