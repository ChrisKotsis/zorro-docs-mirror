---
title: "Time zones"
source: "https://zorro-project.com/manual/en/assetzone.htm"
---

# Time zones

# Time zone handling

Zorro's standard time zone is UTC (Greenwich mean time), which is also the time zone of historical data, logs, and charts. [Time and date functions](month.md) and variables are normally also based on UTC time. Alternatively, local time zones can be used either on the bar or on the asset level. For handling or converting time zones, the following variables are available:  

## BarZone

Time zone of bars (default: **UTC**). Affects bar generation: daily bars will start and end at **BarZone** midnight plus [BarOffset](177_BarPeriod_TimeFrame.md). For this, set **BarZone** before the first [asset](013_Asset_Account_Lists.md) call. **BarZone** is also used by several date/time functions that use local time. For using specific asset-dependent time zones with intraday bars, see **AssetFrameZone** and **AssetMarketZone**. 

## HistoryZone

Time zone of the historical data files, for converting them to **UTC**. This variable is rarely needed since timestamps in historical data files should be already in UTC. If not, set **HistoryZone** to the time zone in the data. The time stamps in historical data files and [dataset](125_sortData_sortIdx.md) files are then automatically converted to UTC on **dataLoad** or **dataParse**. 

## BrokerZone

Time zone of the broker plugin. This variable is rarely needed since broker plugins normally return timestamps in UTC. Otherwise the broker plugin is supposed to set **BrokerZone** with the [GET\_BROKERZONE](113_brokerCommand.md) command. The broker API time stamps are then converted to UTC on import.

## LogZone

Time zone of the log and chart. If not set, all dates and times in the log and chart are in UTC.  
  

## AssetMarketZone

Time zone of the current [asset](013_Asset_Account_Lists.md); initally read from the **Market** field of the [asset list](013_Asset_Account_Lists.md), otherwise copied from **BarZone** or set by script.

## AssetFrameZone

Time zone of the current [asset](013_Asset_Account_Lists.md) for daily trading; used to set **AssetFrame** to a daily **[TimeFrame](177_BarPeriod_TimeFrame.md)** that begins at **[FrameOffset](177_BarPeriod_TimeFrame.md)** in local time. 

### Type:

**int**, **UTC** for UTC time (default), **EST** for New York, **CST** for Chikago, **WET** for London, **CET** for Frankfurt, **AEST** for Sydney, **JST** for Tokyo, or any number from **\-23..+23** that gives the time zone offset in hours to UTC. Daylight saving time is used, except for UTC and for time zones at or beyond JST.  
 

## AssetFrame

Asset specific time frame, automatically set by **AssetFrameZone**. **0** when the current [asset](013_Asset_Account_Lists.md) had no price quotes in the current bar or when its market is closed; negative number of skipped bars when the market opens; **1** otherwise. Normally used to set [TimeFrame](177_BarPeriod_TimeFrame.md) **\= AssetFrame** for skipping bars outside market hours, or for trading on different time zones (see example). 

### Type:

**int**, read/only  
 

### Remarks:

*   **BarZone, HistoryZone**, and **BrokerZone** affect the sampling of bars and thus must be set before loading history with the first [asset](013_Asset_Account_Lists.md)() call. The asset-specific **AssetZone** and **AssetMarket** must be set after selecting the [asset](013_Asset_Account_Lists.md) and can be changed at runtime.
*   If backtests use price history in local time and no time zone is set, all time/date functions and variables are then also in local time instead of UTC. 
*   Setting a non-UTC **BarZone** generates a daily bar of 23 or 25 hours when the daylight saving period begins or ends. The [run](088_run.md) function can run twice or be skipped when the clock is set backwards or forwards. This does normally not matter, but should be taken into account in strategies that strongly rely on a 24-hour bar period or on bars ending or starting at a certain time.
*   For emulating day bars of different assets with different time zones, use 1-hour bars with **AssetFrameZone** and **AssetFrame** (see example). Use [FrameOffset](177_BarPeriod_TimeFrame.md) for starting the emulated bar at a certain local hour.

### Examples:

```c
_// trade daily at 15:30 New York time_
BarPeriod = 1440;
BarOffset = 15\*60+30;
BarZone = EST;
...

_// trade two assets on different time zones_
BarPeriod = 60;
FrameOffset = 10; _// trade both assets at 10:00 am local time_
while(asset(loop("EUR/USD","USD/JPY")))
{
  if(strstr(Asset,"EUR"))
    AssetFrameZone = WET;
  else if(strstr(Asset,"JPY"))
    AssetFrameZone = JST;
  TimeFrame = AssetFrame; _// use a daily time frame changing at 10:00 local time_
  ...
}
```

### See also:

[TimeFrame](177_BarPeriod_TimeFrame.md), [StartMarket](100_tradeUpdate.md), [BarOffset](177_BarPeriod_TimeFrame.md), [BarMode](200_BarMode.md), [TickFix](187_TickTime_MaxRequests.md), [Time/Date functions](month.md),. [asset](013_Asset_Account_Lists.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))