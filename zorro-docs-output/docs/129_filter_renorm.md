---
title: "filter, renorm"
source: "https://zorro-project.com/manual/en/cfilter.htm"
---

# filter, renorm

## filter (var\* Data, int Length, var Kernel\[6\]) : var\*

Applies a 5-element convolution filter with the given **Kernel** to the **Data** array. Each **Data** element is added to its local neighbors, weighted by the **Kernel**, using this formula: **_Data\[i\] = Kernel\[0\]\*Data\[i-2\] + Kernel\[1\]\*Data\[i-1\] + Kernel\[2\]\*Data\[i\] + Kernel\[3\]\*Data\[i+1\] + Kernel\[4\]\*Data\[i+2\] + Kernel\[5\]_**.  This function can be used for data smoothing, summing up, subtraction, sharpening, edge enhancement, or similar data array manipulation operations.

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td>Array or <a href="series.htm">series</a> to be filtered.</td></tr><tr><td><strong>Length</strong></td><td>Number of elements to be filtered.</td></tr><tr><td><strong>Kernel</strong></td><td>Vector of 5 weights plus constant to be added.</td></tr></tbody></table>

### Returns

Modified **Data** 

## renorm (var\* Data, int Length, var Sum) : var\*

Modifies the **Data** array by multiplying all elements with a factor so that they sum up to **Sum**. This function can be used to normalize a list of weights to a certain total.

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td>Array or <a href="series.htm">series</a> to be normalized.</td></tr><tr><td><strong>Length</strong></td><td>Number of elements to be normalized.</td></tr><tr><td><strong>Sum</strong></td><td>Resulting sum of elements.</td></tr></tbody></table>

### Returns

Modified **Data** 

### Remarks:

*   Use the [renorm](129_filter_renorm.md) function on the kernel when the weight sum must be 1.
*   For boundary handling, **Data\[0\]** and **Data\[Length-1\]** are extended.
*   Some examples of filter kernels:

<table><tbody><tr><td>Identity</td><td><strong>{ 0, 0, 1, 0, 0, 0 }&nbsp;</strong></td></tr><tr><td>Sharpen</td><td><strong>{ -1, -1, 4, -1, -1, 0 }&nbsp;&nbsp;</strong></td></tr><tr><td>Smooth</td><td><strong>{ 0.2, 0.2, 0.2, 0.2, 0.2, 0 }</strong></td></tr><tr><td>Gaussian</td><td><strong>{ 0.1, 0.2, 0.4, 0.2, 0.1, 0 }</strong></td></tr><tr><td style="height: 20px">Shift to the right</td><td style="height: 20px"><strong>{ 0, 1, 0, 0, 0, 0 }</strong></td></tr><tr><td>Mean subtraction</td><td><strong>{ 0, 0, 1, 0, 0, -mean }&nbsp;</strong></td></tr><tr><td>Fill with constant</td><td><strong>{ 0, 0, 0, 0, 0, constant }&nbsp;</strong></td></tr></tbody></table>

  

### Example:

```c
var\* Filter = { 1,2,3,2,1,0 };
filter(Data,Length,renorm(Filter,5,1));
```

### See also:

[predict](131_predict.md), [advise](advisor.md), [polyfit](136_polyfit_polynom.md), [distribute](129_filter_renorm.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))