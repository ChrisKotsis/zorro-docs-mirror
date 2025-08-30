---
title: "Trade Variables"
source: "https://zorro-project.com/manual/en/trade.htm"
---

# Trade Variables

# Trade management functions (TMF)

Trade [enter](buylong.md) commands can receive the name of a trade management function (**TMF**) as the first argument: **enterLong(MyTMF, ...);**. Alternatively, a user function named **manage** can be defined as a global TMF for all entered trades:

## int manage()

A TMF is a function for micro managing the trade. It is triggered for any open or pending trade at any price tick or price change of the traded asset. In most cases it's used for modifying entry, stop, or profit limits in a special way, thus overriding the standard trailing methods. Since a TMF runs at every [tick](bars.htm#tick), it has access to the most recent price quote. When the market is closed and no price ticks are received, TMFs are not executed.

TMFs are also executed at special events in the lifetime of a trade: Right before entering or exiting due to an [Entry](188_Stop_Profit_Trail_Entry.md), **[](188_Stop_Profit_Trail_Entry.md)****[Stop](188_Stop_Profit_Trail_Entry.md)**, or **[TakeProfit](188_Stop_Profit_Trail_Entry.md)** limit, and right after being closed. Which event it is can be checked in the TMF with the boolean expressions **TradeIsEntry**, **TradeIsStop**, **TradeIsProfit**, **TradeIsClosed** (described below).

If the TMF is passed to an [enter](buylong.md) command, it can receive up to 8 additional **var** parameters following the function name: **enterLong(MyTMF, parameter1, parameter2...)**. They must also appear in the function's parameter list and keep their values during the lifetime of the trade. The alternative global **manage** function has no parameters.

A TMF has the return type **int** and should normally return **0**; other return values have a special meaning:

### TMF return values

<table><tbody><tr><td><strong>0</strong></td><td>Check the trade's <a href="stop.htm">Entry</a>, <strong><a href="stop.htm">Stop</a></strong>, <strong><a href="stop.htm">TakeProfit</a></strong>, and <a href="stop.htm">Trail</a> parameters, and exit or enter accordingly.</td></tr><tr><td><strong>1</strong></td><td>If the trade is open or pending, exit or cancel it now. If the exit order was unfilled due to an <a href="stop.htm">OrderLimit</a>, automatically repeat the order after the given <a href="timewait.htm">OrderDelay</a>.</td></tr><tr><td style="height: 42px"><strong>2</strong></td><td style="height: 42px">If the trade is pending, enter it now. If the entry order was unfilled due to an <a href="stop.htm">OrderLimit</a>, automatically repeat the order after the given <a href="timewait.htm">OrderDelay</a>.</td></tr><tr><td><strong>4</strong></td><td>If a pending trade is about to be opened because the <a href="stop.htm">Entry</a> price was hit, leave it pending and wait for the next hit. If an open trade is about to be closed because <strong><a href="stop.htm">Stop</a></strong> or <strong><a href="stop.htm">TakeProfit</a></strong> was hit,<strong> </strong>leave it open and wait for the next hit<strong>.</strong></td></tr><tr><td><strong>+8</strong></td><td>Execute the TMF at any bar right before the <a href="run.htm">run</a> call, instead of at any incoming tick.</td></tr><tr><td><strong>+16</strong></td><td>Execute the TMF only at the following events: right before entering due to <a href="stop.htm">Entry</a>, right before exiting due to <strong><a href="stop.htm">Stop</a></strong> or <strong><a href="stop.htm">TakeProfit</a></strong>, and right after the trade was closed.</td></tr></tbody></table>

Some values can be combined by addition. For instance, **return 28**  (28 = 4+8+16) executes the TMF only at the next bar or when [Entry](188_Stop_Profit_Trail_Entry.md), **[](188_Stop_Profit_Trail_Entry.md)****[Stop](188_Stop_Profit_Trail_Entry.md)**, or **[TakeProfit](188_Stop_Profit_Trail_Entry.md)** was hit, and does not automatically enter or exit in that case.   !!  When using a TMF, make sure the function has a **return** statement with the correct value!  
 

# Trade variables

In a selected trade, the variables listed below available for evaluation and partially for modification. Trades are automatically selected in a TMF or in a [trade loop](fortrades.md). They can also be selected by setting the **ThisTrade** pointer, f.i. with **ThisTrade = enterLong();**. In this case check if **ThisTrade** is nonzero, since accessing a variable of a nonexisting trade will cause [Error 111](errors.md). Without a selected trade, i.e. outside a TMF or trade enumeration loop and with no set **ThisTrade** pointer, trade variables have no meaning.

## TradePriceOpen

The average ask price at the time when the trade or contract was filled; or the current ask price if the position was not yet filled.

## TradeFill

The average fill price, equivalent to **TradePriceOpen-ifelse(TradeIsShort,TradeSpread,0).** In the backtest long positions are filled at the ask price, short positions are filled at the bid price.

## TradePriceClose

The average ask price at the time when the position was closed or the contract was sold or covered. If the position is still open, it's the current best ask price of the asset or contract. If an option was exercised or expired, this variable contains the underlying ask price at expiration. In the backtest, short positions exit at the ask price, long positions exit at the bid price, i.e. ask minus spread. If a trade was closed in several steps by partial closing, the price is from the last step.

## TradeValue

The average current value of the trade, equivalent to **TradePriceClose-ifelse(TradeIsLong,TradeSpread,0).**

## TradeSpread

The ask-bid spread at the trade opening time for short trades, or at the current and trade closing time for long trades.

## TradeStrike

The strike price of the traded option (if any).

## TradeUnderlying

The underlying price of the traded option (if any). 

## TradeRoll

The current accumulated rollover/swap of the trade, negative or positive. Calculated by multiplying the trade duration with the trade volume and the [RollLong](191_Spread_Commission.md)/[RollShort](191_Spread_Commission.md) value. Trades that last shorter than 12 hours get no rollover. If [RollLong](191_Spread_Commission.md) and [RollShort](191_Spread_Commission.md) are both at **0**, **TradeRoll** can be modified by the TMF for using a broker-specific swap calculation. If the broker API provides current rollover/swap values for open trades, **TradeRoll** is read from the broker API.

## TradeMarginCost

The margin cost of the trade per underlying unit, set up at entry from **[MarginCost](192_PIP_PIPCost_Leverage.md)**. Can be modified by the TMF for more complex margin calculations. The current allocated margin amount of the trade is **TradeMarginCost \* TradeLots**.

## TradeCommission

The commission cost of the trade per underlying unit, set up at entry from **[Commission](191_Spread_Commission.md)**. Can be modified by the TMF for using different commissions on entry and exit, or for more complex commission calculations.

## TradeProfit

The current profit or loss of the trade in units of the account currency, including costs such as spread, rollover, slippage, and commission. With no trade costs and no spread, the current profit of a trade is **(TradePriceClose-TradePriceOpen)\*TradeUnits**. The volume-neutral profit of the trade in pips is **TradeProfit/TradeUnits/PIP**. On [NFA compliant](mode.htm#nfa) accounts the profit is estimated, as there is no profit assigned to a single trade. If a trade was closed in several steps by partial closing, the profit is taken from the last step.  
  For options, **TradeProfit** is determined by the difference of premium and current contract price. If the option is expired or was exercised, **TradeProfit** is determined by the extrinsic value, i.e. the difference of strike and underlying price minus the premium. For complex products with nonlinear profit, such as inverse futures or options, set **TradeCost** to **0** and calculate **TradeProfit** in a TMF.

## TradeDir

**1** for a long trade and **\-1** for a short trade; translates to **ifelse(TradeIsShort,-1.,1.)**.

## TradeUnits

Conversion factor from price change to win/loss in account currency units; normally **TradeLots\***[PIPCost/PIP](192_PIP_PIPCost_Leverage.md) for assets, or **TradeLots\***[Multiplier](contracts.md) for options or futures in USD. Examples see below. The price move equivalent to a certain profit (not considering spread and commission) is **Profit/TradeUnits**. 

## TradeCost

Effect of 1 pip price change on the win/loss per lot, in account currency units; normally [PIPCost/PIP](192_PIP_PIPCost_Leverage.md). Set this variable to **0** in a TMF when you want to calculate **TradeProfit** by script.

## TradeDate

The time in Windows Date format when a pending trade with [OrderDelay](timewait.md) will be opened. For open trades, the time at which it was opened.

## TradeExitDate

The time in Windows Date format when the trade was closed (for closed trades) or will expire (for open or pending trades). The expiry date of options or futures is **ymd(TradeExitDate)**.

## TradeMFE

Maximum favorable excursion, the maximum price movement in favorable direction of the trade. Only valid after the trade was opened. **TradeMFE\*TradeUnits** is the highest profit of the trade in account currency units while it was open (without trading costs).

## TradeMAE

Maximum adverse excursion, the maximum price movement in adverse direction of the trade. Only valid after the trade was opened. **TradeMAE\*TradeUnits** is the highest loss of the trade in account currency units while it was open (without trading costs).

## TradeEntryLimit

Entry limit; initially calculated from [Entry](188_Stop_Profit_Trail_Entry.md). The trade will be opened when the price reaches this value. Can be modified by the TMF by setting it to the desired price (not to a distance!).

## TradeStopLimit

Current stop level, initially determined from [Stop](188_Stop_Profit_Trail_Entry.md), and modified by trailing. Only valid when the trade is open. The trade will be closed when the price reaches this value. Can be modified by the TMF by setting it to the desired price (not to a distance!).

## TradeStopDiff

Difference of the initial price to the initial stop limit; negative for long trades and positive for short trades. Initially determined from [Stop](188_Stop_Profit_Trail_Entry.md) and only valid when the trade is open. When **TradeStopLimit** was moved by trailing, the original stop position can be retrieved through **TradePriceOpen+TradeStopDiff**.

## TradeProfitLimit

Profit limit, initially calculated from [TakeProfit](188_Stop_Profit_Trail_Entry.md); only valid when the trade is open. The trade will be closed when the price reaches this value. Can be modified by the TMF by setting it to the desired price (not to a distance!). 

## TradeTrailLimit

Trail limit, initially calculated from [Trail](188_Stop_Profit_Trail_Entry.md); only valid when the trade is open and a stop limit was set. The stop limit will be moved when the price reaches this value. Can be modified by the TMF by setting it to the desired price (not to a distance!).

## TradeTrailSlope

Trail slope factor in the range **0..1**; only valid when the price is over the [Trail](188_Stop_Profit_Trail_Entry.md) limit, and a [Stop](188_Stop_Profit_Trail_Entry.md) limit was set. Can be modified by the trade function for changing the trail slope f.i. after breakeven.

## TradeTrailStep

Trail step factor in the range **0..1**; only valid when the price is over the [Trail](188_Stop_Profit_Trail_Entry.md) limit, and a [Stop](188_Stop_Profit_Trail_Entry.md) limit was set. Can be modified by the trade function for changing the trail step f.i. after breakeven.

## TradeTrailLock

Trail lock factor in the range **0..1**; only valid when the price is over the [Trail](188_Stop_Profit_Trail_Entry.md) limit, and a [Stop](188_Stop_Profit_Trail_Entry.md) limit was set. Can be modified by the trade function for changing the trail lock f.i. after breakeven.

### Type:

**float**, read/only if not mentioned otherwise. !!  Convert them to **var** when needed, f.i. for printing them in **print/printf** statements.

## TradeVar\[0\] .. TradeVar\[7\]

## TradeStr\[0\] .. TradeStr\[7\]

## TradeInt\[0\] .. TradeInt\[15\]

A 64-byte area in the **TRADE** struct for storing up to 8 trade-specific variables or strings, or up to 16 integers per trade. They can be accessed and modified by a TMF or a trade enumeration loop. The locations are shared, i.e. either **TradeVar\[N\]** or **TradeStr\[N\]** can be used, but not both with the same index **N**. Two subsequent **TradeInt** are shared with a **TradeVar** at half the index, f.i. **TradeInt\[10\]** and **TradeInt\[11\]** are shared with **TradeVar\[5\]**. **TradeStr** can only be modified with [strcpy](str_.md) and has a maximum length of 7 characters unless extended over adjacent **TradeStr** variables. It is recommended to [define](060_define_undef.md) meaningful names for the variables, like **#define MyLimit TradeVar\[0\]**.  

### Type:

**var**, **string, int** 

## TradeLots

Number of open [Lots](190_Margin_Risk_Lots.md). If the trade was partially closed or partially filled, the number of still open or filled lots. Automatically updated when the broker APIs supports individual trades.

## TradeLotsTarget

Number of lots to be opened. If the trade was only partially filled, **TradeLots** is smaller than **TradeLotsTarget**. To treat an unfilled or partially filled trade as if it were completely filled, set **TradeLots = TradeLotsTarget**.

## TradeLife

Trade [life time](timewait.md) in bars plus 1, or **0** for no time limit.

## TradeBars

The number of bars since the trade was entered (for pending trades) or opened (for open trades). Not valid for resumed trades since they have no opening bar.

## TradeBarOpen

Number of the opening bar of the trade. For pending trades, the number of the bar at which the trade was entered. Can be set to the current bar number (**[Bar](numbars.md)**) for resetting the wait time of pending trades. After the trade is opened, this number must not be changed anymore. It is not valid for resumed trades since they have no opening bar.

## TradeBarClose

Number of the closing bar of the trade, or **0** if the trade is still open.

## TradeContract

The contract type for options and futures, a combination of **PUT**, **CALL**, **EUROPEAN**, **BINARY**, or **FUTURE**.

## TradeID

Trade identifier number, normally identical to the order ticket number in the broker platform. **0** when the trade was not yet opened, **\-1** when the trade is identified not with a number, but with a **TradeUUID** string.

### Type:

**int**  
 

## TradeUUID

The trade identifier string when **TradeID == -1**.

## TradeAlgo

The [algorithm identifier](095_algo.md) of the trade. Also set to [Algo](020_Included_Scripts.md) during a TMF.

## TradeAsset

The [asset](095_algo.md) name of the trade. Also set to [Asset](020_Included_Scripts.md) during a TMF or a [trade loop](fortrades.md).

### Type:

**string**, read/only  
 

## TradeIsShort

Boolean expression. Is **true** when the trade was entered with [enterShort](buylong.md).

## TradeIsLong

Is **true** when the trade was entered with [enterLong](buylong.md).

## TradeIsContract

Is **true** when the trade is an option or future contract.

## TradeIsCall

Is **true** when the trade is a call option.

## TradeIsPut

Is **true** when the trade is a put option.

## TradeIsAsset

Is **true** when the trade used the same asset that was currently selected.

## TradeIsPhantom

Is **true** when the trade was entered in [phantom mode](190_Margin_Risk_Lots.md) for virtual hedging or for equity curve trading.

## TradeIsPool

Is **true** for a pool trade for [virtual hedging](019_Hedge_modes.md).

## TradeIsVirtual

Is **true** for a phantom trade for [virtual hedging](019_Hedge_modes.md).

## TradeIsPending

Is **true** when the trade was not yet opened, f.i. because it was just entered or its [Entry](188_Stop_Profit_Trail_Entry.md) limit was not yet met.

## TradeIsMissed

Is **true** when the enter or exit order was unsuccessful due to an [OrderLimit](188_Stop_Profit_Trail_Entry.md).

## TradeIsOpen

Is **true** when the trade was opened and is not yet closed.

## TradeIsClosed

Is **true** when the trade was completely closed. This is the last TMF execution of the trade. The **TradeProfit** variable contains the final result.

## TradeIsExpired

Is **true** when the [contract](096_contract.md) of the trade was expired.

## TradeIsNewBar

Is **true** in a TMF at the first tick of a new bar.

## TradeIsEntry

Is **true** in a TMF when the [Entry](188_Stop_Profit_Trail_Entry.md) limit was hit. Unless the TMF returns **4**, the trade will now be opened.

## TradeIsStop

Is **true** in a TMF when the **[Stop](188_Stop_Profit_Trail_Entry.md)** limit was hit. Unless the TMF returns **4**, the trade will now be closed and the TMF will then be called a final time with **TradeIsClosed**.

## TradeIsProfit

Is **true** in a TMF when the **[TakeProfit](188_Stop_Profit_Trail_Entry.md)** limit was hit. Unless the TMF returns **4**, the trade will now be closed and the TMF will then be called a final time with **TradeIsClosed**.

### Type:

**bool**, read/only  
 

## ThisTrade

The **TRADE\*** pointer in a trade loop or TMF. All trade variables are accessed through this pointer. The **TRADE** struct is defined in **include\\trading.h**. Its members are the above trade variables, redefined to easier-to-memorize names in **include\\variables.h**. **ThisTrade** can be set by script (f.i. **ThisTrade = enterLong();**) for accessing variables of a just opened trade, but will not keep its value between **run** or **tick** functions.  
 

### Remarks:

*    !!  All trade variables listed above can only be accessed inside a **TMF**, inside a [trade enumeration loop](fortrades.md), or when **ThisTrade** was explicitely set to a valid **TRADE\*** pointer. In all other cases they have no or invalid content. If **ThisTrade** was set from [enterLong/Short](buylong.md), check the pointer for nonzero before accessing a trade variable. Any access to a trade variable will cause an invalid pointer crash when the **ThisTrade** pointer is 0 or not set.
*   Asset specific variables, such as [PIP](192_PIP_PIPCost_Leverage.md), [PIPCost](192_PIP_PIPCost_Leverage.md) etc. are automatically set to the trade asset during a TMF or a trade enumeration loop, unless you explicitely prevent this by switching to a different asset. For using algorithm specific variables in a TMF, such as [trade statistics](winloss.md) or [AlgoVar](196_AlgoVar_AssetVar_AssetStr.md), the [algo](095_algo.md) function must be called in the TMF (see [example](algovar.md)).
*    !!  Most trade variables are of type **float**. They are normally automatically converted to **var** in lite-C, exept for functions that have no fixed variable type such as [printf()](143_printf_print_msg.md). For directly printing trade variables, place a **(var)** before them in the **printf** parameter list to convert them to **var**.
*    !!  Make sure that all TMFs return a value. Ending the TMF function without a return value can cause wrong or random trading behavior.
*   The [TICKS](mode.htm#ticks) flag is often required for testing TMFs that use intrabar prices or enter / exit trades.
*   TMFs can open new trades with [enterLong](buylong.md)/[Short](buylong.md). However be careful when assigning them the same TMF: mistakes in entry conditions can lead to an endless loop of entering new trades. Exit a trade by returning **1**, rather than calling [exitTrade](selllong.md).
*   Trades can be entered and exited by returning **1** or **2** even during the weekend or holidays when price quotes arrive and the [BR\_SLEEP](200_BarMode.md) flag is not set.
*   TMFs can have a heavy performance footprint. For tasks that are not related to a certain trade, using a [tick](089_tick_tock.md) function is preferable to a TMF. For scanning through multiple trades, a [for(open\_trades)](fortrades.md) loop is preferable to a TMF.
*   Functions that affect the program flow - like [loop](109_loop.md), [optimize](107_optimize.md), etc. - can not be called in a TMF. Data [series](091_series.md) cannot be created in a TMF, and indicators that create data series can not be called; but series and indicator values can be evaluated through global variables or [asset/algo specific](196_AlgoVar_AssetVar_AssetStr.md) variables. Static series can be shifted in a TMF using the [shift](126_shift.md) function.
*   The current candle is incomplete within a TMF, so its range and height normally deviates from the other candles. The [price](022_Price_History.md) functions return different values because they get their open, high, and low prices from the incomplete candle.

### Examples (see also [trade loops](fortrades.md)):

```c
_// TMF for adaptive entry / exit by moving OrderLimit every 30 seconds_ 
int adaptLimit()
{
  if(TradeIsMissed) {
    var Step = max(0.2\*Spread,PIP/2);
    OrderDelay = 30;   _// try again in 30 seconds_
    if(!TradeIsOpen) { _// entry limit
_      if(TradeIsLong) {
        if(OrderLimit > TradePriceOpen) 
          return 1;   _// cancel trade_
        OrderLimit += Step;  _// adapt limit
_      } else { _// short_
        if(OrderLimit < TradePriceOpen-Spread) 
          return 1;   
        OrderLimit -= Step;
      }
      OrderLimit = roundto(OrderLimit,PIP/2);
      return 2+16; _// trigger tmf at next event
_    } else { _// exit limit_
      if(TradeIsLong)
        OrderLimit -= Step;
      else
        OrderLimit += Step;
      OrderLimit = roundto(OrderLimit,PIP/2);
      return 1+16; _// trigger tmf at next event
_    }
  }
  return 16; _// trigger tmf at next event_
}
```
```c
_// TMF for calculating the fill amount of a GTC trade from the broker position.
// No other trade with the same asset must be open._
int adaptFill()
{
  if(Live && TradeLots < TradeLotsTarget) {
    TradeLots = (int)brokerCommand(GET\_POSITION,SymbolTrade);
    return 0;
  } else
    return 16;
}
```
```c
_// TMF that moves the stop level in a special way_ 
int trailStopLong()  
{  
_// adjust the stop only when the trade is in profit._  
  if(TradeIsOpen and TradeProfit > 0)  
_// place the stop at the lowest bottom of the last 3 candles_
    TradeStopLimit = max(TradeStopLimit,LL(3));  
_// plot a line to make the stop visible in the chart_  
  plot("Stop",TradeStopLimit,MINV,BLACK);
_// return 0 to let Zorro check the stop/profit limits_  
  return 0;  
}

function run()
{
  set(TICKS);  _// normally needed for TMF_
  ...
  enterLong(trailStopLong);
}
```
```c
_// print profit of every trade_
...
for(open\_trades)
  printf("\\n%s profit %.2f",Asset,(var)TradeProfit);
...
```
```c
_// TMF that opens an opposite trade when stopped out,
// and opens a new trade when profit target is reached (Zorro 1.22 and above)_
int reverseAtStop()
{
  if(TradeIsStop) { _// stop loss hit?_
    if(TradeIsShort)
      enterLong(reverseAtStop); _// enter opposite trade_
    else 
      enterShort(reverseAtStop);
  }
  if(TradeIsProfit) { _// profit target hit?_
    if(TradeIsShort)
      enterShort(reverseAtStop); _// enter same trade again_
    else 
      enterLong(reverseAtStop);
  }
_// call the TMF at stop loss / profit target only_  
  return 16;
}

function run()
{
  set(TICKS);  _// normally needed for TMF_
  Weekend = 3; _// don't run TMF at weekend_

  Stop = 100\*PIP;
  TakeProfit = 100\*PIP;
  if(Bar == LookBack) _// enter the first trade directly at the first bar_
    enterLong(reverseAtStop);
}
```
```c
_// TMF with parameters, for a Chandelier Stop_
int Chandelier(var TimePeriod,var Factor)
{
  if(TradeIsLong)  
    TradeStopLimit = max(TradeStopLimit,ChandelierLong(TimePeriod,Factor));  
  else  
    TradeStopLimit = min(TradeStopLimit,ChandelierShort(TimePeriod,Factor));  
  return 8; _// only update once per bar_  
}

function run()
{
  ...
  if(LongSignal) {
    Stop = ChandelierLong(22,3);
    enterLong(Chandelier,22,3);
  }
  ...
}
```

### See also:

[trade statistics](winloss.md), [enterLong](buylong.md)/[Short](buylong.md), [Stop](188_Stop_Profit_Trail_Entry.md), [LifeTime](timewait.md), [AlgoVar](196_AlgoVar_AssetVar_AssetStr.md), [tick()](089_tick_tock.md), [for(trades)](fortrades.md), [user supplied functions](funclist.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))