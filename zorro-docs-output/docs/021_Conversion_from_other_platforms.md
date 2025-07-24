---
title: "Conversion from other platforms"
source: "https://zorro-project.com/manual/en/conversion.htm"
---

# Conversion from other platforms

# Converting vom EasyLanguage, MQL4/5, C#, AFL, PineScript...

Professional trading firms use normally C or C++ for their trading systems, due to their backtest and execution speed. But before starting serious algotrading with C/C++ and [Zorro](https://zorro-project.com), you have maybe used a retail [trading platform](https://zorro-project.com/algotradingtools.php). So you want to migrate your trading strategies, "Expert Advisors", algorithms, or indicators to C or C++. Although the Zorro C/C++platform can directly run [R](rbridge.md) and [Python](026_Python_Bridge.md) functions or Windows DLLs, it won't understand scripts from other platforms without adaption. Even when the syntax is also C or C# based, their trading functions are normally too different for an automated conversion. It's still a programmer's task. You can either hire our [algo conversion service](https://zorro-project.com/development.php) or do it yourself. Below you'll find some useful hints and examples.

Generally, Zorro can replicate any indicator and any strategy or trading algorithm from any platform. The conversion will normally result in shorter, much faster, better readable, and more robust code. Here are some examples of [algorithmic trading scripts in C/C++](https://zorro-project.com/code.php). Many more examples for code conversion from Amibroker, TradeStation, MetaStock, or other platforms can be found in Petra Volkova's articles on [Financial Hacker](https://financial-hacker.com/).

### Comparing backtests and charts between different platforms

Even perfectly converted [algo trading strategies](https://zorro-project.com/algotrading.php) can produce very different backtests and charts on different platforms. Especially MT4/MT5 backtests are often not reproducible with other platforms. When platform A produces a positve and platform B a negative backtest result of the same strategy - which one should you trust? Here's what to check for determining the reason of backtest and chart differences:

*   **Compare the price data.** Print out several candles with the same time stamps and check. Have they the same OHLC prices? Are they from ask, bid, or trade prices? Is the timestamp from the open, the center, or the close of the bar? UTC or a local time zone? Unadjusted or split and dividend adjusted? When using tick data, does it contain the same quotes? Forex, CFD, and cryptocurrency prices from different sources are normally very different on the minute or tick level. Candles of the same source look different dependent on price type (ask/bid/last) and time zone. Some platforms (e.g. Tradingview) do not synchronize bars to full hours or days, but to some arbitrary time. It is therefore normal and usual that even charts of the same date, asset, and source, but from two different platforms, contain different candles.
*   **Compare the indicators.** Are they based on the same algorithm, and return the same value? Some platforms, such as MT4, use simplified algorithms for some indicators and thus get different results. Even with an identical algorithm, cumulative indicators such as EMA or MACD can return different results especially at the begin of the simulation when the platform has a different [unstable period](181_LookBack_UnstablePeriod.md) or does not use lookback or unstable periods at all.
*   Check the **script structure** and **bar creation**. Does it run on any tick or on any bar? Are the bars aligned on the same time? Does it trade with the same [market hours and weekend](200_BarMode.md) settings?
*   **Compare the account simulation**. Are lot size, leverage, margin, rollover fees, and commission considered, and are they identical? Does the platform simulate realistic order filling, or a 'naive' [fill mode](198_Fill_modes.md) that enters and exits trades at the current price or at the pre-set stop or entry levels? Some platforms, even high priced options tools, do not consider spreads, transaction costs, or slippage in their results.
*   **Compare [optimization](016_OptimalF_money_management.md) and [backtest](006_Testing.md) methods**. Is the test in-sample, out-of-sample, or walk-forward? Are parameters optimized with genetic, brute force, or platform specific algorithms? In-sample backtests, as with MT4, produce normally meaningless results.
*   **Compare the** [performance metrics](012_Performance_Report.md). Win rate and profit factor are normally unsuspicious, but other figures such as drawdown, annual return, Sharpe ratio, or volatility are often calculated with very different methods.  
     

### TradeStation™, MultiCharts™, TradeSignal™

**TradeStation** was the first platform that supported automated trading. Its **EasyLanguage**™, also used by **MultiCharts** and in a variant named 'Equilla' by **TradeSignal**, has a similar design philosophy as Zorro's lite-C. Although the EasyLanguage syntax is a mix of C and Pascal, conversion to C is relatively straightforward. EasyLanguage **Vars** are equivalent to C [data series](091_series.md). The first element of a series has no index, thus **MyData** in EasyLanguage is the same as **MyData\[0\]** in C. Keywords are case insensitive and local variables are preserved between function calls. Array indices start with **0** as in C, but in many EasyLanguage code examples you find them starting with **1**. So the arrays are probably allocated with 1 extra element. Trigonometric functions (**Sine**, **Cosine** etc) expect angles in degrees (**0..360**), while in C and in most other languages angles are in radians (**0..2\*PI**). **Log** is the logarithm base **_e_** as in C.

At the time of this writing, EasyLanguage did still not support functions, which is a strong limitation to complex projects. But separate scripts can be called like functions. The execution of an EasyLanguage script is similar to a lite-C script, with a lookback period determined by the **MaxBarsBack** variable. Aside from the function definitions, EasyLanguage strategies and lite-C strategies look very similar.

```c
_{ Easylanguage version }
{ Choppy Market Index Function by George Pruitt }_  
Inputs: periodLength(Numeric);
Vars: num(0),denom(1);
  
if(periodLength <> 0) then  
begin  
  denom = Highest(High,periodLength) – Lowest(Low,periodLength);  
  num = Close\[periodLength-1\] – Close;  
  ChoppyMarketIndex = 0.0;  
  if(denom <> 0) then 
    ChoppyMarketIndex = AbsValue(num/demon)\*100;  
end;
```
```c
_// Zorro version (lite-C)
// Choppy Market Index Function by George Pruitt_  
var ChoppyMarketIndex(int periodLength) 
{
  if(periodLength != 0) {  
    var denom = HH(periodLength) – LL(periodLength);  
    var num = priceClose(periodLength-1) – priceClose(0);  
    if(denom != 0) 
      return abs(num/denom)\*100;
  }
  return 0;  
}
```
```c
_{ Easylanguage version }_
_{ enter a trade when the RSI12 crosses over 75 or under 25 }_
Inputs:  
    Price(Close),LengthLE(20),LengthSE(20),
    OverSold(25),OverBought(75),StoplossPips(100),ProfitTargetPips(100);
 
variables:  
    var0(0),var1(0);
 
_{ get the RSI series }_
var0 = RSI( Price, LengthLE );
var1 = RSI( Price, LengthSE );
 
_{ if rsi crosses over buy level, exit short and enter long }_
condition1 = Currentbar > 1 and var0 crosses over OverBought ;
if condition1 then                                                                    
    Buy( "RsiLE" ) next bar at market;
 
_{ if rsi crosses below sell level, exit long and enter short }_
condition2 = Currentbar > 1 and var1 crosses under OverSold ;
if condition2 then                                                                    
    Sell Short( "RsiSE" ) next bar at market;
 
_{ set up stop / profit levels }_
SetStoploss(StoplossPips);
SetProfitTarget(ProfitTargetPips);
```
```c
_// Zorro version (lite-C)_
_// enter a trade when the RSI12 crosses over 75 or under 25_
function run()
{
  BarPeriod = 60;
_// get the RSI series_
  vars RSIs = series(RSI(seriesC(),20));
 
_// set stop / profit levels and trade duration_
  Stop = 100\*PIP;
  TakeProfit = 100\*PIP;
  LifeTime = 24;
 
_// if rsi crosses over buy level, exit short and enter long_
  if(crossOver(RSIs,75))
    enterLong();
_// if rsi crosses below sell level, exit long and enter short_
  if(crossUnder(RSIs,25))
    enterShort();
}
```
```c
_// calculate some EasyLanguage parameters in lite-C_
int MarketPosition = sign(NumOpenLong-NumOpenShort);
var PriceScale = 100; _// always 100 for stocks and futures_
var MinMove = PIP \* PriceScale; _// Stock: 0.01 \* 100, Emini: 0.25 \* 100_
var PointValue = LotAmount / PriceScale; _// Stock: 0.01, Emini: 0.50_
var BigPointValue = LotAmount;
```
  

### "Meta"-Trader 4 and 5

MT4™ and MT5™ are popular platform for retail traders and provided by many brokers. The **MQL4** / **MQL5** script language of their "Expert Advisors" (EAs) is based on C or C++, which would theoretically allow easy conversion to Zorro. Unfortunately, MQL4 has some issues that make "Expert Advisors" more complex and difficult to convert than scripts of other platforms. The successor MQL5 has even more issues, and consequently has never managed to replace the older MQL4.  
  MQL4 and MQL5 trades require a lot of managing by script. Series are not natively supported, but must be emulated with loops and functions. Some indicators - for instance, ATR - produce different results in MQL4 than in other platforms because they are not based on the standard algorithms, but on special MQL4 variants. Candles are based on local server time, and account parameters are not normalized, so any EA must be individually adapted to the country, broker, and account. To complicate matters further, MQL4 and MQL5 do not use common trade units such as lots and pips, but calculates with "standard lots" and "points" that need to be multiplied with account-dependent conversion factors. Most code in an EA is therefore not used for the trade logic, but for patching all those issues. This results in the long and complex 'spaghetti code' that is typical for MT4 and MT4 EAs.  
  For conversion, first remove the MQL4/MQL5 specific code that is not needed in lite-C, such as trade management loops, broker dependent pip and trade size calculations, and array loops that emulate series. Then the rest can be converted by replacing the MQL4 indicators and trade commands by their lite-C equivalents. Replace **OnTick** either with [tick](089_tick_tock.md) or [run](088_run.md), dependent on whether the code is bar or tick based. Bar indexes are normally shifted by 1, since they refer to the new (incomplete) bar, not to the last (complete) bar. Different indicator algorithms have to be converted or replaced.

```c
_// MQL4 version of the RSI strategy (see above)
// enter a trade when the RSI12 crosses over 75 or under 25_
int start()
{
_// get the previous and current RSI values_
   double current\_rsi = iRSI(Symbol(), Period(), 12, 
     PRICE\_CLOSE, 1); _// mind the '1' - candle '0' is incomplete!!_
   double previous\_rsi = iRSI(Symbol(), Period(), 12, PRICE\_CLOSE, 2);
 
_// set up stop / profit levels_
   double stop = 200\*Point;
   double takeprofit = 200\*Point;

_// correction for prices with 3, 5, or 6 digits
_   int digits = MarketInfo(Symbol(), MODE\_DIGITS);  
   if (digits == 5 || digits == 3) {  
     stop \*= 10;
     takeprofit \*= 10;
   } else
   if (digits == 6) {  
     stop \*= 100;
     takeprofit \*= 100;
   }

_// find the number of trades_ 
   int num\_long\_trades = 0;
   int num\_short\_trades = 0;
   int magic\_number = 12345;  
_// exit all trades in opposite direction_
   for(int i = 0; i < OrdersTotal(); i++)
   {
_// use OrderSelect to get the info for each trade_
     if(!OrderSelect(i, SELECT\_BY\_POS, MODE\_TRADES)) 
       continue;
_// Trades not belonging to our EA are also found, so it's necessary to_
_// compare the EA magic\_number with the order's magic number_
     if(magic\_number != OrderMagicNumber()) 
       continue;

     if(OrderType() == OP\_BUY) {
_// if rsi crosses below sell level_, _exit long trades_
       if((current\_rsi < 25.0) && (previous\_rsi >= 25.0))
         OrderClose(OrderTicket(),OrderLots(),Bid,3,Green);
       else
_// otherwise count the trades_
         num\_long\_trades++;
     }
 
     if(OrderType() == OP\_SELL) {
_// if rsi crosses over buy level_, _exit short trades_ 
       if((current\_rsi > 75.0) && (previous\_rsi <= 75.0))
         OrderClose(OrderTicket(),OrderLots(), Ask,3,Green);
       else
_// otherwise count the trades_
         num\_short\_trades++;
     }
   }
 
_// if rsi crosses over buy level, enter long_ 
   if((current\_rsi > 75.0) && (previous\_rsi <= 75.0) 
     && (num\_long\_trades == 0)) {
       OrderSend(Symbol(),OP\_BUY,1.0,Ask,3,Ask-stop,Bid+takeprofit,"",magic\_number,0,Green);
   }
_// if rsi crosses below sell level, enter short_
   if((current\_rsi < 25.0) && (previous\_rsi >= 25.0) 
     && (num\_short\_trades == 0)) {
       OrderSend(Symbol(),OP\_SELL,1.0,Bid,3,Bid+stop,Ask-takeprofit,"", magic\_number,0,Green);
   }
 
   return(0); 
}
```
Under [Tips & Tricks](246_Tips_Tricks.md) you can find an example how to replicate MQ4-style indicator parameters with Zorro. The above mentioned issues also apply to **MQL5**, the "Meta"-Trader 5 script language. It has some similarities to MQL4, but offers C++ language elements and requires even more complex code for opening and managing trades.  
   

### NinjaTrader™

**NinjaScript**™ is based on C# and thus similar in syntax to Zorro's lite-C. NinjaScript also supports data series in the same way as lite-C, and its basic function list is very similar; this makes script migration rather easy. One major difference is that all NinjaTrader indicator functions return data series, while Zorro indicators return single values. Use the [series](091_series.md) function (f.i. **series(indicator(..))**) for making Zorro indicators also return series.

```c
_// NinjaTrader version
// Trade when a fast SMA crosses over a slow SMA_  
protected override void Initialize()  
{
_// Run OnBarUpdate on the close of each bar_  
  CalculateOnBarClose = true;

_// Set stop loss and profit target at $5 and $10_
  SetStopLoss(CalculationMode.Ticks,5);
  SetProfitTarget(CalculationMode.Ticks,10);
}

protected override void OnBarUpdate()  
{
_// don't trade during the LookBack period_
   if(CurrentBar < 20)   
     return;

   double Fast = 10;
   double Slow = 20;
_// Exit short and go long if 10 SMA crosses over 20 SMA_   
   if(CrossAbove(SMA(Close,Fast),SMA(Close,Slow),1)) {
     ExitShort();  
     EnterLong();
   }  
_// Exit long and go short if 10 SMA crosses under 20 SMA_   
   else if(CrossBelow(SMA(Close,Fast),SMA(Close,Slow),1)) {
     ExitLong();  
     EnterShort();
   }  
}
```
```c
_// Zorro version_
_// Trade when a fast SMA crosses over a slow SMA_  
void run()  
{
_// Set stop loss and profit target at $5 and $10_
  Stop = 5;
  TakeProfit = 10;

  vars SMAFast = series(SMA(seriesC(),10)); 
  vars SMASlow = series(SMA(seriesC(),20)); 

_// Exit short and go long if 10 SMA crosses over 20 SMA_   
   if(crossOver(SMAFast,SMASlow))  
     enterLong();
_// Exit long and go short if 10 SMA crosses under 20 SMA_   
   else if(crossUnder(SMAFast,SMASlow))
     enterShort();
}
```
�  

### Amibroker™

Amibroker's **AFL™** language is a C dialect, with similar syntax as lite-C. But the script structure is different. Amibroker uses "**Buy**" and "**Sell**" variables for entering trades, instead of a function call. And Amibroker calls functions for setting system parameters, instead of using variables. So it's just the opposite of what you would expect. This unusual concept has its reason in a sort of vectorized approach to a trading system, where the code mainly initializes parameters and signal conditions. Variables need not be declared, and they are usually series, as in EasyLanguage. Functions are often very similar to lite-C - for instance, **Plot()** or **Optimize()**. Others can be easily converted, f.i. Amibroker's "**Explore**" feature is equivalent to Zorro's **print(TO\_CSV)**.

```c
_// Amibroker version of the SMA crossing system (see above)
// Trade when a fast SMA crosses over a slow SMA_  
_// Set stop loss and profit target at $5 and $10_
   ApplyStop(stopTypeLoss,stopModePoint,5,0,True,0,0,-1);
   ApplyStop(stopTypeProfit,stopModePoint,10,0,True,0,0,-1);

   SMAFast = MA(C,10);
   SMASlow = MA(C,20);
_// Buy if 10 SMA crosses over 20 SMA_   
   Buy = Cross(SMAFast,SMASlow);
_// Sell if 10 SMA crosses under 20 SMA_   
      Sell = Cross(SMASlow,SMAFast);
```
   

### TradingView™

**TradingView** is a charting tool with a proprietary language named **PineScript™** for defining indicators. Variables are declared by assigning a value to them, and language blocks are defined by indentation, as in Python. Functions are defined with '**\=>**'. Data series are in reverse order compared to other platforms: the **\[0\]** element is the oldest. Aside from that, conversion to C is normally pretty straightforward. Example for a Simple Moving Average:

```c
_// PineScript version
// SMA definition_
study("My sma")
my\_sma(Prices, Length) =>
  Sum = Prices
  for i = 1 to Length-1
    Sum := Sum + Prices\[i\]
  Sum / Length
```
```c
_// C version
// SMA definition_  
var my\_sma(vars Prices,int Length) {
  var Sum = Prices\[0\];
  for(i = 1; i < Length; i++) 
     Sum += Prices\[i\]; 
  return Sum/Length;
}
```
�

### Neuroshell Trader™

**Neuroshell Trader** is a platform specialized in employing a linear neural network for automated trading. Neuroshell indicators are functions added through DLLs. They take an input array, an output array, the array size, and additional parameters. Many other trade platforms use similar DLL based indicators. Such indicators are often based on normal C, thus conversion to Zorro is very easy - especially when you don't have to convert it at all and can [call the DLL function](litec_api.md) directly.  
   When using an indicator made for a different platform, the array order convention must be take care of. Neuroshell stores time series in ascending order (contrary to most other platforms that store them in reverse order) and passes the end of the array, not its begin, to the indicator function. Neuroshell indicators normally return an output series instead of a single value. Below both methods of indicator conversion are shown.

```c
_// Neuroshell version - Entropy indicator
// published by ForeTrade Technologies (entropy.md)_
#include "math.h"
#include "stdlib.h"

\_\_declspec(dllexport) void Entropy (double \*price, double \*entropy, long int size, long int numbars)
{
  double \*in, \*out, P, G;
  long int i,j;
  double sumx = 0.0;
  double sumx2 = 0.0;
  double avgx = 0.0;
  double rmsx = 0.0;

  in=price;
  out=entropy;

  for (i=0; i<size; i++)
  {
    if (i < numbars+1) \*out = 3.4e38;
    else 
    {
      sumx = sumx2 = avgx = rmsx = 0.0;
      for (j=0;j<numbars+1;j++)
      {
        sumx += log(\*(in-j) / \*(in-j-1)) ;
        sumx2 += log(\*(in-j) / \*(in-j-1)) \* log(\*(in-j) / \*(in-j-1));
      }
      if (numbars==0) 
      {
        avgx = \*in;
        rmsx = 0.0;
      }
      else 
      {
        avgx = sumx / numbars;
        rmsx = sqrt(sumx2/numbars);
      }
      P = ((avgx/rmsx)+1)/2.0;
      G = P \* log(1+rmsx) + (1-P) \* log(1-rmsx);
      \*out=G;
    }
    in++; out++;
  }
}
```
```c
_// Zorro version - Entropy indicator
// Method 1 - calling the DLL function directly_
_// Copy the Entropy DLL into the Zorro folder_
int Entropy(double \*price, double \*entropy, long size, long numbars); _// function prototype_
API(Entropy,entropy) _// use the Entropy function from entropy.dll_

var EntropyZ(vars Data,int Period)
{
  Period = clamp(Period,1,LookBack-1); _// prevent exceeding the Data size_ 
  double E; _// single element "array" for receiving the output value_ 
  Entropy(
    Data+Period+1, _// end of the array (element order does not matter here)_
    &E, 1, _        // pointer to the output "array" with size 1_
    Period); 
  return E;
}
```
```c
_// Zorro version - Entropy indicator
// Method 2 - converting the DLL code to lite-C_
var EntropyZ(vars Data,int Period)
{
  Period = clamp(Period,1,LookBack-1); _// prevent exceeding the Data size_ 
  var sumx = 0., sumx2 = 0.;
  int j;
  for (j=0; j<Period; j++) {
    sumx += log(Data\[j\]/Data\[j+1\]);
    sumx2 += log(Data\[j\]/Data\[j+1\]) \* log(Data\[j\]/Data\[j+1\]);
  }
  var avgx = sumx/Period;
  var rmsx = sqrt(sumx2/Period);
  var P = ((avgx/rmsx)+1)/2.;
  return P \* log(1+rmsx) + (1-P) \* log(1-rmsx);
}
```

   

### MatLab™

MatLab is a commercial computing environment and interactive programming language by **MathWorks, Inc**. It has some similarity to [R](rbridge.md), but is not specialized on data analysis and machine learning. It allows symbolic and numerical computing in all fields of mathematics. With interpreted code and accordingly slow execution, it is not suited for backtesting trading strategies (unless they are converted to a vectorized structure, which is however an awkward process). Converting MatLab code to C is also a lot of work due to the very different language syntax. Fortunately there is a better solution: MatLab has an integrated compiler that compiles a MatLab trading algorithm to a C/C++ DLL. The DLL function can then be directly [called from a lite-C script](litec_api.md).  
   

### See also:

[Introduction to lite-C](tutorial_var.md), [Pointers](apointer.md), [Structs](047_Structs.md), [Functions](048_Functions.md), [DLLs](litec_api.md),  [MT4 bridge](mt4plugin.md), [R bridge](rbridge.md), [Python bridge](026_Python_Bridge.md), [C++ to lite-C](litec_c.md), [lite-C to C++](dlls.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))