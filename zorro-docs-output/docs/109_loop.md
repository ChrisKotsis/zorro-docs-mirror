---
title: "loop"
source: "https://zorro-project.com/manual/en/loop.htm"
---

# loop

## loop(string Name1, string Name2, ... ) : string

## loop(Assets) : string

## loop(Algos) : string

Enumerate assets or algos for training their parameters or rules separately. The **loop** function gets many pointers, such as asset or algo names, as arguments. In \[Test\] and \[Trade\] mode it returns the first pointer on the first call, the next pointer on the next call and so on. It returns **0** after the last pointer of its arguments. In \[Train\] mode it returns the first pointer in the first component training cycle, the next one in the next cycle and so on. Component training cycles end after the last pointer. Alternatively the single [Assets](020_Included_Scripts.md) or [Algos](020_Included_Scripts.md) pointer can be given for enumerating asset or algo names.

## of(string Name1, string Name2, ... ) : string

## of(Assets) : string

## of(Algos) : string

Enumerate pointers as above, but for general purposes and without the special behavior in \[Train\] mode.

### Returns

**Name1** on the first call or training cycle, **Name2** on the next call or training cycle, and so on. The last call or cycle returns **0**.

### Parameters:

<table border="0" cellpadding="2" cellspacing="2"><tbody><tr valign="top"><td><strong>Name1, Name2 ...</strong></td><td><p>Up to 40 arguments, all different, usually <strong>strings</strong> with an asset or algo name.</p></td></tr><tr><td><strong>Assets</strong></td><td><p><a href="script.htm">Predefined array</a> with all asset names; used for enumerating all assets in the <a href="account.htm">asset list</a>.</p></td></tr><tr valign="top"><td><strong>Algos</strong></td><td><p><a href="script.htm">Predefined array</a>, set up by script to a list of all algo names.</p></td></tr></tbody></table>

   
The following variables are valid after a **loop** call (not for **of**):

## Loop1

## Loop2

Current return value of the first and second **loop**, normally the current asset/algo name.

## Itor1

## Itor2

Current cycle number of the first and second **loop**, starting with **0**.

## NumLoops1

## NumLoops2

Total number of cycles of the first and second **loop**.  
 

### Remarks:

*   In \[Train\] mode the **loop** function is handled in a special way. A complete training cycle is executed for every **loop** pointer. This ensures that parameters, rules, and factors are generated separately for every strategy component. The [algo](095_algo.md) function can be used to identify the strategy component in the parameter, factor, or rule file (see the example in [Workshop 6](tutorial_kelly.md)).
*   Up to two **loop** calls in fixed order can be placed in the [run](088_run.md) function, usually either an asset **loop**, or an algo **loop**, or an algo **loop** nested in the asset **loop**. For multiple loops through assets or algos, or for enumerating components outside the **run** function, use either **of()** or [for(...assets)](fortrades.md) / [for(...algos)](fortrades.md).
*   Do not abort code inside **loop** or **of** with **break** or **return**, or else the remaining assets or algos won't be executed. Use **continue** for prematurely aborting a loop and continuing with the next pointer.
*   Do not enumerate assets in a **loop** call when you only want to train common parameters, such as the holding time for a portfolio rotation. Use **of** insteead.
*   The returned string or pointer remains valid until the next **loop** or **of** call. For storing asset or algo specific information in a loop, use a [AlgoVar](196_AlgoVar_AssetVar_AssetStr.md), or a [series](091_series.md), or global arrays.

### Examples (see also Workshop 6):

```c
_// of() nesting_
string Str1,Str2,Str3;
while(Str1 = of("AA","BB","CC"))
while(Str2 = of("XX","YY","ZZ"))
while(Str3 = of("11","22","33"))
  printf("\\n %s %s %s",Str1,Str2,Str3);

_// filling a string array_
string Strings\[5\];
for(i=0; Strings\[i\]=of("A","B","C","D","E"); i++);
```
```c
_// portfolio strategy with 3 assets and 3 trade algos, 
// all components separately trained, using loop()_
 
function tradeTrendLong()
{
  var MyParameter = optimize(...);
  ...
}
 
function tradeTrendShort()
{
  var MyParameter = optimize(...);
  ...
}

function tradeBollinger()
{
  var MyParameter = optimize(...);
  ...
}
 
function run()
{
  while(asset(loop("EUR/USD","USD/CHF","GBP/USD"))) _// loop through 3 assets_
  while(algo(loop("TRL","TRS","BOL"))) _// and 3 different trade algorithms_
  { 
    if(Algo == "TRL") tradeTrendLong();
    else if(Algo == "TRS") tradeTrendShort();
    else if(Algo == "BOL") tradeBollinger();   
  }
}
```
```c
_// portfolio strategy with 3 assets and 3 trade algos, 
// with common trained_ parameters
 
var CommonParameter;

function tradeTrendLong()
{
  ...
}
 
function tradeTrendShort()
{
  ...
}

function tradeBollinger()
{
  ...
}
 
function run()
{
  asset("EUR/USD"); _// select one of the assets for the common parameter_
  CommonParameter = optimize(...);

  while(asset(of("EUR/USD","USD/CHF","GBP/USD"))) _// loop through 3 assets witrh no specific optimization_
  {
    algo("TRL"); tradeTrendLong();
    algo("TRS"); tradeTrendShort()
    algo("BOL"); tradeBollinger()
  }
}
```
```c
_// portfolio strategy with 3 assets and 3 trade algos, 
// with a combination common and separately trained_ parameters, 
// using of()
 
var CommonParameter,MyParameter1,MyParameter2,MyParameter3;

function tradeTrendLong()
{
  _// uses CommonParameter,MyParameter1;_  ...
}
 
function tradeTrendShort()
{
  _// uses CommonParameter,MyParameter2;_  ...
}

function tradeBollinger()
{
  _// uses CommonParameter,MyParameter3;_  ...
}
 
function run()
{
  ...
  asset("EUR/USD"); _// select asset for optimize()_

  CommonParameter = optimize(...);
  MyParameter1 = optimize(...);
  MyParameter2 = optimize(...);
  MyParameter3 = optimize(...);
  while(asset(of("EUR/USD","USD/CHF","GBP/USD"))) _// loop through 3 assets
_  while(algo(of("TRL","TRS","BOL"))) _// and 3 different trade algorithms
_  { 
    if(Algo == "TRL") tradeTrendLong();
    else if(Algo == "TRS") tradeTrendShort();
    else if(Algo == "BOL") tradeBollinger();   
  }
}
```

### See also:

[optimize](107_optimize.md), [while](053_while_do.md), [algo](095_algo.md), [asset](013_Asset_Account_Lists.md), [Assets](020_Included_Scripts.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))