---
title: "randomize"
source: "https://zorro-project.com/manual/en/randomize.htm"
---

# randomize

## randomize(int Method, var \*Out, var \*In, int Length): var

Randomizes a data array by different methods.

### Returns:

Last value of the resulting data array; usually the accumulated return.  

### Parameters:

<table width="98%" border="0" cellspacing="1" cellpadding="0"><tbody><tr><td width="7%"><strong>Method</strong></td><td width="9%"><strong>BOOTSTRAP</strong></td><td width="84%">Randomize the data differences by bootstrap with replacement.</td></tr><tr><td>&nbsp;</td><td><strong>SHUFFLE</strong></td><td>Randomize the data differences by montecarlo permutation.</td></tr><tr><td>&nbsp;</td><td><strong>DETREND</strong></td><td>Detrend the data before randomizing, by subtracting the mean data difference.</td></tr><tr><td><strong>Out</strong></td><td colspan="2">Array to be filled with the randomized data, or <strong>In</strong> for modifying the original array.</td></tr><tr><td><strong>In</strong></td><td colspan="2">Array containing the original data.</td></tr><tr><td><strong>Length</strong></td><td colspan="2">Number of elements of the <strong>In</strong> and <strong>Out</strong> arrays.</td></tr></tbody></table>

  

### Remarks:

*   This function can be used for generating randomized return distributions f.i. for White's Reality Check. The random number generator uses the [Lehmer algorithm](https://en.wikipedia.org/wiki/Lehmer_random_number_generator) with a period of 2,147,483,646.
*   Randomized data curves can contain negative data. If this is not desired, test the minimum and randomize again until it is above zero.

### Example:

```c
var OriginalReturn = EquityCurve\[Length-1\];
var RandomizedReturn = randomize(BOOTSTRAP,0,EquityCurve,Length);
```

### See also:

[Detrend](197_Detrend_shuffling.md), [random](084_random_seed.md) [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))