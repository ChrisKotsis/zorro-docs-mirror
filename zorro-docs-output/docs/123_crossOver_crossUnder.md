---
title: "crossOver, crossUnder"
source: "https://zorro-project.com/manual/en/crossover.htm"
---

# crossOver, crossUnder

## crossOver (vars Data1, vars Data2) : bool

## crossUnder (vars Data1, vars Data2) : bool

## crossOver (vars Data, var Border) : bool

## crossUnder (vars Data, var Border) : bool

Determines if the **Data1** series crosses over or under the **Data2** series, or over or under a fixed **Border** value between the previous and the current bar. Often used for trade signals.

## crossOver (vars Data1, vars Data2, int TimePeriod) : int

## crossUnder (vars Data1, vars Data2, int TimePeriod) : int

## crossOver (vars Data, var Border, int TimePeriod) : int

## crossUnder (vars Data, var Border, int TimePeriod) : int

Returns the bar offset of the last crossing (**1** = between the previous and the current bar), or **0** when no crossing occurred within the **TimePeriod**. 

## touch (vars Data1, vars Data2) : bool

## touch (vars Data, var Border) : bool

Determines if the **Data1** series touches or crosses the **Data2** series or a fixed **Border** value from any direction.

### Parameters:

<table border="0"><tbody><tr><td><strong>Data1</strong></td><td>First time series.</td></tr><tr><td><strong>Data2</strong></td><td>Second time series</td></tr><tr><td><strong>Border</strong></td><td>Border value</td></tr><tr><td><strong>TimePeriod</strong></td><td>Number of series elements to test</td></tr></tbody></table>

### Returns:

**true** or bar offset if the first series crosses the second, **false** or **0** otherwise.

### Modifies

**rMomentum** - **Data** movement in percent per time frame at the time of the crossing; indicates the 'speed' of the crossover.

### Algorithms:

```c
bool crossOver(var\* Data1,var\* Data2) { return (Data1\[0\] > Data2\[0\]) && (Data1\[1\] <= Data2\[1\]); }  
bool crossUnder(var\* Data1,var\* Data2) { return (Data1\[0\] < Data2\[0\]) && (Data1\[1\] >= Data2\[1\]); }  
bool crossOver(var\* Data,var Border) { return (Data\[0\] > Border) && (Data\[1\] <= Border); }  
bool crossUnder(var\* Data,var Border) { return (Data\[0\] < Border) && (Data\[1\] >= Border); }
```

### Remarks:

*   The **data** series must have a minimum length of **2**, resp. **TimePeriod**.
*   For a fuzzy logic version that also detects 'almost crossovers', use [crossOverF](087_Fuzzy_Logic.md) / [crossUnderF](087_Fuzzy_Logic.md).
*   For checking if a crossover occurred exactly **n** bars before, use **crossOver(Data1+n,Data2+n)**.
*   For getting the Close price at the last crossover, use **priceC(crossOver(Data1,Data2,LookBack))**.
*   For predicting a future crossover, or for detecting only 'strong crossovers', use the [predict](131_predict.md) function.
*   Identical values of the two series for several bars will not produce a crossover signal. If that is desired, use the **touch** function.

### Example:

```c
function run()
{
  vars Price = series(priceClose());
  vars SMA100 = series(SMA(Price,100));
  vars SMA30 = series(SMA(Price,30));
  if(crossOver(SMA30,SMA100))
    enterLong();
  else if(crossUnder(SMA30,SMA100))
    enterShort();
}
```

### See also:

[series](091_series.md), [rising/](123_rising_falling.md)[falling](123_rising_falling.md), [peak](122_peak_valley.md)/[valley](122_peak_valley.md), [crossOverF](087_Fuzzy_Logic.md)/[UnderF](087_Fuzzy_Logic.md), [predict](131_predict.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))