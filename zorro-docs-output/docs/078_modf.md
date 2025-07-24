---
title: "modf"
source: "https://zorro-project.com/manual/en/modf.htm"
---

# modf

## modf(var x, var\* p): var

Splits **x** in a fractional and integer part, each of which has the same sign as **x**.

### Parameters:

**x** - any number.  
**p** - **var** pointer, or **0** if the integer part is not needed.  

### Returns:

Fractional part of **x**. Integer part is stored in \*p.

### Speed:

Fast

### Example:

```c
var y;
var x = modf(123.456,&y); _// x = 0.456 and y = 123.0_
```

### See also:

[](065_abs.md)[floor](076_floor_ceil.md), [ceil](076_floor_ceil.md), [fmod](077_fmod.md), [%](avar-Ref.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))