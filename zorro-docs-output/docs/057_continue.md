---
title: "continue"
source: "https://zorro-project.com/manual/en/acrt-continue.htm"
---

# continue

## continue

Jumps to the begin of a **[while](053_while_do.md)** loop or the continuation part of a [for](012_Performance_Report.md) loop.

### Example:

```c
int x = 0;
int y = 0;
while (x < 100)
{ 
 	x+=1;
 	if(x % 2) _// only odd numbers_
 	  continue; _// loop continuing from the start_
 	y += x; _// all odd numbers up to 100 will be sum_
}
```

See also:

[](053_while_do.md)[while](053_while_do.md), [for](012_Performance_Report.md), [break](acrt-break.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))