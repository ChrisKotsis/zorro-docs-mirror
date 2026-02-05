---
title: "printf, print, msg"
source: "https://zorro-project.com/manual/en/printf.htm"
---

# printf, print, msg

## printf (string format, ...)

Prints text and variables in a log file and the message window in \[Test\] and \[Trade\] modes. This is a standard C function. It allows to display messages and variables.  

## print (int to, string format, ...)

Similar to **printf**, but prints text and variables to a target channel given by the **to** parameter, such as the log file, a .csv spreadsheet file, the HTML status page, or the performance report.

## msg (string format, ...): int

Displays text and variables in a modal or nonmodal message box with \[Yes\] and \[No\] buttons, and waits for the user to click one of the buttons. Format strings beginning with '#' open a nonmodal box.

### Returns

**0** when \[No\] was clicked, **1** when \[Yes\] was clicked.

### Parameters:

<table border="0" cellpadding="2" cellspacing="2"><tbody><tr valign="top"><td><strong>to</strong></td><td><p><strong>TO_WINDOW</strong> - print to the message window and the log file (default for <strong>printf</strong>).<br><strong>TO_LOG</strong> - print in [<span class="tast">Test</span>] mode only to the log file, in [<span class="tast">Trade</span>] and in <a href="mode.htm">STEPWISE</a> mode also to the message window.<br><strong>TO_FILE</strong> - print in [<span class="tast">Test</span>] and [<span class="tast">Trade</span>] mode to the log file.<br><strong>TO_ANY</strong> - print in all modes to the message window and log file (= <strong>TO_WINDOW+TRAINMODE</strong>).<br><strong>TO_DIAG</strong> - print to the <strong>diag.txt</strong> file (see <a href="verbose.htm">Verbose</a>). Note that log files and <strong>diag.txt</strong> file are not yet open in the <a href="is.htm">INITRUN</a>.<br><strong>TO_ALERT</strong> - print to an alert box and stop black box recording when the <strong>ALERT</strong> flag is set for <a href="verbose.htm">Verbose</a>.<br><strong>TO_OUT</strong> - print to a file with the script name plus <strong>"out.txt"</strong> in the <strong>Log</strong> folder.<br><strong></strong><strong>TO_CSV</strong> - print to a file with the script name and extension <strong>".csv"</strong> in the <strong>Data</strong> folder, for exporting data.<br><strong>TO_CSVHDR</strong> - print to the first line of the CSV file; for writing a header before writing the data..<br><strong>TO_REPORT</strong> - print in the <a href="is.htm">EXITRUN</a> to the <a href="performance.htm">performance report</a>, for displaying additional performance parameters.<br><strong>TO_HTML</strong> - print in [<span class="tast">Trade</span>] or in <a href="mode.htm">STEPWISE</a> mode to the HTML file that displays the live trading status. HMTL format codes can be included in the text.<br><strong>TO_TITLE</strong> - print to the title bar.<br><strong>TO_INFO</strong> - print to the info field. <strong>print(TO_INFO, 0)</strong> displays the current account or simulation state in the info field.<br><strong>TO_PANEL</strong> - print to the caption bar of the current <a href="panel.htm">control panel</a>.<br><strong>TO_CHART</strong> - print to the caption bar and - if <a href="plotmode.htm">PL_TITLE</a> is set - to the title of the current <a href="chart.htm">chart</a>.<br><strong>+TRAINMODE</strong> - print also in [<span class="tast">Train</span>] mode.</p></td></tr><tr valign="top"><td><strong>format</strong></td><td><p>C-style format string, containing arbitrary text with placeholders for subsequent variables (see <a href="format.htm">format codes</a>). The placeholders begin with a percent sign <strong>'%'</strong> and define the format of the displayed number. Examples: <strong>"$%.2f"</strong> prints a <strong>var</strong> with a dollar symbol and 2 decimals; <strong>"%i"</strong> prints an <strong>int</strong>; <strong>"%+4.1f"</strong> prints a <strong>var</strong> with +/- sign, 4 digits, and one decimal. For printing <strong>float</strong> variables, use the <strong>%f</strong> placeholder and typecast them to <strong>(var)</strong>.<br><b></b><b></b></p></td></tr><tr valign="top"><td><strong>...</strong></td><td>Expressions or variables, one for each placeholder in the <strong>format</strong> text.</td></tr></tbody></table>

### Remarks:

*    !!  Since the above functions accept any number and type of parameters, variable types are not checked and not automatically converted. A wrong variable type in a **printf** call will produce wrong output - not only of the variable, but also of all subsequent variables - and can even cause a program crash. So make sure that variables match the **format** string precisely. If you print a predefined variable, use the correct placeholder for **var**, **float**, **int**, or **string**. For printing **float** variables, typecast them to **(var)** or **(double)**, like this: **printf("Profit: $%.2f",(var)TradeProfit)**. The **printf** function will not automatically promote a **float** to a **double**.
*   For printing a percent sign in the text, use **"%%"**; for a backslash, use **"\\\\"**. A short list of C-style format strings can be found under [format codes](116_Statistics_Transformations.md), a more detailed description in any C/C++ book.
*   For printing on a new line in the log or message window, begin the text with the linefeed symbol **"\\n"**. Otherwise **printf** appends the text to the end of the current line. For printing on a new line in a HTML file, begin the text with the tag **"<br>"**.
*   For deleting the current line in the message window and replacing it with new content, begin the text with the carriage-return symbol **"\\r"**. This way running counters or similar effects can be realized.
*   The maximum text size depends on the print channel. For the message window it's about 2000 characters, for a file 20000 characters. Longer texts are clipped.
*   For printing into a string, use the [sprintf](str_.hmt) or [strf](str_.hmt) functions. For printing into a file, use the [file\_append](158_File_access.md) function.
*   For printing with **printf** only to the log file and not to the window, add a **"#"** at the begin of the text (**printf("#\\n...",...);**). In \[Trade\] mode log messages are also printed to the window.
*   For temporarily suppressing all **printf** messages, set **[Verbose](199_Verbose.md) |= SILENT**.
*   For opening a nonmodal message box with the **msg** function, add a **"#"** at the begin of the text (**msg("#...",...);**). A nonmodal message box has an \[Ok\] and a \[Cancel\] button and does not wait for the user to click a button; the script just continues. When the user later clicks \[Ok\], the [AFFIRMED](013_Asset_Account_Lists.md) flag is set (see example). An empty message (**msg("#");**) lets the nonmodal box disappear.
*   For refreshing the GUI so that printed messages are updated in the window, use the [wait](sleep.md) function.
*   For debugging purposes, the [watch](166_watch.md) function is often more convenient than the **printf** function. It allows breakpoints, needs no format string, and prevents errors by printing wrong variable types.
*   For displaying or editing a text file, use **exec("Editor",...)**.

### Examples:

```c
_// printf example_
var vPrice = 123.456;
float fDiscount = 1.5;
int nNumber = 77;
...
printf("\\nPrice %.3f for %d items, total %.3f, discount %.1f%%",
  vPrice, nNumber, nNumber\*vPrice, (var)fDiscount);
```
```c
_// HTML status message example_
if(ATR(30) < Threshold)
  print(TO\_HTML,"<br>Low volatility - ATR30 = %.3f",ATR(30));
```
```c
_// nonmodal box example_
function run()
{
  if(is(INITRUN))
    msg("#Nonmodal message box.\\nClick \[Ok\] to exit script!");
  if(is(AFFIRMED))
    quit("Ok!");
  Sleep(10);
}
```
```c
_// CSV file output example_
function run()
{
  LookBack = 100;
  asset(Asset);
  print(TO\_CSVHDR,"Date,Price,SMA,EMA\\n");
  print(TO\_CSV,"%s,%.4f,%.4f,%.4f\\n",
    strdate(**YMDHMS,0**),
    priceC(),
    SMA(seriesC(),50),
    EMA(seriesC(),50));
}
```

### See also:

[sound](145_sound.md), [string](aarray.htm#string), [Editor](151_exec.md), [keys](152_keys.md), [sprintf](str_.md), [strf](str_.md), [progress](144_progress.md), [watch](166_watch.md), [format codes](116_Statistics_Transformations.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))