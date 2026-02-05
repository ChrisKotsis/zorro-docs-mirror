---
title: "Seasonal Strength"
source: "https://zorro-project.com/manual/en/season.htm"
---

# Seasonal Strength

# Seasonal and directional strength

## predictMove (vars Data, int Length, int Horizon, var Percentile): var

Predicts the magnitude of a price movement, based on statistical analysis of price changes in the **Data** series. Returns the given **Percentile** of **Data** changes within the given time **Horizon**. Example: if the function returns **10** at **Horizon = 20** and **Percentile = 95**, then in **95%** of all cases the **Data** value moved by **10** or less in any direction within **20** bars (and therefore moved by more than **10** only in **5%** of all cases). For statistical significance **Length** should be large compared to **Horizon**. The minimum length of the **Data** series is **Length+Horizon**.

## predictSeason (vars Data, int Length, int Horizon, int Season): var

Predicts the expected price movement within a given time **Horizon**, based on the current time and seasonal movement in the **Data** series. Example: if the function returns **1.5** at **Horizon = 20** and **Season = 4**, then the **Data** series is expected to rise by **1.5** within 20 bars from now, based on the annual movement at the same date in previous years. If **Horizon == 0**, the function returns no price move, but the average seasonal **Data** value at the current date. For statistical significance the **Data** series should cover at least 3 or 4 seasons. 

### Returns:

Predicted data change / average seasonal data.

### Parameters:

<table border="0"><tbody><tr><td><strong>Data</strong></td><td>A data <a href="series.htm">series</a>, usually from price functions <strong><a href="price.htm">price(), priceClose()</a></strong>,&nbsp;</td></tr><tr><td><strong>Length</strong></td><td>The length of the data series, normally the <a href="lookback.htm">LookBack</a> period.</td></tr><tr><td><strong>Horizon</strong></td><td>Price movement duration in bars.</td></tr><tr><td><strong>Percentile</strong></td><td>Price movement percentile to return, f.i. <strong>5</strong> for the lowest 5% or <strong>95</strong> for the highest 5%.</td></tr><tr><td><strong>Season</strong></td><td><strong>1</strong> for daily, <strong>2</strong> for weekly, <strong>3</strong> for monthly, or <strong>4</strong> for annual seasons.</td></tr></tbody></table>

### Remarks:

*   Source code in **indicators.c**.
*   Use [plotDay](147_plotProfile.md), [plotWeek](147_plotProfile.md), [plotMonth](147_plotProfile.md), or [plotYear](147_plotProfile.md) for displaying seasonal dependence in a histogram.

### Example:

```c
function run()
{
  StartDate = 2010;
  BarPeriod = 1440;
  LookBack = 300;	
 
  vars Prices = series(price());
  if(!is(LOOKBACK)) {
    LifeTime = 1;
    var WeeklyMove = predictSeason(Prices,LookBack,LifeTime,2);
    if(WeeklyMove > 0)
      enterLong();
    else if(WeeklyMove < 0)
      enterShort();
  }
}
```

### See also:

[asset](013_Asset_Account_Lists.md), [ROC](ta.htm#roc), [predict](131_predict.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))