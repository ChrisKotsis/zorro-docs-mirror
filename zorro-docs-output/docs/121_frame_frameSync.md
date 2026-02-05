---
title: "frame, frameSync"
source: "https://zorro-project.com/manual/en/frame.htm"
---

# frame, frameSync

## frame(int Offset): bool

Returns **true** when the current [TimeFrame](177_BarPeriod_TimeFrame.md) ends at the given bar, and **false** when inside a time frame.

## frameSync(int Period): int

Returns a synchronized [TimeFrame](177_BarPeriod_TimeFrame.md) that is aligned to the begin of an hour, a 4 hours period, a day, or a week. Returns **0** inside the time frame, and the negative number of skipped bars at the end of the time frame. Periods that are higher than one week or are no divisor of a full hour are not synchronized. [FrameOffset](177_BarPeriod_TimeFrame.md) can be used to shift the synchronized time frame to a particular time or workday.

### Parameters:

<table border="0"><tbody><tr><td><strong>Offset</strong></td><td><a href="bars.htm">Bar</a> distance to the current bar. Must be <strong>0</strong> when <strong>TimeFrame</strong> is synchronized to a fixed time period or to an external event.</td></tr><tr><td><strong>Period</strong></td><td>Time period to be synchronized, in bars; an integer fraction of a hour, a 4 hours period, a day, or 7 days for a week.</td></tr></tbody></table>

## sync(vars Data, int Type, int Period) : var

Selects a value of the **Data** series using a synchronized time frame given by **Period**. Can be used to generate higher time frames of price series or indicators. Dependent on **Type**, the first, maximum, minimum, or last element  within the time frame, or the previous value is selected. The function internally creates [series](091_series.md) (see remarks). Source code in **indicators.c**.

### Parameters:

<table border="0"><tbody><tr><td style="height: 23px"><strong>Data</strong></td><td style="height: 23px">Data series, for instance prices or indicator values.</td></tr><tr><td><strong>Type</strong></td><td><strong>1</strong> first, <strong>2</strong> highest, <strong>3</strong> lowest, <strong>4</strong> last element, <strong>+8</strong> for the previous value.</td></tr><tr><td><strong>Period</strong></td><td>Synchronized time period, in bars; an integer fraction of a hour, a 4 hours period, a day, or 7 days.</td></tr></tbody></table>

### Remarks:

*   **TimeFrame = 24** is different to **TimeFrame = frameSync(24)**. In the former case the time frame changes every 24 bars, in the latter case every day on a 1-hour bar period, even if there are less than 24 bars per day.
*   The **Period** parameter to be synchronized on must not change from bar to bar.
*   Not all functions support synchronized time frames, but [series](091_series.md) do. For synchonizing **TimeFrame** to arbitrary events, look up the **frameAlign** helper function under [Tips&Tricks](246_Tips_Tricks.md).
*   **TimeFrame = frameSync(...)** will not automatically set [LookBack](181_LookBack_UnstablePeriod.md), so if required, set it manually to the needed maximum value.

### Examples:

```c
_// let a time frame change daily at 3:00_
BarPeriod = 60;
FrameOffset = 3;
TimeFrame = frameSync(24);
...

_// shift a series every 24 hours_
BarPeriod = 60;
if(0 == frameSync(24)) set(NOSHIFT);
vars MySeries = series(MyValue);
set(NOSHIFT|OFF);
...

_// return OHLC prices from synchronized higher time frames_
var priceSyncOpen(int Period) { return sync(seriesO(),1,Period); }
var priceSyncClose(int Period) { return sync(seriesC(),4,Period); }
var priceSyncHigh(int Period) { return sync(seriesH(),2,Period); }
var priceSyncLow(int Period) { return sync(seriesL(),3,Period); }
```

### See also:

[Bar](005_Bars_and_Candles.md), [TimeFrame](177_BarPeriod_TimeFrame.md), [BarZone](assetzone.md), [BarMode](200_BarMode.md), [suspended](suspended.md), [series](091_series.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))