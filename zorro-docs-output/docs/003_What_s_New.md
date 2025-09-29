---
title: "What's New?"
source: "https://zorro-project.com/manual/en/new.htm"
---

# What's New?

# What's new?

### Updating Zorro 2.62 / 2.64 to Zorro 2.70 - questions and answers

*   The data format in 64-bit mode has changed. Recompile your 64-bit C++ scripts.
*   How do I update a live trading Zorro without interrupting? The procedure is described under [Trading](trading.htm#update).
*   Why do I get **error messages** when the script previously compiled fine? Most likely due to improved error detection, a name conflict with a new keyword, or a deprecated variable or function. Deprecated keywords are defined in **legacy.h**, which can be included for still using them.
*   Why do I get a different backtest result? Most likely due to new price histories, new asset parameters, or other changes. You can easily find out by comparing both logs.
*   Why can't I test the new Z system? You need recent historical data. Get it from the [Zorro download page](https://zorro-project.com/download.php).
*   Why are my carefully edited settings gone? You probably edited them in a wrong place. Updates overwrite default settings. Keep individual settings in individual files, like **ZorroFix.ini**, **Z1.ini**, **Z2.ini**, etc. They won't be overwritten.
*   The [Fill](198_Fill_modes.md) mode was changed. Limit entries and exits now fill at the current price. The previous limit fill behavior can be activated with the new Fill mode 2. It [TR\_FRC](018_TradeMode.md) is not set, fill prices are now rounded to the point size of the asset.
*   The format of the parameter files (**\*.par**) was changed. Parameters and training results are now stored in CSV format.

The latest published beta version or the latest release candiate are available on the Zorro Download Page. [Zorro S features](restrictions.md) can be unlocked in beta versions with a valid Zorro license. [Z strategies](zsystems.md) are not included in beta versions. A list of fixed bugs can be found under [bugs](bugs.md).  

# Future Zorro features

If you want a new Zorro function, feature, or a new broker plugion, there are two ways to get it. You can either pay us for implementing it, and donate the feature to the community. Or you can suggest it on the [User Forum](https://opserver.de/ubb7/ubbthreads.php?ubb=cfrm&c=1) in the Zorro Future section. There you can also comment or support features suggested by other users. We normally implement any suggested feature when it is useful (please give a usage example), popular (supported by other users), backwards compatible (won't break existing scripts), and efficient (saves a lot of code in a script). How long it takes depends on the usefulness of the feature and how hard it is to implement. Donated features have priority.  

# Zorro Release History

### Zorro 2.70.0 (release candidate)

*   The new **Z6+** trading system with adaptive grid was added to the [Z systems](zsystems.md).
*   John Ehlers' improved [HighPass3](129_filter_renorm.md) filter and his [LRSI](033_W4a_Indicator_implementation.md) indicator were added to the indicator library.
*   The [DrawDownPercent](116_Statistics_Transformations.md) variable returns the largest drawdown depth in percent of the preceding balance peak.
*   [MaxLong/MaxShort](190_Margin_Risk_Lots.md) now affect training when the [LIMITS](016_OptimalF_money_management.md) flag is set. They update also the open trade lifetime when [TR\_EXTEND](018_TradeMode.md) is set.
*   The [trade list](export) format has changed. The list now also contains commission, MAE, and MFE of trades.
*   The [MAE](116_Statistics_Transformations.md) function returns the maximum adverse excursion of a data series.
*   The [TR\_ANYSTOP/ANYLIMIT](018_TradeMode.md) flags affect the trailing of entry or exit stops and limits when trades are updated.
*   The [Fill](198_Fill_modes.md) mode was changed. Limit entries and exits now fill at the current price. The previous limit fill behavior can be activated with Fill mode 2. It [TR\_FRC](018_TradeMode.md) is not set, fill prices are now rounded to the point size of the asset.
*   The format of the parameter files (**\*.par**) was changed. Parameters and training results are now stored in CSV format.
*   A WFO cycle analysis was added to the [performance report](012_Performance_Report.md).
*   The [contractExpiry](096_contract.md) function can be used to generate a contract symbol.
*   The **[strselect](str_.md)** function opens a selection dialog.
*   The [Button](button.md) variable refects the way the code was started.

### Zorro 2.66 (April 2025)

*   [assetHistory](loadhistory.md) can now also load tick data with volume to **.t2** files.
*   [T2 historical data](022_Price_History.md) is now supported by the [IB TWS bridge](062_DefineApi_LoadLibrary.md).
*   The [Ulcer Index](012_Performance_Report.md) has been modified to reflect the maximum MAE, instead of the average.
*   [T1 historical data](022_Price_History.md) is now supported by the [Binance plugin](219_Binance.md).
*   The [contractChain](096_contract.md) function loads option chains much faster (10 sec instead of 20 min).
*   The [GET\_CHAIN](113_brokerCommand.md) command is now supported by the IB TWS bridge.
*   Compiling a [C++ script](dlls.md) will now automatically generate a **VC++ project file** (Zorro S only).

### Zorro 2.64 (January 2025)

*   The data format has changed in 64-bit mode. Recompile 64-bit script DLLs.
*   The [dataCompressSelf](125_sortData_sortIdx.md) function compresses a dataset for reducing its file size.
*   [dataCol](125_sortData_sortIdx.md) now returns the indices of the minimum and maximum valuies.
*   [dataSort](125_sortData_sortIdx.md) can now sort in ascending order.
*   The **[SET\_ORDERGROUP](113_brokerCommand.md)** command is now supported by the [IB plugin](062_DefineApi_LoadLibrary.md) for OCA orders.
*   The [GET\_PRICE](113_brokerCommand.md) and [GET\_VOLUME](113_brokerCommand.md) commands are supported by the [IB plugin](062_DefineApi_LoadLibrary.md).
*   The [Binance Spot](219_Binance.md) plugin now supports **LIMIT\_MAKER** orders.
*   Unix-like timestamps ([%t format code](format.md)) now also support microseconds.
*   The script name can be accessed by plugins through the [report](012_Performance_Report.md) function.
*   The [matSort](086_vector_matrix.md) function sorts a two-dimensional matrix.
*   [AUTOCOMPILE](018_TradeMode.md) can now be set by script.
*   Non-linear Trade profits, as from inverse contracts, can now be updated by script in a [TMF](018_TradeMode.md).

### Zorro 2.62 (July 2024)

*   Python machine learning libraries can now be used with the [advise](advisor.md) function.
*   A **neural** function for [PyTorch](deeplearning.md) was implemented.
*   The [IB plugin](062_DefineApi_LoadLibrary.md) has been updated to the latest TWS API version.
*   The [NumAbove](116_Statistics_Transformations.md) function returns the number of data points above a threshold.
*   The [Exchange](contracts.md) string can now be used to direct contract orders to a particular exchange.
*   New indicator: [Parkinson Volatility](033_W4a_Indicator_implementation.md).
*   The [Z8 and Z9](zsystems.md) systems now export a rebalance file that can be directly imported in the TWS 'Rebalance Portfolio' window. Fractional shares are supported.

### Zorro 2.60 (December 2023)

*   Various small improvements to the [IB plugin](062_DefineApi_LoadLibrary.md) for better differentiating between orders and trades.
*   The [BrokerTrade](brokerplugin.md) function can now distiguish between cancelled and filled orders.
*   [Stops](188_Stop_Profit_Trail_Entry.md) and [order limits](188_Stop_Profit_Trail_Entry.md) are now automatically rounded to the next PIP step when sent to the broker. This can be disabled with the [TR\_FRC](018_TradeMode.md) flag.
*   If the last leg of a [combo order](097_combo.md) timed out, the other legs are automatically cancelled.
*   [Combo orders](097_combo.md) can now be entered at [OrderLimit](188_Stop_Profit_Trail_Entry.md).
*   New trade macros: [TradeFill](018_TradeMode.md), [TradeValue](018_TradeMode.md).

### Zorro 2.56 (June 2023)

*   The [AssetPtr](196_AlgoVar_AssetVar_AssetStr.md) and [AlgotPtr](196_AlgoVar_AssetVar_AssetStr.md) definitions allow storing asset or algo specific pointers.
*   The IB plugin was adapted to the name change **DTB** -> **EUREX**.
*   The [plot2](147_plotProfile.md) function plots curves in two colors.
*   New plugins: [Saxo Bank](239_Saxo_Bank.md), [XTB](243_XTB.md).
*   The A2 and HU algos of **Z12** have been modified and improved.
*   New function: [strcatf](str_.md).
*   Example script for generating a [multi-broker asset list](brokerarb.md).
*   The [sync](118_frame_frameSync.md) function can synchronize prices or indicators to higher time frames.

### Zorro 2.53 (January 2023)

*   [strdate](month.md) now supports milliseconds.
*   New helper functions: [cum](162_ifelse_valuewhen.md), [fix0](069_invalid.md), [changed](162_ifelse_valuewhen.md)
*   [assetHistory](loadhistory.md) can now download data in arbitrary resolution.
*   [SeriesLength](091_series.md) contains the number of elements of the current series.
*   [AssetFirstBar](180_Bar_NumBars.md) contains the number of the first valid bar of the current asset.
*   [LogZone](assetzone.md) prints the log and chart in a particular time zone.
*   [PL\_DARK](203_PlotMode.md) generates a chart with a dark background.
*   [AssetsFUT](013_Asset_Account_Lists.md) is a new asset list with 20 often traded futures.
*   Trade entry and exit prices are calculated in higher precision with [special bars](005_Bars_and_Candles.md).
*   The [Performance](020_Included_Scripts.md) script evaluates arbitrary values from the [performance report](012_Performance_Report.md).
*   The IB plugin now supports the [DO\_CANCEL,0](113_brokerCommand.md) command that cancels all open orders.
*   The IB plugin now supports the [BrokerTrade](brokerplugin.md) function for determining the fill status of open orders.
*   The [sha / hmac](hmacl.md) function makes crypto broker plugin development easier.
*   [http\_request](160_HTTP_functions.md) supports different request types and replaces the **http\_send** function.
*   The new [Bittrex plugin](222_Bittrex.md) now supports API version 3.0. A new Bittrex asset list was included.
*   The [brokerRequest](113_brokerCommand.md) function allows a script to send arbitrary requests to a broker API.
*   New plugin: [Finvasia](228_Finvasia.md).
*   Duplicate timestamps from t6 files are now filtered out by [assetHistory](loadhistory.md).
*   Dataset records can be removed with [dataDelete](125_sortData_sortIdx.md).
*   The new [import](023_Import.md) page helps with data conversion.
*   A new article on [Financial Hacker](https://financial-hacker.com/crypto-trading-with-rest-part-1/) helps with plugin development.
*   [BR\_LOCAL](200_BarMode.md) does not anymore automatically alter [BarZone](assetzone.md). Set it by script (**BarZone = AssetMarketZone**) if needed.

### Zorro 2.50 (August 2022)

*   [strdate](month.md) now supports a time zone.
*   [exec](151_exec.md) got a flag for hiding the program window.
*   [C++ scripts](dlls.md) now start directly, like **.c** scripts ([Zorro S](restrictions.md) and Visual Studio required).
*   The [VCPP](018_TradeMode.md) flag uses the VC++ compiler, rather than the lite-C compiler, for compiling rules.
*   The [quit](172_quit.md) function can now restart the script.
*   [LookBackNeeded](181_LookBack_UnstablePeriod.md) is set to the maximum needed lookback period.
*   Some adaptions to **zorro.h** and **functions.h** for 64-bit compatibility.
*   A new **64 bit Zorro version** has been included. It uses [VC++](dlls.md) for compiling scripts.
*   64 bit versions of the [MT4 bridge](mt4plugin.md) and the **Offline** plugin have been added.
*   The charting library was updated. The [dataChart](125_sortData_sortIdx.md) function now supports heatmaps.
*   The [outlier correction](outlier.md) was modified for producing less artifacts with cryptos.
*   The [Python bridge](026_Python_Bridge.md) now supports string variables.
*   The [Python bridge](026_Python_Bridge.md) now loads the Python DLL at script start and supports any Python version from 3.6 or above.
*   [file\_select](158_File_access.md) now supports a file save dialog.
*   The [STRAIGHT](018_TradeMode.md) flag allows running ta-lib functions in their original mode.
*   [Hedge](019_Hedge_modes.md) mode 6 allows trade synchronization by script.

### Zorro 2.48 (May 2022)

*   [MatchIndex](116_Statistics_Transformations.md) finds the data closest to a reference in a series.
*   The time zone and market hours of an asset can now be set up in the Market field of the [asset list](013_Asset_Account_Lists.md).
*   New variables for easy handling asset specific market hours: [AssetMarketZone](assetzone.md), [AssetMarketStart](100_tradeUpdate.md), [AssetMarketEnd](100_tradeUpdate.md).
*   Market hours for index CFDs have been added to the Oanda asset lists.
*   [PriceOffset](191_Spread_Commission.md) allows handling negative prices by shifting them to the positive scale.
*   [Notepad++](npp.md) has been updated to version 8.2.
*   The [SET\_FUNCTIONS](113_brokerCommand.md) broker command allows Zorro functions to be called from a plugin.
*   [Penalty](191_Spread_Commission.md) adds a fixed spread-like offset to trade fill prices for special purposes.
*   [AssetPrev](020_Included_Scripts.md) stores the main asset inside enumeration loops.
*   [PL\_HLOC](203_PlotMode.md) enforces HLOC bars on the chart.
*   The [IB plugin](062_DefineApi_LoadLibrary.md) now supports the [GET\_FILL](113_brokerCommand.md) command for returning the current fill amount of open GTC orders.
*   The [at](month.md) function can trigger events at a certain local time of day.
*   Asset updates can be temporarily suspended with the [NOPRICE](201_AssetMode.md) flag.
*   Swaps can be continuously accumulated with the [SOFTSWAP](201_AssetMode.md) flag.
*   The time for asset updates can be measured with the [UpdateTime](187_TickTime_MaxRequests.md) variable.
*   A name beginning with **'#'** in [asset](013_Asset_Account_Lists.md) calls creates a dummy asset with flat history.
*   The **Z3** cluster strategy missed the performance criteria and was removed from the [Z systems](zsystems.md).
*   New functions: [barssince](162_ifelse_valuewhen.md), [valuewhen](162_ifelse_valuewhen.md) with code in **indicators.c**.
*   New [ref()](091_series.md) macro for more convenient script conversion from other platforms.
*   [dataCompress](125_sortData_sortIdx.md) got a **Resolution** parameter for compressing datasets even further.
*   A plugin for the [FTX exchange](ftx.md) has been developed by a Zorro user.
*   The [plotBuyHold](147_plotProfile.md) function compares the strategy returns with a buy-and-hold benchmark.
*   The [Yahoo](loadhistory.md) data feed has be re-activated.
*   New data feed: [EODHistoricalData](loadhistory.md), with subscription discount for Zorro users.
*   New scripts: [MRC](020_Included_Scripts.md) and [WFOProfile](020_Included_Scripts.md).
*   The chart title can now be changed with [print(TO\_CHART,...)](143_printf_print_msg.md).
*   [plotGraph](146_plot_plotBar.md) now supports scatter plots and spline lines.
*   **BR\_ASSET** was replaced by [BR\_NOSHIFT](200_BarMode.md) and [BR\_LOCAL](200_BarMode.md).

### Zorro 2.44 (December 2021)

*   New flag [PIPRETURN](018_TradeMode.md) for exporting volume-independent profit curves.
*   New plugins: [Coinbase Pro](223_Coinbase_GDAX.md), [TradeStation](241_TradeStation_Bridge.md)
*   [NumOutliers](outlier.md) counts the outliers in the data.
*   [fmod](077_fmod.md) returns the fractional remainder of a division.
*   [SET\_VOLTYPE,7](113_brokerCommand.md) returns the open interest (if available from the broker).
*   [LookBackResolution](181_LookBack_UnstablePeriod.md) sets the resolution of the live lookback history. .
*   If a lookback bar ends after the session start time, it is now continued into the live period.
*   Script, asset, and action boxes can now be scaled with the application window.
*   [tradeUpdate](100_tradeUpdate.md) scales or modifies an open trade.
*   The default estimate of [trades per bar](181_LookBack_UnstablePeriod.md) was slightly reduced for saving memory.
*   [TMF](018_TradeMode.md) functions now also run on incoming ticks when the trade is still pending (bugfix).
*   The [BuyHold](020_Included_Scripts.md) script can be used for comparing a system with a SPY buy-and-hold strategy.
*   Loading history with no year number can be enforced with the [History](020_Included_Scripts.md) string.
*   New **PlotMode** flag: [PL\_TITLE](203_PlotMode.md)
*   The Oanda asset lists have been modified for 0.1 CFD lot size.
*   The [ExpiryTime](contracts.md) default was changed to 23:00 UTC for avoiding option expiration during market hours.

### Zorro 2.40 (August 2021)

*   New text style flag **+16** for bold text on [panel cells](142_panel.md).
*   [PriceJump](outlier.md) can now also detect stock merges.
*   The [Russell2000](013_Asset_Account_Lists.md) asset list was included.
*   [GET\_DATA](113_brokerCommand.md) was implemented in the [IEX plugin](232_IEX.md).
*   New broker commands: [SET\_SERVER](113_brokerCommand.md), [SET\_CCY](113_brokerCommand.md)
*   [SET\_SERVER](113_brokerCommand.md) was implemented in the [Binance plugin](219_Binance.md). 
*   New plugins: [Kraken](234_Kraken.md), [Deribit](225_Deribit.md), [Binance Futures](binancefutures.md).
*   [Leverage](192_PIP_PIPCost_Leverage.md) can now be set individually per trade when the API supports the [SET\_LEVERAGE](113_brokerCommand.md) command. 
*   The [tock](089_tick_tock.md) function is now executed after [tick](089_tick_tock.md), thus ensuring that all recent ticks had been processed at **tock** time.
*   [file\_copy](158_File_access.md) now accepts a folder as destination.
*   The [CSVfromHistory](020_Included_Scripts.md) script converts .t6 to .csv files.
*   The IB [TWS/Gateway](062_DefineApi_LoadLibrary.md) socket port number can now be set up in the **Server** field of the account list.
*   New [Coinbase](223_Coinbase_GDAX.md) plugin by a Zorro user.
*   The current script folder is returned by [report(26)](012_Performance_Report.md).
*   If the strategy folder was [redefined](007_Training.md), the **#include "..."** statement now reads files from the new folder.
*   The structure of an unknown dataset can be determined with [dataSize](125_sortData_sortIdx.md).
*   [dataParseString](125_sortData_sortIdx.md) converts a JSON string to a dataset.
*   [mtu](month.md) converts Unix time to the DATE format.
*   [matSaveCSV](086_vector_matrix.md) saves a matrix to a CSV file.
*   [Brute Force, Genetic, and External](016_OptimalF_money_management.md) optimizations now export results to CSV and generate 2D contour charts..
*   [dataChart](125_sortData_sortIdx.md) generates a 2D countour chart from a dataset.
*   [dataCol](125_sortData_sortIdx.md) retrieves data arrays or series from a dataset.
*   Order book data (**.t2** files) can now also be used for the price history with **History = "\*.t2"**.
*   [TickTime](187_TickTime_MaxRequests.md) now also affects backtests in **TICKS** mode, and can be used to reduce the memory footprint.
*   New broker command: [GET\_HEARTBEAT](113_brokerCommand.md).
*   New script [Reality.c](020_Included_Scripts.md) as a template for reality checks.
*   [BarPeriod](177_BarPeriod_TimeFrame.md) can now be set up by script to weekly bars.
*   Partial closing is now also supported in [Fill](198_Fill_modes.md) mode 3.
*   The [contractUpdate](096_contract.md) function now sorts contract chains automatically by expiration and strike.
*   We found that scripts often use the [loop](109_loop.md) function unnecessarily, and thus added [of](109_loop.md) as an alternative.
*   The [NOFACTORS](018_TradeMode.md) flag prevents OptimalF calculation, which can take a long time when trade numbers are huge.
*   **FAST** backtest mode was abandoned, since standard backtests are almost as fast as fast backtests.
*   The backtest profit by linear regression of the equity curve can be retrieved with [ReturnLR](116_Statistics_Transformations.md).

### Zorro 2.35 (February 2021)

*   The account limit of the free Zorro version was raised from $7000 to $15,000.
*   External optimization algorithms can be used with the [parameters](108_objective_parameters.md) function (Zorro S required).
*   Prices of open option trades are not anymore updated outside market hours when [BR\_SLEEP](200_BarMode.md) is set..
*   Zorro's exit code can be set with the [ExitCode](175_ExitCode.md) variable.
*   The backtest speed was increased due to changes to the print function and the memory management.
*   The [seriesO/H/L/C](022_Price_History.md) functions can be used as prices series parameters to indicators or functions.
*   Multicore training now supports the **[StrategyFolder](007_Training.md)** (was only partially implemented in the previous version).
*   The [assign](129_filter_renorm.md) function converts portfolio weights to asset amounts.
*   The [report](012_Performance_Report.md) function can now return a list of all open trades.
*   Open trades can be loaded from the broker account with the [brokerTrades](113_brokerCommand.md) function.
*   The [GET\_TRADES](113_brokerCommand.md) and [DO\_CANCEL](113_brokerCommand.md) commands were implemented in the [IB plugin](062_DefineApi_LoadLibrary.md).
*   Graphics by [plotGraph](146_plot_plotBar.md) don't affect the chart scale anymore.
*   [Coinigy](224_Coinigy.md) now supports [GTC orders](018_TradeMode.md) and the [GET\_DATA](113_brokerCommand.md) and [DO\_CANCEL](113_brokerCommand.md) commands.
*   [assetHistory](loadhistory.md) can now load data from arbitrary sources and supports **.t2** order book data (Zorro S required).
*   Setting [StopFactor](188_Stop_Profit_Trail_Entry.md) at **1** causes stops to be managed by the broker only.
*   Shifting dynamic [series](091_series.md) can be controlled with the [NOSHIFT](018_TradeMode.md) flag.
*   New plugins by users: [Alpaca](218_Alpaca.md), [TD Ameritrade](tdamtrade.md), and [Binance Futures](binancefutures.md).
*   New plugins for Zorro S: [DTN IQFeed](227_DTN_IQFeed.md) and [Tradier](242_Tradier.md).
*   The [assetHistory](loadhistory.md) function now loads split and dividend adjusted data from **IEX**.
*   [BR\_SLEEP](200_BarMode.md) is now unaffected by [BR\_LEISURE](200_BarMode.md).
*   The [MT4 bridge](mt4plugin.md) now supports the [GET\_POSITION](113_brokerCommand.md) command. Re-install the bridge for using this command.
*   The Binance plugin now returns the [TradeVal](193_Balance_Equity.md) of all open positions on account requests.
*   **[GET\_AVGENTRY](113_brokerCommand.md)** was implemented in the [IB plugin](062_DefineApi_LoadLibrary.md).
*   The new [ZStatus](trading.htm#zstatus) script displays the live status of multiple accounts (Zorro S required).

### Zorro 2.30 (August 2020)

*   The [IB API](062_DefineApi_LoadLibrary.md) can now return prices in fast mode (price type = 8) in less than 1 ms, dependent on setup and location.
*   Charts can now be generated and updated in real time with the [plotChart](146_plot_plotBar.md) function.
*   A price history folder can now be set up with the [History](020_Included_Scripts.md) string.
*   [Historical D1 data](loadhistory.md) from IB now contains only regular trading hours.
*   The **Offline** plugin can be used in \[Trade\] mode with no broker connection.
*   The **PayOff** script is now interactive. Strike distance and expiry can be set with sliders.
*   The [comboProfit](097_combo.md) function returns the profit or loss of the current combo at a given expiration price.
*   The [SLIDERS](013_Asset_Account_Lists.md) flag detects slider movement.
*   Bar start/end times in live trading are now synchronized to an integer multiple of the bar period.
*   The [tdm](month.md) function counted also partial trading days, such as UTC Sunday 22:00. For avoiding confusion, now only 'real' workdays are counted.
*   The chart caption can be changed with the [print](143_printf_print_msg.md) function.
*   The [IB plugin](062_DefineApi_LoadLibrary.md) was modified for supporting European options on the ICEEU exchange.
*   The [TR\_AON](018_TradeMode.md) flag enforces all-or-nothing order mode.
*   Arbitrary content can be passed via [command line](027_Command_Line_Options.md) with the **\-u** option.
*   [contractUpdate](096_contract.md) now automatically sets the [Multiplier](contracts.md) when it was at 0.
*   The [error](089_tick_tock.md) function can be used to sound alerts, send emails, or stop Zorro on warnings or errors.
*   Series can be replaced with external buffers with the [SeriesBuffer](091_series.md) pointer.
*   Trades from a template can be entered with [enterTrade](buylong.md).
*   The [Simulate](020_Included_Scripts.md) script backtests a trade list.
*   For suppressing particular error messages, call [ignore(ErrorNumber)](errors.md).
*   Spearman [correlation](116_Statistics_Transformations.md) with arbritrary functions.
*   New [Ehlers indicators](033_W4a_Indicator_implementation.md): **CTI, CCYI, CCYIR, CCYIState**.
*   [SMAP](033_W4a_Indicator_implementation.md) calculates the mean of positive values.
*   [NOWATCH](018_TradeMode.md) switches off all [watch](166_watch.md) statements.
*   [plotContract](096_contract.md) and [plotCombo](097_combo.md) plots payoff diagrams of the given option or combo.
*   The [break\_assets](fortrades.md), [break\_algos](fortrades.md) statements abort asset or algo enumeration loops.
*   The average profit per trade, instead of per year, is now displayed after a backtest.
*   [MarginCost](013_Asset_Account_Lists.md) in the asset list can now be negative for a percentage. Options multipliers can be given in **LotAmount**.
*   [assetSelect()](013_Asset_Account_Lists.md) selects the current asset in the scrollbox.

### Zorro 2.25 (March 2020)

*   Optimized parameters can be generated by script by setting the [optimize](107_optimize.md) range to zero.
*   [OptimalF](016_OptimalF_money_management.md) factors of profitable components are now rounded up to at least 0.001.
*   A script for converting CSV to .t8 options history was added to the [repository](020_Included_Scripts.md).
*   The [OVERRIDE](loadhistory.md) flag now also works for broker price sources.
*   Two new indicators were added: [LSMA](033_W4a_Indicator_implementation.md) and [QLSMA](033_W4a_Indicator_implementation.md).
*   Memory consumption by [PRELOAD](018_TradeMode.md) was reduced.
*   The last [WFO cycle](numwfocycles.md) is now extended to ensure that it includes the end date.
*   **HistoryScript = "History"** in [zorro.ini](007_Training.md) opens the [History](020_Included_Scripts.md) script when clicking on a t1, t2, t6, or t8 file (Zorro S).
*   The [peak](122_peak_valley.md), [valley](122_peak_valley.md), and [cross](121_crossOver_crossUnder.md) functions now return the bar offset of the last event.
*   The [slope](124_slope_line.md) and [line](124_slope_line.md) functions can be used to connect points on the price curve.
*   More traditional indicators: [Pivot](033_W4a_Indicator_implementation.md), [Support](033_W4a_Indicator_implementation.md), [Resistance](033_W4a_Indicator_implementation.md), [Divergence](033_W4a_Indicator_implementation.md).
*   More traditional candle patterns: [CDLEngulfing0](005_Bars_and_Candles.md), [CDLOutside](005_Bars_and_Candles.md).
*   The [BUSY](013_Asset_Account_Lists.md) flag indicates whether the broker API can be accessed.
*   [PlotLabels](204_PlotBars_PlotWidth.md) determines the x axis label distance on histograms.
*   Text can now be plotted to the chart with [plotText](146_plot_plotBar.md).
*   Price curves can now also be [randomized](197_Detrend_shuffling.md) with the **BOOTSTRAP** and **RANDOMWALK** methods.
*   The [SHAPE](197_Detrend_shuffling.md) flag allows manipulating price curves in arbitrary ways for test purposes.
*   Use the [call](164_call.md) scheduler for running functions at particular events.
*   The [debugger](011_Chart_Viewer_Debugger.md) now displays a list of open trades.
*   Options expiration time of day can now be set with [ExpiryTime](contracts.md).
*   New time series functions: [SemiMoment](116_Statistics_Transformations.md), [Sharpe](033_W4a_Indicator_implementation.md), [Sortino](033_W4a_Indicator_implementation.md).
*   The **Sortino ratio** was added to the [performance report](012_Performance_Report.md).
*   The [knapsack](129_filter_renorm.md) function can be used to manage a stock portfolio with small capital.
*   The [ScholzBrake](lots.htm#scholz) and [LossGlobal](winloss.md) variables can step around the new German trader tax.
*   The Scholz tax is now included in the [performance report](012_Performance_Report.md).
*   The C functions **strcpy\_s**, **sprintf\_s**, **strcat\_s**, **memcpy\_s** have been added to [stdio.h](litec_h.md).
*   New functions for options: [contractMargin](096_contract.md), [comboMargin](097_combo.md), [comboType](097_combo.md).
*   [OBV](033_W4a_Indicator_implementation.md) has been added to the indicators.
*   The [invalid](069_invalid.md) function helps debugging arithmetic errors.
*   [GET\_CALLBACK](113_brokerCommand.md) sets a plugin supplied callback function.
*   Historical data from [CryptoCompare](loadhistory.md) is now automatically appended to existing data, if any.

### Zorro 2.20 (November 2019)

*   The [once](once.md) function registers the first time when a condition became true.
*   The [erf](071_cdf_erf_dnorm_qnorm.md) function returns the interval probability. 
*   [SampleOffset](numsamplecycles.md) can be used for per-cycle oversampling.
*   A **Detrend** example script was added to the [script repository](020_Included_Scripts.md).
*   The price range of randomized curves ([SHUFFLE](detrend-htm) flag) can now be limited.
*   A new [workshop 4a](tutorial_lowpass.md) about indicator development has been added.
*   Wrong **PIP**, **PIPCost**, or **LotAmount** parameters from the broker API can be fixed by [SET\_PATCH](113_brokerCommand.md).
*   [Zorro.ini](007_Training.md) entries are now available by the [report](012_Performance_Report.md) function. [report(1)](012_Performance_Report.md) can now be called inside [evaluate](137_evaluate.md).
*   The [zalloc](sys_malloc.md) function is useful for allocating temporary arrays.
*   [BR\_SLEEP](200_BarMode.md) or [BR\_LOGOFF](200_BarMode.md) flags can now be set for the Z systems.
*   The question "Close open trades?" at session end can be skipped with the [AutoConfirm](007_Training.md) setting.
*   Since **Oanda** now requires a unique size for stop loss orders, stops are now handled on the Zorro side.
*   Variables and functions that are long outdated or deprecated are now collected in **[legacy.h](litec_h.md)**, which can be included when needed.
*   Outdated keywords moved to **[legacy.h](litec_h.md)**: **Slider1-3**, **CVolatility**, **loadHistory**, **DDScale**, **OptCycle**, **reverseLong**, **reverseShort**.
*   The [AccountName](020_Included_Scripts.md) string contains the selected name from the \[Account\] scrollbox.
*   The [OptionsCalculator](020_Included_Scripts.md) script calculates the value and delta of call and put options.
*   The [advise](advisor.md) training speed has been improved for large training sets.
*   The [flag system](018_TradeMode.md) was changed to support more than 64 flags. All flags can now be set and read with the **set** and **is** functions.
*   The status flags [PARCYCLE](013_Asset_Account_Lists.md), [FACCYCLE](013_Asset_Account_Lists.md), [RULCYCLE](013_Asset_Account_Lists.md) are renamed to avoid confusion with mode flags of the same name.
*   Internal structs have been changed in version 2.19.5. Compiled scripts must be re-compiled for the current version.
*   The command line and other system strings are now available through the [report](012_Performance_Report.md) function.
*   The [SAV\_STATS](loadstatus.md) flag resumes [trade statistics](winloss.md) from the previous session.
*   An example for [integrating Zorro](engine.md) in other software was included in the **Source** folder.

### Zorro 2.15 (July 2019)

*   [Init](013_Asset_Account_Lists.md) is an abbreviation for **is(INITRUN)**.
*   The [\-quiet](027_Command_Line_Options.md) option suppresses the 3 seconds pause at the end of a batch run.
*   An asset can be optionally preselected in the scrollbox with the [assetList](013_Asset_Account_Lists.md) function.
*   In the [**TradeOptions** script](020_Included_Scripts.md) now several combos can be selected.
*   The [getvar/putvar](150_putvar_getvar.md) functions can now store variables in the Windows registry.
*   The primary exchange for [IB asset symbols](062_DefineApi_LoadLibrary.md) can be appended to the exchange code.
*   The [strx](str_.md) function can now replace text in strings of unlimited size.
*   Special order types, like "market on close" etc, are now supported by the [IB plugin](062_DefineApi_LoadLibrary.md).
*   **NaN** lines can now be filtered out by [dataParse](125_sortData_sortIdx.md).
*   **M1 bitcoin history** has been added to the download page.
*   A list of market holidays can be passed to the [Holidays](sate.md) pointer.
*   The [PlotBorder](204_PlotBars_PlotWidth.md) variable reserves space for the chart axis labels.
*   The [FXCM plugin](230_FXCM.md) was updated to the most recent API version. You'll need to unpack additional DLLs. Win XP is not supported anymore by FXCM.
*   The **Weekend** variable has been replaced by [flags](200_BarMode.md) that are more flexible to use.
*   New **FXCM accounts** are now rewarded with a [Zorro S](restrictions.md) subscription.
*   A [DLL for integrating Zorro](engine.md) in other platforms is available on request.
*   [Zorro instances](engine.md) can now start, stop, and communicate with each other.
*   [SET\_PRICETYPE,8](113_brokerCommand.md) now loads option and futures prices faster from IB.
*   The [MT4/MT5 bridge](mt4plugin.md) was changed in 2.14.6. Re-install the bridge and compile the Zorro EA.
*   CSV files by [print(TO\_CSV)](143_printf_print_msg.md) are now generated in the **Data** folder.
*   **\[New Script\]** will now generate a basic strategy template.

### Zorro 2.12 (May 2019)

*   Genetic and brute force [training modes](016_OptimalF_money_management.md) are now available (Zorro S).
*   10 new scripts for various purposes have been added to the [script repository](020_Included_Scripts.md).
*   The [RET](033_W4a_Indicator_implementation.md) indicator is for quickly calculating momentum without a series.
*   The **SpecialBars** script illustrates the use of special bars for single-asset and multi-asset strategies.
*   The [sliders](141_slider.md) can now display fractional values.
*   The Action scrollbox can now be selected [by script](142_panel.md) and keeps the selection after the end of the strategy.
*   A new [Z13](zsystems.md) options trading system was added to the Z systems (Zorro S).
*   The number of concurrent broker connections was increased from 4 to 12.
*   The [PL\_BENCHMARK](203_PlotMode.md) flag plots the equity curve as a line.
*   [Virtual Hedging](019_Hedge_modes.md) became a S feature and the [interactive chart viewer](011_Chart_Viewer_Debugger.md) became a free feature.
*   The [performance report](012_Performance_Report.md) now contains a breakdown of annual and monthly returns.
*   The **InvestCalculator** script allows investing by the square root rule.
*   The [SETFACTORS](016_OptimalF_money_management.md) flag allows factor calculation by script.
*   CSV files generated with the [SIGNALS](advisor.md) flag are now stored separately per asset.
*   The [Ulcer](116_Statistics_Transformations.md) and [R2](116_Statistics_Transformations.md) statistics parameters have been renamed to **ReturnUlcer** and **ReturnR2**.
*   The [conv](127_rev.md) function converts a float array to a var series.
*   The [R2](116_Statistics_Transformations.md) function returns the coefficient of determination of a series.
*   [dataMerge](125_sortData_sortIdx.md) adds new data at the front of an existing dataset.
*   Interest on margin loan can be set up with the [Interest](191_Spread_Commission.md) variable.
*   The IEX exchange is now supported by [assetHistory](loadHistory.md) and with the [IEX plugin](232_IEX.md).
*   Price request can be switched off with the [SET\_PRICETYPE](113_brokerCommand.md) command.
*   The default **objective** function now rejects results with less than 5 trades.
*   [OptimalF](016_OptimalF_money_management.md) factors are not displayed in the performance report when profit is reinvested.

### Zorro 2.08 (April 2019)

*   The new [Python Bridge](026_Python_Bridge.md) allows to run Python scripts and commands from Zorro.
*   A new [Regime](020_Included_Scripts.md) script was added to test indicator responses on market regime changes.
*   The [frameSync](118_frame_frameSync.md) function now synchronizes also 30-min and 4-hour timeframes.
*   Get info about trading events with the [email](155_email.md) function.
*   The [plotHistory](147_plotProfile.md) helper function allows easier producing histograms.
*   The [comboAdd](097_combo.md) function adds a contract to the current combo.
*   [comboPremium](097_combo.md) calculates the premium of a combo.
*   Stop orders can be added to IB trades with the [SET\_ORDERTYPE](113_brokerCommand.md) command.
*   [NumAssetsUsed](195_NumAssetsListed.md) counts the assets used in the script.
*   [Live](013_Asset_Account_Lists.md) is an abbreviation for **is(TESTMODE)**.
*   The [contractSellUnderlying](096_contract.md) function gets rid of the underlying of exercised contracts.
*   **[BarMode](200_BarMode.md) > 4** now suspends broker API calls when logged out.
*   A new memory management reduces the memory footprint of portfolio systems by about 50%.
*   The [LEANER](018_TradeMode.md) flag reduces the memory footprint by further 50% when **TICKS** is not set.
*   Option premiums displayed in the log now include the ask-bid spread.
*   The **[Itor](fortrades.md)** variable counts asset and trade loops.
*   [Symbol](013_Asset_Account_Lists.md) strings can now contain **'\*'** for the asset name.
*   The IB API now supports [option combinations](097_combo.md) and [GTC orders](018_TradeMode.md).
*   **AlgoVar2** can now be saved with the [SV\_ALGOVARS2](loadstatus.md) flag.
*   [Warning 054](errors.md) will now be issued when asset parameters from the broker API are suspicious.
*   The [require](021_Conversion_from_other_platforms.md) function can be used to start a script only with a certain software version.

### Zorro 2.03 (February 2019)

*   The [brokerAsset](113_brokerCommand.md) and [brokerAccount](113_brokerCommand.md) functions directly call the corresponding functions of the [broker API](brokerplugin.md).
*   The [Chart](020_Included_Scripts.md) script opens a .t1, .t6, or .t8 file and displays its content in a chart.
*   The [CryptoCompare](loadhistory.md) download function has been adapted to the new 2000 prices limit.
*   **Z9** now downloads UK ETFs from Stooq (Yahoo sometimes delivered wrong prices for UK assets).
*   [assetHistory](loadhistory.md) now uses the current asset history symbol when no name is given.
*   The [Centage](contracts.md) flags automatically convert live or historical prices given in cents, as for some agricultural futures and options.
*   A new \[Action\] scrollbox has been added. It can be set up in [Zorro.ini](007_Training.md) or in the [script](142_panel.md) for running Zorro tasks, external programs, or script functions with a mouse click.
*   The [SET\_PATCH](113_brokerCommand.md) command can now also override the broker API's leverage and margin cost parameters.
*   The [timeOffset](month.md) function now also supports bars in the future.
*   The [contractUpdate](096_contract.md) function can now load chains from any historical data, using the **Now** variable.
*   The **.t8** format is now also accepted for historical price data (**History = ".t8"**). If the file contains different underlying prices for the same date, as for futures, their average is used.
*   For options on futures (FOPs) the trading class can now be encoded in the [IB symbol string](062_DefineApi_LoadLibrary.md).
*   The exchange for the current options chain can now be retrieved or given with the [Exchange](contracts.md) variable.
*   The **ER** and **KAMA2** indicators have been added to the [indicators list](033_W4a_Indicator_implementation.md).
*   The maximum size of a contract chain has been increased to 20,000 contracts.
*   [MaxLong](190_Margin_Risk_Lots.md) and [MaxShort](190_Margin_Risk_Lots.md) can be set to a negative number for preventing the updating of open trades.
*   The Zorro.exe can now be assigned to files with **.t1**, **.t6**, **.t8** extension and automatically displays them in a chart.
*   A name can be passed via command line to the [Define](cmd.md) string.
*   [PlotHeight2](204_PlotBars_PlotWidth.md) can be used for determining the proportions of additional charts in the interactive chart viewer.
*   The account is now stored per trade so that trades from multiple brokers or accounts can be resumed.
*   The [file\_appendFront](158_File_access.md) function now supports text strings.
*   Options can now be combined with the [combo](097_combo.md) functions.
*   [Algo](095_algo.md) identifiers ending with **":L"** or **":S"** now automatically suppress trades in opposite direction.
*   The [VWAV](033_W4a_Indicator_implementation.md) function calculates volume weighted average values.

### Zorro 1.96 (November 2018)

*   [Stop](188_Stop_Profit_Trail_Entry.md) and [Trail](188_Stop_Profit_Trail_Entry.md) distances can now also be used for option contracts.
*   The interactive [Chart Viewer](011_Chart_Viewer_Debugger.md) allows zooming into chart details and replaying the backtest in single step and slow motion (Zorro S).
*   Level 2 data is now supported by the IB plugin with the [GET\_BOOK](113_brokerCommand.md) command. Market depth data must be subscribed and the exchange must be coded in the asset symbol.
*   The [contract.c](096_contract.md) include file is now  C++ compatible, which allows writing options trading systems with the [VC++ environment](dlls.md).
*   A step by step instruction for [writing strategies with Visual Studio](dlls.md) was added to the manual (Zorro S).
*   The [contractRecord](096_contract.md) function can store the current option or futures chain in a historical data file in **.t8** format.
*   The number of [AssetVars](196_AlgoVar_AssetVar_AssetStr.md) has been increased to 16. The first 8 can be read from the asset list.
*   The background color of a [panel button](142_panel.md) can now be changed in the **click** function.
*   Automatic daylight saving can now be switched off by adding **UTC** to the time zone, f.i. **UTC+1** = Central European Winter Time and **UTC+2** = Central European Summer Time.
*   A new workshop for [options trading](tutorial_options.md) was added to the tutorial.
*   A negative lot parameter to a [trade](buylong.md) function reverses the trade direction. This allows shorter code in some situations.

### Zorro 1.88 (August 2018)

*   The [sortRank](125_sortData_sortIdx.md) function can encode candle patterns for machine learning features.
*   The [file\_next](158_File_access.md) function can enumerate file names in a directory.
*   Multiple accounts are now supported by the [IB plugin](062_DefineApi_LoadLibrary.md). The account can be set up in the [account list](013_Asset_Account_Lists.md).
*   Order flow can be analyzed with the [order book functions](133_orderCVD.md).
*   Broker API requests can be limited with the [MaxRequests](187_TickTime_MaxRequests.md) variable. The limit is automatically set by broker plugins that support the [GET\_MAXREQUESTS](113_brokerCommand.md) command.
*   The [Mode](116_Statistics_Transformations.md) function returns the most frequent value of a data series.
*   The [Windows Handle](hwnd.md) can be used for triggering events between Zorros or asynchronously receiving price quotes from [broker plugins](brokerplugin.md).
*   Option Delta can now be calculated with the [contractDelta](096_contract.md) function.
*   With the [panelFix](142_panel.md) function header rows or colums can be determined on a scrolling panel.
*   The default [BarOffset](177_BarPeriod_TimeFrame.md) for daily candles and D1 history is now set to 16:30 for preventing unwanted midnight bars.
*   The [modf](078_modf.md) function splits a variable in a fractional and integer part.
*   [FROM\_YAHOO](loadHistory.md) is back! At least for the moment, Yahoo™ data can be downloaded again, using a 'backdoor'.
*   The [dataParseJSON](125_sortData_sortIdx.md) function parses OHLC prices from a JSON file to a **.t6** dataset.
*   The [OrderDuration](timewait.md) variable limits the duration of a GTC order.
*   Williams' Market Sentiment Index has been added to the [indicator collection](033_W4a_Indicator_implementation.md).
*   [Commission](191_Spread_Commission.md) is now stored per trade, which allows to set up script-calculated commission amounts before entry or in a [TMF](018_TradeMode.md).
*   Option trades displayed in the [chart](012_Performance_Report.md) now begin with the strike price.
*   The [COT](cot.md) functions can be used to evaluate the **Commitment Of Traders** report.
*   The [priceRecord](022_Price_History.md) function can be used to update price history files while live trading.
*   Use [file\_appendfront](158_File_access.md) for appending data to the start of a file.
*   Different brokers and sources can now be used for trading, live prices, and historical prices through the [Symbol](013_Asset_Account_Lists.md) syntax.
*   The [Z10 system](zsystems.md) now automatically rebalances the cryptocurrency positions in trade mode.
*   The [Binance](219_Binance.md) and [Bitfinex](221_Bitfinex.md) cryptocurrency exchanges are now directly supported.

### Zorro 1.83 (May 2018)

*   Stock splits are now detected and can be evaluated with the [PriceJump](outlier.md) variable.
*   The [sortData / sortIdx](125_sortData_sortIdx.md) functions can now also sort in descending order.
*   The [FXCM](230_FXCM.md) plugin now also downloads bid prices in **.t1** files.
*   The [marketVal](022_Price_History.md) function now supports bid-ask spread from bid prices in **.t1** files.
*   Closed trades can be enumerated with [for(closed\_trades)](fortrades.md).
*   The [contractCPD](132_contractCPD.md) function can be used for predicting the underlying price from option prices.
*   For finding a particular value in a time series, use the [findIdx](125_sortData_sortIdx.md) function.
*   The [suspended](suspended.md) function returns the current trading permission.
*   Changed margin costs of open positions are now considered in the backtest.
*   On no-leverage accounts, the ROI (return on investment) is displayed at the end.
*   The [contractNext](096_contract.md) function allows to enumerate contracts by their strike value.
*   **ConnorsRSI** and SMA-based **RSI** were added to the [indicators](033_W4a_Indicator_implementation.md).
*   The **NFA** flag does not prevent partially closing trades anymore.
*   The [filter](129_filter_renorm.md) and [renorm](129_filter_renorm.md) functions can be used for array filtering and normalization.
*   The [contractStrike](096_contract.md) function calculates a strike price from Delta.
*   The [TradeIsMissed](018_TradeMode.md) status can be used for generating adaptive orders. The [TradeTest](brokerplugin.md) script now supports adaptive entries and exits.
*   [BarMode](200_BarMode.md) flag 16 suppresses bars outside market hours.
*   Assets and algos can be enumerated with [for(used\_assets)](fortrades.md) / [for(all\_algos)](fortrades.md).
*   The [results](104_results.md) function can sum up the results of the last N trades by several criteria.
*   Selecting an account from the [account list](accounts.md) now also changes the assets in the Asset scrollbox.
*   The [broker interface](brokerplugin.md) now supports UUID strings to identify trades.
*   The [Bittrex](222_Bittrex.md) plugin is included in the beta version (Zorro S).
*   **Weekend = +16** now uses the bar time zone for allowing bar generation without setting **AssetMarket**.
*   [wdatef](month.md) now supports Unix time stamps with the **%t** format code.
*   For quicker finding a function, a [list by category](funclist.md) was added to the manual.
*   [Detrend](197_Detrend_shuffling.md) now supports **RECIPROCAL** mode for swapping currencies of a forex pair.
*   [marketVal](022_Price_History.md) and [marketVol](022_Price_History.md) can now also be called in a TMF or [tick](089_tick_tock.md) function.
*   The [dataFromQuandl](125_sortData_sortIdx.md) function now automatically adjusts timestamps by 16 hours.
*   Datasets can be truncated with [dataClip](125_sortData_sortIdx.md).
*   A new **Z10** system with more than 1000% annual return was added to the [Z systems](zsystems.md) (Zorro S).
*   The **Z3** system is now included in the free Zorro version.
*   Crypto history in day, hour, or minute resolution can be downloaded from [CryptoCompare](loadhistory.md) (Zorro S).
*   Selecting an asset with the scrollbox now triggers the [click](142_panel.md) function. The selected asset can be evaluated with the [AssetBox](020_Included_Scripts.md) string.
*   The [sftoa](str_.md) function can display prices with an adaptive number of digits.
*   The [Coinigy](224_Coinigy.md) plugin is included in the beta version (Zorro S). Coinigy allows algorithmic trading with many digital currency exchanges.
*   The new **History** script displays the content of **.t1**, **.t6**, or **.t8** files (Zorro S).
*   The \[Edit\] button now also opens the asset list after a test if the script used special assets.
*   Portfolio weights can be generated with the [distribute](129_filter_renorm.md) function.

### Zorro 1.74 (January 2018)

*   [dataParse](125_sortData_sortIdx.md) is now 2x faster, and supports larger text fields in the target dataset (1.70.2) and a start and end record (1.70.3).
*   The [ContractRow](contracts.md) variable allows easy expansion of option contracts with further fields in an extra dataset.
*   Colors can be made brighter or darker with [colorScale](148_color.md).
*   A negative **Capital** amount allows backtests without margin call detection.
*   The [stridx](str_.md) function can be used for indexing arrays or datasets with asset or algo names.
*   Up to 4 different brokers or price sources can now be simultaneously connected by [asset/account list](013_Asset_Account_Lists.md) entries (1.70.6, Zorro S required).
*   A page about [Broker Arbitrage](brokerarb.md) was added to the manual.
*   The [\_POS](210_Troubleshooting.md) macro helps finding the location of error messages in the script.
*   The [GET\_MAXTICKS](113_brokerCommand.md) broker command allows downloading historical data in bigger chunks than 300 ticks (1.71.2).
*   Indicators can now be loaded from CSV time series with the [dataFromCSV](125_sortData_sortIdx.md) function.
*   The [dnorm](071_cdf_erf_dnorm_qnorm.md) function returns the probability of a variable in a Gaussian distribution.
*   The [strtr](str_.md) function returns a string identifying a trade.
*   The currency symbol and number of decimals for account values can now be set up with the [account list](accounts.md) (1.71.9).
*   The fill status of a trade can now be returned with the [BrokerTrade](brokerplugin.md) function. The MTR4 bridge has been modified accordingly.
*   The [R Bridge](rbridge.md) can now also be used with a [strategy DLL](dlls.md) (1.72.4).
*   The [PL\_ALLTRADES](203_PlotMode.md) flag plots trades of all assets in the same chart.
*   Downloading [Crypto Currencies](loadhistory.md) from Coinbase and Bitfinex is now supported through the Quandl Bridge (Zorro S required).
*   Limiting trades to local market hours can now be set up in the [BarMode](200_BarMode.md) variable.
*   Panel cells can be merged with [panelMerge](142_panel.md).
*   The stop distance of pool trades can be set with [StopPool](188_Stop_Profit_Trail_Entry.md).
*   The **IB Bridge** now downloads prices in 1500-tick packets, which increased the download speed by up to 30%.
*   The **IB Bridge** now supports the [SET\_PRICETYPE](113_brokerCommand.md) command with parameters 1 (quotes) and 2 (trades).
*   The [Download script](022_Price_History.md) was pimped up. It is now easier to use and offers more features.
*   [Perceptrons](advisor.md) with an analogue output can now be generated.
*   The start date of the [Z8 and Z9 systems](zsystems.md) is now automatically adapted to the availability of historical data.
*   Unix time stamps in milliseconds are now supported for [dataParse](125_sortData_sortIdx.md) (1.73.4).
*   Since Support got permanently complaints by former MTR4 users about the 'wrong lot size', position sizes can now be given as [Amount](190_Margin_Risk_Lots.md), similar to MTR4 lots.
*   The [TrainMode](016_OptimalF_money_management.md) variable got a new flag to generate **OptimalF** factors separately per WFO cycle.
*   Broker connections can now be set up per asset in the [asset list](013_Asset_Account_Lists.md), allowing simultaneous connection to several brokers (Zorro S).

### Zorro 1.66 (September 2017)

*   [Statistics data](116_Statistics_Transformations.md) can now be evaluated at the end of the strategy.
*   The [dataSaveCSV](125_sortData_sortIdx.md) function can be used for saving datasets in arbitrary CSV formats.
*   The [PercentRank](116_Statistics_Transformations.md) function was added.
*   The "reverse" helper functions have been replaced by the [MaxLong](190_Margin_Risk_Lots.md) / [MaxShort](190_Margin_Risk_Lots.md) variables.
*   Option history files in **.t8** format are now automatically loaded by [contractUpdate](096_contract.md).
*   Commission is now automatically reduced by 50% on expired options.
*   A [cheat sheet](116_Statistics_Transformations.md) with often used codes was added to the manual.
*   **TO\_ALERT** and **TO\_CSVHDR** modes have been added to the [print](143_printf_print_msg.md) command.
*   The Zorro panel can now be resized, allowing more space for the message window.
*   The [\-stay](027_Command_Line_Options.md) command line option leaves the Zorro window open after running a script.
*   The [Cold Blood Index](http://www.financial-hacker.com/the-cold-blood-index/) has been implemented through the [verify](ddscale.md) function. It is now displayed every day in live trading by the Z systems.
*   Log files from strategy variants can be more conveniently compared by numbering them with [LogNumber](numtotalcycles.md).
*   [Plot](146_plot_plotBar.md) curves are now automatically exported to spreadsheets in the CSV format.
*   The **Margin** and **Risk** sliders of the [Z strategies](zsystems.md) have been replaced by a **Capital** slider similar to Z8.
*   The [Z8](zsystems.md) system got several improvements (heatmap display, sell priority, weight adaption).
*   A new system [Z9](zsystems.md) was added to the Z systems, based on Antonacci's "Dual Momentum".
*   The [advise](advisor.md) function now accepts signals in an array with arbitrary length.
*   The generated perceptron, decision tree, and price pattern rules use now double precision variables.
*   Zorro now distinguishes rejected [Pool Trades](019_Hedge_modes.md) from externally closed Pool Trades.
*   The [Notepad++](npp.md) editor was integrated in Zorro as a replacement of the SED editor.

### Zorro 1.60 (July 2017)

*   Price data can now also be [downloaded](loadhistory.md) from **Google Finance**, **AlphaVantage**, and **Stooq**.
*   The [IG](066_sign.md) plugin by Daniel Lindberg has been added to the Plugins folder.
*   The **Payoff** script can be used for calculating profit diagrams of option combinations.
*   The [assetList](013_Asset_Account_Lists.md) function now also sets the Asset scrollbox to the selected asset list.
*   The [MTR5 platform](mt4plugin.md) is now supported with the MTR5 bridge 1.15
*   The outlier detection can be adjusted with the [Outlier](187_TickTime_MaxRequests.md) variable.
*   The [Stoch](033_W4a_Indicator_implementation.md) function now also supports variable time frames.
*   **[StartDate = NOW](100_tradeUpdate.md)** can be used for strategies that do not run permanently, but are started periodically, f.i. for modifying a portfolio.
*   [AssetMarket](assetzone.md) can be used for skipping all bars outside market hours in local time.
*   Z8 was changed to trade not anymore at a fixed day of the month. The next trading day is now displayed in trade mode.

### Zorro 1.58 (May 2017)

*   If an asset is not available from the broker, it can be downloaded from Yahoo or Quandl by using special [Symbol](013_Asset_Account_Lists.md) codes.
*   The [callback](funclist.md) function can be called from the [broker plugin](brokerplugin.md), allowing the script to react immediately on certain API events.
*   In [HFT mode](198_Fill_modes.md), high frequency trading systems can be simulated with pre-set lag.
*   Various plot flags can be set with the [PlotMode](203_PlotMode.md) variable.
*   A [StopFactor](188_Stop_Profit_Trail_Entry.md) can now be determined for the Z systems and allows disabling broker stops.
*   The [Oanda plugin](237_Oanda.md) now also supports Oanda API V2.0.
*   Text can now be assigned to the \[Result\] button with [panelSet](142_panel.md).
*   The [IB plugin](062_DefineApi_LoadLibrary.md) now supports trade volume also in live data.
*   Seconds in [.csv files](125_sortData_sortIdx.md) and [wdatef](125_sortData_sortIdx.md) fields can now have decimals and are parsed with 1 microsecond resolution.
*   A new [lowpass](129_filter_renorm.md) filter function was added that does not use a series.
*   The Quandl **WIKI** database is now supported by [assetHistory](loadhistory.md).
*   A user-developed [Dukascopy](226_Dukascopy.md) plugin has been included.

### Zorro 1.54 (February 2017)

*   Functions for [loading arbitrary data](125_sortData_sortIdx.md), such as option chains, futures, order book content etc. from CSV files have been implemented.
*   The [wdatef](month.md) function parses time/data parameters from formatted strings.
*   The [dataFromQuandl](125_sortData_sortIdx.md) function can access Quandl™ datasets for backtests as well as for live trading ([Zorro S](restrictions.md) required).
*   Up to 8 additional asset specific values or strings can be stored in the [asset list](013_Asset_Account_Lists.md).
*   The [contract](096_contract.md) functions are for trading and analyzing options and futures.
*   Real money accounts can now be connected in read-only mode with an [account list](013_Asset_Account_Lists.md).
*   The **EXTRADATA** flag of version 1.50 was replaced by the [LEAN](018_TradeMode.md) flag that has the opposite meaning. Historical data is now stored in noncompressed format by default.
*   Option and future chains can be restricted to certain trading classes with the [SET\_CLASS](113_brokerCommand.md) command.
*   The IB bridge now supports the [SET\_LIMIT](113_brokerCommand.md) command for getting a better fill price.
*   The IB bridge now supports stock CFDs (type **STKCFD**).
*   Prices are now stored with 5 digits precision in the trade spreadsheet.
*   Option trades are now based on the real options ask price instead of the extrinsic price.
*   The [MinutesPerDay](181_LookBack_UnstablePeriod.md) variable prevents "Not Enough Bars" errors of assets that are only traded a few hours per day.
*   The [between](068_between.md) function now also works for cyclic ranges.
*   [PlotPeriod](204_PlotBars_PlotWidth.md) sets the update rate of the chart on the trade status page.
*   The [OrderLimit](188_Stop_Profit_Trail_Entry.md) variable allows sending limit orders for filling with best price within a time period.
*   The [season](138_Seasonal_Strength.md) indicator can be used to predict price movements based on seasonal strength.
*   [qnorm](071_cdf_erf_dnorm_qnorm.md) is the inverse of the [cdf](071_cdf_erf_dnorm_qnorm.md) function.
*   Assets can now be excluded from Z3 and Z7 with the [Exclude](zsystems.md) line in z.ini.
*   The equity or balance curve of a test run is now also exported in CSV format for further evaluation.
*   MTR4 bridge 1.13 now supports a [lock command](113_brokerCommand.md) for preventing that trade parameters sent by different Zorro instances interfere with each other.

### Zorro 1.50 (September 2016)

*   Orders for binary options and other special order types can now be sent via MTR4 bridge with the [SET\_ORDERTEXT](113_brokerCommand.md) command (V 1.47.1).
*   [Currency strength](ccy.md) functions have been added for detecting currency trends that affect several markets (V 1.47.2).
*   Live trading results can be verified by [retesting](009_Retraining.md) (V 1.47.2; [Zorro S](restrictions.md) required).
*   Live trading systems can retrain automatically in predefined intervals with the [ReTrainDays](100_tradeUpdate.md) variable (V 1.47.2; [Zorro S](restrictions.md) required).
*   The sliders can now be moved with [slider(num,pos)](141_slider.md) commands (V 1.47.2).
*   The default data format was changed from **.bar** to [**.t6**](022_Price_History.md) for including volume and other data streams in the price history (V 1.47.2). **.bar** data can still be used.
*   With the [marketVol](022_Price_History.md) function, trade or tick volume of an asset can be used in a trading algorithm (V 1.47.3; Zorro S only).
*   The [Fill](198_Fill_modes.md) mode determines how orders are filled in the simulation (V 1.47.4).
*   Numbers can be passed to the [Command](cmd.md) variable via command line (V 1.47.4; [Zorro S](restrictions.md) required).
*   The number of optimize steps per parameter was increased to 1000 (V 1.47.7).
*   Price ticks are now internally stored in a different format that used less memory for large high-resolution backtests. (V 1.47.7).
*   Disquieting broker messages - such as "An internal server error occurred, our engineers have been notified" - are now filtered out by the Oanda plugin (V 1.47.8).
*   Three [Volatility indicators](033_W4a_Indicator_implementation.md) are now supported - Chaikin, Min/Max, and StdDev based volatilities (V1.50.2).

### Zorro 1.46 (July 2016)

*   The [assetAdd](013_Asset_Account_Lists.md) function allows adding assets via script without editing the asset list.
*   The [assetList](013_Asset_Account_Lists.md) function loads an asset list immediately.
*   Price history files can be shared among several Zorro installations when a [HistoryFolder](007_Training.md) is set up in **Zorro.ini**.
*   With the **"\\r"** character in a **[print/printf](143_printf_print_msg.md)** statement that jumps back to begin on the current line, a running counter or similar effects can be realized in the message window.
*   The [mouse](153_mouse.md) function can be used for automated clicking "Buy" and "Sell" buttons on a broker's web interface.
*   Individual asset lists for the [Z systems](zsystems.md) can now be entered in the **Z.ini** setup file.
*   A new free trading system **Z8** was added to the [Z systems](zsystems.md).
*   The [Oanda plugin](237_Oanda.md) now supports sub-accounts.
*   The **LINE** flag in a [plot](146_plot_plotBar.md) command plots thick lines in the chart.
*   \[Change Folder\] in the Strategy scrollbox selects strategies from a different folder.

### Zorro 1.44 (May 2016)

*   The [Oanda](237_Oanda.md) plugin allows direct trading with Oanda™.
*   Headers for authorization or other purposes can now be included in the [http\_send](160_HTTP_functions.md) function.
*   The [TradeTest](brokerplugin.md) script opens a panel with buttons for manually trading, useful for testing broker plugins.
*   Files can now be selected in a dialog box with the [file\_select](158_File_access.md) function.
*   Clicking on \[Result\] during test or trading triggers the [click](142_panel.md) function. This can be used for performing a calculation or plotting an interim result.
*   The [IB bridge](062_DefineApi_LoadLibrary.md) was modified for downloading larger price history.
*   The [GET\_POSITION](113_brokerCommand.md) command is now supported by the IB bridge.
*   The [BALANCED](advisor.md) flag produces a balanced samples distribution for all machine learning algorithms.
*   A set of [normalization functions](071_cdf_erf_dnorm_qnorm.md) was added for better adapting indicators to machine learning algorithms.
*   The [SIGNALS](advisor.md) method exports samples for experimenting with them in R sessions.
*   A default [neural](advisor.md) function was included in the **r.h** header. The documentation now got a R example for a 'deep learning' strategy.
*   The [Covariance](033_W4a_Indicator_implementation.md) between two series was added to the indicator library.
*   The [TRADESIZE](018_TradeMode.md) flag can be used for training strategies that rely on different trade sizes, f.i. Martingale systems.
*   The [28 Currencies history](http://zorro-project.com/download.php) was updated until the end of 2015.
*   [Day](180_Bar_NumBars.md) gives the current day number of the simulation.
*   Optimal capital allocation among portfolio components can be calculated with the [Markowitz efficient frontier](105_markowitz.md).
*   Symbols on a histogram or statistics chart can now have individual colors.
*   The [plotHeatmap](147_plotProfile.md) function can plot correlation heatmaps.
*   The [color](148_color.md) function can be used for plotting heatmaps or multiple color curves.
*   Date and time can be printed more easily with the [strdate](month.md) function.
*   A set of [matrix functions](086_vector_matrix.md) was added.
*   By default Zorro is now installed in the **User** folder instead of the **Program Files** folder.

### Zorro 1.42 (February 2016)

*   The [STEPWISE](018_TradeMode.md) flag can be used for [debugging](https://zorro-project.com/manual/en/testing.htm#step) trade behavior by single stepping through a test session.
*   Variables can be debugged with the [watch](143_printf_print_msg.md) function.
*   When a script crashes, the name of the faulty function is now displayed.
*   A negative [PlotBars](204_PlotBars_PlotWidth.md) number zooms to the end of the chart.
*   The [MTR4 Bridge](mt4plugin.md) can now draw horizontal lines and text in the MTR4 chart window.
*   The [MTR4 Bridge](mt4plugin.md) latency time was reduced from ~100 ms to ~30 ms by optimizing the data transfer.
*   [Control panels](142_panel.md) can now be defined for entering and displaying strategy parameters.
*   The [Leverage](192_PIP_PIPCost_Leverage.md) parameter was changed to reflect account leverage instead of buying power.
*   The location of the **.trd** files moved from the **Log** to the **Data** folder.
*   The last potentially orphaned trade is now displayed in the status page.
*   The [Shannon Entropy](033_W4a_Indicator_implementation.md) was added to the indicators.
*   Price data of stocks and indices can now be downloaded from Yahoo with the [assetHistory](loadhistory.md) function.
*   The [Download](022_Price_History.md) script is now controlled with a panel; editing the script is not necessary anymore.
*   Assets can now be tested even with no entry in the asset list. An error message will then be issued and default asset parameters will be used.
*   [Trade loops](fortrades.md) can now be executed from inside a [TMF](018_TradeMode.md).
*   The [wdate](month.md) function returns the date and time of a bar in the Windows **DATE** format.
*   Trades can be simulated in an unrealistic [naive mode](018_TradeMode.md) for special purposes.
*   Individual text editors (such as Notepad++) and chart viewers can be used by editing the [Zorro.ini](007_Training.md) file.

### Zorro 1.40 (November 2015)

*   Zorro can now trade with [Interactive Brokers](062_DefineApi_LoadLibrary.md) accounts through the IB plugin.
*   Asset lists and account lists are now in **.csv** format for easier editing. **Leverage** and **Symbol** have been added to the asset parameters.
*   Correlograms can now be plotted with the [profile](147_plotProfile.md) library.
*   Trade slippage, magic number, and other parameters can now be set up in the [MTR4 bridge](mt4plugin.md) via [brokerCommand](113_brokerCommand.md).
*   The type of an asset can be determined with the [assetType](013_Asset_Account_Lists.md) function.
*   The [frameSync](118_frame_frameSync.md) function can be used to snychronize the time frame to full hours or days.
*   A fixed WFO test/training time can be set up with [WFOPeriod](numwfocycles.md).
*   [Curves](export.htm#pnl) stores balance or equity curves during the training process for further evaluation.
*   The [putvar/getvar](150_putvar_getvar.md) functions share variables globally among scripts.
*   The [lock](167_lock_unlock.md) function can synchronize the behavior of multiple Zorros (Zorro S only).
*   The [sort](125_sortData_sortIdx.md) functions can now be used without data length limits.
*   The [randomize](130_randomize.md) function can shuffle a price or equity curve with or without replacement.
*   [Percentile](033_W4a_Indicator_implementation.md) calculates upper or lower percentiles of a data series.
*   [ProfitFactor](033_W4a_Indicator_implementation.md) calculates the profit factor of a balance or equity curve.
*   The [market](month.md) function can be used to limit trading to certain hours of the day.
*   The [plotData](146_plot_plotBar.md) function returns plot data arrays that can be used for further evaluation.
*   Plotting data is now pre-sampled, which makes plotting huge data sets - f.i. a backtest of several years based on minute or second bars - up to 100 times faster than before.
*   The [BrokerAccount](brokerplugin.md) function is now optional (account data is normally unavailable in a FIX API implementation).
*   The [Montecarlo](montecarlo.md) module has been integrated in Zorro, so an external plugin is not required anymore.
*   Periodic I/O tasks can be realized with the [tock](089_tick_tock.md) function.
*   The sample period of the [Spectrum](129_filter_renorm.md) function can now be set up independently.
*   The [Z.ini](zsystems.md) file can now be modified while trading, and is updated at the begin of the next bar.
*   The [Z7 system](zsystems.md) got a modified and supposedly more robust algorithm.
*   [loop(Assets)](109_loop.md) loops over all assets from the asset list.

### Zorro 1.34 (released August 2015)

*   WFO training time can be minimized by using [several CPU cores](numcores.md) (Zorro S only).
*   The Zorro window can be started minimized with the [\-h](027_Command_Line_Options.md) command line option.
*   The [AssetZone](assetzone.md) variable allows individual time zones for assets in a portfolio system.
*   The pattern analyzer behavior can be set up with the [PatternCount](advisor.md) and [PatternRate](advisor.md) variables.
*   A negative [series](091_series.md) length can be used for generating static, non-shifting series.
*   The [ZigZag](033_W4a_Indicator_implementation.md) indicator was added to the indicators list.
*   Machine learning models and script parameters can now be trained at the same time (see [Training](training.md)). In the previous version this was only possible for the integrated machine learning methods, but not for the general **NEURAL** method.
*   The [bar](005_Bars_and_Candles.md) function allows user-defined special bars such a Range Bars or Renko Bars.
*   Training parameters now really produces a HTML file with parameter histograms (in the previous version this was not yet fully included).
*   The [R lectures](Lecture%201.md) by Harry Georgakopoulos have been included in the Zorro documentation.
*   Zorro will now detect margin calls when [Capital](190_Margin_Risk_Lots.md) is set.
*   The [seed](084_random_seed.md) function can initiate a deterministic random number sequence.
*   The [HH](033_W4a_Indicator_implementation.md) and [LL](033_W4a_Indicator_implementation.md) functions now also accept a bar offset.
*   The [Ichimoku](033_W4a_Indicator_implementation.md) indicator was added to the collection.
*   The [TO\_CSV](143_printf_print_msg.md) print target prints into a CSV file.
*   The [strmid](str_.md) function returns a substring from a string.
*   The asset list **AssetsCur.dta** contains all 28 major currency pairs.
*   Price history of all 28 major currency pairs is available on the download page.
*   The [Z2](zsystems.md) system has been improved and got better exit algorithms and a new counter trend algo (A2).
*   The new [Z7](zsystems.md) system, based on the machine learning algorithm from [Workshop 7](tutorial_pre.md), was included.

### Zorro 1.32 (released June 2015)

*   The [R br](rbridge.md)[idge](rbridge.md) runs R functions from lite-C scripts and allows coding a trade strategy completely in R, using the newest and sexiest AI algorithms.
*   [Verbose](199_Verbose.md) = 30 now stops the blackbox recording at the first error.
*   The [strw](str_.md) function converts strings to wide character strings.
*   The [strf](str_.md) function returns a formatted string.
*   The [strx](str_.md) function replaces sub-strings in a string.
*   The [TO\_FILE](143_printf_print_msg.md) and [TO\_ANY](143_printf_print_msg.md) print target prints messages to the log file and window in all modes.
*   The [TICKS](018_TradeMode.md) mode was changed. Ticks are now executed in the order of their time stamp, not sorted by asset or trade as before. This makes testing slower, but removes the special restrictions for tick functions, TMFs, and virtual hedging. The old testing method can still be used by setting the [FAST](018_TradeMode.md) flag.
*   The [rev](127_rev.md) function reverses a series so that it now starts with the oldest data.
*   The [SHUFFLE](197_Detrend_shuffling.md) flag randomizes a price curve and thus helps determining if profit is caused by a real edge or by artifacts or randomness.
*   The [plotWFOCycle](147_plotProfile.md) and [plotWFOProfit](147_plotProfile.md) functions can be used for analyzing the profit curve over several WFO cycles.
*   The [BarZone](assetzone.md) variable can be used to shift daily bars to a certain local time zone.
*   [Chaikin Volatility](033_W4a_Indicator_implementation.md) was added to the standard indicators.
*   The [BINARY](018_TradeMode.md) flag enables the simulation of binary trading.
*   [Training](007_Training.md) now plots all parameter charts in a HTML page, also for portfolios and WFO.

### Zorro 1.30 (released April 2015)

*   The [OptimalFRatio](016_OptimalF_money_management.md) variable modifies **OptimalF** factors for preventing large component margin differences in portfolio systems.
*   For scalping strategies, [bar periods](177_BarPeriod_TimeFrame.md) down to 100 ms are now possible with Zorro S. The **BarPeriod** variable is now of type **var** instead of **int** (check possible compatibility issues, f.i. in print/printf statements).
*   Asset specific parameters can be stored in the [AssetVar](196_AlgoVar_AssetVar_AssetStr.md) variables.
*   All [Z systems](zsystems.md) can now be retrained with Zorro S by clicking the \[Train\] button (even while trading). Price history of all assets from 2008 and above must be available in the **History** folder. The recent prices are updated and the parameters of the last WFO cycle are trained. Retraining the Z systems is normally not necessary, but was requested by many users.
*   Several small improvements have been implemented in the [Z systems](zsystems.md), among them different **OptimalF** factors for the backtest and for live trading, and a different profit lock method.
*   The [Z3 system](zsystems.md) now also trades US indexes.
*   A chart with the current equity curve and other information is now included in the [trade status page](004_Trading_Strategies.md).
*   If the trade volume is controlled by setting both [Margin](190_Margin_Risk_Lots.md) and [Lots](190_Margin_Risk_Lots.md), the **Lots** variable now determines the minimum number of lots per trade. Trades can be automatically skipped when Margin is below the minimum.
*   The [backtest](006_Testing.md) can now use T1 (tick based) historical price data.
*   The [assetHistory](loadhistory.md) function can now be used to produce T1 price history files.
*   The [seconds](month.md) function is now of type **var** instead of **int** (check possible compatibility issues, f.i. in print/printf statements). Its fractional part contains fractions of a second in milliseconds precision.
*   The user-supplied [](137_evaluate.md)[tick](089_tick_tock.md) function can be used to evaluate incoming price quotes.
*   The [AutoCompile](007_Training.md) flag determines whether scripts are always compiled, or only when they were modified.
*   [Plot](146_plot_plotBar.md) names beginning with '#' won't appear in the chart legend.
*   The test performance can now be further evaluated with the user-supplied [evaluate](137_evaluate.md) function.
*   The **[UO](033_W4a_Indicator_implementation.md)** (Universal Oscillator) by John Ehlers was added to the indicator library.
*   The **Risk** column of the [status page](004_Trading_Strategies.md) now displays the current risk of a trade instead of the initial risk.

### Zorro 1.28 (February 2015)

*   The **[WebFolder](007_Training.md)** variable can now be set up globally for displaying live trade status on a web site.
*   The [strtext](str_.md) function can be used to read strings from an **.ini** file.
*   The [DPO](033_W4a_Indicator_implementation.md) oscillator was added to the TA functions.
*   The [AGC](116_Statistics_Transformations.md) and [EMA](033_W4a_Indicator_implementation.md) functions now also accept an alpha parameter instead of a time period.
*   Some Zorro properties - for instance, the automatic deleting of old log files - can now be set up in the [Zorro.ini](007_Training.md) file.
*   The commission per asset can now be set up in the **[AssetsFix.csv](013_Asset_Account_Lists.md)** file and by script in the [Commission](191_Spread_Commission.md) variable. The simulation now simulates a spread/commission account, instead of a pure spread account.
*   In the SNB floor removal aftermath, many brokers reduced their maximum leverage from 400:1 or 200:1 to 100:1. The simulated default account (**AssetsFix.csv**) was also changed to 100:1 leverage, which affects the profit of most systems.
*   The **Z4** and **Z5** systems are expired and have been removed from the strategy pool.
*   The [Z3 system](zsystems.md) now also got an equity curve trading mechanism.
*   The currently profitable and suspended components of the **Z12** system are now displayed in a [asset/algo matrix](zsystems.md) with green and red rectangles.

### Zorro 1.26 (October 2014)

*   The number of open lots per asset can be evaluated with the [LotsPool](winloss.md) and [LotsPhantom](winloss.md) variables.
*   The Market Meanness Index ([MMI](ta.md)) was added to the indicator library.
*   Haiken Ashi prices ([HA](ta.md)) were added to the indicator library.
*   The Z systems have been improved and retrained. New algorithms have been added to the Z4 and Z5 systems for working with very low price volatility.

### Zorro 1.24 (June 2014)

*   The [AssetFrame](assetzone.md) variable can be used to skip quoteless bars of assets in a portfolio system.
*   The [TradeCosts](020_Included_Scripts.md) script lists the relative trade costs of all main assets.
*   The **Script** scrollbox now 'remembers' the last selected script.
*   [Hedge mode 5](019_Hedge_modes.md) now minimizes the number of open trades by closing trades partially if required.
*   [exitLong/Short](selllong.md) can now close trades partially.
*   The **MTR4 bridge** and the **FXCM plugin** have been adapted to partially closing trades.
*   [TrailSpeed](188_Stop_Profit_Trail_Entry.md) raises the stop faster before breakeven, this way preventing that a winning trade turns back into a loser.
*   The [Hurst exponent](033_W4a_Indicator_implementation.md) can determine trending state of a price curve.
*   The [Alligator](033_W4a_Indicator_implementation.md) indicator was added to the library.
*   The [predict](131_predict.md) function can predict crossovers several bars before they happen.
*   The [Momentum](121_crossOver_crossUnder.md) variable indicates the 'strength' of crossovers, peaks, or valleys.
*   The [saveStatus](loadstatus.md)/[loadStatus](loadstatus.md) functions can preserve variables, open trades, and slider positions when the system is stopped or restarted.
*   The [AlgoVar](196_AlgoVar_AssetVar_AssetStr.md) variables are now automatically saved, thus keeping their content when a trading system is stopped or restarted.
*   Invalid [Margin](190_Margin_Risk_Lots.md) values are now indicated with an error message.
*   The [NFA](018_TradeMode.md) flag is now ignored in training mode.
*   While trading, Zorro now displays a detailed lists of open trades and performance statistics in a HTML file that is updated every minute.

### Zorro 1.22 (April 2014)

*   The [MTR4 bridge](mt4plugin.md) was updated to version 1.3 that supports MTR4 version 600 and above.
*   The [Multisession plugin](013_Asset_Account_Lists.md) allows to trade with multiple brokers, instances, and accounts even with the free Zorro version.
*   Placing the stop level at the wrong side of the price in a TMF is now automatically corrected.
*   The [ATR](033_W4a_Indicator_implementation.md) function now adapts to the **TimeFrame**.
*   A new [Virtual Hedging](019_Hedge_modes.md) mode allows to combine trades opened on the same bar to a single net trade.
*   The [Keltner Channel](033_W4a_Indicator_implementation.md) was added to the indicator library.
*   The [PlotDate](204_PlotBars_PlotWidth.md) variable can be used to zoom the chart to a certain date.
*   The [print](143_printf_print_msg.md) function can print to various targets, f.i. to a message box or to the performance report.
*   Zorro now only logs in to the broker when in trade mode. In test or train mode, missing assets or price data will produce an error message. The [Download](020_Included_Scripts.md) script now needs trade mode for updating prices or asset data.
*   The [exec](151_exec.md) function can be used to open an external program, document, URL, or batch file.
*   A [Monte Carlo plugin](montecarlo.md) is now available for a Monte Carlo analysis of strategy scripts and external trade lists.
*   The annual return is now calculated from the maximum margin instead of the average margin. This produces slightly more pessimistic returns.
*   The **R2** coefficient that measures equity curve linearity is now included in the [performance report](012_Performance_Report.md).
*   A small example script for converting **.csv** price history files to Zorro's **.bar** format was added (needs the **file\_write** function).
*   The [History](020_Included_Scripts.md) string can be used for selecting between different sets of historical data files.
*   The [file\_write](147_plotProfile.md) function can be used to store the content of a string, series, or array in a file.
*   The [NumInRange](129_filter_renorm.md) function can be used to generate price distribution statistics while trading.
*   The [ShannonGain](129_filter_renorm.md) indicator calculates the expected gain of the next bar period, based on Shannon probability.
*   A description of using NeuroShell™ and other DLL-based indicators for Zorro was added to the [conversion](021_Conversion_from_other_platforms.md) chapter.
*   Trade management functions ([TMF](trade.md)) can now be triggered by entry or exit limits, thus allowing for additional entry/exit conditions or trade chains.
*   [TickSmooth](187_TickTime_MaxRequests.md) can remove outliers from incoming price ticks.
*   The [TickTime](187_TickTime_MaxRequests.md) variable can be used to save CPU resources by defining a minimum time between script executions.
*   The [plotProfit](147_plotProfile.md) functions plot the daily, weekly, monthly, or quarterly profit or loss in the price chart.
*   The [Z5 system](zsystems.htm#z5) got a new algorithm for the "Stop" slider that re-enters trades closed due to the risk limit. This greatly improves the profit in situations when the risk limit is exceeded.

### Zorro 1.20 (November 2013)

*   The [PRELOAD](018_TradeMode.md) flag allows loading lookback price data from the price history on trade start.
*   The [DominantPhase](129_filter_renorm.md) function can detect turning points of the dominant cycle in a price curve even before they happen.
*   The [account selection system](013_Asset_Account_Lists.md) was implemented for multiple accounts and/or multiple MTR4 clients (Zorro S only).
*   A new FXCM plugin is available where the wrong trade profit issue is fixed, so the [SET\_PATCH](113_brokerCommand.md) command is not required anymore.
*   Bar charts by [plotBar](146_plot_plotBar.md) are now automatically aligned so that the chart always starts with the first bar.
*   The [MTR4 bridge](mt4plugin.md) now supports multiple MTR4 instances on the same PC (Zorro S only). To connect to a particular MTR4 account, either the account number can be manually entered in Zorro's \[User\] field, or the [account selection system](013_Asset_Account_Lists.md) can be used.
*   The [\-d](027_Command_Line_Options.md) command line option allows to pass a **#define** statement to the script (Zorro S only). This way many different tasks can be automatized with the same script.
*   The [ALLCYCLES](018_TradeMode.md) flag produces a portfolio analysis of all sample cycles.
*   The [plot](146_plot_plotBar.md) command now supports plotting different symbols in the chart.
*   A price data gap check can be activated with the [GapDays](100_tradeUpdate.md) variable.
*   New indicators by John Ehlers ([HighPass2](filter.md), [StochEhlers](033_W4a_Indicator_implementation.md)) have been converted to C by DdlV, together with an example script of a trade system.
*   A [Filter](020_Included_Scripts.md) script has been added for testing and displaying Zorro's [spectral filter](129_filter_renorm.md) functions.
*   The sine and square wave generators can now produce hyperbolic chirps for filter testing.
*   [Margin](190_Margin_Risk_Lots.md) at **0** now prevents trades; previously 1 lot was opened, which was a common source of mistakes.
*   A backup of the **.trd** file is now stored at trade start.
*   Several different money management methods are now discussed at the end of [workshop 6](tutorial_kelly.md).
*   A [Gap](020_Included_Scripts.md) script was added as an example for a simple gap trading system.
*   The [Z5 system](zsystems.htm#z5) was improved for adapting to periods of low volatility.
*   The new [Z4 system](zsystems.htm#z5) was especially designed for minimal budgets in the range of $100 .. $400.

### Zorro 1.16 (September 2013)

*   The [\-quiet](027_Command_Line_Options.md) command line flag suppresses message boxes.
*   [FTP](161_FTP_transfer.md) and [HTTP](160_HTTP_functions.md) functions have been added for accessing the content of websites or sending emails or files to or from remote servers.
*   A new [Virtual Hedging](019_Hedge_modes.md) mode was implemented and replaces the **HEDGING** flag. It can greatly reduce the market exposure and the trade duration, and improve profit due to smaller trade costs.
*   A drawdown chart was added to the [performance chart](012_Performance_Report.md).
*   Chart colors can be individually set up with the [color](206_Colors.md) variables.
*   The contribution weights of portfolio components are now listed in the [portfolio analysis](012_Performance_Report.md).
*   New trades can now be opened from inside a [TMF](018_TradeMode.md).
*   The [Simulate](020_Included_Scripts.md) script simulates a trade system by importing trades from a .CSV file.
*   Entry and exit time of a trade are now stored with tick precision in the .CSV file (previously it was with bar precision only).
*   Some users had problems to set up a trading system on a VPS, so a **VPS installation service** was added to the download page.
*   The [Z5](zsystems.md) system now uses virtual hedging.

### Zorro 1.14 (August 2013)

*   While trading, a click on \[Result\] prints a list of open trades with entry, current, and stop prices.
*   The [login](112_login.md) function can be used for temporarily logging out from the broker.
*   The [memory](171_memory.md) function can be used for determining the current memory footprint of the script, and for finding memory leaks.
*   The [reverse](buylong.md) functions are convenient for limiting the number of trades. Their use is explained in [workshop 5](tutorial_fisher.md).
*   The [msg](143_printf_print_msg.md) function can now be used for modeless message boxes, useful for trade alerts without interrupting the script.
*   The stop loss distance is now displayed in the daily profit/loss reports with [Verbose](199_Verbose.md) >= 2.
*   [OptimalF](016_OptimalF_money_management.md) factors are now also calculated for long and short trades together. This gives a more precise result than averaging the long and short OptimalF factors.
*   A [seconds](month) function was added for evaluating intrabar time.
*   The [OrderDelay](timewait.md) variable can be used for improving profits by entering trades at the optimal moment.
*   A step by step description of adding new assets and downloading price data was added to the manual.
*   The [Capital](190_Margin_Risk_Lots.md) variable allows to set up an initial capital and calculate the CAGR.
*   The [advise](advisor.md) function can now generate trading rules for multiple assets and algos.
*   The [BarPeriod](177_BarPeriod_TimeFrame.md) variable can now be set from an [optimize](107_optimize.md) call, except for WFO.
*   [TimeFrame](177_BarPeriod_TimeFrame.md) can now generate individual time frames that are aligned to external events.
*   [assetHistory](loadhistory.md) can now be used for updating or adding new assets without downloading historic price data.
*   The state of the input sliders are now stored together with the open trades, and restored when trading is resumed.
*   The state of the Account scrollbox is now preserved when Zorro is restarted.
*   The [BarMode](200_BarMode.md) variable can now be set to **2** for preventing that bars end during the weekend.
*   The [Verbose](199_Verbose.md) variable can now be used to set up message verbosity and diagnostics mode via script. It is also added to the [Z.ini](zsystems.md) file for the included systems.
*   The **diag.txt** file is now separately stored for every strategy.

### Zorro 1.12 (July 2013)

*   Slippage is now recorded while live trading, and displayed in the [performance report](012_Performance_Report.md) in total and per trade.
*   An additional algorithm (VO) was added to the Z1 system, increasing the annual return to about 280%
*   After 6 months live test the [Z3](zsystems.htm#income) and [Z5](zsystems.htm#income) trade systems have been released.
*   C source generated by machine learning functions is now stored in **.c** files instead of **.rul**.
*   The [plotMAEGraph](147_plotProfile.md) function can produce MAE distribution graphs and similar charts.
*   The [plotGraph](146_plot_plotBar.md) function draws lines and polygons in a chart.
*   The [DOT](146_plot_plotBar.md) type can be used for plotting a dotted curve.
*   The [Trail](188_Stop_Profit_Trail_Entry.md) distance can now be negative for raising the stop loss on any bar regardless if the trade is in profit or not.
*   Due to an internal loop optimization, trades are now entered faster, thus reducing slippage.
*   The [MUTE](018_TradeMode.md) flag prevents playing sounds (in the case that Zorro trades from your bedroom).
*   [NumTotalCycles](numtotalcycles.md) can be used to repeat a full simulation cycle many times.
*   The [pattern analyzer](advisor.md) can now generate 'fuzzy patterns' with the **FUZZY|PATTERN** method.
*   The [pattern analyzer](advisor.md) can now generate pattern finding functions in C that can be exported to other platforms.
*   The **equalF** and **eq** functions have been added to the [fuzzy logic](087_Fuzzy_Logic.md) set.

### Zorro 1.10 (May 2013)

*   Zorro can now run as a MTR4 expert advisor using the [MTR4 Bridge](mt4plugin.md).
*   The [Spectrum](filters.md) function can be used to find hidden cycles in a price curve.
*   A new [workshop](tutorial_pre.md) was added for trading with machine learning algorithms.
*   AI rules and strategy parameters can now be generated at the same time.
*   The [PATTERN](advisor.md) analyzer automatically finds profitable candle patterns for price action trading.
*   The [FrameOffset](177_BarPeriod_TimeFrame.md) variable allows to generate trade signals at different times within the same time frame of a multi time frame strategy.
*   The [\-diag](027_Command_Line_Options.md) command line option can be used for finding the reason of a crash or similar problem that terminates the script.

### Zorro 1.06 (March 2013)

*   The **AVG** flag now allows to [plot](146_plot_plotBar.md) a value as an average curve over all oversampling cycles.
*   A **Laguerre** filter was added to the [filters](129_filter_renorm.md).
*   Comparing a function pointer with a **var** or **float** value - this can happen when forgetting the () of a function call - will now generate a compiler error.
*   The [info](143_printf_print_msg.md) and [progress](144_progress.md) commands display text and color signals in Zorro's info window and progress bar.
*   Zorro can now be started from external programs with [command line options](027_Command_Line_Options.md).
*   [Seasonal analysis functions](147_plotProfile.md) have been implemented. They are also be available as an add-on for Zorro 1.05.
*   The **Z12**, **Z12fx**, and **Z12nfa** combined strategies have been removed because they were found less profitable than trading Z1 and Z2 separately. Reason is an internal mechanism that evaluated open trade profits for trade decisions, which does not work well across opposite strategies such as the Z1 trend trading and the Z2 counter trend trading systems.

### Zorro 1.05 (January 2013)

*   The **Total down time** - the time spent below a preceding equity peak - is now displayed in the [performance report](012_Performance_Report.md).
*   The [timer](169_timer.md) function can be used for precisely determining execution times.
*   Asymmetric slippage can be simulated by setting the [Slippage](191_Spread_Commission.md) variable to a negative value.
*   [dayPivot](119_dayHigh_dayLow.md) calculates the pivot point of the previous day.
*   The stock exchange working hours for the [day](119_dayHigh_dayLow.md) functions can be changed through the variables **StartMarket** and **EndMarket**.
*   The week start and end time can be changed through the variables **StartWeek** and **EndWeek**.
*   The [DIAG](018_TradeMode.md) flag prints the execution time for opening and closing positions into the log file.
*   The [TICKS](018_TradeMode.md) flag now also handles entry limits with per-tick resolution.
*   [Trade functions](018_TradeMode.md) can now also be used for individual entry limits.
*   Price history files are not anymore automatically downloaded at the begin of a new year - this confused beginners and was a bad idea anyway. Instead the [assetHistory](loadhistory.md) function was implemented.
*   A new broker plugin with the ForexConnect™ API interface has been implemented. It provides a more stable connection than the previously used Order2Go™ broker plugin.
*   Logging in to the broker with several Zorro instances on the same PC will now generate an error message.
*   The **Z1** / **Z2** system components are now optionally filtered with the results of an out-of-sample test with the real trading parameters. This reduces the backtest performance, but should improve the real trading performance.

### See also:

[Zorro Home](https://zorro-project.com), [Get Started](started.md), [Bug History](bugs.md), [Brokers](214_Brokers_Data_Feeds.md), [Tutorial](tutorial_var.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))