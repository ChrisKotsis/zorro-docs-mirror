---
title: "Broker API"
source: "https://zorro-project.com/manual/en/brokerplugin.htm"
---

# Broker API

# Writing Broker / Data Feed Plugins

Zorro supports most major [brokers](214_Brokers_Data_Feeds.md) either with a direct connection, or by connecting through a broker-supported platform, for instance with the [MT4/5 bridge](mt4plugin.md) or the [Sierra bridge](sierra.md). A direct connection to a broker API, exchange, market data feed, or platform is established with a DLL in Zorro's **Plugin** folder. Zorro automatically scans that folder at startup, and lists all valid DLLs in the \[Broker / Account\] scrollbox. The DLL uses the broker's API for placing orders and getting market data. The interface is organized for keeping the DLL as simple as possible.  
  Only a few functions are required for basic automated trading. Additional functionality, for instance to activate special order types or getting special data, can be implemented with an optional [broker command](113_brokerCommand.md). If you know programming and have access to the broker's API documentation, you can write a broker DLL in a few hours. For downloading historical data in CSV or JSON format from online data sources you'll need no DLL; a small script is sufficient (see [assetHistory](loadhistory.md)).

### Writing a broker plugin

Plugins can be written in any language that supports DLLs, such as Java, Pascal, C#, or C++. Many plugins have been written by Zorro users, mostly in C++. We reward proper C++ written plugins with a free [Zorro S](restrictions.md) subscription, license, or update extension. As a starting point you can use the plugin for a cryptocurrency REST API, which can be found in Zorro's **Source** folder. The source code of some other plugins developed by Zorro users is available on the GitHub pages of their authors.

An article about writing a broker plugin can be found on [Financial Hacker](https://financial-hacker.com/crypto-trading-with-rest-part-1/).

The source code of some included broker plugins is available on request to Zorro S users who are developing a similar plugin for the community. Please contact us with a short description of your project and your prior C++ experience. You'll need to sign a non-disclosure agreement, and send us back the final plugin with source code for review. Technical support is free for developing broker plugins; for this you'll need no support ticket or Zorro S subscription.

You can also contact us for outsourcing a plugin development.

### Setting up VC++

Creating a VC++ DLL project with access to all Zorro functions is described under [VC++ project setup](dlls.htm#project). Zorro functions, such as for HTTP requests or signatures, are often useful for the implementation. But if you want a plain DLL with no Zorro stuff, do not bind the **ZorroDll.cpp** source file, but use the **dllmain.cpp** file that's automatically created by VC++. Its **DllMain** function is the main entry point of the broker DLL, and you can leave that function unchanged. Broker functions require the **DATE** and **T6** data types, thus you need to define **DATE** and include the **trading.h** header, like this:

```c
typedef double DATE;  
#include <trading.h>
```

If your broker DLL accesses Zorro-specific structs, set the struct alignment to 4 with a **#pragma pack(4)** statement before including **trading.h**. Otherwise structs have different sizes in Zorro and in your DLL.

For a DLL to appear in the scrollbox, it must be located in the **Plugin** folder. Zorro first checks at start if the DLL can be opened with **LoadLibrary()**. If so, it checks if there is a **BrokerOpen** function (see below) and if it returns a valid version number. If both conditions are fulfilled, the DLL is registered and appears in the scrollbox. **LoadLibrary** will fail when **DllMain** does not return properly. Most frequent reasons are not creating a plain Win32 DLL (f.i. a 64-bit or MFC DLL) or a missing module that the DLL requires. Thus, the more complex libraries you're using, the more likely is your DLL to fail, probably not on your, but on other people's PCs. For being on the safe side, include in the distribution all modules that your DLLs needs. If in doubt, check your DLL's dependencies with **DependencyWalker**. For debugging, place breakpoints in **DllMain** and **BrokerOpen** and check what's happening when Zorro starts.

On [Financial Hacker](https://financial-hacker.com/crypto-trading-with-rest-part-1) you can find a step by step instruction for implementing a REST API DLL.

### Development and test

The **Source** folder contains broker plugin examples in .zip archives:

*   **Simulation** is a simple 'broker simulation' plugin that generates random prices and allows to open a trade with an arbitrary asset. Use it in [NFA](mode.htm#nfa) mode.
*   **Bittrex** is a REST API plugin for the Bittrex crypto exchange.
*   **AllyInvest** is a Github snaphot of a real broker plugin.

You can find more Zorro broker plugins on Github. Use the best suited as a template for your own plugin. Implement the DLL functions (see below) in this order: **BrokerOpen, BrokerLogin, BrokerAsset, BrokerBuy2**. These 4 functions (described below) are the minimum required for trading with the broker. Optionally, implement **BrokerAccount, BrokerHistory2**, **BrokerTime,** **BrokerTrade, BrokerSell2, BrokerStop** if supported by the API. Test any function after implementation with the **TradeTest** script.

Some functions need not be fully implemented, or not at all. The minimum functions for **TradeTest** to run are **BrokerOpen** and **BrokerLogin**. If a function, f.i. **BrokerAsset**, is not yet available in the DLL, Zorro simulates it with default values. So you can implement and test the functions step by step.

As soon as the **BrokerAsset** function is correctly implemented, you should see the current price in the Server window. The **TradeTest** script opens a panel with the following buttons for testing various broker functions:

\[Auto On/Off\] - Toggle button for a simulated trade session that automatically opens or closes a trade every minute.

\[NFA On/Off\] - Toggle the [NFA](mode.htm#nfa) flag. Required for most US accounts; not to be set for most Forex/CFD accounts.

\[Hedge\] - Toggle between [Hedge](019_Hedge_modes.md) modes 0, 2, 4,and 5. Some brokers do not support full hedging (mode 2) or partial closing (mode 5).

\[Order\] - Toggle between limit (**LMT**), market orders (**MKT**), good-til-cancelled (**GTC**) and adaptive orders (**Adaptive**) when supported by the plugin.

\[Asset\] - Enter the asset symbol to trade (default: asset from the scroll box).

\[Buy Long\] - Open a long position with the [Lots](190_Margin_Risk_Lots.md) and [Stop](188_Stop_Profit_Trail_Entry.md) value set up with the sliders.

\[Buy Short\] - Open a short position. Dependent on **Hedge**, close any open position in opposite direction.

\[Close Long\] - Close the given number of lots from an open long position. Partial closing is not supported by some brokers.

\[Close Long\] - Close the given number of lots from an open short position.

\[Update Stop\] - Sets the [Stop](188_Stop_Profit_Trail_Entry.md) of all open positions to the value (in Pips) set up with the slider. Stop adjustment is not supported by some brokers. Due to [StopFactor](188_Stop_Profit_Trail_Entry.md), the broker stop is more distant than the real stop.  

LMT orders attempt to open the position at half spread, adaptive orders at zero spread. The broker must support real limit orders for this; MT4 "pending positions" are no limit orders and will not work for LMT or adaptive orders. Various trading modes, broker commands, asset lists etc. can be set up in #define statements at the begin of the **TradeTest** script.

# Broker API functions

The broker DLL exports functions that are described in the following list. With VC++, exported DLL functions must be either declared with the **extern "C" \_\_declspec(dllexport)** attribute, or listed in a **.def** file. The DLL functions use only a small subset of a usual broker API. In the following list, pointer arguments printed in _**italic**_ can be NULL; if they are nonzero, the function must fill them with the required data. All data is mandatory if not mentioned otherwise.

## BrokerOpen (char\* Name, FARPROC fpMessage, FARPROC fpProgress) : int

Called at startup for all broker DLLs found in the **Plugin** folder. Retrieves the name of the broker, and sets up two callback functions. Should not allocate or load any resources, nor call any Zorro functions - all this can be done in the **BrokerLogin** function.

### Parameters:

<table border="0"><tbody><tr><td><strong>Name</strong></td><td>Output, <strong>char[32]</strong> array to be filled with the name of the broker, f.i. "FXCM". The name appears in the <strong>Account</strong> scrollbox adn is used for selecting the plugin.</td></tr><tr><td><strong>fpMessage</strong></td><td>Input, pointer to a<strong> int BrokerMessage(const char* Message)</strong> function. The plugin can call <strong>BrokerMessage</strong> for printing messages - usually errors - in Zorro's message window. Using this function is not mandatory, but recommended. If the message string begins with an exclamation mark <strong>'!'</strong>, Zorro opens an alert box for notifying the user that his attention might be required. If it begins with a hash <strong>'#'</strong>, it is printed into the diagnostics file only.</td></tr><tr><td><strong>fpProgress</strong></td><td>Input, pointer to a<strong> int BrokerProgress(intptr_t Progress)</strong> function. The plugin can call it repeatedly to keep Zorro responsive in long loops or when broker operations take longer than a second, like <strong>BrokerHistory2</strong>. When <strong>Progress</strong> is <strong>0</strong>, the Zorro UI will only update its controls for preventing unresponsiveness. When it is <strong>1</strong>, dots will be printed in the message window for indicating progress of a lengthy operation. When <strong>Progress</strong> is a pointer and a <strong><a href="tick.htm">callback</a></strong> function exists in the script, it is called and the pointer is passed for triggering script functions from the broker API. When <strong>BrokerProgress</strong> returns <strong>0</strong>, someone has hit Zorro's [<span class="tast">Stop</span>] button and the current broker operation must be aborted.</td></tr></tbody></table>

### Returns:

Broker interface version number; currently **2**.  
  

## BrokerLogin (char\* User_,_ char\* Pwd, char\* Type, char\* Accounts): int

Login or logout to the broker's API server; called in \[Trade\] mode or for downloading historical price data. If the connection to the server was lost, f.i. due to to Internet problems or server weekend maintenance, Zorro calls this function repeatedly in regular intervals until it is logged in again. Make sure that the function internally detects the login state and returns safely when the user was still logged in.

### Parameters:

<table border="0"><tbody><tr><td><strong>User</strong></td><td>Input, User name for logging in, or <strong>NULL</strong> for logging out.</td></tr><tr><td><strong>Pwd</strong></td><td>Input, Password for logging in.</td></tr><tr><td><strong>Type</strong></td><td>Input, account type for logging in; either <strong>"Real"</strong> or <strong>"Demo"</strong>.</td></tr><tr><td><strong>Accounts</strong></td><td>Input / optional output, <strong>char[1024]</strong> array, intially filled with the account id from the <a href="account.htm">account list</a>. Can be filled with all user's account numbers as subsequent zero-terminated strings, ending with "" for the last string. When a list is returned, the first account number is used by Zorro for subsequent <strong>BrokerAccount</strong> calls.</td></tr></tbody></table>

### Returns:

Login state: **1** when logged in, **0** otherwise.  
 

## BrokerTime (DATE \*pTimeUTC): int

Optional function that sends a 'ping' to the server and returns connection status and server time. Repeatedly called in short intervals during the trading session. Can be used by the plugin for keeping the session open if required.

### Parameters:

<table border="0"><tbody><tr><td><strong>pTimeUTC</strong></td><td>Optional output, current server time in UTC / GMT+0 with no daylight saving. The <strong>DATE</strong> format (OLE date/time) is a <strong>double float</strong> value, counting days since midnight 30 December 1899, while hours, minutes, and seconds are represented as fractional days.</td></tr></tbody></table>

### Returns:

**0** when the connection to the server was lost (see remarks).  
**1** when the connection is ok, but the market is closed or trade orders are not accepted.  
**2** when the connection is ok and the market is open for trading at least one of the subscribed assets.

### Remarks:

*   If the UTC server time is not available in the broker API, **\*pTimeUTC** can be left unchanged. If the market state is not available, let the function just return **2** or **0** dependent on whether the connection is established or not.
*   If the server time is returned, but does not change for several minutes, Zorro assumes that the broker server is offline. It then displays **"Offline"** in the server window, and suspends trading and requesting price quotes.
*   If the broker API uses a different time format, here's a C++ code example for converting **DATE** to/from the Linux time format, which is the number of seconds since January 1st 1970 midnight:

```c
DATE convertTime(\_\_time32\_t t32)
{
  return (double)t32/(24.\*60.\*60.) + 25569.; _// 25569. = DATE(1.1.1970 00:00)_  
}

\_\_time32\_t convertTime(DATE date)
{
  return (\_\_time32\_t)((date - 25569.)\*24.\*60.\*60.);  
}
```
   

## BrokerRequest (string Path, string Method, string Data): string

Optional function for sending an arbitrary HTTP request to a REST API. **Path** is the relative URL including the query string, but without the endpoint root. If **Method** begins with '**$**', the request must be signed. If **Method** and **Data** are both 0, a **GET** request should be sent. The response is returned.  
   

## BrokerAsset (char\* Asset, double \*pPrice, double \*pSpread, double \*pVolume, double \*pPip, double \*pPipCost, double \*pLotAmount, double \*pMargin, double \*pRollLong, double \*pRollShort,double \*pCommission): int

Subscribes an asset, and/or returns information about it. Zorro subscribes all used assets at the begin of the trading session. Price and spread for all assets are retrieved in [TickTime](187_TickTime_MaxRequests.md) intervals or when **BrokerProgress** was preciously called by the plugin. Other asset data is retrieved once per bar.

### Parameters:

<table border="0"><tbody><tr><td><strong>Asset</strong></td><td>Input, asset symbol for live prices (see <a href="symbol.htm">Symbols</a>).</td></tr><tr><td><strong>pPrice</strong></td><td>Optional output, current ask price of the asset, or <strong>NULL</strong> for subscribing the asset. An asset must be subscribed before any information about it can be retrieved.</td></tr><tr><td><strong>pSpread</strong></td><td>Optional output, the current difference of ask and bid price of the asset.</td></tr><tr><td><strong>pVolume</strong></td><td>Optional output, a parameter reflecting the current supply and demand of the asset. Such as trade volume per minute, accumulated daily trade volume, open interest, ask/bid volume, or tick frequency. If a value is returned, it should be consistent with the <strong>fVol</strong> content of the T6 struct in <strong>BrokerHistory2</strong> (see below)..</td></tr><tr><td><strong>pPip</strong></td><td>Optional output, size of 1 <a href="pip.htm">PIP</a>, f.i. 0.0001 for EUR/USD.</td></tr><tr><td><strong>pPipCost</strong></td><td>Optional output, cost of 1 PIP profit or loss per <a href="lots.htm#lot">lot</a>, in units of the account currency. If not directly supported, calculate it as decribed under <a href="account.htm">asset list</a>.</td></tr><tr><td><strong>pLotAmount</strong></td><td>Optional output, minimum order size, i.e. number of contracts for 1 <a href="lots.htm#lot">lot</a> of the asset. For currencies it's usually 10000 with mini lot accounts and 1000 with micro lot accounts. For CFDs it's usually 1, but can also be a fraction of a contract, like <strong>0.1</strong>.</td></tr><tr><td><strong>pMargin</strong></td><td>Optional output, either initial margin cost for buying 1 <a href="lots.htm#lot">lot</a> of the asset in units of the account currency. Or the leverage of the asset when negative (f.i. <strong>-50</strong> for <strong>50:1</strong> leverage).</td></tr><tr><td><strong>pRollLong</strong></td><td>Optional output, rollover fee for long trades, i.e. interest that is added to or subtracted from the account for holding positions overnight. The returned value is the daily fee per 10,000 contracts for currencies, and per contract for all other assets, in units of the account currency.</td></tr><tr><td><strong>pRollShort</strong></td><td>Optional output, rollover fee for short trades.</td></tr><tr><td><strong>pCommission</strong></td><td>Optional output, roundturn commission per 10,000 contracts for currencies, per contract for all other assets, in units of the account currency.</td></tr></tbody></table>

### Returns:

**1** when the asset is available and the returned data is valid, **0** otherwise. An asset that returns **0** after subscription will trigger [Error 053](errors.md), and its trading will be disabled.

### Remarks:

*   If parameters are not supplied by the broker API, they can be left unchanged. Zorro will then use default values from the [asset list](013_Asset_Account_Lists.md). Only price and spread must always be returned when the **pPrice** and **pSpread** parameters are nonzero.
*   For receiving streaming price data, get the Zorro window handle from the [SET\_HWND](113_brokerCommand.md) command for sending messages to a Zorro window. The message **WM\_APP+1** triggers a price quote request.
*   Dependent on the broker API, some asset parameters might require unit conversions because lots and pips can have special meanings. In most APIs, such as the FXCM API, the parameters are directly available. A more complicated example is the MT4™ API where the parameters must be corrected by the different scales of "Lot" and "Point" (MQ4 example):

```c
double Price = MarketInfo(Asset,MODE\_ASK);  
double Spread = Price - MarketInfo(Asset,MODE\_BID);  
double Volume = 0;  
double LotFactor = MarketInfo(Asset,MODE\_MINLOT); _// correction for different lot scale_  
double Pip = MarketInfo(Asset,MODE\_POINT);  
double PipCost = MarketInfo(Asset,MODE\_TICKVALUE) \* LotFactor;  
int DigitSize = MarketInfo(Asset,MODE\_DIGITS); _// correction for brokers with 5 digits_
if(DigitSize == 3 || DigitSize == 5) { 
  Pip \*= 10.;  
  PipCost \*= 10.;
}  
double MinAmount = MarketInfo(Asset,MODE\_LOTSIZE) \* LotFactor;  
double Margin = MarketInfo(Asset,MODE\_MARGINREQUIRED) \* LotFactor;
double RollLong = MarketInfo(Asset,MODE\_SWAPLONG);
double RollShort = MarketInfo(Asset,MODE\_SWAPSHORT);  
if(MarketInfo(Asset,MODE\_SWAPTYPE) == 0.) {
  RollLong \*= PipCost;
  RollShort \*= PipCost;
}
```

*   Asset parameters can be different dependent on when they are requested. For instance, some brokers charge a three times higher rollover fee on Wednesday for compensating the weekend. Spreads are usually higher when the market is closed or illiquid.
*   If the broker API can not subscribe an asset, it must be manually subscribed in the broker platform or website.  
    

## BrokerHistory2 (char\* Asset, DATE tStart, DATE tEnd, int nTickMinutes, int nTicks, T6\* ticks): int

Returns the price history of an asset. Called by Zorro's [assetHistory](loadhistory.md) function and at the begin of a trading session for filling the [lookback](181_LookBack_UnstablePeriod.md) period.

### Parameters:

<table border="0"><tbody><tr><td><strong>Asset</strong></td><td>Input, asset symbol for historical prices (see <a href="symbol.htm">Symbols</a>).</td></tr><tr><td><strong>tStart</strong></td><td>Input, UTC start date/time of the price history (see <strong>BrokerTime</strong> about the <strong>DATE</strong> format). This has only the meaning of a seek-no-further date; the relevant date for the begin of the history is <strong>tEnd</strong>.</td></tr><tr><td><strong>tEnd</strong></td><td>Input, UTC end date/time of the price history. If the price history is not available in UTC time, but in the brokers's local time, the plugin must convert it to UTC.</td></tr><tr><td><strong>nTickMinutes</strong></td><td>Input, time period of a tick in minutes. Usual values are <strong>0</strong> for single ticks (for T1 or T2 data; all prices of a <strong>T6</strong> struct get the tick price), <strong>1</strong> for one-minute (M1) historical candles, or a larger value for low-resolution data.</td></tr><tr><td><strong>nTicks</strong></td><td>Input, maximum number of ticks to be filled; must not exceed the number returned by <strong>brokerCommand(GET_MAXTICKS,0)</strong>, or <strong>300</strong> otherwise.</td></tr><tr><td><strong>ticks</strong></td><td>Output, array of <strong>T6</strong> structs (defined in <strong>include\trading.h</strong>) to be filled with the ask prices, close time, and additional data if available, such as historical spread and volume. See <a href="history.htm">history</a> for details. The <strong>ticks</strong> array is filled in reverse order from <strong>tEnd</strong> on until either the tick time reaches <strong>tStart</strong> or the number of ticks reaches <strong>nTicks</strong>, whichever happens first. The most recent tick, closest to <strong>tEnd</strong>, is at the start of the array. In the case of <strong>T1</strong> or <strong>T2</strong> data, or when only a single price is available, all prices in a <strong>T6</strong> struct must be set to the same value.</td></tr></tbody></table>

### Returns:

Number of ticks returned, or **0** when no ticks could be returned, f.i. when the server was offline, the asset was not subscribed, or price history was not available for the given date/time.  
 

## BrokerAccount (char\* Account, double \*pBalance, double \*pTradeVal, double \*pMarginVal): int

Optional function. Is called by Zorro in regular intervals and returns the current account status. Is also used to change the account if multiple accounts are supported. If the **BrokerAccount** function is not provided, f.i. when using a FIX API, Zorro estimates balance, equity, and margin from initial values and trade results.

### Parameters:

<table border="0"><tbody><tr><td><strong>Account</strong></td><td>Input, new account name or number, or <strong>NULL</strong> for using the current account.</td></tr><tr><td><strong>pBalance</strong></td><td>Optional output, current balance on the account.</td></tr><tr><td><strong>pTradeVal</strong></td><td>Optional output, current value of all open trades; the difference between account equity and returned balance value. If not available, Zorro estimes the equity from balance and value of all open trades. If no balance was returned, the account equity can be returned in <strong>pTradeVal</strong>.</td></tr><tr><td><strong>pMarginVal</strong></td><td>Optional output, current total margin bound by all open trades.</td></tr></tbody></table>

### Returns:

**1** when the account is available and the returned data is valid, **0** when a wrong account was given or the account was not found.  
 

## BrokerBuy2 (char\* Asset, int Amount, double StopDist, double Limit, double \*pPrice, int \*pFill): int

Sends an order to open a long or short position, either at market, or at a price limit. Also used for [NFA compliant](mode.htm#nfa) accounts to close a position by opening a new position in the opposite direction. The order type (FOK, IOC, GTC) can be set with [SET\_ORDERTYPE](113_brokerCommand.md) before. Orders other than GTC are cancelled when they are not completely filled within the [wait time](113_brokerCommand.md) (usually 30 seconds).

### Parameters:

<table border="0"><tbody><tr><td><strong>Asset</strong></td><td>Input, asset symbol for trading (see <a href="symbol.htm">Symbols</a>).</td></tr><tr><td><strong>Amount</strong></td><td>Input, number of units, positive for a long trade and negative for a short trade. For currencies or CFDs, the number of units is the number of <a href="lots.htm">Lots</a> multiplied with the <a href="pip.htm">LotAmount</a>. If <strong>LotAmount</strong> is &lt; 1 (f.i. for a CFD, or for a fractional share with 0.1 contracts lot size), the number of lots is given here instead of the number of units.</td></tr><tr><td><strong>StopDist</strong></td><td>Optional input, 'safety net' stop loss distance to the opening price when <a href="stop.htm">StopFactor</a> was set, or <strong>0</strong> for no stop, or <strong>-1</strong> for indicating that this function was called for closing a position. This is not the real stop loss, which is handled by Zorro. Can be ignored if the API is NFA compliant and does not support a stop loss in a buy/sell order.</td></tr><tr><td><strong>Limit</strong></td><td>Optional input, fill price for limit orders, set up by <a href="stop.htm">OrderLimit</a>, or <strong>0</strong> for market orders. Can be ignored if limit orders are not supported by the API.&nbsp;</td></tr><tr><td><strong>pPrice</strong></td><td>Optional output, the average fill price if the position was partially or fully filled. If no price was set, Zorro assumes the current price.</td></tr><tr><td><strong>pFill</strong></td><td>Optional output, the fill amount (positive), or 0 for an unfilled order. If no amount was set, Zorro assumes a complete fill.</td></tr></tbody></table>

### Returns:

*   **0** or **1** when the order was rejected or when a FOK or IOC order was unfilled within the [wait time](113_brokerCommand.md) (adjustable with the [SET\_WAIT](brokercommand.md) command). An unfilled FOK or IOC order must be cancelled by the plugin.
*   Unique trade or order ID number when the order was successfully placed. If the broker API does not provide trade or order IDs, the plugin should generate a unique 6-digit number, f.i. from a counter, and return it as a trade ID.
*   **\-1** when the trade or order identifier is a UUID that is then retrieved with the [GET\_UUID](113_brokerCommand.md) command.
*   **\-2** when the broker API did not respond within the [wait time](113_brokerCommand.md), so the order state is unknown. The plugin must then cancel the order. Zorro will display a "possible orphan" warning.
*   **\-3** when the order was accepted, but got no ID yet. The ID is then taken from the next subsequent **BrokerBuy** call that returned a valid ID. This is used for combo positions that require several orders.  
     

## BrokerTrade (int nTradeID, double \*pOpen, double \*pClose, double \*pCost, double \*pProfit): int

Optional function that returns the order fill state (for brokers that support only orders and positions) or the trade state (for brokers that support individual trades). Called by Zorro for any open trade when the price moved by more than 1 pip, or when [contractUpdate](096_contract.md) or [contractPrice](096_contract.md) is called for an option or future trade.

### Parameters:

<table border="0"><tbody><tr><td><strong>nTradeID</strong></td><td>Input, order/trade ID as returned by <strong>BrokerBuy</strong>,&nbsp;or <strong>-1</strong> when the trade UUID was set before with a <a href="brokercommand.htm">SET_UUID</a> command.</td></tr><tr><td style="height: 42px"><strong>pOpen</strong></td><td style="height: 42px">Optional output, the average fill price if the trade was partially or fully filled. If not available by the API, Zorro will estimate the values based on last price and asset parameters.</td></tr><tr><td><strong>pClose</strong></td><td>Optional output, current bid or ask close price of the trade. If not available, Zorro will estimale the value based on current ask price and ask-bid spread.</td></tr><tr><td><strong>pCost</strong></td><td>Optional output, total rollover fee (swap fee) of the trade so far. If not available, Zorro will estimate the swap from the asset parameters.</td></tr><tr><td><strong>pProfit</strong></td><td>Optional output, current profit or loss of the trade in account currency units, without rollover and commission. If not available, Zorro will estimate the profit from the difference of current price and fill price.</td></tr></tbody></table>

### Returns:

*   Current fill amount in units or lots as in **BrokerBuy2**.
*   **\-1** when the trade was completely closed.
*   **NAY** (defined in **trading.h**) when the order or trade state was unavailable. Zorro will then assume that the order was completely filled, and keep the trade open.
*   **NAY-1** when the order was cancelled or removed by the broker. Zorro will then cancel the trade and book the profit or loss based on the current price and the last fill amount.  
      

## BrokerSell2 (int nTradeID, int nAmount, double Limit, double \*pClose, double \*pCost, double \*pProfit, int \*pFill): int

Optional function; closes a trade - completely or partially - at market or at a limit price. If partial closing is not supported, **nAmount** is ignored and the trade is completely closed. Only used for not [NFA compliant](mode.htm#nfa) accounts that support individual closing of trades. If this function is not provided or if the [NFA](018_TradeMode.md) flag is set, Zorro closes the trade by calling **BrokerBuy2** with the negative amount and with **StopDist** at **\-1**.

### Parameters:

<table border="0"><tbody><tr><td><strong>nTradeID</strong></td><td>Input, trade/order ID as returned by <strong>BrokerBuy2</strong>, or <strong>-1</strong> for a UUID to be set before with a <a href="brokercommand.htm">SET_UUID</a> command.</td></tr><tr><td><strong>nAmount</strong></td><td>Input, number of contracts resp. lots to be closed, positive for a long trade and negative for a short trade (see <strong>BrokerBuy</strong>). If less than the original size of the trade, the trade is partially closed.</td></tr><tr><td><strong>Limit</strong></td><td>Optional input, fill price for a limit order, set up by <a href="stop.htm">OrderLimit</a>, or <strong>0</strong> for closing at market. Can be ignored if limit orders are not supported by the API.&nbsp;</td></tr><tr><td><strong>pClose</strong></td><td>Optional output, close price of the trade.</td></tr><tr><td><strong>pCost</strong></td><td>Optional output, total rollover fee (swap fee) of the trade.</td></tr><tr><td><strong>pProfit</strong></td><td>Optional output, total profit or loss of the trade in account currency units.</td></tr><tr><td><strong>pFill</strong></td><td>Optional output, the amount that was closed from the position, always positive.</td></tr></tbody></table>

### Returns:

*   New trade ID when the trade was partially closed and the broker assigned a different ID to the remaining position.
*   **nTradeID** when the ID did not change or the trade was fully closed.
*   **0** when the trade was not found or could not be closed.  
     

## BrokerCommand (int Command, ...): var

Optional function, directly called by the **[brokerCommand](113_brokerCommand.md)** function for setting special modes or retrievong special information from the broker API.  

### Remarks:

*   A broker DLL must contain at least the BrokerOpen function for being recognized by Zorro and appearing in the scrollbox.
*   Functions ending with **'2'** replace older functions that are however still supported. For instance, **BrokerHistory2** replaced **BrokerHistory**, but old plugins with **BrokerHistory** will still work.
*   The broker plugin has full access to all HTTP and other Zorro functions with the [SET\_FUNCTIONS](113_brokerCommand.md) command. The old **BrokerHTTP** function is no longer needed, but still supported.
*   Date/Time parameters and historical time stamps should be UTC. If **[GET\_BROKERZONE](113_brokerCommand.md)** is supported and returns a different time zone, they should be in that time zone.
*   If the connection breaks down, **BrokerTime** will be called in [TickTime](187_TickTime_MaxRequests.md) intervals for determining if it is still broken. If interrupted for a longer time, Zorro will attempt to re-login in increasing intervals from minutes to hours until the connection is established again.
*   If optional functions are not implemented or optional parameters not returned, Zorro replaces them with educated guesses and assumptions. For instance, if **BrokerSell2** is not implemented, Zorro will assume that trades are closed by buying in opposite direction. If **BrokerTrade** is not implemented and thus the fill amount and fill price of [GTC](018_TradeMode.md) orders cannot be traced, Zorro will treat the order as if it were completely filled at the entry price, and will estimate the value of the position from the current price and entry price.
*   If **BrokerTrade** is implemented, it is automatically called in regular intervals for updating the fill amounts and values of all open positions, except for contracts. For contracts it is only called by [contractUpdate](096_contract.md) or [contractPrice](096_contract.md), and is preceded by a [SET\_SYMBOL](113_brokerCommand.md) command with the current contract symbol.
*   For a script with low-level broker access, you can call the above functions of a broker plugin directly from your script. For this, open the plugin DLL with **LoadLibrary** or **[DefineApi](litec_api.md)** as described under [DLL / API implementation](litec_api.md). The broker DLL may also contain other broker-specific functions that are not directly used by Zorro, but can be called this way from strategy scripts.
*   For passing struct pointers via **BrokerProgress** from the API to the Zorro script, make sure that struct member alignment is set to 4 bytes or less. Lite-C does not align or pad struct members.
*   For asynchronously triggering a price quote request, send a **WM\_APP+1** message to the window handle received by the [SET\_HWND](113_brokerCommand.md) command. For triggering the [callback](089_tick_tock.md) function, send a **WM\_APP+2** message. This can be used for prices streamed by another thread. An example for sending messages can be found under [HWnd](hwnd.md).
*   Some crypto exchanges require HMAC authentication signatures for transmitting orders. There is public C++ code for that in many code libraries on Github (search for f.i. **sha512.cpp**).
*   Since Zorro broker plugins are standard 32-bit DLLs, they can also be used by third party software. For instance, the above functions can be called from Python using the **ctypes** library.

### Example: see Source folder

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [Symbols](014_Asset_Symbols.md), [brokerCommand](113_brokerCommand.md), [enter](buylong.md), [order](111_order.md), [DLL](litec_api.md), [IB](062_DefineApi_LoadLibrary.md), [FXCM](230_FXCM.md), [Oanda](237_Oanda.md), [MT4](mt4plugin.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))