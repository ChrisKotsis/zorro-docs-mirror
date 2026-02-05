---
title: "watch"
source: "https://zorro-project.com/manual/en/watch.htm"
---

# watch

## watch (string text, ...)

Prints the given text and up to 8 following **bool**, **int**, **var**, **float**, or **string** variables to the message window or the log, or add text to exception or crash messages (lite-C only). Can enter [single step](011_Chart_Viewer_Debugger.md) debugging mode. Allows to quickly debug into functions and watch variable behavior.

### Parameters:

<table border="0" cellpadding="2" cellspacing="2"><tbody><tr valign="top"><td><strong>text</strong></td><td><p>Text string to be displayed, followed by the variables. If the string begins with an exclamation mark <strong>"!..."</strong>, script execution stops at that line and Zorro changes to <a href="chart.htm">debugging</a> mode. This way the behavior of variables inside a loop or function can be debugged step by step. If the string begins with a <strong>"#"</strong> character, the text is not displayed in the message window, but printed in all modes to the log or - in diagnostics mode - to the <strong>diag.txt</strong> file (see <a href="verbose.htm">Verbose</a>). If the string begins with a <strong>"?"</strong>, the text is displayed together with the next exception or crash message. If the string contains a decimal point <strong>'.'</strong>, <strong>float</strong>, <strong>double</strong>, or <strong>var</strong> variables are printed in higher precision.</p></td></tr><tr valign="top"><td><strong>...</strong></td><td>Up to 8<strong> </strong>variables, function calls, or expressions to be watched. Supported are <strong>bool</strong>, <strong>int</strong>, <strong>var</strong>, <strong>double</strong>, <strong>float</strong>, or <strong>string</strong>. Floating point types are displayed with 5 decimals.</td></tr></tbody></table>

### Remarks:

*   **watch("!...", ...)** can be used as a breakpoint in the code for debugging variables in loops or between commands.
*   **watch("#...", ...)** can be used to examine variables while training.
*   **watch("?...")** can be used to determine the position of a script crash.
*   Take care to either remove or out-comment all **watch** statements, or disable them with [NOWATCH](018_TradeMode.md) before releasing or live trading the strategy.

### Examples:

```c
int i;
for(i=0; i<10; i++)
  watch("!i",i,"twice",2\*i,"square",i\*i);
```

### See also:

[Verbose](199_Verbose.md), [debugging](011_Chart_Viewer_Debugger.md), [printf](143_printf_print_msg.md), [troubleshooting](210_Troubleshooting.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))