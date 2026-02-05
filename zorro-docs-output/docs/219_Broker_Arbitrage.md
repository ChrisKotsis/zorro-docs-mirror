---
title: "Broker Arbitrage"
source: "https://zorro-project.com/manual/en/brokerarb.htm"
---

# Broker Arbitrage

# Broker Arbitrage: Trading with multiple brokers

Trading simultaneously with multiple accounts, brokers, exchanges, or data feeds allows **broker arbitrage**, i.e. exploiting prices differences of the same asset between different market places. Arbitrage opportunities appear for instance when Forex [liquidity providers](214_Brokers_Data_Feeds.md) deviate from each other, or when [market makers](214_Brokers_Data_Feeds.md) do not precisely follow the market. There is no central exchange for currencies and CFDs, so their prices vary from broker to broker. If the price differences temporarily exceed trading costs, you can collect risk-free profits.

[Zorro S](restrictions.md) can simultaneously trade with up to 12 brokers or price data feeds. It allows trading strategies to compare currency or CFD prices between broker A and broker B, and enter a long position with the cheaper broker and a short position with the other. Here's the step by step setup and a code example for taking advantage of Forex/CFD price differences. But be aware that brokers dislike broker arbitrage practices, and may close accounts when they learn that they were exploited in this way.

*   Brokers A and B must not use the same broker plugin Dll. If they do, simply duplicate the DLL in the Plugin folder and give the copy a different name (f.i. **ZorroMT4b.dll**). When both brokers trade through MT4 or MT5, make also sure that you have two different client terminals versions installed, one for broker A and one for broker B, because neither MT4 nor MT5 supports simultaneous trading on multiple accounts. (MT4/MT5 are not really suited for broker arbitrage anyway due to their high latency - you'll normally need a Zorro plugin with a direct API connection).  
     
*   Set up an [account list](013_Asset_Account_Lists.md) with accounts from brokers A and B. Example:  
     
    
    <table cellpadding="2" cellspacing="0" class="hidden-xs" style="width: 100%"><tbody><tr><td class="auto-style1" style="height: 25px"><strong>Name</strong></td><td class="auto-style1" style="height: 25px"><strong>Broker</strong></td><td class="auto-style1" style="height: 25px"><strong>Account</strong></td><td class="auto-style1" style="height: 25px"><strong>User</strong></td><td class="auto-style1" style="height: 25px"><strong>Pass</strong></td><td class="auto-style1" style="height: 25px"><strong>Assets</strong></td><td class="auto-style1" style="height: 25px"><strong>CCY</strong></td><td class="auto-style1" style="height: 25px"><strong>Real</strong></td><td class="auto-style1" style="height: 25px"><strong>NFA</strong></td><td class="auto-style1" style="height: 25px"><strong>Plugin</strong></td></tr><tr><td class="auto-style1">BrokerA</td><td class="auto-style1">AAA</td><td class="auto-style1">0</td><td class="auto-style1">4009876</td><td class="auto-style1">n4qw4ert7</td><td class="auto-style1">AssetsArb</td><td class="auto-style1">USD</td><td class="auto-style1">1</td><td class="auto-style1">0</td><td class="auto-style1">Broker1.dll</td></tr><tr><td class="auto-style1">BrokerB</td><td class="auto-style1">BBB</td><td class="auto-style1">0</td><td class="auto-style1">3456789</td><td class="auto-style1">ab234qrz2</td><td class="auto-style1">AssetsArb</td><td class="auto-style1">USD</td><td class="auto-style1">1</td><td class="auto-style1">0</td><td class="auto-style1">Broker2.dll</td></tr></tbody></table>
    
      
     
*   Set up the account names in the [Symbol](014_Asset_Symbols.md) fields of the used [asset list](013_Asset_Account_Lists.md). If an account name is addedin front of a symbol, the account is used for prices, history, and trading of that asset:  
      
    
    <table style="width: 100%" cellpadding="2" cellspacing="0" class="hidden-xs"><tbody><tr><td class="auto-style1"><strong>Name</strong></td><td class="auto-style1"><strong>Price</strong></td><td class="auto-style1"><strong>Spread</strong></td><td class="auto-style1"><strong>Roll</strong></td><td class="auto-style1"><strong>Roll</strong></td><td class="auto-style1"><strong>PIP</strong></td><td class="auto-style1"><strong>Cost</strong></td><td class="auto-style1"><strong>Margin</strong></td><td class="auto-style1"><strong>Market</strong></td><td class="auto-style1"><strong>Amount</strong></td><td class="auto-style1"><strong>Comm</strong></td><td class="auto-style1"><strong>Symbol</strong></td></tr><tr><td class="auto-style1">EURUSD_A</td><td class="auto-style1">1.17311</td><td class="auto-style1">0.00005</td><td class="auto-style1">0</td><td class="auto-style1">0</td><td class="auto-style1">0.0001</td><td class="auto-style1">0.1</td><td class="auto-style1">-0.01</td><td class="auto-style1">0</td><td class="auto-style1">1000</td><td class="auto-style1">0.6</td><td class="auto-style1">BrokerA:EUR/USD</td></tr><tr><td class="auto-style1">EURUSD_B</td><td class="auto-style1">1.17299</td><td class="auto-style1">0.00007</td><td class="auto-style1">0</td><td class="auto-style1">0</td><td class="auto-style1">0.0001</td><td class="auto-style1">0.1</td><td class="auto-style1">-0.01</td><td class="auto-style1">0</td><td class="auto-style1">1000</td><td class="auto-style1">0.5</td><td class="auto-style1">BrokerB:EUR/USD</td></tr></tbody></table>
    
      
    The symbols select **BrokerA** as price source and trading target for **EURUSD\_A**, and **BrokerB** likewise for **EURUSD\_B**. If you wanted an asset to trade with **BrokerB**, but to get prices from **BrokerA**, you had to split the symbol in two, separated by an exclamation mark: **BrokerB:EUR/USD!BrokerA:EUR/USD**. In the examples below you'll find a small script to automatically combine several asset lists to a multi-broker asset list.  
     
*   For backtesting, use the [Download](022_Price_History.md) script and get **.t1** price histories of the same asset from brokers A and B. Rename the history files to the names used in the asset list (f.i. **EURUSD\_A\_2017.t1** and **EURUSD\_B\_2017.t1**). Run a backtest in **.t1** mode. For an accurate backtest, the historical data must be identical to live data, and have the same resolution. Some brokers, such as **IB** and **Oanda**, deliver historical tick data only in reduced resolution. This data is not suited for broker arbitrage backtests.  
     
*   For live trading, select either **BrokerA** or **BrokerB** from the \[Account\] scrollbox. The selected broker determines the time and price displayed in the \[Server\] window, as well as the displayed balance and equity. For trades, use market orders, not limit orders. If a limit order is not filled with broker A, but filled with broker B, you won't have arbitrage, but are fully exposed to the market risk.  
       
    

### Example:

```c
_// Simple broker arbitrage example ////////////////////////////_
function tick()
{
  asset("EURUSD\_A");
  var SpreadA = Spread, PriceA = priceClose(), 
    CommissionA = Commission\*LotAmount/10000\*PIP/PIPCost; _// convert commission to price difference_ 
  asset("EURUSD\_B");
  var SpreadB = Spread, PriceB = priceClose(), 
    CommissionB = Commission\*LotAmount/10000\*PIP/PIPCost;

  var Threshold = 1.5\*(SpreadA+SpreadB+CommissionA+CommissionB); _// arbitrage threshold_
  var Difference = PriceA - PriceB;

  asset("EURUSD\_A");
  if(NumOpenShort && Difference < 0)
    exitShort();
  else if(NumOpenLong && Difference > 0)
    exitLong();
  else if(!NumOpenShort && Difference > Threshold) _// go short with the expensive asset_
    enterShort();
  else if(!NumOpenLong && Difference < -Threshold) _// go long with the cheap asset_
    enterLong();

  asset("EURUSD\_B");
  if(NumOpenShort && Difference > 0)
    exitShort();
  else if(NumOpenLong && Difference < 0)
    exitLong();
  else if(!NumOpenShort && Difference < -Threshold)
    enterShort();
  else if(!NumOpenLong && Difference > Threshold)
    enterLong();
}

function run()
{
  StartDate = EndDate = 2017;
  LookBack = 0;
  set(TICKS);
  History = "\*.t1";
  assetList("AssetsArb.csv");
  asset("EURUSD\_A");
  asset("EURUSD\_B");
}
```
```c
_// Generate a multi-broker asset list ///////////////////////_
#define LISTS "FXCM","Oanda"
#define ASSETLIST "AssetsMulti"

function main() 
{
  char OutName\[NAMESIZE2\]; _// to store a temporary string_
  strcpy(OutName,strf("History[\\\\%s.csv",ASSETLIST](file://%25s.csv%22,ASSETLIST)));
  file\_delete(OutName);
  string Name, Source = 0;
  while(Name = of(LISTS))
  {
    static char Dest\[40000\]; 
    file\_read(strf("History\\\\Assets%s.csv",Name),Dest,0);
    if(!\*Dest) return quit("Source not found!");
    string Pos = strchr(Dest,'\\n');
_// skip header line after first file
_    if(!Source) Source = Dest;
    else Source = Pos;
    while(Pos) {
      Pos = strchr(Pos+1,',');
      if(!Pos) break;
_// append list name to asset name
_      strcatf(Pos,strf("\_%s",Name));
      int i;
      for(i=0; i<11; i++) _// find Symbol column_
        Pos = strchr(Pos+1,',');
_// append list name as source to symbol
_      strcatf(Pos+1,strf("%s:",Name));
      Pos = strchr(Pos,'\\n');
    }
    file\_append(OutName,Source,0);
  }
}
```

### See also:

[Account list](013_Asset_Account_Lists.md), [Symbols](014_Asset_Symbols.md), [Brokers](214_Brokers_Data_Feeds.md), [TradeMode](018_TradeMode.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))