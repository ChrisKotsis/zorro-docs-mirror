---
title: "diff"
source: "https://zorro-project.com/manual/en/diff.htm"
---

# diff

## diff (var x, int Period): var

Returns the difference of **x** to its value from **Period** bars before.

### Parameters:

<table border="0"><tbody><tr><td><strong>x</strong></td><td>Variable for difference calculation.</td></tr></tbody></table>

### Returns

**x - previous x**  

### Remarks

*   This function generates a [series](091_series.md) (see remarks).
*   **diff(log(x),1)** returns the log return of **x** , since **log(a/b) = log(a) - log(b)**.

### Example:

```c
_// generate a price difference serie_
vars Changes = series(diff(priceClose(),1));
```

### See also:

[series](091_series.md), [ROCP](ta.htm#roc)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))