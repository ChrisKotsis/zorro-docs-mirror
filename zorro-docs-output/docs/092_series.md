---
title: "series"
source: "https://zorro-project.com/manual/en/series.htm"
---

# series

## series(_var Value_, _int Length_): vars

Creates a time series of the given **Length** with the given **Value**, and returns the pointer to the series. A series is a [var array](aarray.md) that contains the history of the variable. It is normally used by indicators in algorithmic trading. Series can be static or dynamic. Dynamic series are automatically shifted at every time frame, so that every element corresponds to a certain [bar](005_Bars_and_Candles.md) or time frame; the **\[0\]** element to the value at the current bar or time frame, the **\[1\]** element to the value from one bar or time frame ago, and so on. If a series is static by giving a negative **Length**, or if the [NOSHIFT](018_TradeMode.md) flag is set, the series is not shifted.  

### Parameters:

<table border="0"><tbody><tr><td><strong>Value</strong></td><td>Optional data value of the series. The series is initially filled with this value, otherwise with <strong>0</strong>. On dynamic series the value is copied into the first element.</td></tr><tr><td><strong>Length</strong></td><td>Optional number of elements of the series; must not change once set. When omitted or <strong>0</strong>, the series gets the length of <strong><a href="nhistory.htm">LookBack</a></strong>. A negative number allocates a static series that can be shifted by script with the <a href="shift.htm">shift</a> function.</td></tr></tbody></table>

### Returns:

Pointer to the **var** array (the **vars** type is just a **var\*** pointer).

### Usage:

**vars Prices = series(price());** defines a series with the length of the **LookBack** period that contains the mean prices of the current asset  
 

## ref(var Value, int Index): var

Convenience macro that generates a series and returns the **Value** from **Index** time frames ago. All macros are defined in **variables.h**.  
 

## SeriesLength

**int**, r/o, containing the number of elements of the date series returned by the last **series()** call.

## SeriesBuffer

**var\*** pointer that can be set to a memory area, and will then be returned by the next **series** call (lite-C only). After a **series** call it is set to the returned pointer. This allows to use static or pre-filled buffers for a series. For an example, see [Financial Hacker: Truncated Indicators](https://financial-hacker.com/petra-on-programming-truncated-indicators).  
  

### Remarks:

*   Series correspond to serial variables in EasyLanguage™. The **n**\-th element of a series is accessed by adding a **\[n\]** to the series name, where **n** is a positive integer number. For instance, **myseries\[0\]** is the most recent element, **myseries\[1\]** is the element of one time frame ago, and so on. **n** must be positive and smaller than the series length.
*    !!  The series function is responsible for allocating and shifting series. Therefore it must be called at any bar, either inside the [run](088_run.md) function or from a function that is called from the **run** function.
*    !!  An internal counter determines the pointer to be returned by a **series()** call. For keeping the counter in sync, all **series()** calls must be in the same order. Therefore they must not be skipped by [if](052_if_else.md) or other conditions that change from bar to bar (see example below). If the content of a series shall depend on **if** conditions, simply set its **\[0\]** element dependent on **if**. These restrictions also apply to all functions that internally create **series**, such as some [indicator](033_W4a_Indicator_implementation.md) or [signal processing](129_filter_renorm.md) functions. 
*    !!  Since the [LookBack](181_LookBack_UnstablePeriod.md) value is normally only known after the [INITRUN](013_Asset_Account_Lists.md), series are allocated in the [FIRSTRUN](013_Asset_Account_Lists.md). During the **INITRUN** they are set to a temporary pointer and filled with the initial value. This temporary content is overwritten by the series allocation in the [FIRSTRUN](013_Asset_Account_Lists.md). Series are only valid during the session and released after the [EXITRUN](018_TradeMode.md).
*   Dynamic series are normally shifted by the **series** call at the end of any bar or time frame when the [NOSHIFT](018_TradeMode.md) flag is not set. The **\[0\]** element is then moved to the **\[1\]** element, the **\[1\]** element to the **\[2\]** element and so on. The current **Value** becomes the new **\[0\]** element. Due to this mechanism, the series contains its elements in reverse chronological order with the most recent element at the start. For synchronizing series to external events or to longer time frames, either set the [TimeFrame](177_BarPeriod_TimeFrame.md) variable accordingly before the **series()** call, and set it back afterwards. Or use the **NOSHIFT** flag. The element **\[n\]** then corresponds to the **n**th event or time frame in the past.
*   Static series (defined with a negative **Length**) are not automatically shifted, but can be shifted by script with the [shift](shift) function. They can be used for storing arbitrary per-asset or per-algo variables, for excluding out-of-market time periods from indicators, or for shifting series by arriving price ticks in the [tick](089_tick_tock.md) function. Like any series, static series are allocated in the **FIRSTRUN**, so don't initialize them before as those values will be lost. Usage examples can be found in the **SpecialBars** script or in the SAR code in **indicators.c**.
*   For offsetting a series into the past, add an offset **+n**. This creates a pointer onto the **n**\-th element of the series. For instance, **(MySeries+1)** is **MySeries** at 1 bar offset into the past, excluding the last element **MySeries\[0\]**. This allows to access series elements in different ways: for instance, **MySeries\[3\]** is the same as **(MySeries+2)\[1\]** and the same as **(MySeries+3)\[0\]**. As the offset **+n** lets the series begin at the **n**th element, it reduces the available length of the series by **n**. When calling an [indicator](033_W4a_Indicator_implementation.md) with a series with an offset, make sure that [LookBack](181_LookBack_UnstablePeriod.md) is always higher than the required lookback period of the function plus the unstable period plus the highest possible offset of the series.
*   For adding or subtracting two series, create a series of the sum or difference of the recent elements, f.i. **vars Sums = series(Data1\[0\] + Data2\[0\]);**.
*   Some functions expect a single value, other functions expect a series as parameter. When a function expects a single value from a series, use the last element (**MySeries\[0\]**). When the function expects a whole series, use **MySeries** or **MySeries+n**.
*   If a series changes slowly, like an EMA, fill it initially with an average **value**. This prevents initialization effects when an accumulative indicator needs many bars to 'creep' from 0 to its first value.
*   A value returned by a function can be converted to a series by using it as the first parameter to the series function. For instance, **series(price())** is a series that contains the **price** value; **series(SMA(series(priceClose()),30))** is a series containing the 30-bar Simple Moving Average of the **Close** value.
*   The [rev](127_rev.md) function reverses a series so that the **\[0\]** element is the earliest.
*   The **length** parameter should not exceed the [LookBack](181_LookBack_UnstablePeriod.md) period, at least not when the series affects trading. Otherwise the script would trade differently in the fist time after starting..
*   Every series requires memory and CPU resources. Therefore do not create more or longer series than needed. The longer a series, the more memory is required and the slower is script execution due to internal shifting the series on every time frame.
*   If you need to create extremely many series and get an [Error 041](errors.md), increase [TradesPerBar](181_LookBack_UnstablePeriod.md). This determines not only the maximum number of trades, but also the maximum number of series.
*   For accessing the same series from several functions, declare a global **vars**, and set it with a **series** call in the **run** function.

### Examples:

```c
_// create a series with the high-low price differences_
vars PriceRanges = series(priceH()-priceL());
 
_// compare the current range with the range from 3 bars ago_
if(PriceRanges\[0\] > PriceRanges\[3\])
  ...
 
_// calculate a 20-bar Simple Moving Average containing the price differences from 5 bars ago_
var Average5 = SMA(PriceRange+5,20);

_// wrong use of conditional series_
if(priceClose() > Threshold) {
  vars X = series(priceClose()); _// error message!_
  vars Y = series(SMA(X,100)); _// error message!_
  ...
}

_// correct use of conditional series_
vars X = series(), Y = series();
if(priceClose() > Threshold) {
  X\[0\] = priceClose(); _// ok!_
  Y\[0\] = SMA(X,100);
  ...
}

_// exclude out-of-market bars from a series_
if(!market(EST,0)) set(NOSHIFT);
vars InMarketPrices = series(priceC());
set(NOSHIFT|OFF);

_// use arrays of series_
vars MySeriesArray\[3\]; _// declare an array of series_ 
...
for(i=0; i<3; i++) 
  MySeriesArray\[i\] = series(); _// fill the array with series_ 
...
(MySeriesArray\[0\])\[0\] = 123; _// access the first element of the first series. Mind the parentheses!_
```

### See also:

[price](022_Price_History.md), [sort](125_sortData_sortIdx.md), [rev](127_rev.md), [diff](128_diff.md), [shift](126_shift.md), [sync](118_frame_frameSync.md) [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))