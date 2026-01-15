---
title: "Error Messages"
source: "https://zorro-project.com/manual/en/errors.htm"
---

# Error Messages

# Error messages

Below you'll find a list of possible errors that can occur during compilation or at runtime, together with suggestions for finding the reason of the error. Messages related to opening and closing positions are listed under [Log](010_Log_Messages.md); known issues with brokers are commented on the related page ([FXCM](fxcm.md), [IB](062_DefineApi_LoadLibrary.md), [Oanda](237_Oanda.md), [MT4](mt4plugin.md), etc...) in this manual.

Error messages must never be ignored. Even when your script runs and produces a result, an error message always indicates that something is seriously wrong and must be fixed. Warning messages can be ignored in some cases, but only when you know and understood their reason. You can encounter three types of warning or error messages:

*   **Compiler errors** are simply caused by wrong syntax: Mistyping something, forgetting a bracket or semicolon, or calling a function the wrong way. Even experienced programmers see those errors all the time. The script name and line in question is displayed in the error message, so the error is easy to fix. Some syntax errors cause error messages in subsequent lines.  
       
    
*   **Runtime errors** occur while the script is running, either in the message window, or in a separate message box. If **[watch("?...")](166_watch.md)** statements are placed in the script, their argument is displayed at the end of most error messages for identifying the position in the code. Some non-critical runtime errors can be suppressed by calling **ignore(ErrorNumber)**. For instance**, ignore(53);** lets Zorro start a trading session with no Error 053 message even when some assets are unavailable.  
       
    
*   **Broker messages** are printed with an explamation mark. They come from the broker API, for instance when using a wrong symbol, exceeding some API limit, or trading outside market hours. The error or warning by the broker is displayed and recorded in the Zorro log. In the case of **MT4/MT5** the error or warning messages are recorded in the terminal's experts log.

For dealing with error messages by script, two functions are available:

 

## error (string Message)

User-supplied function that is called on any runtime error message or any [print/printf](143_printf_print_msg.md) call that contains the word **"Error"**, **"Warning"**, or **"Info"**. This function can be used to sound an [alert](145_sound.md) or send an [email](155_email.md) about a potential problem. It is not in sync with other functions or I/O operations, so use the [call](164_call.md) scheduler when modifying global variables or accessing non-reentrant parts of the broker API.

## allow (int Number)

Call this function for not generating messages on runtime errors or warnings with the given number. For instance, **allow(73)** suppresses all **Error 073** messages. Not all errors can be suppressed; fatal errors that terminate the script will still generate a message.  

# Compiler errors

### Error in line ...

> Wrong or missing token in the script code. Sometimes the line in question is ok, but some command in the preceding code was incomplete. Examples are an **#ifdef** without an **#endif**, or a missing semicolon in the previous line, or an orphaned **{** **}** bracket in the previous function. Another not-obvious error is declaring a variable or function with the same name as a predefined system variable, such as [Stop](188_Stop_Profit_Trail_Entry.md) or [Lots](190_Margin_Risk_Lots.md).

### Wrong type ...

> Wrong variable type. You've used a numeric operation with wrong parameter types, for instance an **AND** or **OR** operation with a **float** or **var** type. Or you're using a variable with the same name as a predefined variable - look them up in **variables.h**. Or you've called a function with a **var** although it needs a **series**, or vice versa. Example: "**Wrong type POINTER::DOUBLE**" means that the code expects a **double** (or **var**) and you gave it a **pointer** (or **series**) instead.

### Pointer expected ...

> Function call with a wrong parameter type, for instance with a **var** when a [series](091_series.md) or an **array** is needed.

### Undeclared identifier ...

> The given name or type is unknown. A common reason is an **#include** statement without including **<default.c>** before. **default.c** contains all language definitions, but is only automatically included when nothing else is included.

### Can not translate ...

> Numerical operation with wrong parameter types, for instance an **AND** or **OR** operation with a **float** or **var** type. In that case, [typecast](aarray.md) the expression to the correct type.  
>  

# Runtime errors

For suppressing a non-critical runtime error or warning, call **ignore(ErrorNumber)**. Some warnings are only displayed on a higher [Verbose](199_Verbose.md) level.

### Error 010: Invalid trade parameter

> A [trade](buylong.md) was entered with an invalid [Stop](188_Stop_Profit_Trail_Entry.md), [TakeProfit](188_Stop_Profit_Trail_Entry.md), [Trail](188_Stop_Profit_Trail_Entry.md), [Margin](190_Margin_Risk_Lots.md), or asset parameter that's unusually high, low, or at the wrong side of the current price. Or with an option or futures [contract](096_contract.md) was entered with a wrong or missing [Multiplier](contracts.md), strike, or expiration date. This trade cannot be executed. Wrong price limits can be caused by a bug in the script or by wrong margin cost, pip cost, or leverage parameters in the asset list. If it happens during live trading, an alert box will pop up dependent on [Verbose](199_Verbose.md) settings.

### Warning 010: Invalid trade parameter / no price

> A [trade](buylong.md) was entered with an unknown parameter; for instance an option contract with no price in the historical or live data (call **contractPrice** before entering a trade). In live trading the position will be entered nevertheless, but this message is just to inform that it is not advisable to trade at unknown prices or other parameters.

###  Error 011: xxx called with invalid parameters

> A function was called with wrong parameters - for instance a price of zero, or a parameter outside its valid range. This is usually caused by a bug in the preceding script code. The function name is included in the message.

### Error / Warning 012: Bad time / bad date / outdated

> A [date/time function](month.md) was called with bad data, or the bar with the given time could not be found, or a contract chain had not the current date.

### Error 013: Invalid expression (...)

> An invalid value or a wrong variable format caused an exception in a standard C function or expression. For instance a division by zero, the square root of a negative number, an error in a string, or a wrong placeholder in a format statement. The reason is normally a [bug](210_Troubleshooting.md) in the script, but can also be a history or .csv file that is not found or has a wrong format, or a function returning a NaN number. This error is raised by the Windows invalid parameter handler.

### Warning 014: Bar nnn clipped

> Market hours, weekend, holidays, bar offset, time zone, and [BarMode](200_BarMode.md) parameters contradict each other, causing a wrong start or end time at the given bar. This usually happens when the bar offset enforces bars outside market hours and the **BR\_MARKET** flag suppresses such bars at the same tiome. It can also be caused by large gaps in the historical data. The bar is then clipped at the bar period. When using [BarZone](barzone.md) with daily bars, consider that the bar period is one hour smaller or longer when daylight saving changes - this can cause bars to end sometimes inside, sometimes outside market hours.

### Error 015: Invalid xxx data

> Object or function **xxx** got invalid data, f.i. a wrong parameter for a pointer or string, or data from a non initialized array, or from an invalid mathematical operation such as a division by zero. 

### Error 016: Invalid date

> A YYYYMMDD date has been given in a wrong format.

### Error 017: Bad return value

> A script function returned an invalid value.

### Error 018: Bad name

> A name was too long, too short, or contained spaces or other invalid characters.

### Error 019: Empty function

> A function prototype was defined, but not set to a function body.

### Warning/Error 030: Check dates / price history / order of settings

> The lookback period, simulation period, or price history was not set up correctly. Parameters that affect the bars generation ([StartDate](date.md), [BarPeriod](177_BarPeriod_TimeFrame.md), [BarOffset](177_BarPeriod_TimeFrame.md), [LookBack](181_LookBack_UnstablePeriod.md), [TICKS](018_TradeMode.md), [LEAN](018_TradeMode.md), etc.) were either inconsistent (f.i. a too short [LookBack](lookback.md) period for a subsequent indicator call), or changed after the bars were generated, or did not match the historical data. Make sure to set up all parameters and a sufficient lookback period before calling [asset](013_Asset_Account_Lists.md). Use the [PRELOAD](018_TradeMode.md) flag for live trading with extremely long lookback periods.

### Error 031: Price history missing

> The simulation could not be finished because historical data was missing.

### Error 032: Constant parameter changed

> A variable that should remain constant - such as [NumWFOCyles](numwfocycles.md) - was changed after the initial run. Make sure not to change those parameters at runtime.

### Warning 033: Asset missing in INITRUN

> The given asset was not selected in the initial run of the strategy. The initial [asset](013_Asset_Account_Lists.md) call was either missing, or skipped, or failed due to insufficient historical data. The asset parameters are filled with default data. Make sure that all assets are loaded and initialized before they are needed.

### Warning 034: No asset data for ...

> The given asset is missing in the [asset list](013_Asset_Account_Lists.md) (note that asset names are case sensitive). The simulation will still run when historical price data is found, but [asset parameters](192_PIP_PIPCost_Leverage.md) such as spread, margin, lot size, trade costs, trade profit etc. are made up and do not reflect the true values. The asset can not be traded.

### Warning/Error 035: Price gap / invalid ticks / outliers detected

> Prices are missing, outliers, or have invalid time stamps. The broker API did not provide the required historical data, or did not send the current price during the last bar. The missing prices will be automatically replaced with the last valid price. If the warning is triggered by heavy price fluctuations in downloaded data, reduce the sensitivity of the [Outlier](outlier.md) variable.

### Error 036: Index exceeded

> A function wrote past the maximum index of an array or a [series](091_series.md).

### Error 037: Invalid value

> A [plot](146_plot_plotBar.md) function was called with an invalid value, caused by a division by zero, the square root of a negative number, or similar errors in the script. See [Troubleshooting](210_Troubleshooting.md) for working around such errors.

### Error 038: Too many elements

> The [plotGraph](146_plot_plotBar.md) with the given name had more elements that bars exist on the chart. If you need this many, use another name for the rest of the elements.

### Error 039: Expression too complex

> The rule generated by a [machine learning function](advisor.md) is too complex for conversion to a C expression. In case of candlestick patterns, use the **FAST** pattern detection mode that generates simpler rules, or reduce the number of patterns.

### Error 040: Skipped optimize calls

> Number or order of [optimized parameters](107_optimize.md) differ from run to run. Make sure that [optimize](107_optimize.md) is always called in the same order, the number of **optimize** calls is the always same as the number of optimized parameters, and the [PARAMETERS](018_TradeMode.md) flag is not changed between **optimize** calls.

### Error 041: series size / number / usage

> Something was wrong with a [series](091_series.md), [loop](109_loop.md), or [matrix](086_vector_matrix.md) call in your script. They are special functions that cannot be arbitrarily called. Series might have been called in wrong order or with different size, or **loop** might have been called outside the **run** function. Check all such calls and all indicators or functions that are described to create series, such as **Volatility**, **ATR**, **LowPass**, etc. Any [run](088_run.md) must have the same series with the same size in the same order. Don't skip **series** calls with **[if](052_if_else.md)** statements, don't create them in event-triggered functions such as [tmf](018_TradeMode.md), [tick](089_tick_tock.md), or [tock](089_tick_tock.md), and don't chnage the size of a series. The error message tells you at which bar the problem occured first. If you need an extremely large number of series, increase [TradesPerBar](181_LookBack_UnstablePeriod.md) until the error message disappears.

### Error 042: No parameters

### Error 043: Irregular optimize calls

> The [optimize](107_optimize.md) function was called too often per component, or the produced parameters were not found or are inconsisted with the current strategy. Make sure that the [optimize](107_optimize.md) calls or the [loop](109_loop.md) parameters were not changed after training. For asset-dependent parameters, make sure that all assets and algos are selected with [loop](109_loop.md) calls and their **optimize** calls are inside the inner loop. For asset-independent parameters in a portfolio system, make sure that always the same asset is selected before the **optimize** call.

### Error 044: No rule ... / ... not trained

> The [advise](advisor.md) or [optimize](107_optimize.md) function could not find a setup or a trained rule, model, or parameter for the current asset/algo combination. Either it did not enter any trades, or something was wrong with the setup order in your script. Make sure that prior to any [advise](advisor.md) or [optimize](107_optimize.md) call, the [asset](013_Asset_Account_Lists.md) and [algo](095_algo.md) (if any) was selected, the **PARAMETERS** or **RULES** flag was set, and [TrainMode](016_OptimalF_money_management.md) was set up. Then \[Train\] again.

### Error 045: Negative price offset

> A price that lies in the future was requested by a [price](022_Price_History.md) or [day](119_dayHigh_dayLow.md) function. For the simulation you can suppress this message by setting the [PEEK](018_TradeMode.md) flag. **PEEK** is not available for real trading though - Zorro is good in predicting prices, but not this good.

### Error 046: LookBack exceeded

> A [price](022_Price_History.md), [series](091_series.md), or [TA function](033_W4a_Indicator_implementation.md) required a higher lookback period than reserved through [LookBack](181_LookBack_UnstablePeriod.md) (default = **80**). When no asset is selected and time periods don't change at runtime, **Lookback** is automatically adapted to the longest indicator time period of the initial run. Otherwise it should be manually set to the longest possible time period. Setting **LookBack** to **0**, or calling **ignore(46)** allows series longer than the lookback period and suppresses this error message at user's risk.

### Warning / Error 047: Not enough bars

> Historical price data was insufficient for covering the test period or the [LookBack](181_LookBack_UnstablePeriod.md) period. Possible reasons:
> 
> *   An invalid symbol was selected. Check your asset list.
> *   Historical price data was missing, had gaps, or had insufficient resolution, like EOD data for 1-hour bars. Fix the data.
> *   The broker server delivered insufficient history (especially with MT4). Download price data from other sources, and/or use [PRELOAD](018_TradeMode.md).
> *   A wrong test or lookback period was set up in the script (see [asset](asset.md)). Check dates and periods in the script.
> *   The historical data had large gaps or overlapping periods, possibly due to broken downloads. Delete it and download it again,
> *   Bars are skipped due to weekend, holiday, or outside market hours. Check if the asset is traded around the clock or at weekends (such as cryptocurrencies), and set [BarMode](200_BarMode.md) accordingly.
> *   A too high [MinutesPerDay](181_LookBack_UnstablePeriod.md) value for one of the used assets.
> *   A a user-defined [bar](005_Bars_and_Candles.md) type is much larger than the given [BarPeriod](177_BarPeriod_TimeFrame.md). Decrease [BarPeriod](177_BarPeriod_TimeFrame.md) or increase [MinutesPerDay](181_LookBack_UnstablePeriod.md) for allocating more bars.
> 
> Make sure that used assets are selected in the first run, and that historical data - when needed - is sufficient for the backtest plus lookback period and is of the same type for all assets. Don't use a mix of .t1, .t2, and .t6 data, or a part of the data split into years and another part not. You can download price data from online sources with the Download script. Frequently used data is also available on the Zorro Download page. If price data for a certain year is not available, create a .t6 file of 0 bytes size with the name of the asset and year (f.i. **SPX500\_2017.t6**). Zorro will then skip that period in the simulation and not display the error message.

### Error 048: Endless loop or recursion

> Trades are possibly generated in an endless loop or recursion, f.i. by a [TMF](018_TradeMode.md) that enters trades who themselves enter new trades through their **TMF**. Or a [for(trades)](fortrades.md) loop is nested inside another **for(trades)** loop.

### Error 049: Too many trades

> The script entered more than one trade per bar and asset, which is normally a sign of a script bug - therefore the error message. If you really need a huge number of trades, for instance for unlimited grid trading or for training several [advise](advisor.md) functions at the same time, set the **[TradesPerBar](181_LookBack_UnstablePeriod.md)** variable to the required number of trades per bar and asset.

### Warning 050: Trade closed / not found

> The trade from the previous session cannot be resumed. It was either opened with a different algo version, or on a different account, or closed on the broker side, for instance due to liquidation by insufficient margin. It's also possible that the trade got 'orphaned' due to an ID change or a glitch on the broker server. You can normally continue the trading session, but check the trade in your broker's platform. You can identify it from the last 5 digits of the trade ID. If it is still open, close it manually. If it was a pool trade in [virtual hedging](019_Hedge_modes.md) mode, it will be automatically re-opened at the next trade entry.

### Error 051: Can't continue trades

> A trading session was stopped without closing the open trades, then resumed with a different Zorro version or script version. Zorro can only continue trades that the same version has opened. Use the broker platform for closing the trades manually.

### Error 052: Broker interface busy

> Zorro attempted to log in to the broker, but another Zorro instance on the same PC is already connected. For multiple trading sessions and accounts, [Zorro S](restrictions.md) is required.

### Error 053: ... prices unavailable / invalid asset

> The script failed to retrieve prices. The selected asset does not exist, or is not available, or had a wrong [symbol](014_Asset_Symbols.md), or had no prices due to market closure, an offline server, no [market subscription](062_DefineApi_LoadLibrary.md), an unsupported [price type](113_brokerCommand.md), or for other reasons. A checklist:
> 
> *   What's the error message from the broker API? It normally tells if a symbol is wrong, ambiguous, or unavailable. If the symbol is correct, but the price type is wrong, you might get no broker error message.
> *    Is the market is open and the broker server online? Sometimes servers are offline due to maintenance at a certain time of day or on weekends. No problem during a trading session, but at startup.
> *   Have you set the correct [price type](113_brokerCommand.md)? Some assets have only ask/bid prices, others have only trade prices.
> *   Do you have all needed market data subscriptions? Some brokers require a subscription not only for market snapshots, but also for streaming data.
> *   Is the asset visible and accessible in the watchlist / market list of the broker platform? Some assets of some brokers, f.i. IB or MT4, might be only available via API when previously entered in the watchlist.

### Warning / Error 054: asset parameter

> One or several parameters in the [asset list](013_Asset_Account_Lists.md) do not match the values returned from the broker API. If it happens in \[Train\] or \[Test\] mode, it's an invalid value, and you need to edit the [asset list](013_Asset_Account_Lists.md) and fix it. If it happens in \[Trade\] mode, the asset parameter returned from the broker API differed by more than 50% from their values in the asset list, of from values previously received. If you are sure that the asset parameters in your list are correct, but the broker API got them wrong, you can override the API with the [SET\_PATCH](113_brokerCommand.md) command or [BrokerPatch](zsystems.md) setting. MT4/MT5 servers can temporarily return zero values for previously unused assets (see [remarks](mt4plugin.htm#remarks) about MT4 issues). In this case, simply start the script again. If the displayed value is substantially different to the value in the asset list, backtests won't reflect the connected account, so check and correct the asset list.

### Error 056: ... can't download / no data

> Historical price data could not be downloaded from the broker's price server or from an [online source](loadhistory.md). The server can be offline or does not offer price data for the given asset and time period. For brokers that require market data subscriptions, check if you've subscribed the assets to be downloaded. Errors from online sources are usually due to an unsupported symbol or to exceeding a download limit. The full response can be found in the downloaded **History\\history.csv** or **history.json** file.

### Error 057: inconsistent history format

> Check if the historical data is consistent (no mix of different **.t1**, **.t6**, or **.t8** files) and has similar resolution for all used assets. Second or tick resolution is needed for testing with bar periods less than one minute.

### Error 058: ... can't parse

> A CSV [dataset](125_sortData_sortIdx.md) can not be parsed due to an invalid file format. If the file was recently downloaded (f.i. **history.csv**), open it with a text editor - it might contain no CSV data, but an error message from the data provider. Otherwise compare the CSV file content with your conversion [format string](125_sortData_sortIdx.md). If in doubt, set **Verbose** to 7 for checking the source and parse result of the first 2 lines - this normally reveals the format error. The error details:  
>   
> **Bad code** - your format string contained an invalid field placeholder.  
> **Bad date** - the date code in your format string does not match the date format in the file.  
> **Bad field number** - your format string contained invalid field numbers.

### Error 059: ... invalid format

> An [asset list](013_Asset_Account_Lists.md), [account list](013_Asset_Account_Lists.md), or [panel definition](142_panel.md) could not be read due to an invalid parameter or format. Check if it has valid CSV format and that no field is empty or contains invalid content. Every line in a .csv file must have the same number of delimiters - all commas or all semicolons - and end with a 'new line' character.

### Error 060: Out of memory / Memory fragmented / limit exceeded

> Available memory is insufficient for your script. Windows can assign 3 GB memory to a 32-bit process, and all free memory to a 64-bit process. If that size is exceeded, or if the memory became too fragmented by previous simulation or training runs, the memory required by the script cannot be allocated. Some methods to overcome the problem or to reduce the memory requirement:
> 
> *   In case of fragmented memory, simply restart Zorro for getting a fresh contiguous memory area.
> *   Reduce the number of assets by splitting large asset lists and testing asset subsets in separate runs.
> *   Reduce the simulation period by setting a later [StartDate](100_tradeUpdate.md), an earlier [EndDate](100_tradeUpdate.md), or a [MaxBars](100_tradeUpdate.md) limit.
> *   Don't use the [TICKS](018_TradeMode.md) flag. Or increase [TickTime](187_TickTime_MaxRequests.md) before selecting the asset.
> *   Use the [LEAN](018_TradeMode.md) and [LEANER](018_TradeMode.md) flags, and M1 rather than T1 price data.
> *   On short bar periods in the minute or second range, avoid too many [plot](146_plot_plotBar.md) commands.
> *   When your script needs more than 3 GB data: Use [Zorro64](vps.md) and a [C++ script](dlls.md)
> 
> A formula for calculating the memory requirement per asset can be found under [asset](013_Asset_Account_Lists.md). Usually, the memory on a standard Windows PC is sufficient even with large high-resolution data files in 64 bit mode.

### Error 061: Incompatible / Can't compile ...

> The executable script could not be compiled, or was compiled with an incompatible version, like 32 bit vs 64 bit, or is missing a VC++ library on your PC. Delete the outdated **.x** or **.dll** file (if any), make sure that you entered the correct VC++ compiler path in [Zorro.ini](007_Training.md), and compile it again. For running compiled C++ code in 64 bit mode, install the **VC++ 64-bit redistributable package** that is available either from Microsoft or from [our server](http://opserver.de/down/VC_redist.x64.exe).

### Error 062: Can't open file ...

> A file was not found, could not be opened, or had wrong format. Make sure that the file exists, that it has the correct name, that the Zorro process has access rights to it, and that it is not opened with exclusive access in another application (f.i. a **.csv** file in Excel). If a Windows error number is given, f.i. **(wb:13)**, the reason of the error can be found in the list below. 
> 
> <table cellpadding="2" cellspacing="2"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td><p><strong>2</strong></p></td><td><p>No such file or directory</p></td></tr><tr><td><p><strong>9</strong></p></td><td><p>Bad file number</p></td></tr><tr><td><p><strong>11, 12</strong></p></td><td><p>Not enough memory or resources</p></td></tr><tr><td><p><strong>13</strong></p></td><td><p>No access rights, or file opened in another application</p></td></tr><tr><td><p><strong>16</strong></p></td><td><p>Device or resource busy</p></td></tr><tr><td><p><strong>23, 24</strong></p></td><td><p>Too many files open in system</p></td></tr><tr><td style="height: 22px"><p><strong>28</strong></p></td><td style="height: 22px"><p>No space left on device</p></td></tr><tr><td style="height: 21px"><p><strong>30</strong></p></td><td style="height: 21px"><p>Read-only file system</p></td></tr><tr><td><p><strong>38</strong></p></td><td><p>Filename too long</p></td></tr></tbody></table>
> 
>   
> If the missing file is a **.par**, **.c**, **.fac**, or **.ml** file, either the script was not yet [trained](007_Training.md), or the file had a wrong name. The usual reason is selecting a different asset, or no asset at all, before an [optimize](107_optimize.md) or [advise](advisor.md) call. Parameter and rule files will then get inconsistent names in test and training and therefore cannot be read.

### Error 063: ... not available

> The function is not available in this script because it requires a different setup, an external plugin, or [Zorro S](restrictions.md). Make sure that you installed your personal Zorro S key or token.

### Warning 070: Potential orphan

> Zorro sent a trade order to the broker API, but received no response. This can happen due to a server glitch or connection issue right at or after sending the order. It is then unknown whether the position was opened or not. Zorro will assume that the order was rejected. But if it was in fact executed, the trade is orphaned and not anymore under Zorro control.  
>   Check in the broker platform if the position was opened. If so, close it manually. If orphaned trades occur frequently, check your Internet connection and/or connect - if possible - to a different server of your broker. Some Forex brokers, such as [FXCM](230_FXCM.md), are known for occasional orphaned trades.

### Error 071: Trade not found ...

> Zorro closed the trade with the given ID, but the trade was not found in the broker's trade lists. Possibly it was never opened, or was already closed manually or by a margin call or similar event.

### Error 072: Login failed ...

> A broker connection could not be established. The broker server could be offline or the broker API nonfunctional.

### Warning 073: Can't close nn lots

> An [exitShort/exitLong](selllong.md) command for partial closing could not be fully executed because not enough trades were open to close the given number of lots. When partial closing, make sure not to close more lots than are open.

### Error 074: Balance limit exceeded

> You need [Zorro S](restrictions.md) when your annual profit or your balance exceeds the real account limits of the free version. There are no restrictions on demo or paper accounts.

### Warning 075: Can't open / can't close / trade removed...

> A trade order was not executed by the broker API during a live trading session, and subsequently cancelled. The reason is normally printed either to the Zorro log, or to the MT4/MT5 'Experts' log. Valid reasons for not excuting orders are: not enough funds, not enough free margin, no permission to trade that asset, a too distant or too close stop or order limit, a wrong asset symbol, a wrong or missing exchange symbol, a closed market, a broker server issue, no liquidity or no taker, FIFO violation, NFA rules violation, unsupported hedging (f.i. Oanda), or unsupported partial closing (f.i. some MT4 / MT5 brokers). All this, except for funds, liquidity, and permissions, can often be solved or worked around in the script, the asset list, or in case of a Z system, in the **Z.ini** configuration.  
>   If a close order is not executed, it will be automatically repeated in increasing intervals until the position is closed. If it is still not closed after 3 working days, the trade will be removed and no further close orders will be sent. If an open order is rejected, it is not automatically repeated, so it's up to the script to either ignore or handle it.

### Error 075: Check NFA flag

> You're trading with a NFA broker, but the [NFA flag](018_TradeMode.md) in your script or [account list](013_Asset_Account_Lists.md) is wrong or missing. Stopping or closing trades is prohibited on the broker side due to NFA compliance.

### Error 080: Python / R code

Python or R code could not be executed due to a syntax error or for other reasons.

### Error 111: Crash in ...

> A function in the script crashed due to a wrong operation. Examples are a division by zero, a wrong type or missing variable in a **print/printf** call, a wrong array index, or exceeding the stack size by declaring huge local arrays. The current [run](088_run.md) is aborted, possibly causing subsequent errors, f.i. inconsistent series calls. The name of the faulty function is normally displayed. See [Troubleshooting](210_Troubleshooting.md) about how to fix bugs in your script functions or deal with other sorts of crashes.

# Broker errors and messages

### !...

> All messages beginning with an exclamation mark are sent from the broker API in a [live trading](004_Trading_Strategies.md) session, so their content depends on the broker. On high [Verbose](199_Verbose.md) settings, some diagnostics can be printed on events such as session start. Other messages can indicate that the connection was temporarily interrupted or a buy/sell order was rejected (see [enter](buylong.md)/[exit](selllong.md)). This happens when assets are traded outside their market hours, such as an UK stock index when the London stock exchange is closed. A "**Can't close trade**" message can also indicate that the [NFA](mode.htm#nfa) flag was not set on a NFA compliant account, or vice versa. Read the comments on the broker related page ([FXCM](fxcm.md), [IB](062_DefineApi_LoadLibrary.md), [Oanda](237_Oanda.md), [MTR4](mt4plugin.md), ...) in this manual. When trading with the [MT4/5 bridge](mt4plugin.md), details and reason of error message is printed under the \[Experts\] and \[Journal\] tabs of the MTR4 platform.  
>   If a trade cannot be opened, Zorro will not attempt to open it again unless either enforced by the script, or when it's a [pool trade](019_Hedge_modes.md). Pool trades will be rebalanced at any bar until they match the virtual trades. If a trade cannot be closed, Zorro will attempt to close it again in increasing intervals. If it is still not closed after 4 days, Zorro will assume that it was manually closed, and make no further attempts.

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))