---
title: "random, seed"
source: "https://zorro-project.com/manual/en/random.htm"
---

# random, seed

## random() : var

Returns a random number uniformly distributed in the range from **\-1.0** to **+1.0** (borders not included). Uses the [Lehmer algorithm](https://en.wikipedia.org/wiki/Lehmer_random_number_generator) with a period of 2,147,483,646.

## random(var Max) : var

Returns a random number uniformly distributed from **0** up to, but not including **Max**.

## seed(int s)

Initiates a fixed random number sequence, dependent on the "seed" **s**. Affects **random**, [randomize](130_randomize.md), and [Detrend](197_Detrend_shuffling.md).

### Example:

```c
if(is(INITRUN)) 
  seed(365);
...
if(random() > 0) ... _// true in 50% of all cases_
```

### See also:

[abs](065_abs.md), [sign](066_sign.md), [randomize](130_randomize.md), [Detrend](197_Detrend_shuffling.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))