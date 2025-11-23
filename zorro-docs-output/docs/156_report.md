---
title: "report"
source: "https://zorro-project.com/manual/en/report.htm"
---

# report

## report (int Number) : string

Returns a string with content dependent on the given **Number**. 

### Number:

<table><tbody><tr><td><strong>1</strong></td><td>Temporary string containing the current <a href="performance.htm">performance report</a>.</td></tr><tr><td><strong>2</strong></td><td>Content of the <a href="ini.htm">Zorro.ini</a> file.&nbsp;Use <a href="str_.htm">strvar</a> or <a href="str_.htm">strtext</a> for parsing.</td></tr><tr><td><strong>3</strong></td><td>Temporary string containing the <a href="command.htm">command line</a>.</td></tr><tr><td><strong>4</strong></td><td>Content of the <strong>.par</strong> parameters file, if any. Empty in the initial run.</td></tr><tr><td><strong>5</strong></td><td>Content of the <strong>.c</strong> rules file, if any.&nbsp;Empty in the initial run.</td></tr><tr><td><strong>6</strong></td><td>Content of the <strong>.fac</strong> factors file, if any. Empty in the initial run.</td></tr><tr><td><strong>10</strong></td><td>Temporary list of open trades similar to the <a href="trading.htm">status page</a>. Empty when no trade was opened.</td></tr><tr><td><strong>12</strong></td><td>User name from the [<span class="tast">Login</span>] field.</td></tr><tr><td><strong>20</strong></td><td>Broker name selected with the scrollbox, f.i <strong>"MT4"</strong> or <strong>"FXCM"</strong>.</td></tr><tr><td><strong>21</strong></td><td>Account name from the <strong>Name</strong> field in the <a href="account.htm">account list</a>.</td></tr><tr><td><strong>23</strong></td><td>Account identifier from the <strong>Account</strong> field in the <a href="account.htm">account list</a>.</td></tr><tr><td><strong>24</strong></td><td>Account currency from the <strong>CCY</strong> field in the <a href="account.htm">account list</a>.</td></tr><tr><td><strong>25</strong></td><td>Current script name without folder and externsion.</td></tr><tr><td><strong>26</strong></td><td>Current script folder.</td></tr><tr><td><strong>32</strong></td><td><a href="loadhistory.htm">QuandlKey</a> from <strong>zorro.ini</strong>.</td></tr><tr><td><strong>33</strong></td><td><a href="loadhistory.htm">AVApiKey</a> from <strong>zorro.ini</strong>.</td></tr><tr><td><strong>34</strong></td><td><a href="loadhistory.htm">IEXKey</a> from <strong>zorro.ini</strong>.</td></tr><tr><td><strong>35</strong></td><td><a href="loadhistory.htm">EODKey</a> from <strong>zorro.ini</strong>.</td></tr></tbody></table>

### Remarks

*   Frequently used [system strings](020_Included_Scripts.md) can be directly accessed through their name.
*   Temporary strings are only valid until the next **report()** call.

### Example:

```c
_// send a performance report every day by email_
if(Live && dow(0) != dow(1)))
  email(TO,FROM,"Zorro Report",report(1),SERVER,USER,PASSWORD);
```

### See also:

[printf](143_printf_print_msg.md), [system strings](020_Included_Scripts.md), [performance report](012_Performance_Report.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))