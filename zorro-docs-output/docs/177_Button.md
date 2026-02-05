---
title: "Button"
source: "https://zorro-project.com/manual/en/button.htm"
---

# Button

## Button

The mode - by pressing a button on the main or the chart panel, or by starting Zorro with a command line - in which the current code is running.  
 

<table><tbody><tr><td><strong>2</strong></td><td>Test</td></tr><tr><td><strong>3</strong></td><td>Train</td></tr><tr><td><strong>4</strong></td><td>Trade</td></tr><tr><td><strong>5</strong></td><td>Result</td></tr><tr><td><strong>8</strong></td><td>Single Step (see <a href="chart.htm">debugging</a>)</td></tr><tr><td><strong>10</strong></td><td>Replay (see <a href="chart.htm">debugging</a>)</td></tr></tbody></table>

   

### Type:

**int**

### Remarks:

*   By setting [TESTNOW](018_TradeMode.md), the script can perform a **[Test](013_Asset_Account_Lists.md)** run even when running in \[Train\] mode (**Button == 3**).

### Example:

```c
if(Button == 8) _// single step_
  updateMyPanel() _// display variables in a panel_
```

### See also:

[Command line](027_Command_Line_Options.md), [visual debugger](011_Chart_Viewer_Debugger.md), [Test](013_Asset_Account_Lists.md), [Train](013_Asset_Account_Lists.md)  
[Latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))