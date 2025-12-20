---
title: "invalid"
source: "https://zorro-project.com/manual/en/invalid.htm"
---

# invalid

## invalid(var V): int

Checks whether **V** is the result of an invalid expression.

### Parameters:

**V** - **var** to be examined.  

### Returns:

**0**  - V is a valid number.  
**1**  - V is invalid, for instance the square root of a negative number.  
**\-1** - V is infinite, or instance the result of a division by zero.  
  

## fix0(var V): var

Convenience function that allows dividing by **V** even when it is zero or invalid.

### Parameters:

**V** - **var** to be fixed.  

### Returns:

**0.0001**  when **V** is **0** or an invalid number, otherwise **V**.  
   

### Remarks:

Invalid numbers in an expression cause the result to become also invalid. 

### Example:

```c
if(invalid(Margin)) printf("\\nCheck the Margin calculation!");
```

### See also:

[floor](076_floor_ceil.md), [ceil](076_floor_ceil.md), [abs](065_abs.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))