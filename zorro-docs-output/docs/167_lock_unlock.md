---
title: "lock, unlock"
source: "https://zorro-project.com/manual/en/lock.htm"
---

# lock, unlock

## lock(): int

Synchronizes the behavior of several Zorro instances, f.i. for preventing that they write into the same file at the same time ([Zorro S](restrictions.md) only). If another Zorro has called **lock()** before, this function waits until it either calls **unlock()** or the \[Stop\] key was pressed. In the latter case **lock()** returns 0, otherwise nonzero.

## unlock()

Cancels a previous **lock** call and let other waiting Zorros continue.

### Example (getvar](putvar.md)):

```c
lock(); _// prevent that other Zorros write into same file_
file\_append(Name,Text1);
file\_append(Name,Text2);
unlock();
```

### See also:

[timer](169_timer.md), [run](088_run.md), [wait](sleep.md), [suspended](suspended.md), [quit](172_quit.md), [version](021_Conversion_from_other_platforms.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))