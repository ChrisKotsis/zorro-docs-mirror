---
title: "round, roundto"
source: "https://zorro-project.com/manual/en/round.htm"
---

# round, roundto

## roundto(var x, var step): var

Rounds a variable to the closest multiple of a given step width. F.i. **roundto(Price,PIP)** rounds **Price** to 1 pip, and **roundto(x,1)** rounds **x** to the nearest integer.

## round(var x): var

Rounds a variable to the nearest integer.

### Parameters:

**x** - **var** to be rounded.  
**step** - rounding accuracy.  

### Returns:

Rounded value of **x**.  

### Remarks:

For rounding **x** up to the next higher step, use **roundto(x+0.5\*step, step)**. For rounding **x** down to the next lower step, use **round(x-0.5\*step, step)**.

### Example:

```c
Price = roundto(Price,PIP); _// round price to the next full pip_
```

### See also:

[floor](076_floor_ceil.md), [ceil](076_floor_ceil.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))