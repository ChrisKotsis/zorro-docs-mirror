---
title: "Price History"
source: "https://zorro-project.com/manual/en/history.htm"
---

# Price History

# Historical data (and how to get it)

Historical price data is used in \[Test\] and \[Train\] mode, and can also be used in \[Trade\] mode for pre-loading the [LookBack](181_LookBack_UnstablePeriod.md) period. The needed data period is determined with [StartDate](100_tradeUpdate.md) and [EndDate](100_tradeUpdate.md). If historical prices from the desired period are missing, they can be downloaded with the [assetHistory](loadhistory.md) function or the **Download** script (see below). All downloaded prices are usually aligned to UTC time. The broker's time zone does not matter. Therefore it's normally no problem to use price data from different sources for the simulation and for trading.

Zorro stores historical price data in files the **History** folder. The file name begins with the asset name, and the file extension indicates the content:

*   **.t1** for plain ask/bid quotes (ticks),
*   **.t2** for order book (market depth) data with volume,
*   **.t6** for candles with optional spread and volume,
*   **.t8** for futures and options with strike and expiration.

Any historical data file is simply a list of structs. Any struct represents a candle, quote, contract, or order book entry. The struct size - the number of elements besides the time stamp - is indicated by the number after the "**t**" extension. Thus, a **.t6** file consists of **T6** structs (see below) with a time stamp and 6 data elements. For avoiding extremely large files that are awkward to handle, price history is normally split in multiple years. The file name has then the year number attached; for instance, **"AAPL\_2010.t2"** contains **AAPL** order book data from **2010**. Those multi-year files are automatically detected and loaded.

Some files, such as high resolution options data, can be too large even for year splitting. They can then be split in months or days, and loaded by script at the begin of any month or day in the backtest. If additional data besides prices, spread, volume and timestamp is required, it can be separately imported from arbitrary user-specific formats in a [dataset](125_sortData_sortIdx.md). The **.t6** price data files included with Zorro are normally split in years and contain a list of 1-minute candles in **T6** format. The data resolution is format independent, but should be at least as high or higher than the [bar resolution](005_Bars_and_Candles.md) in backtests.

The same asset can have different price histories, for instance EOD data for strategies with daily bars, M1 data for day trading and T1 data for scalping. The historical data files can be distinguished with a postfix character to the file name, for instance **"AAPLeod.t6"** for EOD data with no year number, **"AAPL\_2018m1.t6"** for M1 candle data split into years and **"AAPL\_2018.t1"** for tick data. The script can then select the right price history through the [History](020_Included_Scripts.md) variable. For instance, **"History = \*eod.t6"** selects the EOD data, **"History = \*m1.t6"** the M1 data and **"History = \*.t1"** the tick data. The default is **\*.t6** for bars of one minute or more, and **\*.t1** for bars of less than one minute.

Historical data files contain either **T1**, **T2**, **T6**, or **CONTRACT** structs in descending timestamp order (newest price first).The structs are defined in the **trading.h** header:

```c
typedef struct T1  
{  
  DATE  time; _// UTC timestamp of the tick in DATE format_  
  float fPrice; _// trade/ask/bid price, positive for ask, negative for bid_  
} T1;
 
typedef struct T2
{
  DATE time;  _// UTC timestamp in DATE format
_  float fPrice; _// trade/ask/bid price, negative for bid
_  float fVol; _// trade volume or ask/bid size_
} T2; 
 
typedef struct T6
{
  DATE  time; _// UTC timestamp of the close, DATE format_
  float fHigh,fLow;	
  float fOpen,fClose;	
  float fVal;  // _additional data, usually ask-bid spread_
  float fVol;  /_/ additional data, usually volume_
} T6;
 
typedef struct CONTRACT
{
  DATE  time;   _// UTC timestamp in DATE format_
  float fAsk,fBid; _// premium without multiplier_
  float fVal,fVol;  _// additional data, like delta, open interest, etc._
  float fUnl;   _// underlying price (unadjusted)_
  float fStrike; _// strike price_
  long  Expiry; _// YYYYMMDD format_
  long  Type;   _// PUT, CALL, FUTURE, EUROPEAN, BINARY_
} CONTRACT;
```

All years and assets should have the same historical file format; mixing different formats would produce an error message. Data in **.t2** order book format or **.t8** options format can be used additionally to the historical price data, since they are loaded with different functions ([orderUpdate](ordercpd.md) and [contractUpdate](132_contractCPD.md)). Underlying prices (**fUnl** in the **CONTRACT** struct) and order book data is normally unadjusted, while historical prices in **.t1** or **.t6** files are usually split and dividend adjusted. Some strategies require both types of prices.

The structs are stored in descending time order, i.e. the most recent tick comes first. Timestamps are in OLE **DATE** format, which is a **double float** that counts days since midnight 30 December 1899. Hours, minutes, seconds, and milliseconds are simply fractions of days. If the tick covers a time period, its timestamp is the UTC time of its last price, i.e. the time of the Close. If you have price data based on local time, convert it to UTC (you can find some example code [here](brokerplugin.md)). Daily (**D1**) price history with timestamps containing the date only - i.e. no time of day - is supposed to be from the market close time. A bar time offset, such as 15:40, is then automatically set up when the user does not define a different offset. If the original price data contains bid prices, convert them to ask prices by adding the spread. If the price data contains time stamps not from the close of a tick, but from the open or middle price, correct them with the [TickFix](187_TickTime_MaxRequests.md) variable if needed for the strategy. In most cases it has little effect on backtest results if ticks contain ask, bid, or trade prices, or if time stamps are from the tick open or the close.  

The **fOpen**, **fClose**, **fHigh** and **fLow** data streams can be separately accessed with [price](022_Price_History.md) functions. The **fVal** and **fVol** data can be used to store additional data, such as spread, quote frequency, trade volume, implied volatility, delta, swap, etc, and accessed with [market](022_Price_History.md) functions. All data streams are automatically synchronized to the streams of the first [asset](013_Asset_Account_Lists.md) call in the script; so it does not matter if some data is only available in daily or weekly 'ticks'.

Outliers in historical data are automatically detected and removed. If this is not desired, for instance with high volatility assets such as cryptocurrencies or penny stocks, disable [outlier detection](outlier.md) or raise the detection level.

### Import and conversion

Data can be downloaded from brokers, free online source, data vendors, or the Zorro [download page](https://zorro-project.com/download.php). You can get it in different resolutions, and - with stocks - either split and dividend adjusted, or unadjusted. You normally use adjusted data for backtests. Forex M1 data and stock D1 data is free, but data in higher resolution or for other assets is not. M1 history for US Stocks and D1 options history can be purchased from us in **.t6** and **.t8** format, or from data vendors in CSV or JSON formats. When downloading data from a broker, make sure to select the 'last trade' price type if available, and adjust stock prices to avoid artifacts by splits and dividends. Purchased data usually contains adjusted trade prices.

For using data files with a resolution of less than one minute (such as **.t1** or **.t2** files), [Zorro S](restrictions.md) is required. For importing price or options data files from external sources, convert them to a list of T1, T2, T6, or CONTRACT structs, optionally divide them into years or months, and store them in binary files with the format and name described above.

Data from online sources or vendors in CSV or JSON formats can be converted to **.t1**, **.t2**, **.t6**, or **.t8** with the [dataParse](125_sortData_sortIdx.md) function. Examples can be found under [Import](023_Import.md). The **Strategy** folder also contains several [small scripts](020_Included_Scripts.md) for download and conversion from popular formats. **Download.c** (see below) downloads historical data in **.t6** or **.t1** format from Yahoo, IB, FXCM, or Oanda. **CSVtoHistory** converts data from popular .csv formats, f.i. from HistData, Quandl, or Yahoo, to the Zorro **.t6** format. Example code for automatically downloading **.csv** price data from the Internet or from a provider API can be found on the [http](160_HTTP_functions.md) page. A script for generating artificial **.t8** historical data for options from the yield rate, dividends, and underlying price history can be found [here](http://www.financial-hacker.com/algorithmic-options-trading/). Example scripts for converting history files from complex **.csv** or **.nxc** formats to the **.t1** format can be found [here](http://www.financial-hacker.com/hacking-hft-systems/).

For looking into **.t8**, **.t6**, **.t2**, or **.t1** files and displaying their content, use the **[History](020_Included_Scripts.md)** or [Chart](020_Included_Scripts.md) scripts.

### The Download script

Historical data for many common tasks is avaiable on the [Zorro Download Page](https://zorro-project.com/download.php). Further data is available from brokers, online price sources, and data vendors. For downloading data from your broker, a small script - **Download.c** - is included in the Zorro distribution. It can be used not only for retrieving price data, but also for updating asset parameters. You can download either the history of a single asset, or do a bulk download of all assets of a given [asset list](013_Asset_Account_Lists.md).

The script opens a tiny control panel with a few toggle buttons (blue) and entry fields (yellow):

<table cellspacing="1" class="auto-style2"><tbody><tr><td>History</td><td>&nbsp;</td></tr><tr><td class="auto-style3">AAPL</td><td>Either asset symbol, or asset list file name</td></tr><tr><td class="auto-style3">2020-2024</td><td>Time period to download</td></tr><tr><td class="auto-style4">M1</td><td>Data resolution: M1, T1, T2, or D1</td></tr><tr><td class="auto-style4">Ask/Bid</td><td>Data type: Ask/Bid, Bid, Trades, Unadjusted, Parameters</td></tr><tr><td class="auto-style4">Broker</td><td>Data source: Broker, Stooq, Yahoo, AlphaVantage</td></tr><tr><td class="auto-style4">Download!</td><td>Click here to start the download.</td></tr></tbody></table>

**Asset** or **Asset List**

Enter here the symbol of the asset in the form needed by the broker or price source, f.i. **"AAPL.US"** for downloading AAPL data from Stooq. If the name contains the word **"Assets"** or ends with **".csv"** (f.i. **"AssetsFXCM.csv"**), all assets of the asset list with the given name are downloaded.

**Data resolution**

*   **M1** loads data in 1-minute OHLC ticks from the selected broker, and stores it in year files. This is the resolution that you normally use for backtests.
*   **T1** and **T2** stores single price quotes to **.t1** or **.t2** year files in high resolution (Zorro S required).
*   **D1** loads End-of-Day data from online sources to a single multi-year file.

**Data type**

*   **Ask/Bid** are the default data that you normally use for backtests. Candles usually contain ask prices.
*   **Bid** stores data from bid prices, for special purposes.
*   **Trades** stores trade prices and volume (if supported by the broker).
*   **Unadjusted** selects EOD prices from Internet data sources that are not split and dividend adjusted. They are used for special purposes, f.i. options trading.
*   **Parameters** downloads no prices, but updates the asset parameters from the selected broker (if supported), and stores them in **Log\\Assets.csv**. Asset parameters not provided by the broker are taken from the current asset list.

**Data source**

*   **Broker** downloads data from the broker account selected in the Zorro panel.
*   **Stooq** downloads historical EOD data from Stooq (see [assetHistory](loadhistory.md)).
*   **Yahoo** downloads historical EOD data from Yahoo Finance (see [assetHistory](loadhistory.md)).
*   **AlphaVantage** downloads historical EOD data from AlphaVantage; an AV key is required (see [assetHistory](loadhistory.md)).

Not all combinations make sense. For instance, you can normally not download M1 data or asset parameters from online data sources. Check with your broker which assets are available. It is recommended to download forex data from the same broker that you use for trading, since it's broker dependent. If a price history file of the same asset already exists, the new prices are appended at the end. If the file was already updated on the same or previous day, no data is downloaded. If you tried to download nonexisting data from a data source, you'll normally get a file containing an error message as response. Zorro won't interpret that file, but you can find it in your **History** folder as the most recent file, open it with a text editor, and see what's wrong.

 After all is downloaded, click \[Stop\] to end the session.

### See also:

[Bars](005_Bars_and_Candles.md), [file](158_File_access.md), [dataset](125_sortData_sortIdx.md), [data import](023_Import.md), [asset parameters](192_PIP_PIPCost_Leverage.md), [assetHistory](loadhistory.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))