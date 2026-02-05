---
title: "asin, acos, atan, atan2"
source: "https://zorro-project.com/manual/en/avar-asin.htm"
---

# asin, acos, atan, atan2

## asin(var x): var

## acos(var x): var

## atan(var x): var

## atan2(var a, var b): var

Arc functions - the opposite of the **sin, cos, tan** function, return an angle for a given value. **atan2** is used for higher precision when **a** is a sine and **b** a cosine.

### Parameters:

**x** - any **var**.  
**a, b** - any **var**; the tangent value is **a/b**.

### Returns:

Angle in radians.  

### Example:

```c
x = asin(1); _// x is pi/2_
x = asin(0.707); _// x is pi/4_
```

### See also:

[](aTrigonometry.md)[Trigonometry](aTrigonometry.md), [sin](avar-sin.md), [cos](avar-sin.md), [tan](avar-sin.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))