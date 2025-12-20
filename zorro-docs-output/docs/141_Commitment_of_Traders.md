---
title: "Commitment of Traders"
source: "https://zorro-project.com/manual/en/cot.htm"
---

# Commitment of Traders

# Commitment Of Traders Report

The Commitments of Traders (COT) is a market report by the Commodity Futures Trading Commission (CFTC), listing the holdings of participants in futures of financial instruments, metals, and other commodities. It is believed by some traders to give insight into the upcoming development of those markets. The CFTC releases a new report every Friday at 3:30 p.m. Eastern Time, and the report reflects the commitments of traders on the prior Tuesday.

\*\*\* The COT report is currently unavailable due to the switch from Quandl to NASDAQ. We will update the URLs and data format in a future version. \*\*\*

The following functions return selected parts of the COT report, and work likewise in backtest and live trading:

## COT (int Handle, string Code, int Field): var

Downloads the COT report with the given Quandl **Code** and stores it in the dataset with the given **Handle**. Returns the position determined by the **Field** number for the time of the current bar. If the dataset already exists, the data is not loaded again, but only the position returned.

## COT\_CommercialPos (int Handle, string Code): int

As before, but returns the net commercials position, i.e. the difference producer + swap dealer longs - producer + swap dealer shorts.

## COT\_CommercialIndex (int Handle, string Code, int TimePeriod): var

As before, but returns the commercials net position [normalized](071_cdf_erf_dnorm_qnorm.md) over the given **TimePeriod** and scaled to 0..100.

## COT\_OpenInterest (int Handle, string Code): var

As before, but returns the open interest.

### Returns:

Positions, net positions, or index.

### Parameters:

<table border="0"><tbody><tr><td><strong>Handle</strong></td><td>Dataset handle for storing the report. Every report needs a dedicated handle.</td></tr><tr><td><strong>Code</strong></td><td>The Quandl code number of the report; normally 6 digits or letters. Can be looked up under <a href="https://www.quandl.com/data/CFTC-Commodity-Futures-Trading-Commission-Reports" target="_blank">https://www.quandl.com/data/CFTC-Commodity-Futures-Trading-Commission-Reports</a>. The <strong>"CTFC/"</strong> prefix and <strong>"_F_ALL"</strong> suffix of the Quandl database are automatically added.</td></tr><tr><td><strong>Field</strong></td><td>The field of the report: <strong>1</strong> = open interest, <strong>2</strong> = producer long positions, <strong>3</strong> = producer short positions, <strong>4</strong> = swap dealer long positions, <strong>5</strong> = swap dealer short positions, <strong>6</strong> = noncommercials long positions, <strong>7</strong> = noncommercials short positions.&nbsp;</td></tr><tr><td><strong>TimePeriod</strong></td><td>The number of bars for normalizing the index.</td></tr></tbody></table>

### Remarks:

*   For retrieving the COT report, [Zorro S](restrictions.md) and a Quandl key is required (to be entered in [Zorro.ini](ini.md)).
*   The report is only downloaded when needed at the begin of the strategy. Subsequent function calls access the dataset only. Downloaded reports are stored in the **History** folder.
*   The source code of COT functions can be found in **contract.c**, which must be included. Note that the functions use the new COT report structure with the field names listed in the comment. If you're downlaoding a COT report with a different structure, copy the **COT** functions in your script and adapt the conversion string as described under [dataParse](125_sortData_sortIdx.md).

### Example:

```c
#include <contract.c>

_// Database symbols and codes below are just for illustration.
// Current available symbols can be found on the Quandl / NASDAQ website._
function run()
{
  StartDate = 2018;
  EndDate = 2023;
  BarPeriod = 1440;
  LookBack = 12\*20;
  set(PLOTNOW);
  
  assetAdd("GOLD","YAHOO:GC=F");
  asset("GOLD");
  string COT\_Code = "088691";
  var Ind = COT\_CommercialIndex(1,COT\_Code,6\*20); _// gold COT report_
  plot("Fast Index",Ind,NEW,RED);
  var Ind2 = COT\_CommercialIndex(1,COT\_Code,12\*20);
  plot("Slow Index",Ind2,0,BLUE);
  var Ind3 = COT\_OpenInterest(1,COT\_Code);
  plot("Open Interest",Ind3,NEW,BLACK);
}
```

### See also:

[asset](013_Asset_Account_Lists.md), [season](138_Seasonal_Strength.md), [dataFromQuandl](125_sortData_sortIdx.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))