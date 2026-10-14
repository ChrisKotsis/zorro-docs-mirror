---
title: "Tips & Tricks"
source: "https://zorro-project.com/manual/en/tips.htm"
---

# Tips & Tricks

# Tips & Tricks

In the following you'll find short code snippets for common tasks.

# I. Trade Management

### Change stops and profit targets of all open long trades with the current algo and asset

```c
exitLong(0,NewStop);
exitLong(0,-NewTakeProfit);
```

### If a trade is opened, close all other pending trades

```c
if(NumOpenTotal > 0) 
  for(open\_trades)
    if(TradeIsPending)
      exitTrade(ThisTrade);
```

### Lock 80% profit of all winning trades

```c
for(open\_trades)
  if(TradeIsOpen && !TradeIsPool && TradeProfit > 0) {
    TradeTrailLock = 0.80; _// 80% profit (minus trade costs)_
    if(TradeIsShort)
      TradeTrailLimit = max(TradeTrailLimit,TradePriceClose);
    else
      TradeTrailLimit = min(TradeTrailLimit,TradePriceClose);
  }
```

### Iceberg trade: split a large trade into 10 small trades, one every 30 seconds

```c
for(OrderDelay = 0; OrderDelay < 10\*30; OrderDelay += 30)
  enterLong(Lots/10);
```

### Calculate the value of all open trades with the current asset

```c
var valOpen()  
{
  var val = 0;  
  for(open\_trades)  
        if(strstr(Asset,PrevAsset) && TradeIsOpen)  
      val += TradeProfit;  
  return val;  
}
```

### Monitoring and modifying a certain trade

```c
...
TRADE\* MyTrade = enterlong();
...  
ThisTrade = MyTrade; _// connect trade variables to MyTrade_
var MyResult = TradeProfit; _// evaluate trade variables_
...
exitTrade(MyTrade,0,TradeLots/2); _// exit half the trade_
```

### Basket trading (creating an artificial asset from a 'basket' of real assets)

```c
_// generate a snythetic asset "USD" combined from the USD value of EUR, GBP, and AUD_
var priceUSD()
{
  var p = 0;
  asset("GBP/USD"); p += price();
  asset("AUD/USD"); p += price();
  asset("EUR/USD"); p += price();
  return p;
}

_// basket trade function with stop limit_
int tradeUSD(var StopUSD)
{
  if((TradeIsLong && priceUSD() <= StopUSD) 
    or (TradeIsShort && priceUSD() >= StopUSD)) 
      return 1; _  // exit the trade_
  else return 0;  _// continue the trade_
}

_// open a trade with the synthetic asset and a stop loss_  
void enterLongUSD(var StopDistUSD)
{
  var StopUSD = priceUSD()-StopDistUSD;
  asset("GBP/USD"); enterLong(tradeUSD,StopUSD);
  asset("AUD/USD"); enterLong(tradeUSD,StopUSD);
  asset("EUR/USD"); enterLong(tradeUSD,StopUSD);
}

void enterShortUSD(var StopDistUSD)
{
  var StopUSD = priceUSD()+StopDistUSD;
  asset("GBP/USD"); enterShort(tradeUSD,StopUSD);
  asset("AUD/USD"); enterShort(tradeUSD,StopUSD);
  asset("EUR/USD"); enterShort(tradeUSD,StopUSD);
}
 
_// plot a price curve of the synthetic asset
// (the plot command is linked to the last used asset -
// so "EUR/USD" must be selected in the scrollbox)_
function run() 
{
  set(PLOTNOW);
  plot("USD",priceUSD(),0,RED);
}
```

# II. Indicators & Signals

### Generate an indicator with a different asset, time frame, and shift

```c
_//extended ATR function with individual asset and timeframe (in minutes_)
var extATR(string symbol,int period,int length,int shift)  
{
  ASSET\* previous = g->asset; _// store previous asset_
  if(symbol) asset(symbol);   _// set new asset_
  if(period) TimeFrame = period/BarPeriod;
_// create price series with the new asset / timeframe_  
  vars H = series(priceHigh()),   
    L = series(priceLow()),  
    O = series(priceOpen()),
    C = series(priceClose());
  TimeFrame = 1; _// set timeframe back_
  g->asset = previous; _// set asset back_  
  return ATR(O+shift,H+shift,L+shift,C+shift,length);
}
```

### Calculate the weekend price change for gap trading

```c
_// use 1-hour bars, wait until Sunday Sunday 5pm ET,   
// then get the price change from Friday 5pm ET_
if(dow() == SUNDAY && lhour(ET) == 5) {   
  int FridayBar = timeOffset(ET,SUNDAY-FRIDAY,5,0);  
  var PriceChange = priceClose(0) - priceClose(FridayBar);
  ...  
}
```

### Use a series to check if something happened within the last n bars

```c
_// buy if Signal1 crossed over Signal2 within the last 7 bars_
...
vars crosses = series(0); _// generate a series and set it to 0_
if(crossOver(Signal1,Signal2)
  crosses\[0\] = 1; _// store the crossover in the series_
if(Sum(crosses,7) > 0) _// any crossover within last 7 bars?_
  enterLong();
...
```

### Use a loop to check if something happened within the last n bars

```c
_// buy if Signal1 crossed over Signal2 within the last 7 bars_
...
int i;
for(i=0; i<7; i++)
  if(crossOver(Signal1+i,Signal2+i)) { _// crossover, i bars ago?_
    enterLong();
    break; _// abort the loop_
  }
...
```

### Align a time frame to a certain event

```c
_// Return a timeframe aligned to Event == true
// f.i. TimeFrame = frameAlign(hour() == 0); aligns to midnight_
int frameAlign(BOOL Event)
{
  vars Nums = series(0,-1); _// 1-element static series for storing the bar counter_
  if(!Event) {
    Nums\[0\]++;      _  // count skipped bars
_    return 0;         _// continue the frame_
  } else {
    int Skipped = -Nums\[0\]; _// start a new time frame_
    Nums\[0\] = 0;      _// reset the counter_
    return Skipped;
  }
}
```

### Shift a series into the future

```c
_// the future is unknown, therefore fill 
// all unknown elements with the current value_
vars seriesShift(vars Data,int shift)
{
  if(shift >= 0) _// shift series into the past_
    return Data+shift;
  else { _// shift series into the future_
    int i;
    for(i = 1; i <= shift; i++)
      Data\[i\] = Data\[0\];
    return Data;
  }
}
```

### Use a function or indicator from an external DLL

```c
_// Use the function "foo" from the DLL "bar.dll"
// Copy bar.dll into the Zorro folder_
int foo(double v1,double v2); _// foo prototype_
API(foo,bar) _// use foo from bar.dll_
 
function run()
{
  ...
  int result = foo(1,2);
  ...
}
```

# III. Auxiliary

### Find out if you have a standard, mini, or micro lot account

```c
_// Click \[Trade\] with the script below  
_function run()  
{
  asset("EUR/USD");  
  if(Bar > 0) {  
    if(LotAmount > 99999) 
      printf("\\nI have a standard lot account!");  
    else if(LotAmount > 9999) 
      printf("\\nI have a mini lot account!");  
    else 
      printf("\\nI have a micro lot account!");  
    quit();  
  }  
}
```

### Download historic price data

```c
_// Click \[Trade\] for downloading/updating the latest "NZD/USD" price data_
function main()
{
  NumYears = 6;     _// download up to 6 years data_   assetHistory("NZD/USD",1); _// update the price history_
}
```

### Export historical price data to a .csv file

```c
_// Click \[Test\] for exporting price data to a .csv file in the Data folder  
// The records are stored in the format: time, open, high, low, close 
// f.i. "31/12/12 00:00, 1.32205, 1.32341, 1.32157, 1.32278"
// Dependent on the locale, date and numbers might require a different format_
function run()
{
  BarPeriod = 1440;
  StartDate = 2010;
  EndDate = 2020;
  LookBack = 0;

  string Row = strf(
    "%02i/%02i/%02i %02i:%02i,%.5f,%.5f,%.5f,%.5f\\n",
    day(),month(),year()%100,hour(),minute(),
    priceO(),priceH(),priceL(),priceC());
  if(is(INITRUN))
    file\_delete("Data\\\\export.csv");
  else
    file\_append("Data\\\\export.csv",Row);
}
```

### Export historical price data from MT4 to a .csv file

```c
_// MQL4 EA script. Run it in the Tester.
// The CSV file is stored in Terminals\\Commom\\Files._
int Handle;
int CurrentTime;

_// detect new bar for emulating run()_
int isNewBar()
{
  if(CurrentTime != Time\[0\]){
    CurrentTime= Time\[0\];
    return(1);
  }
  return(0);
}

void OnInit()
{
  string Name = StringConcatenate("MT4\_",Symbol(),".csv");
  Handle = FileOpen( Name,FILE\_CSV|FILE\_WRITE|FILE\_COMMON, ',');
  if(Handle == INVALID\_HANDLE)
    Print("Can't open ",Name,"!"); 
  CurrentTime = Time\[0\];
}

void OnTick() 
{
  if(isNewBar() && Handle != INVALID\_HANDLE) {
    FileWrite(Handle,
      TimeToStr(Time\[1\],TIME\_DATE),
      iOpen(Symbol(),Period(),1),
      iHigh(Symbol(),Period(),1),
      iLow(Symbol(),Period(),1),
      iClose(Symbol(),Period(),1));
  }
}

void OnDeinit()
{
  FileClose(Handle);
}
```

### Print the description of a trade (like "**\[AUD/USD:CY:S1234\]")** in the log

```c
void printTradeID()  
{  
  string ls = "L", bo = "\[", bc = "\]";  
  if(TradeIsShort) ls = "S";  
  if(TradeIsPhantom) { bo = "{"; bc = "}"; }  
  printf("#\\n%s%s:%s:%s%04i%s ",  
    bo,TradeAsset,TradeAlgo,ls,TradeID%10000,bc);  
}
```

### Plot equity curves of single assets in a multi-asset strategy

```c
char name\[40\]; _// string of maximal 39 characters_  
strcpy(name,Asset);  
strcat(name,":");  
strcat(name,Algo);  
var equity = EquityShort+EquityLong;  
if(equity != 0) plot(name,equity,NEW|AVG,BLUE);
```

### Set up strategy parameters from a .ini file at the start

```c
function run()
{
  static var Parameter1 = 0, Parameter2 = 0;
  if(is(INITRUN)) { _// read the parameters only in the first run_
    string setup = file\_content("Strategy\\\\mysetup.ini");
    Parameter1 = strvar(setup,"Parameter1");
    Parameter2 = strvar(setup,"Parameter2");
  }
}
 
_// mysetup.ini is a plain text file that contains
// the parameter values in a format like this:
Parameter1 = 123
Parameter2 = 456_
```

### Check every minute in \[Trade\] mode if an .ini file was modified

```c
var Parameter1 = 0, Parameter2 = 0;
 
function tock() _// run once per minute_
{
  static int LastDate = 0;
  if(LastDate && !Trade) return; _// already updated_
  int NewDate = file\_date("Strategy\\\\mysetup.ini");
  if(LastDate < NewDate) {
    LastDate = NewDate; _// file was modified: update new parameters_
    string setup = file\_content("Strategy\\\\mysetup.ini");
    Parameter1 = strvar(setup,"Parameter1");
    Parameter2 = strvar(setup,"Parameter2");
  }
}
```

# IV. Get Rich Quick

### 90% win rate

```c
function run()
{
  Stop = 10\*ATR(100);
  TakeProfit = Stop/10;
_// open new trade at random after last trade hit its target_
  if(NumOpenTotal == 0) { 
    if(random() < 0)
      enterShort();
    else 
      enterLong();
  }
}
```

### Martingale

```c
function run()
{
  BarPeriod = 1440;
_// set up equal stop and profit limits_
  Stop = TakeProfit = ATR(100);
_// double the stake after every loss_
  Lots = pow(2,LossStreakTotal); _// winning guaranteed..._
_// open new trade at random after last trade hit its target_
  if(NumOpenTotal == 0) { 
    if(random() < 0)
      enterShort();
    else 
      enterLong();
  }
}
```

### Grid Trading

```c
_// helper function for finding trades at a grid line_
bool findTrade(var Price,var Grid,bool IsShort) 
{
  for(open\_trades)
    if((TradeIsShort == IsShort)
      and between(TradeEntryLimit,Price-Grid/2,Price+Grid/2))
        return true;
  return false;
}
  
function run() 
{
  BarPeriod = 1440;
  Hedge = 2; 
  EntryTime = ExitTime = 500;  
  var Price;
  var Grid = 100\*PIP; _// grid spacing_
  var Current = priceClose();
_// place pending trades at 5 grid lines  
// above and below the current price_
  for(Price = 0; Price < Current+5\*Grid; Price += Grid) {
    if(Price < Current-5\*Grid)
      continue;
    if(Price < Current and !findTrade(Price,Grid,true))
      enterShort(0,Price,0,Grid);      
    else if(Price > Current and !findTrade(Price,Grid,false))
      enterLong(0,Price,0,Grid);
  }
}
```

### See also:

[Strategy](031_Strategy_Coding_1_8.md), [Indicators](033_W4a_Indicator_implementation.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))