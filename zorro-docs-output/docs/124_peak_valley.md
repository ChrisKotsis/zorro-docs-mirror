---
title: "peak, valley"
source: "https://zorro-project.com/manual/en/peak.htm"
---

# peak, valley

## peak(vars Data) : bool

## valley(vars Data) : bool

Determines if the **Data** series had a maximum (**peak**) or minimum (**valley**) at the previous bar.

## peak(vars Data, int TimePeriod) : int

## valley(vars Data, int TimePeriod) : int

Returns the bar offset of the last maximum (**peak**) or minimum (**valley**) of the **Data** series, or **0** when the series had no peak or valley within the **TimePeriod**.

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td>Time <a href="series.htm">series</a></td></tr><tr><td><strong>TimePeriod</strong></td><td>Number of series elements to test</td></tr></tbody></table>

### Returns:

**true** or bar offset at the peak or valley, **false** or **0** if no peak and valley was found.

### Modifies

**rMomentum** - **Data** movement in percent per time frame; indicates the 'sharpness' of the peak or valley.

### Algorithm:

```c
bool peak(var\* Data) { 
  rMomentum = min(Data\[1\]-Data\[2\],Data\[1\]-Data\[0\])/Data\[0\]\*100.;
  return (Data\[2\] <= Data\[1\]) && (Data\[1\] > Data\[0\]); 
}
bool valley(var\* Data) {
  rMomentum = min(Data\[2\]-Data\[1\],Data\[0\]-Data\[1\])/a\[0\]\*100.;
  return (Data\[2\] >= Data\[1\]) && (Data\[1\] < Data\[0\]); 
}
```

### Remarks:

*   The **Data** series must have a minimum length of **3** resp. the given **TimePeriod**..
*   A 'flat line' of the **Data** series for several bars will not produce a peak or valley signal.
*   For a fuzzy logic version that also detects 'almost peaks' and 'almost valleys', use [peakF](087_Fuzzy_Logic.md) / [valleyF](087_Fuzzy_Logic.md).
*   For detecting only 'strong peaks' or 'strong valleys', compare **rMomentum** with a percent threshold.
*   For checking if a peak occurred exactly **n** bars before, use **peak(Data+n)**.
*   For predicting a future peak or valley, use the [predict](131_predict.md) function.

### Example:

```c
function run()
{
  vars Trends = series(LowPass(series(price()),1000),3);
  if(valley(Trends))
    enterLong();
  if(peak(Trends))
    enterShort();
}
```

### See also:

[crossOver](121_crossOver_crossUnder.md), [crossUnder](121_crossOver_crossUnder.md), [rising](123_rising_falling.md), [falling](123_rising_falling.md), [peakF](087_Fuzzy_Logic.md), [valleyF](087_Fuzzy_Logic.md), [predict](131_predict.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))