---
title: "between"
source: "https://zorro-project.com/manual/en/between.htm"
---

# between

## between(int x, int lower, int upper): bool

## between(var x, var lower, var upper): bool

Returns **true** when the variable **x** lies at or within a **lower** and **upper** border. When **lower** is above **upper**, returns **true** when either **x >= upper** or **x <= lower**, this way allowing the comparison of cyclic ranges such as hours of the day or months of the year.

### Parameters:

**x**, **lower, upper** - any **var** or **int**.  

### Algorithm:

```c
if(lower <= upper) 
  return (x >= lower) and (x <= upper); 
else<
  return (x >= lower) or (x <= upper);
```

### Example:

```c
if(between(x,0.,1.))
  ...  _// executed when x is between 0..1_
if(between(hour(0),22,4))
  ...  _// executed when hour(0) is at or above 22 or at or below 4_
```

### See also:

[sqrt](avar-sqrt.md), [abs](065_abs.md), [sign](066_sign.md), [clamp](070_clamp.md), [min](067_min_max.md), [max](067_min_max.md), [ifelse](162_ifelse_valuewhen.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))