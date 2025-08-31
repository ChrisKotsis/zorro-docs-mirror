---
title: "Asset Symbols"
source: "https://zorro-project.com/manual/en/symbol.htm"
---

# Asset Symbols

# Asset Symbols for the Zorro platform

Asset symbols are used for identifying a particular asset for online sources or broker APIs. They are given in the **Symbol** column of the [asset list](013_Asset_Account_Lists.md), but can also be set directly in the trading script. In the simplest case the symbol is identical to the asset name (f.i. **"EUR/USD"**). Different brokers use often different symbols for the same asset; for instance a DAX CFD has the symbol **"GER30"** on FXCM, **"DE30/EUR"** on Oanda, and **"DEU.IDX/EUR"** on Dukascopy. Zorro accepts a simple symbol, an extended symbol, or a combination of symbols. Extended symbols are needed when the asset is traded on several exchanges or requires additional information, such as expiration date or strike price. An asset can have a combination of up to three different symbols: the first one for trading, the second for retrieving live prices, and the third for retrieving historical prices.

An extended symbol is a text string in the format **Source:Root-Type-Exchange-Currency** ("IB:AAPL-STK-SMART-USD").  
Assets with an expiration date, such as **futures**, have the format **Root-Type-Expiry-Class-Exchange-Currency** ("SPY-FUT-20231218-SPY1C-GLOBEX-USD").  
Stock or index **options** have the format **Root-Type-Expiry-Strike-P/C-Exchange-Currency** ("AAPL-OPT-20191218-1350.0-C-GLOBEX-USD").  
**Future options** have the format **Root-Type-Expiry-Strike-P/C-Class-Exchange**.("ZS-FOP-20191218-900.0-C-OSD-ECBOT").  
**Forex symbols** that need a particular exchange have the format **Currency/Countercurrency-Exchange** ("NOK/USD-IDEALPRO").  
Up to 3 symbols can be combined: **SymbolTrade!SymbolLive!SymbolHist** ("IB:\*-STK-SMART-USD!STOOQ:\*.US!STOOQ:\*.US").

The symbols for futures and option contracts are often not entered in the asset list, but internally generated frrom the [contract chain](contract,htm); the asset list then contains only the symbol of the underlying. The contract symbols can be retrieved with the [strcon](str_.md) function. Parsing the symbol string is the job of the [broker plugin](brokerplugin.md). Parts of symbols can be omitted, for instance **"SPY-FUT---GLOBEX-USD"** determines a contract chain of SPY futures with all trading classes and all expiration dates.  

*   **Source** is an optional price source or broker name. It can be an [online price source](loadhistory.md) (such as **STOOQ:**), or a name from the first column of the [account list](013_Asset_Account_Lists.md). This way the same asset can get prices from broker A and can trade with broker B (Zorro S is required for multiple brokers). If the source is omitted, the currently connected broker is used.  
     
*   **Root** is the root symbol or underlying symbol used by the broker or price source, such as **AAPL**, **SPX500**, **EUR.USD**, **BTC-ETH**, **SPY.US**. An asterisk '**\***' for the root symbol replaces it with the asset name. Often the root symbol is sufficient for identifying the asset. A special symbol is **"DUMMY"**; it generates an artificial asset with a flat price curve for test purposes.  
       
    
*   **Type** is the asset type, such as **STK** (stock or ETF), **OPT** (option), **FUT** (future), **IND** (index), **FOP** (future option), **CASH** (forex), **CFD, BOND, CMDTY** (commodity), It's required when the same asset is available in different types, for instance as a stock or as a CFD. There can be other broker-specific types.  
     
*   **Exchange** is the exchange code where the asset is traded, such as **AMEX, ARCA, CBOE, CBOT, CFE, CME, DTB, ECBOT, GLOBEX, IBIS, ICE, NASDAQ, LSE, NYBOT, NYMEX, NYSE, XETRA**. If the broker supports smart routing, use the exchange code **SMART**.  
     
*   **Currency** is the counter currency of the assets. For forex or crpytocurrencies it's obvious from the root symbol, for other assets it's a currency symbol such as **USD** or **EUR**. If omitted, **USD** is assumed.   
       
    
*   **Expiry** is the expiration date either as a number in YYYYMMDD format, or as a contract symbol, f.i. **ESH9** for the ES March 2019 contract The contract symbol normally consists of the base symbol ("ES"), a letter for the expiration month (F Jan, G Feb, H Mar, J Apr, K May, M Jun, N Jul, Q Aug, U Sep, V Oct, X Nov, Z Dec), and the last digit of the expiration year.   
     
*   **Class** is the trading class, usually for futures. It can be found on the website of the exchange or under "Local Class" on the brorker's detail sheet. If the future has no trading class, use the root symbol.  
     
*   **Strike** is the strike price for options in counter currency units.  
     
*   **P/C** is either **P** for put or **C** for call options.

An asset can have multiple symbols that are separated by exclamation marks '**!**'. They are accessible in the script under the names [SymbolTrade](020_Included_Scripts.md), [SymbolLive](020_Included_Scripts.md), [SymbolHist](020_Included_Scripts.md). If the **Symbol** field is empty or contains **'\*'**, the asset name is used for the symbol. If it contains 2 symbols, the first is used for trading and the second for live and historical price data from the broker or online source. Of 3 symbols, the first is used for trading, the second for live prices, the third for downloading historical prices. An empy symbol of a multiple symbol combination disables its function - for instance, **"AAPL!!"** allows trading, but does not retrieve live or historical prices from the broker. This can be used in special cases when no market data was subscribed or prices are retrieved by other means, like with the [assetHistory](loadhistory.md) or [priceQuote](022_Price_History.md) functions.

### Symbol examples:

<table style="width: 100%"><tbody><tr><td><strong>*</strong></td><td>Symbol identical to the asset name.</td></tr><tr><td><strong>*-STK-SMART-USD</strong></td><td>General US stock or ETF, smart routing.</td></tr><tr><td><strong>STOOQ:*.US</strong></td><td>General US stock or ETF, no trading, live and historical prices from STOOQ.</td></tr><tr><td><strong>TNOW-STK-SMART-USD!TNOW-STK-SMART-USD!YAHOO:TNOW.L</strong></td><td>TNOW ETF, trading and pricing with current broker, historical prices from Yahoo.</td></tr><tr><td><strong>OandaReal:EUR/USD!FXCMDemo:EUR/USD</strong></td><td>EUR/USD traded with OandaReal using prices from FXCMDemo.</td></tr><tr><td><strong>AAPL-OPT-20190918-1350.0-C-GLOBEX</strong></td><td>AAPL Call option expiring Sep 18, 2019, at $1350 strike.</td></tr><tr><td><strong>DAX-FUT-20201218-FDAX-DTB-EUR</strong></td><td>DAX future expiring Dec 18, 2020, trading class FDAX.</td></tr></tbody></table>

  

### See also:

[Broker](214_Brokers_Data_Feeds.md), [asset](013_Asset_Account_Lists.md), [asset list](013_Asset_Account_Lists.md), [broker arbitrage](brokerarb.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))