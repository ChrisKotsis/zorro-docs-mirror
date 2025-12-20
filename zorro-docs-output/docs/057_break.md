---
title: "break"
source: "https://zorro-project.com/manual/en/acrt-break.htm"
---

# break

## break

The **break** statement terminates a **while** or **for** loop or a **switch..case** statement, and continues with the first instruction after the closing bracket.

### Example:

```c
while (x < 100)
{ 
  x+=1;
  if (x == 50) break; _// loop will be ended prematurely_
}
```

### See also:

[while](053_while_do.md), [for](012_Performance_Report.md), [switch](055_switch_case.md), [continue](acrt-continue.md) [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))