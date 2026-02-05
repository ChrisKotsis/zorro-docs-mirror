---
title: "results"
source: "https://zorro-project.com/manual/en/results.htm"
---

# results

## results (int Mode, int Num): var

Sums up the results of the most recent trades by different criteria. 

### Parameters:

<table border="0"><tbody><tr><td><strong>Mode</strong></td><td><p>Type of the result sum, a combination of:<strong><br>0</strong>&nbsp;&nbsp;&nbsp;&nbsp; - sum up profits<br><strong>+1</strong>&nbsp;&nbsp; - return number of trades<strong><br>+2</strong>&nbsp;&nbsp; - sum up entry/exit price differences<br><strong>+3</strong>&nbsp;&nbsp; - return average entry price<br><strong>+8</strong>&nbsp;&nbsp; - consider only open trades<br><strong>+16</strong> - consider only closed trades<br><strong>+32</strong> - consider only trades of current asset / algo combination<br><strong>+64</strong> - consider only winning trades<br><strong>+128</strong> - consider only losing trades<br><strong>+256</strong> - consider only long trades<br><strong>+512</strong> - consider only short trades<br></p></td></tr><tr><td><strong>Num</strong></td><td>Number of trades to consider. Enter a large number for all trades.</td></tr></tbody></table>

  

### Remarks:

*   Pending trades or pool trades are not included in the sum, but phantom trades are included.
*   The trade open time is relevant for the trade sequence order.
*   Unlike [Trade statistics](winloss.md) that are updated at any **TickTime**, **results** returns the current trade statistics immediately.

### Examples:

```c
var NumWins = results(1+64,30);	_// Number of winning and won trades_
var NumLosses = results(1+128,30);	_// Number of losing and lost trades_
var Wins = results(2+64,30)/PIP;	_// Total win in pips_
var Losses = results(2+128,30)/PIP;	_// Total loss in pips_
var AvgProfit = ifelse(NumWins+NumLosses > 0,
  (Wins-Losses)/(NumWins+NumLosses),0.); _// Average profit per trade_
var WinRate = ifelse(NumWins+NumLosses > 0,
  NumWins/(NumWins+NumLosses);	_// Win rate of last 30 trades_
```
 

### See also:

[Trade statistics](winloss.md), [for(trades)](fortrades.md), [strategy statistics](116_Statistics_Transformations.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))