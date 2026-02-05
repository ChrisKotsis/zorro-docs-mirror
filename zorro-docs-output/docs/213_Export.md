---
title: "Export"
source: "https://zorro-project.com/manual/en/export.htm"
---

# Export

# Exported Files

### The log

Zorro records script printouts and trade or other events in a **.log** file when the [LOGFILE](018_TradeMode.md) flag is set. The log contains the currrent equity and asset price at every bar, plus events such as opening or closing a trade, adjusting a trailing stop, or a [printf](143_printf_print_msg.md) message by the script. If [Verbose](199_Verbose.md) is at a higher level, it also records the daily state of all open trades, the daily profit or loss, and the current drawdown depth. Event logs are normal text files and can be opened with any text editor. Their content looks like this (the messages are explained under [Log](log.md)):

```c
\--- Monday 03.08. - daily profit +363$ ---
\[GER30:EA:L7407\] +684.97 / +685.0 pips
\[GER30:HU:L7408\] +684.97 / +685.0 pips
\[UK100:EA:L7409\] +580.55 / +464.4 pips
\[USD/CAD:LP:S7612\] +136.29 / +851.8 pips
\[USD/CAD:LS:S7613\] +68.15 / +851.8 pips
\[AUD/USD:LP:L8412\] +115.92 / +483.0 pips
\[AUD/USD:MA:L1511\] +42.50 / +265.6 pips
\[USD/CAD:HU:S5412\] +14.63 / +182.9 pips
\[AUD/USD:HU:L5413\] +28.05 / +175.3 pips
\[GER30:EA:L7407\] Trail 1@4746 Stop 4907
 
\[5770: 04.08. 04:00\]  6: 9289p 143/299
\[GER30:EA:L7407\] Trail 1@4746 Stop 4914
\[AUD/USD:MA:L1511\] Exit after 56 bars
\[AUD/USD:MA:L1511\] Exit 2@0.8406: +38.71 07:36
 
\[5771: 04.08. 08:00\]  6: 9773p 143/299
\[GER30:EA:L7407\] Trail 1@4746 Stop 4920
 
\[5772: 04.08. 12:00\]  6: 9773p 143/299
\[GER30:EA:L7407\] Trail 1@4746 Stop 4927
\[USD/JPY:LP:S7308\] Short 1@94.71 Risk 8
\[USD/JPY:LS:S7309\] Short 2@94.71 Risk 29
\[USD/JPY:HU:S7310\] Short 1@94.71 Risk 13
```

The name of the log file is the script name with appended **.log** extension. If the script contains no [asset](013_Asset_Account_Lists.md) call or if the first **printf** message precedes it, the name of the selected asset from the scrollbox is added to the log file name. Optionally a number ([LogNumber](numtotalcycles.md)) can be added to the file name, for comparing log files generated with different script versions. New log files overwrite old log files of the same name. For preventing that the **Log** folder gets cluttered with thousands of log files, Zorro can be set up in [Zorro.ini](007_Training.md) to automatically delete old files.

### Trade lists

The exported trade lists - **\*\_trd.csv**, **demotrades.csv**, **trades.csv** - contain a description of every finished trade in comma separated format for import in Excel™ or other spreadsheet or database programs. They can be used for evaluating trade statistics - or for the tax declaration.  
  The list named **\*\_trd.csv** is exported in \[Test\] mode when [LOGFILE](018_TradeMode.md) is set. **demotrades.csv** and **trades.csv** are exported in \[Trade\] mode, dependent on whether a demo or real account was selected. The latter two are perpetual files, meaning that they are never overwritten, but their content is preserved and any new finished trade is just added at the end. Thus, theses lists will grow longer and longer until they are deleted manually or moved to a different folder. Depending on the [Comma](007_Training.md) setting, numbers are exported with either a decimal comma or point, and separated with either a semicolon or a comma; this is because German spreadsheet programs require CSV data to be separated with semicolon. The trade list contains the followiing fields:

<table border="0"><tbody><tr><td style="width: 80px"><strong>Name</strong></td><td>Algo identifier (see <a href="algo.htm">algo</a>), or the script name when no identifier is used.</td></tr><tr><td style="width: 80px"><strong>ID</strong></td><td>Trade identifier number, for finding the trade in the log file and in the broker's records.</td></tr><tr><td style="width: 80px"><strong>Type</strong></td><td>Trade type, <strong>Long</strong> or <strong>Short</strong>. For options, also <strong>Put</strong> or <strong>Call</strong>.</td></tr><tr><td style="width: 80px"><strong>Asset</strong></td><td>Traded asset.</td></tr><tr><td style="width: 80px"><strong>Lots</strong></td><td>Number of lots, shares, or contracts. For a lot size different to one contract, multiply this with the asset's <strong>LotAmount</strong> (see above) to get the number of contracts.</td></tr><tr><td style="width: 80px"><strong>Open</strong></td><td>Timestamp when the trade was opened, in the format <strong>Year-Month-Day Hour:Minute(:Second.Millisecond)</strong>.</td></tr><tr><td style="width: 80px"><strong>Close</strong></td><td>Timestamp when the trade was closed., in the format <strong>Year-Month-Day Hour:Minute(:Second.Millisecond)</strong>.</td></tr><tr><td style="width: 80px"><strong>Entry</strong></td><td>Trade fill price (<a href="trade.htm">TradeFill</a>). If the fill price is not returned from the broker API, the fill price is estimated from the ask or bid (dependent on <strong>Type</strong>) at trade entry.</td></tr><tr><td style="width: 80px"><strong>Exit</strong></td><td>Trade exit price. If the exit fill price is not returned from the broker API, the ask or bid (dependent on <strong>Type</strong>) market price at trade exit. For in the money expired or exercised options, it's the executed underlying price. 0 for out of the money expired options.</td></tr><tr><td style="width: 80px"><strong>ExitType</strong></td><td><strong>Sold</strong> (by <a href="selllong.htm">exitTrade</a>), <strong>Reverse</strong> (by <strong><a href="selllong.htm">enterTrade</a></strong>), <strong>Stop</strong> (<a href="stop.htm">stop loss</a>), <strong>Target (<a href="stop.htm">profit </a></strong><a href="stop.htm">target</a>), <strong>Time</strong> (<a href="timewait.htm">ExitTime</a>), <strong>Expired</strong> (options, futures), <strong>Exit</strong> (by a <a href="trade.htm">TMF</a> that returned <strong>1</strong>), <strong>Cancelled</strong> (<a href="selllong.htm">cancelTrade</a>) or <strong>Closed</strong> (externally closed in the broker platform).</td></tr><tr><td><strong>Roll</strong></td><td>Rollover ('swap') received from or paid to the broker for keeping the position open overnight, in units of the account currency.</td></tr><tr><td><strong>Commission</strong></td><td>Commission paid to the broker for opening and closing the position, in units of the account currency.</td></tr><tr><td style="width: 80px"><strong>MAE</strong></td><td>Maximum adverse excursion in units of the account currency.</td></tr><tr><td style="width: 80px"><strong>MFE</strong></td><td>Maximum favorable excursion in units of the account currency.</td></tr><tr><td style="width: 80px"><strong>Profit</strong></td><td>Profit or loss in units of the account currency, as returned from the broker API. Includes spread, commission, and slippage.</td></tr></tbody></table>

### Spreadsheets

The [print(TO\_CSV,...)](143_printf_print_msg.md) function offers an easy way to export backtest data or indicator values to a .csv spreadsheet in the **Log** folder. Under [Tips & Tricks](246_Tips_Tricks.md) some more examples can be found for exporting data to **.csv** files or for importing data from an external text file, for instance to set up strategy parameters.  
 

### P&L curves

When the [LOGFILE](018_TradeMode.md) flag is set in \[Test\] or \[Trade\] mode, the daily profit and loss curve is exported at the end of the session to a **\_pnl.csv** file in the **Log** folder, and a **\_pnl.dbl** file in the **Data** folder. For this the session must have run for more than one day and at least one trade must have been executed. The files contain the daily balance or equity values in ascending date order, in text format in the **.csv** file, and as a **double** array in the **.dbl** file. This file is used for calculating the [Cold Blood Index](ddscale.md) in a subsequent live trading session. Note that the array samples the values at the end of the day, so its last value is not identical to the end profit when the simulation ended before the end of the day.

When the [EXPORT](018_TradeMode.md) flag is set in \[Train\] mode or for a [multi-cycle](numtotalcycles) test,  the P&L curves generated from [Parameter optimization](107_optimize.md) and from any cycle are exported separately for any asset and algo to a **\_cyc.dbl** file in the **Data** folder. The curves can be evaluated, for instance with [White's Reality Check](https://financial-hacker.com/whites-reality-check/). The file contains multiple **double** arrays, one for any curve. The size of any curve can be determined from the size of the **\_pnl.dbl** file.

### Training data

Rules, parameters, factors, and machine learning models are exported to **.c**, **.par**, **.fac**, and **.ml** files in the **Data** folder. With the exception of factors, any [WFO cycle](numwfocycles.md) exports a different set of files. The **.c** files contain the trained rules in C code, the **.par** and **.fac** are plain text files files containing the parameter values and factors separately for any component of the system. The **.ml** format is binary and depends on the used machine learning algorithm. The name of these files is affected by the [Script string](020_Included_Scripts.md).  
  
[Brute Force](016_OptimalF_money_management.md) optimization exports all parameter combinations and the resulting objectives to a **\*par.csv** file in the **Log** folder. The first column contains the [objective](objective) returns, the subsequent columns the parameter velues in the order of their appearance in the script. The exported spreadsheet can be evaluated by a script for generatiung heatmaps of any two parameters, or by Excel to generate a 3-d surface. Note that Excel requires re-arranging the objective column in a 2-d matrix for generating the surface.

### Remarks

*   Be careful when manually opening and saving CSV files with Excel. Dates, times, delimiters and decimal points are then possibly saved in your local format, which can cause the file to become unreadable by Zorro.
*   Excel requires exclusive access, so Zorro cannot read or write to a file while it is open in Excel. This is indicated by an error message.

### See also:

[Bars](005_Bars_and_Candles.md), [file](158_File_access.md), [asset parameters](192_PIP_PIPCost_Leverage.md), [assetHistory](loadhistory.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))