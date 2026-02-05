---
title: "TickTime, MaxRequests, ..."
source: "https://zorro-project.com/manual/en/ticktime.htm"
---

# TickTime, MaxRequests, ...

# Time and latency

## TickTime

Minimum time in ms per asset between processing price ticks, in live trading and in backtests with tick-based (**.t1** or **.t2**) historical data. Default = **500\*sqrt(BarPeriod)**, i.e. 500 ms for a strategy with 1-minute bars. When multiple price quotes arrive during that time or are read from historical data, intrabar functions ([TMF](trade.md) or [tick](089_tick_tock.md)) are excuted only with the most recent price quote. Set this to a higher value for faster backtests and for saving memory. Set it to a smaller value for reducing latency and for backtesting with higher time resolution. By setting **TickTime** to a negative value, [TMF](018_TradeMode.md) and [tick](089_tick_tock.md) functions run at the given time period in live trading even when no new price quote is arrived. For affecting tick-based backtests, set this variable before loading the price history with [asset()](013_Asset_Account_Lists.md).

## TockTime

Time in ms between subsequent [tock](089_tick_tock.md) calls in trade mode (default = **60000 ms**).

## TickFix

Time delay to be added to or subtracted from ticks in historical data, in ms (default **\= 0**). Can be used for compensating inaccuracies in timestamps that lead to backtest differences between T1 and M1 ticks, or for determining the effect of small tick time differences on the result of the strategy. Set this variable before loading the price history by calling [asset()](013_Asset_Account_Lists.md).

## MaxRequests

Maximum number of requests per second to the broker API (**0.1** .. **1000**; default = **0** = no limit). Price and account requests, orders and status requests, and [brokerCommand](113_brokerCommand.md) calls are limited to this rate. If it is exceeded, further requests are automatically delayed. Automatically set up at login by broker plugins that support the **GET\_MAXREQUESTS** command. If the broker has a request limit and several Zorros are trading simultaneously on the same connection, reduce the request rate accordingly.

## MaxTicks

Maximum number of ticks per request when downloading historical data. Automatically set up at login by broker plugins that support the **GET\_MAXTICKS** command. If the broker has a download limit and several Zorros are downloading data simultaneously on the same connection, reduce the number of ticks accordingly.

## UpdateTime

Time in ms for retrieving price updates for all used assets in live trading mode; determines the maximum possible speed of high-frequency strategies. The more assets are used and the slower the broker API, the broker server, or the Internet connection, the higher is the time needed for updating all assets.

### Type:

**int**  
 

### Remarks:

*   Price requests can be temporarily disabled with the [SET\_PRICETYPE](113_brokerCommand.md) command or the [NOPRICE](201_AssetMode.md) flag.
*   **TickTime** cannot be greater than **BarPeriod** or **TockTime**, and should not be smaller than **UpdateTime**.
*   Backtests with historical data in **.t6** or **.t8** format are not affected by **TickTime**. The time between ticks is then given by the data resolution.

### Example:

```c
function run()
{
  TockTime = 1000; _// run the tock function any second_
  ...
}
```

### See also:

[Mode](018_TradeMode.md), [run](088_run.md), [tick](089_tick_tock.md), [tock](089_tick_tock.md), [Outlier](outlier.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))