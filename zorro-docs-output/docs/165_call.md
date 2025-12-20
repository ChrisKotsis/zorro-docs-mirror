---
title: "call"
source: "https://zorro-project.com/manual/en/call.htm"
---

# call

## call (int Mode, void\* Function, int P1, var P2)

Put a function on a scheduler in order to to be exeuted at a certain event. Two parameters, **int** and **var**, can optionally be passed to the function.

### Parameters:

<table><tbody><tr><td><strong>Mode</strong></td><td>Run the function: <strong>1</strong> when the system is idle, <strong>2</strong> at the next incoming tick, <strong>4</strong> after closing a trade, <strong>+16</strong> for repeating.</td></tr><tr><td><strong>Function</strong></td><td>Pointer to a script-defined function.</td></tr><tr><td><strong>P1</strong></td><td><strong>int</strong> variable to be passed to the function as first parameter, or <strong>0</strong> when the function has no parameters.</td></tr><tr><td><strong>P2</strong></td><td><strong>var</strong> variable to be passed to the function as second parameter, or <strong>0</strong> when the function has no second parameter.</td></tr></tbody></table>

 

### Remarks:

*   **Function** can be a function either with no parameters **f()**, with one **f(int)**, or with two parameters **f(int,var)**. Automatic **int/var** conversion will not take place here, so make sure that the first parameter (if any) of the function is really a **int** or global pointer, and the second parameter (if any) is really a **var**. 
*   **call(1, ...)** can be used to prevent that the called function interrupts other functions or I/O operations. This is useful f.i. for changing the asset, entering a trade, or writing to a file in a [click](142_panel.md) or [callback](089_tick_tock.md) function.
*   After being run, **Function** normally removes itself from the scheduler. If **16** was added to **Mode**, the function stays on the scheduler and keeps being called at the given event.
*   Up to 16 functions can be placed on the scheduler at the same time. They are then run in the order of their placement.

### Example:

```c
void calltest(int a,var b)
{
  printf("\\nCalled with (%i,%.2f) at bar %i",a,b,Bar);
}

void run()
{
  ...
  call(1,calltest,2,3.45);
  ...
}
```

### See also:

 [run](088_run.md), [lock](167_lock_unlock.md), [quit](172_quit.md), [version](021_Conversion_from_other_platforms.md), [wait](sleep.md), [click](142_panel.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))