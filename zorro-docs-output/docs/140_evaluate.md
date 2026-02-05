---
title: "evaluate"
source: "https://zorro-project.com/manual/en/evaluate.htm"
---

# evaluate

## evaluate ()

User-supplied function that is called at the end of a \[Test\] run, or when \[Result\] is clicked, or in \[Trade\] mode when the status page is updated. Can be used for analyzing the performance or storing it for further evaluation in a user specified way.

### Parameters:

**perf** - optional pointer to a **PERFORMANCE** struct containing the result of the test; defined in **include\\trading.h**.

## cleanup ()

User-supplied function that is called at the end of a simulation or session. Can be used to copy files, [free memory](sys_malloc.md), or release other allocated resources**.  
**

### Remarks:

*   All [trade statistics](winloss.md) and [strategy statistics](116_Statistics_Transformations.md) are available in the **evaluate** function. The **...Long/...Short** statistics parameters are for the last selected asset and algo.
*   The [print](143_printf_print_msg.md) **(TO\_REPORT, ...)** function can be used for printing user-specific data to the performance report.
*   In \[Train\] mode the [objective](107_optimize.md) function is called at the end of every simulation. The **evaluate** function is called only in the test run after training when the [TESTNOW](018_TradeMode.md) flag is set.

### Examples:

```c
function evaluate()
{
  printf("\\nR2 = %.2f Mean = %.3f",ReturnR2,ReturnMean);
}
```
```c
_// plot a parameter histogram in \[Test\] mode - profit vs. BarZone_
function run()
{
  ...
  NumTotalCycles = 12;
  BarZone = 2\*TotalCycle;
  ...
}

void evaluate()
{
  PlotScale = 10;
  plotBar("Objective",TotalCycle,BarZone,Balance,BARS,RED);	  
}
```

### See also:

[Performance](012_Performance_Report.md), [trade statistics](winloss.md), [user supplied functions](funclist.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))