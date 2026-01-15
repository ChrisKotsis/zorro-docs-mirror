---
title: "frechet"
source: "https://zorro-project.com/manual/en/detect.htm"
---

# frechet

## frechet (vars Data, int TimeFrame, var Scale, var\* Pattern) : var

Calculates the Frechet distance between the recent part of a data series and a predefined curve. Returns a percent value equivalent to the similarity between the two curves. This function can be used for comparing a price curve part with a template, thus detecting cups, zigzags, or similar patterns in the price curve.

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td>The <a href="series.htm">series</a> to be compared.</td></tr><tr><td><strong>TimeFrame</strong></td><td>The number of bars in the series to be compared, or <strong>0</strong> for using the length of the pattern. Determines the horizontal size of the pattern.</td></tr><tr><td><strong>Scale</strong></td><td>The vertical size of the pattern (f.i. <strong>10*PIP</strong> for detecting a 10 pips tall pattern)<strong></strong>. Use a negative scale for inverting the pattern.</td></tr><tr><td><strong>Pattern</strong></td><td>The pattern shape to be detected in the series, given by an array of positive values that starts with the oldest value and ends with <strong>0</strong> as an end mark.</td></tr></tbody></table>

### Returns

Similarity between **Data** and **Pattern** in percent, normally in the **20..80** range.

### Remarks:

*   Related blog article: [Pattern recognition with the frechet distance](https://robotwealth.com/pattern-recognition-with-the-frechet-distance/)
*   For determining a pattern array, paint the pattern on squared paper. The array values are equivalent to number of squares below any pattern segment.
*   The algorithm is based on the **Fréchet distance**, a measure of similarity between two curves, often used for handwriting recognition. For the algorithm, imagine a dog walking along one curve and the dog's owner walking along the other curve. They are connected by a leash and walk from the start point to the end point of the curve. Both may vary their speed and even stop anytime, however neither can backtrack. The Fréchet distance is the length of the shortest possible leash required for traversing the curves in this manner.
*   The absolute values of the pattern array don't matter, as it is normalized to **Scale** before comparison. The pattern is also aligned with the minimum of the **Data** series. For automatically adapting the pattern size to the data amplitude, set **Scale = MaxVal(Data,TimeFrame) - MinVal(Data,TimeFrame);**.
*   Because series arrays have reverse time order, the pattern array is also reversed before comparison. This must be considered when comparing the pattern with a data array that is not a series.

### Example:

```c
_//detect 10-pip 10-bar cup formations in the price curve_
function run()
{
  vars Price = series(price());
  static var cup\[10\] = { 6,3,2,1,1,1,2,3,6,0 };
  plot("Cup Similarity",frechet(Price, 0, 10\*PIP, cup),NEW,RED);
}
```

### See also:

[predict](131_predict.md), [advise](advisor.md), [polyfit](136_polyfit_polynom.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))