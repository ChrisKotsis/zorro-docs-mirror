---
title: "Fill modes"
source: "https://zorro-project.com/manual/en/fill.htm"
---

# Fill modes

# Order Filling and HFT Simulation

The **Fill** variable supports several modes for simulating naive or realistic order filling, as well as a HFT simulation mode. **HFT** (**H**igh **F**requency **T**rading) is a trading method that exploits inefficiencies on the millisecond or microsecond time scale. It is very different to normal algorithmic trading. Usual trading accessories such as candles or indicators, are not used. The deciding factor is speed. HFT systems do normally not run on a trading platform - even Zorro would be not fast enough - but are directly programmed in a high speed language, such as C, Pentium assembler, shader language (HLSL) or hardware design language (VHDL).

Zorro can be used for testing HFT systems in **Fill** mode 8. In this mode, only direct trading, receiving price quotes, and plotting data are supported; indicators, series, or the [run](088_run.md) function are not used. Use the **main** function for initializing the system and for looping through bars. The maximum number of bars must be set up with **MaxBars**. Trades are opened and closed only with [enter](buylong.md) and [exit](selllong.md) commands; TMFs, limits, stops or targets are not used in HFT mode. [Hedge](019_Hedge_modes.md) mode must be 2. Price quotes are entered to the system with the [priceQuote](022_Price_History.md) function. Any price quote must include the exchange time stamp, since the system is synchronized to it. The two-way latency between exchange and PC location is set up with [OrderDelay](timewait.md) and determines the price quote at which the enter or exit order will be filled.

An introduction into HFT testing with Zorro, and an example of a HFT system can be found on [Financial Hacker](http://www.financial-hacker.com/hacking-hft-systems/).

For determining the latency of your system, make sure that your PC clock is exactly in sync with the clock used at the exchange, then compare the exchange time stamp of incoming live price quotes with the arrival time stamp. Double this time for getting the roundtrip latency and add the reaction time of your hardware and software. As a rule of thumb, the time stamp difference is about 1 ms per any 300 km distance to the exchange (light travels at 300.000 km/sec), plus about 1..2 ms additional delay due to signal routing. **OrderDelay** can be set up with a precision of 1 microsecond. Price quote data by data vendors has usually a precision of 1 ms.

## Fill

Determines how order fills are simulated in \[Test\] and \[Train\] mode and how orders entries affect other open trades.

### Modes:

<table border="0"><tbody><tr><td><strong>0</strong></td><td>'Naive' order filling. Trades open or close at the current market price or at their <a href="stop.htm">Entry</a>, <strong><a href="stop.htm">Stop</a></strong>, or <strong><a href="stop.htm">TakeProfit</a></strong> limits, regardless of latency, <a href="spread.htm">slippage</a>, or intrabar price movement. Accidental 'cheating' - generating unrealistic profits - is possible by modifying stop or profit limits in a <a href="trade.htm">TMF</a>. The naive fill mode is not recommended for backtesting, but can be used for special purposes, such as replicating backtest results of other platforms.</td></tr><tr><td><strong>1</strong></td><td>Realistic order filling (default). Trades open or close at the most recent price quote plus <a href="spread.htm">Slippage</a> or <a href="spread.htm">Penalty</a>. When <strong>Slippage</strong> and <strong>Penalty</strong> are <strong>0</strong>, this mode simulates a latency-free connection to the market that immediately reacts on any price quote. If an entry or exit limit is hit and no <strong>Penalty</strong> is set, the position is filled at a price replicating live trading as accurate as possible with a slight pessimistic bias (see details below). 'Cheating' is not possible. With daily bars, this mode simulates trading right before the market closes.</td></tr><tr><td><strong>2</strong></td><td>Naive next-bar order filling. Like fll mode <strong>0</strong>, but trades open or close at the next bar open price. Not recommended for realistic backtests, but can be used for replicating backtest results of other platforms.</td></tr><tr><td><strong>3</strong></td><td>Delayed order filling. Trades open or close at the next price quote plus <a href="spread.htm">Slippage</a> or <a href="spread.htm">Penalty</a>. With daily bars, this mode simulates trading at the market open price of the next day.</td></tr><tr><td><strong>8</strong></td><td>HFT fill mode. Trades open or close at the <a href="price.htm">priceQuote</a> whose time stamp is most recent to the current time plus <a href="timewait.htm">OrderDelay</a>. This mode can be used for testing HFT systems at different latencies.</td></tr></tbody></table>

  

### Type:

**int**

### Remarks:

*   High resolution price data for HFT simulation often has outliers. Use the [Outlier](187_TickTime_MaxRequests.md) variable to filter out extreme prices.
*   Delayed order filling affects trade statistics separately for entering and for filling the order. As long as the order is not filled, it is assumed pending. Thus, [NumPendingTotal](winloss.md) is increased when the order is entered, and [NumOpenTotal](winloss.md) when it is filled.
*   Fill modes **0 - 3** can be changed in real time, f.i. for entering a trade at the next day open and exiting it at the current day close.
*   Fill modes have no effect on the display of trade start or end points on the [chart](011_Chart_Viewer_Debugger.md), which are always placed on the first and last bar of the trade.
*   [Entry](188_Stop_Profit_Trail_Entry.md), [Stop](188_Stop_Profit_Trail_Entry.md), or [Takeprofit](188_Stop_Profit_Trail_Entry.md) fill prices are determined by the current fill mode, the slippage, penalty, and the historical tick that hit the price level. In naive fill mode or when [Penalty](191_Spread_Commission.md) is set, the fill price is the given price level plus or minus **Penalty**, depending on trade direction. In realistic fill mode, the fill price is calculated with the following algorithm:  
    Long Entry stop: max of Entry and tick end price + slippage.  
    Long Entry limit: Entry + slippage.  
    Short Entry stop: min of Entry and tick end price + slippage.  
    Short Entry limit: Entry + slippage.  
    Long OrderDelay. max of Entry and tick mid price + slippage.  
    Short OrderDelay. min of Entry and tick mid price + slippage.  
    Long Stop: min of Stop and tick start price + slippage.  
    Long TakeProfit: TP price + slippage.  
    Short Stop: max of Stop and tick start price + slippage.  
    Short TakeProfit: TP price + slippage. 

### Example:

```c
function run()
{
  BarPeriod = 1440;
  Fill = 3; _// enter trades at next day's open_ 
  ...
}
```

### HFT simulation framework:

```c
_// Simulate a stock trading HFT system_

#define LATENCY  2.5   _// simulate 2.5 milliseconds latency_

typedef struct QUOTE {
  char  Name\[24\];
  var  Time,Price,Size;
} QUOTE; _// Quote struct by the NxCore plugin_

int callback(QUOTE \*Quote) _// called by the plugin_
{
  static int Counter = 0; _// quote counter_
  if(0 == (++Counter % 1000)) { _// every 1000 quotes..._
    if(!wait(0)) return 0; _// check if \[Stop\] was clicked_
  }
    
  asset(Quote->Name+1); _// NxCore adds "e" to the asset name_
  priceQuote(Quote->Time,Quote->Price);
  ...
_// trade algorithm here, generate TradeSignalLong/Short_
  ...
  if(!(NumOpenLong+NumPendingLong) && TradeSignalLong) {
    exitShort();
    enterLong();
  } else if(!(NumOpenShort+NumPendingShort) && TradeSignalShort) {
    exitLong();
    enterShort();
  }
  return 1;
}

function main()
{
  if(Broker != "NxCore") {
    quit("Please select NxCore plugin!");
    return;
  }

  StartDate = 20170103;
  EndDate = 20170131;
  LookBack = 0;
  set(LOGFILE);
  assetList("AssetsHFT");
  OrderDelay = LATENCY/1000.;
  Hedge = 2;
  Fill = 8;
  Lots = 1;
  Verbose = 3;

_// process the NxCore history tape files, one for each day_
  login(1);	_// for initilizing the plugin_
  int NxDate;
  for(NxDate = StartDate; NxDate = EndDate; NxDate++) {
    string NxHistory = strf("History\\\\NxTape%8d.nx2",NxDate);
    printf("\\nProcessing tape %s..",NxHistory);
    brokerCommand(SET\_HISTORY,NxHistory);
    if(!wait(0)) break; _// check if \[Stop\] was clicked_
  }
}
```

### See also:

[enter](buylong.md), [exit](selllong.md), [Hedge](019_Hedge_modes.md), [Slippage](191_Spread_Commission.md), [Penalty](191_Spread_Commission.md), [mode](018_TradeMode.md), [priceQuote](022_Price_History.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))