---
title: "clamp"
source: "https://zorro-project.com/manual/en/clamp.htm"
---

# clamp

## clamp(int x, int lower, int upper): int

## clamp(var x, var lower, var upper): var

Returns a variable limited to a lower and upper border.

### Parameters:

**x**, **lower, upper** - any **var** or **int**.  

### Returns:

<table border="0" cellpadding="2" cellspacing="2"><tbody><tr><td><strong>x &gt; upper</strong></td><td><strong>upper</strong></td></tr><tr><td><strong>lower &lt;= x &lt;= upper</strong></td><td><strong>x</strong></td></tr><tr><td><strong>x &lt; lower</strong></td><td><strong>lower</strong></td></tr></tbody></table>

### Example:

```c
x = clamp(x,0.,1.); _// limit x to 0..1_
```

### See also:

[sqrt](avar-sqrt.md), [abs](065_abs.md), [sign](066_sign.md), [between](068_between.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))