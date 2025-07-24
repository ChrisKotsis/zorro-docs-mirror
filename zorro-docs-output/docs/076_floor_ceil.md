---
title: "floor, ceil"
source: "https://zorro-project.com/manual/en/floor.htm"
---

# floor, ceil

## floor(var x): var

Rounds **x** down to the largest integer that is not greater than x; .

## ceil(var x): var

Rounds **x** up to the smallest integer that is not smaller than x.

### Parameters:

**x** - **var** to be rounded up or down.  

### Returns:

**x** rounded up or down.

### Remarks:

*   The **floor** and **ceil** functions are not equivalent to typecasting **x** to an integer. For instance, **(int)-2.5** is **\-2**, but **floor(-2.5)** is **\-3.0**.
*   The fractional part of a number is returned by [modf](078_modf.md).

### Example:

```c
int a = floor(b);
```

### See also:

[round](082_round_roundto.md), [modf](078_modf.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))