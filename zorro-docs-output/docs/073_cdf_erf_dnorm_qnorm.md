---
title: "cdf, erf, dnorm, qnorm"
source: "https://zorro-project.com/manual/en/cdf.htm"
---

# cdf, erf, dnorm, qnorm

## cdf(var x): var

Cumulative distribution function; the probability that a Gaussian (normal) distributed variable takes a value less than or equal to **x**. Often used to compress the variable to the **0..1** range. Sometimes also referred to as **pnorm(x)**.

## erf(var x): var

Error function; the probability that a Gaussian (normal) distributed variable falls in the interval **\[-x, x\]**.

## qnorm(var x): var

The inverse **cdf** function; returns the value whose cumulative distribution matches the probability **x**.

## dnorm(var x, var mu, var sigma): var

Gaussian probability; returns the probability of the value **x** in a normal distribution with mean **mu** and variance **sigma**

### Parameters:

**x** - any **var**.

### Example:

```c
x = cdf(1); _// x is now 0.84_ 
x = cdf(-1); _// x is now 0.16_
```

### See also:

[sign](066_sign.md), [abs](065_abs.md), [randomize](130_randomize.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))