---
title: "wait"
source: "https://zorro-project.com/manual/en/sleep.htm"
---

# wait

## wait (int n): int

Suspends execution for the time given by **n** in milliseconds. The user interface remains responsive during the wait time. The function returns **0** when the \[Stop\] button was hit or [quit](172_quit.md) was called, otherwise nonzero. If **n** is negative, the function checks and updates the user interface only every **n**th time, for not delaying fast loops. Use **wait** in a loop for avoiding unresponsiveness during long computations or external function calls. For displaying progress during very long processes, use [progress](144_progress.md) instead.

### Parameters:

**n** - wait time in milliseconds when positive, user interface update frequency when negative, **0** for immediate user interface update.

### Returns

**0** when the script is to be terminated, **1** otherwise.

### Remarks:

*   Trades and prices are not updated during **wait** time, so do not use this function to wait for a trade to enter or a price limit to be reached. For triggering a function at a certain event, use [call](164_call.md).
*   Since **wait()** triggers the Windows message system, even **wait(0)** can take several hundred microseconds on slow systems. Use **wait(-1000)** in time critical loops.

### Examples:

```c
Rx("TrainNeuralNet()",1); _// start a long computation_
while(Rrun() == 2)
  if(!wait(100)) return; _ // wait until computation is finished or \[Stop\] was hit_
```
```c
while(some\_long\_loop) {
  ...
  if(!wait(-1000)) break; _// prevent unresponsiveness in long loops_
}
```

### See also:

[timer](169_timer.md), [run](088_run.md), [R bridge](rbridge.md), [lock](167_lock_unlock.md), [BUSY](013_Asset_Account_Lists.md), [quit](172_quit.md), [version](021_Conversion_from_other_platforms.md), [progress](144_progress.md), [suspended](suspended.md), [call](164_call.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))