---
title: "sign"
source: "https://zorro-project.com/manual/en/sign.htm"
---

# sign

## sign(int x): int

## sign(var x): var

The sign of **x**: **\-1**, **0**, or **1**.

### Parameters:

**x** - any **var** or **int**.  

### Returns:

<table border="0" cellspacing="2" cellpadding="2"><tbody><tr><td><strong>x &gt; 0</strong></td><td><strong>1</strong></td></tr><tr><td><strong>x == 0</strong></td><td><strong>0</strong></td></tr><tr><td><strong>x &lt; 0</strong></td><td><strong>-1</strong></td></tr></tbody></table>

### Example:

```c
x = sign(2); _// x is now 1_
x = sign(-599); _// x is now -1_ 
x = sign(0); _// x is now 0_
```

### See also:

[sqrt](avar-sqrt.md), [abs](065_abs.md), [cdf](071_cdf_erf_dnorm_qnorm.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))