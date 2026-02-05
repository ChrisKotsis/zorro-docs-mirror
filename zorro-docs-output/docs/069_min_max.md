---
title: "min, max"
source: "https://zorro-project.com/manual/en/min.htm"
---

# min, max

## min(int x, int y): int

## min(var x, var y): var

## max(int x, int y): int

## max(var x, var y): var

Returns the minimum or maximum of **x** and **y**.

### Parameters:

**x**,**y** - any **var** or **int**.  

### Returns:

The minimum or maximum of **x** and **y**.

### Remarks:

The returned variable type depends on the type of the arguments; for constants use a decimal point to mark them as **var** (f.i. **1** is **int**, but **1.** is **var**).

### Example:

```c
var x = max(0.,y);
```

### See also:

[abs](065_abs.md), [between](068_between.md), [ifelse](162_ifelse_valuewhen.md), [MinVal](116_Statistics_Transformations.md), [MaxVal](116_Statistics_Transformations.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))