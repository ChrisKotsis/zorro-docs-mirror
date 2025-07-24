---
title: "Verbose"
source: "https://zorro-project.com/manual/en/verbose.htm"
---

# Verbose

## Verbose

Determines the verbosity of trade, error, and diagnostics messages (see [Log](log.md)). The more verbose, the slower the execution of large backtests.

### Range:

<table border="0"><tbody><tr><td><strong>0</strong></td><td>Few messages. Less important <a href="errors.htm">warnings</a> are suppressed. Bars are only printed to the log in [<span class="tast">Trade</span>] mode or when trades are open.</td></tr><tr><td><strong>1</strong></td><td>More messages (default). All bars and all major events, such as entering or closing a trade, are printed to the log and in [<span class="tast">Trade</span>] mode also displayed in the window..</td></tr><tr><td><strong>2</strong></td><td>Even more messages, including the trade parameters at any trade entry and exit. In [<span class="tast">Trade</span>] mode the daily profit, drawdown, and <a href="ddscale.htm">CBI</a> is printed once per day. In [<span class="tast">Test</span>] mode with <a href="ticks.htm">TICKS</a> flag the tick preceding a trade is displayed. The prices of the selected asset are printed at any bar in the form <strong>Open/High\Low/Close</strong>.</td></tr><tr><td><strong>3</strong></td><td>Even more messages, including skipped trades, possible price outliers, and function parameter errors. Prices are displayed with more digits. In [<span class="tast">Trade</span>] mode all open trades are listed once per day.</td></tr><tr><td><strong>7</strong></td><td>Extensive diagnostics messages, including all memory allocations that exceed 2 MB, all <strong>BrokerTrade</strong> calls, and API execution times.</td></tr><tr><td><strong>+DIAG</strong></td><td>(+8) Additional flag to activate a 'black box recorder' for diagnostics. A <strong>...diag.txt</strong> file is created in the <strong>Log</strong> folder. It contains a list with the 1000 last events and can be used to determine the reason of a crash or other problem that leads to the termination of the script. For details see <a href="errors.htm#diag">troubleshooting</a>. Black box recording strongly affects the program speed, so do not use this flag unnecessarily.</td></tr><tr><td><strong>+ALERT</strong></td><td>(+16) Additional flag to display critical messages, such as suspicious asset parameters, possibly orphaned trades, broker API errors, or <a href="printf.htm">print(TO_ALERT,..)</a> calls, in a separate alert box. <strong>DIAG</strong> recording is stopped at the first critical event, so the details leading to the situation can be evaluated from the black box log (<strong>Log\...diag.txt</strong>). Recording continues when the alert box is closed.</td></tr><tr><td><strong>+SILENT</strong></td><td>(+32) Suppress all <a href="printf.htm">printf</a> messages. Messages by <strong>print(TO_WINDOW,...)</strong> are still printed.</td></tr><tr><td><strong>+LOGMSG</strong></td><td>(+512) Additional flag to print the log also to the message window.</td></tr></tbody></table>

  

### Type:

**int**

### Remarks:

*   In the daily trade list at **Verbose** >= 2, the state of any trade is printed in the form **\[Trade ID\] - Profit/Loss - Stop - Current price - Entry**, f.i. **\[AUD/USD:CY:S4400\] +116$ s0.8733** **c0.8729 e0.8731**. The same list is printed on a click on the \[Result\] button.
*   If **Verbose** >= 2 and the system is in a drawdown from a previous equity peak ("Adverse Excursion"), its depth and width, as well as the [Cold Blood Index](ddscale.md) are once per day printed to the log in the form **Last DD: xx% in yy days, CBI zz%**.
*   In "black box" mode a file ending with "**..diag.txt**" is generated in the **Log** folder. It contains a list with the last events and [printf](143_printf_print_msg.md) commands, and can be used to determine the reason of a crash or other problem that leads to the termination of the script. For details see [troubleshooting](errors.htm#diag).
*   Verbosity and black box recording can heavily reduce the training and test speed, so do not use this feature unnecessarily.

### Example:

```c
function run()
{
  Verbose = 7+DIAG; _// extensive messages plus black box recorder_ 
  ...
}
```

### See also:

[LOGFILE](018_TradeMode.md), [LogNumber](numtotalcycles.md), [\-diag](027_Command_Line_Options.md), [log](010_Log_Messages.md), [troubleshooting](errors.htm#diag)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))