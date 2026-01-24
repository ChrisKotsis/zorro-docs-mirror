---
title: "call"
source: "https://zorro-project.com/manual/en/call.htm"
---

# call

## call (int Event, void\* Function, int P1, var P2)

Put a user-supplied function on a scheduler in order to to be exeuted at a certain event. Two parameters, **int** and **var**, can optionally be passed to the function.

### Parameters:

<table><tbody><tr><td><strong>Event</strong></td><td>Run the function: <strong>1</strong> when the system is idle, <strong>2</strong> at the next incoming tick, <strong>4</strong> after closing a trade, <strong>+16</strong> repeat at any event.</td></tr><tr><td><strong>Function</strong></td><td>Pointer to a script-defined function, with no, 1, or 2 parameters.</td></tr><tr><td><strong>P1</strong></td><td><strong>int</strong> variable to be passed to the function as first parameter, or <strong>0</strong> when the function has no parameters.</td></tr><tr><td><strong>P2</strong></td><td><strong>var</strong> variable to be passed to the function as second parameter, or <strong>0</strong> when the function has no second parameter.</td></tr></tbody></table>

## event (int Event, void\* Function): void\*

Assign a user-supplied function to a particular event. Functions with the same name as the event are automatically assigned at script start.

### Parameters:

<table><tbody><tr><td><strong>Event</strong></td><td><strong>1</strong> <a href="objective.htm">objective</a>, <strong>2</strong> <a href="evaluate.htm">evaluate</a>, <strong>3</strong> <a href="tick.htm">tick</a>, <strong>4</strong> <a href="tick.htm">tock</a>, <strong>5</strong> <a href="trade.htm">manage</a>, <strong>6</strong> <a href="panel.htm">click</a>, <strong>7</strong> <a href="advisor.htm">neural</a>, <strong>8</strong> <a href="bar.htm">bar</a>, <strong>9</strong> <a href="tick.htm">callback</a>, <strong>10</strong> <a href="objective.htm">parameters</a>, <strong>11</strong> <a href="errors.htm">error</a>, <strong>12</strong><br><a href="evaluate.htm">cleanup</a>.</td></tr><tr><td><strong>Function</strong></td><td>Pointer to a script-defined function, or <strong>0</strong> for disabling a previous event function.</td></tr></tbody></table>

### Returns:

Previously assigned event function.

### Remarks:

*   **call(1, ...)** can be used to prevent that the called function interrupts other functions or I/O operations. This is useful f.i. for changing the asset, entering a trade, or writing to a file in a [click](142_panel.md) or [callback](089_tick_tock.md) function.
*   After the first run, **Function** normally removes itself from the scheduler. If **16** was added to **Event**, the function stays on the scheduler and keeps being called at the given event.
*   Up to 16 functions can be placed on the scheduler at the same time. They run in the order of their placement.

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