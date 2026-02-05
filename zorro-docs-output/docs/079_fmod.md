---
title: "fmod"
source: "https://zorro-project.com/manual/en/fmod.htm"
---

# fmod

## fmod(var x, var y): var

Returns the fractional remainder of **x** divided by **y**, similar to the integer **%** operator.

### Parameters:

**x** - dividend**  
y** - divisor.  

### Returns:

Remainder of **x/y**.

### Speed:

Fast

### Example:

```c
var x = fmod(1.255,0.250); _// x = 0.005_
```

### See also:

[](065_abs.md)[floor](076_floor_ceil.md), [ceil](076_floor_ceil.md), [modf](078_modf.md), [%](avar-Ref.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))