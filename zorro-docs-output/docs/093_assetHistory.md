---
title: "assetHistory"
source: "https://zorro-project.com/manual/en/loadhistory.htm"
---

# assetHistory

## assetHistory(string Name, int Mode): int

Loads price history either from the currently selected broker or data feed, or from a specified online price source in CSV or JSON format. Stores the data in a dataset or in a **.t6**, **.t2**, or **.t1** file in the **History** folder. Online price sources can be user defined; some popular sources such as Quandl, Stooq etc. are predefined.  

### Parameters:

<table border="0"><tbody><tr><td><strong>Name</strong></td><td><p>Asset <a href="symbol.htm">symbol</a> or code specifying the price source, or the asset name from the asset list, or <strong>0</strong> for the current asset symbol.</p></td></tr><tr><td><strong>Mode</strong></td><td><p><strong>0</strong> - download tick data (*.t1) or ask/bid quotes (*.t2) from the selected broker (<a href="restrictions.htm">Zorro S</a> required).<strong><br>1</strong> - download one-minute (M1) price data in *.t6 format (all brokers, plus Bittrex, CryptoCompare)..<br><strong>2</strong> - download hourly (H1) data (Bittrex, CryptoCompare).<br><strong>3</strong> - download daily (D1) data (all online sources, and IB).<br><strong>4</strong> - download data in <a href="lookback.htm">LookBackResolution</a> (all brokers).<br><strong>8</strong> - download nothing, but get the data from <strong>History\history.csv</strong> (for test purposes).<br><br><strong>+FROM_SOURCE</strong> - download data from a user defined online source (see <strong>assetSource</strong>; <a href="restrictions.htm">Zorro S</a> required).<strong><br>+FROM_GOOGLE</strong> - download daily (D1) data from <strong>Google Finance</strong> (currently unavailable).<br><strong>+FROM_QUANDL</strong> - download daily (D1) data from <a href="http://www.quandl.com">Quandl/NASDAQ</a> (<a href="restrictions.htm">Zorro S</a> and Quandl key required).<br><strong>+FROM_AV</strong> - download daily (D1) data from <a href="http://www.alphavantage.co/" target="_blank">AlphaVantage</a>.<br><strong>+FROM_STOOQ</strong> - download daily (D1) data from <a href="https://stooq.com/" target="_blank">Stooq</a>.<br><strong>+FROM_EOD</strong> - download daily (D1) data from <a href="https://eodhistoricaldata.com/pricing-zorroproject/?utm_source=zorroproject&amp;utm_medium=link&amp;utm_campaign=pricing" target="_blank">EOD</a><strong>.<br>+FROM_YAHOO</strong> - download daily (D1) data from <strong>Yahoo Finance</strong> (currently unavailable)<strong>.</strong><br><strong>+FROM_IEX</strong> - download daily (D1) data from <a href="https://iexcloud.io">IEX Cloud</a>.<br><strong>+FROM_CRYPTOC</strong> - download M1, H1, or D1 data from <a href="https://www.cryptocompare.com/" target="_blank">CryptoCompare</a> (<a href="restrictions.htm">Zorro S</a> required).<br>&nbsp;(If no online source is set, the data is downloaded from the selected broker).<br><br><strong>+UNADJUSTED</strong> - download unadjusted prices (some sources only; see remarks below).<br><strong>+OVERRIDE</strong> - download price data even when history is up to date, i.e. not older than half the data period.<br><strong>+IMMEDIATE</strong> - download at least one tick of recent price data; for getting a live price from an online source.<br><strong>+VOLATILE</strong> - store the data in a temporary <a href="data.htm">dataset</a> whose handle is returned (only D1 data or online sources).<br><strong>+PRECISE</strong> - load only the period given by <a href="lookback.htm">LookBack</a>, <a href="date.htm">StartDate</a>, and <a href="date.htm">EndDate</a>.<br><strong>+FOR_ASSET</strong> - store the file under the name of the current asset selected with <a href="asset.htm">asset</a> or <a href="asset.htm">assetAdd</a>.</p></td></tr></tbody></table>

### Returns:

**0** when nothing was downloaded due to an error or because the data was up to date. Otherwise a nonzero value or the dataset handle.  
 

## assetSource(string Filename, string URL, string Header, string Body, string Format)

Sets up all parameters of a price source website or REST API for a subsequent **assetHistory(...,FROM\_SOURCE**) call. See examples.  

### Parameters:

<table border="0"><tbody><tr><td><strong>Filename</strong></td><td><p>Name of the file for storing or appending the downloaded data, or <strong>0</strong> for using the default symbol.</p></td></tr><tr><td><strong>URL</strong></td><td><p>Target URL for the data request, including request parameters.</p></td></tr><tr><td><strong>Header</strong></td><td><p>Request header, or 0 if no header is required. Some online sources requre an API key or access troken in the header.</p></td></tr><tr><td><strong>Body</strong></td><td><p>Request body for a HTTP POST request, or 0 for a HTTP GET request.</p></td></tr><tr><td><strong>Format</strong></td><td><p>Format string for converting the received data, as described under <a href="data.htm">dataParse</a>. If the format begins with <strong>'['</strong>, JSON data format is assumed, otherwise CSV format. If 0 or empty, the data is not converted, but stored under <strong>history.csv</strong> or <strong>history.json</strong>.</p></td></tr></tbody></table>

### Remarks:

*   Price history is stored in the **History** folder under **Name** plus **.t6** extension for D1 or M1 data, or **.t2** or **.t1** for tick data. The file name and extension can be set up with the [History](020_Included_Scripts.md) string (like **History = "\*.t2";** for storing ask/bid quotes or tick data wth volume). M1 or higher resolution data is split into separate years, EOD data or data from an online source is stored in a single file. The Quandl database name, an appended **".US"** by Stooq, and **'/'**, **'.'**, or **':'** characters are automatically stripped from the historical data file names. If the name is otherwise different to the asset name, use [file\_copy](158_File_access.md) to copy the downloaded file to the correct asset name (f.i. **file\_copy("History\\\\ICE.t6","History\\\\LONDONICE.t6")**.
*   The file size of tick data in **.t1** format can be reduced by setting the **PriceStep** variable to a nonzero value. Prices are then only stored when they differe from the previous price by at least the given step value (default **0**).
*   Price history is only downloaded in the [INITRUN](018_TradeMode.md) or in the **main** function, and only when existing price history is not already up to date. For this the most recent online price or the given **EndDate** is compared with the history file date, and if the difference is less than half the data resolution, no new history is downloaded. If **FOR\_ASSET** is set, [UpdateDays](100_tradeUpdate.md) are also considered. For downloading data after the **INITRUN** and regardless of existing history, set the **OVERRIDE** flag.
*   For automatically downloading price history at the begin of a backtest, use the [UpdateDays](100_tradeUpdate.md) variable. No **assetHistory** call is needed.
*   If the same price history is downloaded multiple times, for instance by several different scripts, make sure that the begin of already existing data matches the longest needed data period. Newly downloaded data is only merged to the end of existing history, but not to the begin.
*   The raw data from online sources (Google, Quandl, etc) is stored in **History\\history.csv** or **History\\history.json**. If the price source does not deliver price data, but some error message instead, a **"invalid response"** error is displayed. The error message can then be read from the downloaded raw file. The **assetHistory** function will attempt twice to download the data before giving up.
*   If a download failed for some reason, delete the resulting partial history file (if any). Otherwise subsequent downloads might attempt to append to it or assume that the data is up to date. Usual reasons for failed downloads from online sources are wrong symbols or exceeding a quoata limit. The reason can be normally found in the downloaded **history.csv** or **history.json** file, which contains the response from the online source.
*   When downloading data from a broker, the asset is subscribed automatically. The recent values of the asset's [Spread](191_Spread_Commission.md), [PipCost](192_PIP_PIPCost_Leverage.md), etc. are updated to the [Assets.csv](013_Asset_Account_Lists.md) file even if no price history is downloaded. This way new assets can be added and available assets can be set up to their current parameter values for further simulations.
*   Price history from brokers is downloaded either for the number of recent years given by [NumYears](100_tradeUpdate.md), or for the number of years given by [StartDate](100_tradeUpdate.md) and [EndDate](100_tradeUpdate.md) plus an additional [LookBack](181_LookBack_UnstablePeriod.md) year. If **FOR\_ASSET** is set, the start and end dates are kept exactly without considering the lookback period. Otherwise whole years are loaded. If [NumYears](100_tradeUpdate.md) is set to **\-1**, no data is downloaded, but [Log\\Assets.csv](013_Asset_Account_Lists.md) is still updated. Price history from online sources is downloaded for a fixed number of years up to the current day, depending on the source.
*   Price data from a broker or from online sources with limited history (**FROM\_IEX**, **FROM\_CRYPTOC**, **FROM\_SOURCE**) is appended at the begin of an existing data file. Price data from other sources is not appended, but replaces the previous file unless it's already up to date. Make sure that the time resolution of the downloaded prices matches the resolution of the historical data files. Normally the resolution is 1 tick for .t1 or .t2 files, 1 minute for .t6 files with year number, or 1 day for .t6 files without year number.
*   For backtesting price history, [BarPeriod](177_BarPeriod_TimeFrame.md) must be at or above the price history resolution. Set it to **1440** for testing D1 price data. For testing only parts of a multi-year **.t6** file, use an 8-digit [StartDate](100_tradeUpdate.md) or [EndDate](100_tradeUpdate.md).
*   Price history from online sources is temporarily stored in a dataset of T6 or T2 records with handle **H\_HISTORY**. It can be used to evaluate the data without loading the history file.
*   Check the correct spelling of the asset name or code. Spelling often differs slightly, f.i. the same stock can be named **BRK.B**, **BRK\_B**, **BRK-B**, or **BRK-B.US** dependent on the website or price source.
*   Outliers in the price history are automatically fixed on download dependent on the [Outlier](outlier.md) variable. The first detected outlier will trigger **Warning 035**. Some high volatility assets, such as cryptocurrencies or penny stocks, could require a higher outlier tolerance when downloading prices. Candles with duplicate time stamps are automatically removed on downloading **.t6** files.
*   A price history file with length **0** is skipped in the backtest and prevents downloading prices for that particular year. This way, by storing an empty file, price data that is unavailable or of bad quality can be excluded from download and backtests.
*   For T1 data, the price server of the broker must support quote-based price data; this is the case for FXCM, but not for Oanda, IB, or MT4/MT5 brokers. Dependent on the price server speed, downloading T1 prices can take a long time, such as a whole day for one year of price quotes. If the **[LEAN](018_TradeMode.md)** flag is not set, ask and bid prices are stored in the **.t1** file, otherwise only ask prices. 
*   Adjusted prices can be split-adjusted, dividend-adjusted, or both. For short-term trading backtests is split-adjustment the best choice, for long-term trading dividend- and split-adjustment. Since dividend adjustment has little effect on short-term backtests, you normally use dividend- and split-adjusted prices for all backtests.
*   Comments about some predefined data sources (all trademarks are property of their owners):
    
    *   **Google** prices are adjusted for splits only, unadjusted prices are not available. Google download is known to fail on certain assets for no apparent reason, even though they can be downloaded manually. The service was recently not available.
    *   **Yahoo** data is split and dividend adjusted; **UNADJUSTED** is supported. Yahoo EOD data was reported to contain 2 entries on dividend payment days, one with the current and one with previous day's data. Yahoo data of some European assets could be of poor quality; check the resulting price curve if in doubt.
    *   **AlphaVantage** data loads relatively slow when there is much traffic. The data has good quality. **UNADJUSTED** is supported. The AV API key must be present under **"AVApiKey = ..."** in [Zorro.ini](007_Training.md). Free data is limited to 5 requests per minute and 500 requests per day.
    *   **Stooq** requires a country identifier appended to stock or ETF names. If it is missing, **".US"** is automatically appended. The data loads fast and is of good quality. **UNADJUSTED** is supported. There is a limit to the number of downloads per day, identified through the IP address.
    *   **EOD** requires a country identifier appended to stock or ETF names. If it is missing, **".US"** is automatically appended. The free subscription only supports one year data and only 20 requests per day. Prices are split and dividend adjusted, **UNADJUSTED** is supported. The key token must be entered under **"EODKey = ...."**  in [Zorro.ini](007_Training.md). Zorro users get a discount on the all-in-one data package when they order on [this link](https://eodhistoricaldata.com/pricing-zorroproject/?utm_source=zorroproject&utm_medium=link&utm_campaign=pricing).
    
    *   **Quandl** data from the **WIKI** (stocks), **CHRIS/CME** and **CHRIS/ICE** (futures), **BITFINEX** and **GDAX** (Bitcoin and other cryptocurrencies) EOD databases are supported. Databases may be discontinued, so check it before on the Quandl website. Quandl databases in different formats can be downloaded with the [dataDownload](125_sortData_sortIdx.md) function. Quandl data loads fast and has usually good quality. The Quandl key must be present under **"QuandlKey = ..."** in [Zorro.ini](007_Training.md) and the asset's database code (f.i. **"WIKI/AAPL"** or **"BITFINEX/ETHBTC"**) must be passed to **Name**.
    *   **IEX** provides EOD data for US equities. **UNADJUSTED** is supported; otherwise data is split- and dividend-adjusted. The IEX API token must be present under **"IEXlKey = ..."** in [Zorro.ini](007_Training.md).
    *   **Bittrex** provides recent price history for a large number of cryptocurrencies. Format: **BTC-ETH** returns ETH prices in BTC. The history length is normally several years for D1 data, several months for H1 data, and several days for M1 data. It is recommended to insert a 4 seconds delay between subsequent **loadHistory** calls.

*   **CryptoCompare** provides recent price history for almost all existing cryptocurrencies. Format: **ETH/BTC** returns ETH prices in BTC. The history length is up to 3 years for D1 data, 1 year for H1 data, and 1 month for M1 data. Since digital currencies are not traded at a central exchange, prices from different sources can be different.
*   **MT4/MT5** servers usually have no long price history, so the command will print an error message or only partially download the history.
*   **IB** market data must be subscribed before it can be downloading. For downloading stock M1 data, send a [SET\_PRICETYPE](113_brokerCommand.md)**,2** command for switching to the last traded price, because ask/bid prices are sometimes in poor quality.
*   **FCXM** servers provide tick price history from 2002 for currencies, and from 2008 for index CFDs.

*   Free historical data is also available on the Zorro download page. History in M1 resolution and options EOD data for US stocks can be purchased from oP group.
*   Some data sources, such as Quandl, AlphaVantage, EOD, provide also earnings reports and other fundamental data in JSON format. It can be retrieved with [http\_transfer](160_HTTP_functions.md) and parsed with [strstr](str_.md) and [strvar](str_.md) commands.  
    

### Example:

```c
_// Update M1 price history of all assets from selected broker_
function main()
{
  NumYears = 2;
  while(loop(Assets))
    assetHistory(Loop1,1);
}

_// Download D1 prices from Quandl_
string Name;
while(Name = loop("AAPL","MSFT","GOOGL"))
  assetHistory(strf("WIKI/%s",Name),FROM\_QUANDL);

_// Download and plot Bitcoin prices from Bitfinex_
function run()
{
  BarPeriod = 1440;
  assetHistory("BITFINEX/BTCUSD",FROM\_QUANDL);
  assetAdd("BTCUSD");
  asset("BTCUSD");
  set(PLOTNOW);
}

_// Download unadjusted SPY data and store it in "SPYuna.t6"_
History = "\*una.t6";
assetHistory("SPY",FROM\_STOOQ|UNADJUSTED);

_// Download AAPL prices from Stooq, using assetSource_
assetSource("AAPL.t6",
"https://stooq.pl/q/d/l/?s=AAPL.US&d1=20000101&d2=20201024&i=d",
0,0,"+%Y-%m-%d,f3,f1,f2,f4,f6");
assetHistory(0,FROM\_SOURCE);

_// Download Bitcoin OHLC prices from Coin.io_
int Month, Year = 2019, MinutesPerMonth = 31\*1440;
for(Month = 1; Month <= 12; Month++) {
  string URL = strf("https://rest.coinapi.io/v1/ohlcv/BTC/USD/history?period\_id=1MIN&time\_start=%04d-%02d-01T00:00:00&limit=%d",
    Year,Month,MinutesPerMonth);
  string Name = strf("BTCUSD\_%04d.t6",Year);
  assetSource(Name,URL,
    "X-CoinAPI-Key: my-coin-api-key",0,
    "\[,time\_period\_end,%Y-%m-%dT%H:%M:%SZ,price\_high,price\_low,price\_open,price\_close,,volume\_traded");
  assetHistory(0,FROM\_SOURCE);
}

_// Download Bitcoin BBO ticks from Kraken via Coin.io_
var From = dmy(20190101), To = dmy(20200101);
for(; From < To; From += 1.) {
  string Start = strdate("%Y-%m-%dT00:00:00",From),
    End = strdate("%Y-%m-%dT00:00:00",From+1.);
  assetSource("BTCUSD\_2019.t2",
    strf("https://rest.coinapi.io/v1/quotes/KRAKEN\_SPOT\_BTC\_USD/history?time\_start=%s&time\_end=%s&limit=100000",
      Start,End),
    "X-CoinAPI-Key: my-coin-api-key",0,
    "\[,time\_exchange,%Y-%m-%dT%H:%M:%SZ,ask\_price,ask\_size,bid\_price,bid\_size");
  assetHistory(0,FROM\_SOURCE);
}
```

### See also:

[price](022_Price_History.md), [asset](013_Asset_Account_Lists.md), [UpdateDays](100_tradeUpdate.md), [MaxTicks](187_TickTime_MaxRequests.md), [loadStatus](loadstatus.md), [price history](022_Price_History.md), [dataDownload](125_sortData_sortIdx.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))