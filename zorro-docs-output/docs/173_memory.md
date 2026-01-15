---
title: "memory"
source: "https://zorro-project.com/manual/en/memory.htm"
---

# memory

## memory(int mode): size\_t

Returns the current memory consumption of the script.

### Parameters:

**mode -  
   0:** Current total memory allocation in bytes, including virtual memory and cache pages that have been written to.  
   **1:** Sum of all memory allocations in bytes by functions, price data, and series during the script run.  
   **2:** Current number of allocated memory areas by functions, price data, and series.  
   **4:** Memory allocation in bytes per asset for historical price data.  
  

### Returns:

See **mode**.

### Remarks:

*   Divide by 1024 for getting kBytes and by (1024\*1024) for getting MBytes.
*   This function was reported not to return the correct memory allocation under Linux/Wine with **mode == 0**.
*   Assets, bars, series, trades, and charts consume memory. The memory requirement per asset in bytes can be estimated with the formula **Years / BarPeriod \* 15 MB**, where **Years** is the number of backtest years including the [LookBack](181_LookBack_UnstablePeriod.md) period (use **1** for live trading). For options, add about **100 MB** per year and asset.
*   The [LEAN](018_TradeMode.md) and [LEANER](018_TradeMode.md) flags reduce the memory requirement by about 50%, the **TICKS** flag increases it by 32 bytes per historical price tick. [Series](091_series.md) allocate 8 bytes per element and asset, [plot](146_plot_plotBar.md) commands allocate 8..24 bytes per bar and asset.
*   For backtests with large memory requirement, use the 64 bit version **Zorro64**. and write the scripts in [C++](dlls.md) 

### Example:

```c
function run()
{ 
  BarPeriod = 1;
  LookBack = 1;
  ...
  printf("\\rMemory %i areas %i kb",memory(2),memory(0)/1024);
  plot("Memory",memory(0),NEW,RED);
}
```

### See Also:

[timer](169_timer.md), [malloc](sys_malloc.md), [zalloc](sys_malloc.md)

[► latest version online](javascript:window.location.href = 'https://manual.conitec.net' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))