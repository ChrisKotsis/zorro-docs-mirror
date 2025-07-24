---
title: "sortData, sortIdx"
source: "https://zorro-project.com/manual/en/sortdata.htm"
---

# sortData, sortIdx

## sortData (var\* Data, int Length)

Sorts the **Data** array in ascending (**Length > 0**) or descending (**Length < 0**) order.

## sortIdx (var\* Data, int Length): int\*

Does not affect the **Data** array, but returns a sorted **int** array of the indices from the smallest to the greatest **Data** value.

## sortRank (var\* Ranks, var\* Data, int Length): int\*

Stores the rank of any **Data** element in 0..1 range in the **Ranks** array, from 0 for the smallest to 1 for the greatest element. If the elements are OHLC prices, candle patterns can be encoded this way for machine learning algorithms.

## findIdx (var\* Data, int Length, var Value): int

Returns the index of the highest **Data** element below or equal to **Value**, or **-1** when no such element was found. 

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td style="width: 388px"><strong>var</strong> / <strong>double</strong> array or <a href="series.htm">series</a> to be sorted</td></tr><tr><td><strong>Rank</strong></td><td style="width: 388px"><strong>var</strong> / <strong>double</strong> array to receive the <strong>Data</strong> ranks.</td></tr><tr><td><strong>Length</strong></td><td style="width: 388px">Length of the <strong>Data</strong> array; negative for sorting in descending order.</td></tr><tr><td><strong>Value</strong></td><td style="width: 388px">Value to be found in the <strong>Data</strong> array.,</td></tr></tbody></table>

### Returns

**sortIdx, sortRank:** Pointer to a temporary **int** array of size **Length** containing the numbers of the **Data** values after sorting. The array will be overwritten by the next **sortIdx** or **sortRank** call. Returns 0 when a parameter is invalid.  

### Remarks

*   For sorting or searching arrays, the standard C functions **qsort** and **bsearch** can alternatively be used. They are available in the [stdio.h](litec_h.md) include file.

### Example:

```c
_// Spearman trend indicator_  
var Spearman(var\* Data,int Period)  
{  
  Period = clamp(Period,2,g->nLookBack);  
  int\* Idx = sortIdx(Data,Period);  
  var sum = 0;
  int i,n;  
  for(i=0,n=Period-1; i<Period; i++,n--)  
    sum += (n-Idx\[i\])\*(n-Idx\[i\]);  
  return 1. - 6.\*sum/(Period\*(Period\*Period-1.));  
}
```

### See also:

[randomize](130_randomize.md), [frechet](detect.md), [series](091_series.md), [dataSort](125_sortData_sortIdx.md), [matSort](086_vector_matrix.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))