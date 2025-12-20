---
title: "Currency Strength"
source: "https://zorro-project.com/manual/en/ccy.htm"
---

# Currency Strength

# Currency strength functions

## ccySet(var Strength)

Adds the given **Strength** value to the currency and subtracts it from the counter currency of the current Forex pair. The **Strength** value can be any indicator or other price function that indicates a "strength" or "weakness" of a currrency, for instance ROC or RSI. 

## ccyReset()

Resets the stored strengths of all currencies. Usually called at the begin of every bar before the strengths are summed up by **ccySet**.

## ccyStrength(string Currency): var

Returns the average strength of the given **Currency** (3 letters, f.i. **"USD"**). The average strength is the strength sum of all Forex pairs beginning with **Currency**, minus the strength sum of all Forex pairs ending with **Currency**, divided by the number of Forex pairs. If a currency pair is given (7 letters, f.i. **"EUR/USD"**), the function returns the difference of both average strengths.

## ccyMax(): string

Returns the currency pair with the strongest currency and the weakest counter currency.

## ccyMin(): string

Returns the currency pair with the weakest currency and the strongest counter currency.

### Parameters:

<table border="0"><tbody><tr><td><strong>Strength</strong></td><td>Strength value, for instance the price <a href="ta.htm#roc">rate of change</a>. Must be in the same range for all currency pairs.</td></tr><tr><td><strong>Currency</strong></td><td>Either a single currency (<strong>"USD"</strong>) or a currency pair (<strong>"EUR/USD"</strong>).</td></tr></tbody></table>

### Remarks:

*   Currency strength functions can be used to detect currency price shocks that affect several Forex markets simultaneously (see example).
*   The forex pair name matters: Use the standard names like **"EUR/USD"**, not variants like **"EURUSD"**, **"EUR-USD"** etc.
*   Parameters passed to **ccySet** should be normalized or a percentage or probablitly value so that they are directly comparable for all currencies.
*   The source code of the currency strength functions is contained in **Source\\indicators.c**.

### Example:

```c
_// Currency Strength Strategy /////////////////////_
_// Exploits price shocks f.i. by CHF cap and Brexit_

function run()
{
  BarPeriod = 60;
  ccyReset();	_// reset strengths at begin of any bar_
  string Name;
  while(Name = (loop(Assets)))
  {
    if(assetType(Name) != FOREX) 
      continue; _// Currency pairs only_
    asset(Name);
    vars Prices = series(priceClose());
    ccySet(ROC(Prices,1)); _// store price change as strength_
  }
  
_// get currency pairs with highest and lowest strength difference_
  string Best = ccyMax(), Worst = ccyMin();
  var Threshold = 1.0;

  static char OldBest\[8\], OldWorst\[8\];	_// static for keeping contents between runs_
  if(\*OldBest && !strstr(Best,OldBest)) { _// new strongest asset?_
    asset(OldBest);
    exitLong();
    if(ccyStrength(Best) > Threshold) {
      asset(Best);
      enterLong();
    }
  } 
  if(\*OldWorst && !strstr(Worst,OldWorst)) { _// new weakest asset?_
    asset(OldWorst);
    exitShort();
    if(ccyStrength(Worst) < -Threshold) {
      asset(Worst);
      enterShort();
    }
  }

_// store previous strongest and weakest asset names_  
  strcpy(OldBest,Best);
  strcpy(OldWorst,Worst);
}
```

### See also:

[asset](013_Asset_Account_Lists.md), [ROC](ta.htm#roc)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))