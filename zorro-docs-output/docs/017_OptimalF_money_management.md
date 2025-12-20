---
title: "OptimalF, money management"
source: "https://zorro-project.com/manual/en/optimalf.htm"
---

# OptimalF, money management

# Money Management and Capital Assignment Factors

For re-investing profits or assigning capital to portfolio components, Zorro can determine the optimal capital assignment factors - named **OptimalF** - for components in a portfolio strategy. For this, it evaluates the component's trade history for calculating the investment amount that generates the maximum end profit while avoiding a negative balance. For instance, if **OptimalF** is **0.05**, then the suggested invested margin is 5% of the available capital. The margin can be smaller - for reasons mentioned in [workshop 6](tutorial_kelly.md), you should use the square root rule for reinvesting - but it must not be higher. The **OptimalF** algorithm was developed by Ralph Vince and described in several publications (see [books](links.md)).

**OptimalF** factors can also be used for allocating the capital to the components of a multi-asset system under certain conditions. The total allocated margin must be at any time small compared to the total invested capital. This is normally the case for trading systems with independent assets on leveraged accounts, where the capital is mostly needed for buffering drawdowns. The suggested margin of a trade is then the available capital multiplied with **OptimalF**. There are several methods to determine the available capital of a portfolio component; a method on the conservative side is dividing the initial total capital by the square root of components and multiplying it with the square root of gains (see example). Systems that don't fulfil the requirements, for instance portfolio rebalancing systems that are always in the market with 100% capital, normally use other algorithms such as [mean\_variance](105_markowitz.md) or [momentum-based weights](129_filter_renorm.md) for distributing the capital.

For generating **OptimalF** factors, set the [FACTORS](018_TradeMode.md) flag. The factors are then calculated in a special test run at the end of the \[Train\] process, and stored in a file **Data\\\*.fac**. It's a simple text file that looks like this:

```c
AUD/USD:ES          .036  1.14   45/87     0.1
AUD/USD:ES:L        .036  1.14   45/87     0.1 
AUD/USD:ES:S        .000  ----    0/0      0.0  
EUR/USD:VO          .027  2.20   24/23     3.3  
EUR/USD:VO:L        .027  1.58   12/11     0.9 
EUR/USD:VO:S        .032  2.90   12/12     2.5 
NAS100:ES           .114  1.42   63/90     4.6 
NAS100:ES:L         .101  1.39   33/44     2.1  
NAS100:ES:S         .128  1.46   30/46     2.5  
USD/CAD:BB          .030  1.41   19/25     1.3 
USD/CAD:BB:L        .030  1.41   19/25     1.3  
USD/CAD:BB:S        .000  ----    0/0      0.0  
USD/CAD:HU          .012  1.74   48/36     3.3  
USD/CAD:HU:L        .066  1.42   24/20     0.2 
USD/CAD:HU:S        .012  1.79   24/16     3.1  
USD/CHF:CT          .104  1.60   16/17     0.6  
USD/CHF:CT:L        .104  1.60   16/17     0.6  
USD/CHF:CT:S        .000  ----    0/0      0.0  
USD/CHF:CY          .025  1.10   21/24     0.1  
USD/CHF:CY:L        .025  1.10   21/24     0.1  
USD/CHF:CY:S        .000  ----    0/0      0.0 
USD/CHF:HP          .025  1.45   31/48     3.2 
USD/CHF:HP:L        .000  ----    0/0      0.0 
USD/CHF:HP:S        .025  1.45   31/48     3.2  
USD/CHF:VO          .011  3.93   17/8      7.6 
USD/CHF:VO:L        .011  3.93   17/8      7.6 
USD/CHF:VO:S        .000  ----    0/0      0.0
```

The first column identifies the component; it consists of the asset name and the [algorithm identifier](095_algo.md). "**S**" or "**L**" are separate statistics for short or long trades. The second column contains the **OptimalF** factors for that component. The higher the factor, the more capital should be invested in the strategy component. Since calculated separately for any component, the factors do not sum up to 1. A **0** indicates that this component should not be traded. The further columns contain the profit factor, the number of winning and losing trades, and the weight of the component.

As the factors are stored in a simple text file, they can be edited anytime with a text editor, even while live trading. Zorro detects if factors have been changed, and automatically reloads them. If the factors are evaluated in the strategy, as in some of the [Z strategies](zsystems.md), a component can be excluded from further trading by setting its factor to zero, or by placing a minus sign in front of it for making it negative.

### Variables

When **OptimalF** factors have been generated, they can be accessed or modified with the following variables:

## OptimalF

## OptimalFLong

## OptimalFShort

**OptimalF** factors, combined for long/short and separately for long and short trades of the current strategy component that is selected with the [asset](013_Asset_Account_Lists.md) and [algo](095_algo.md) functions. For long-only systems, only **OptimalFLong** is relevant. The margin to be invested per trade can be calculated by multiplying the investment amount with **OptimalF**. If a component was unprofitable in the training run, its **OptimalF** factor is zero.

## OptimalFRatio

Set this in \[Train\] mode to generate **OptimalF** factors with the given ratio of the highest to the lowest factor (default = 0 = no ratio). For instance, at **OptimalFRatio = 3** large factors are reduced and small factors are increased so that the highest **OptimalF** factor is 3 times the lowest factor. The average of all factors remains unchanged. Useful for preventing large component margin differences when using **OptimalF** factors in portfolio systems.  
  

### Remarks

*   In a portfolio system, **OptimalF** is separately calculated for any component of a [loop](109_loop.md), and is not affected by the other components. Every [algo](095_algo.md) and [asset](013_Asset_Account_Lists.md) call switches the **OptimalF** variable to the factors belonging to the new component.
*   In \[Train\] mode or when the [FACTORS](018_TradeMode.md) flag is not set, the **OptimalF** factors are **1** unless modified by script. In \[Test\] and \[Trade\] mode the **OptimalF** factors are read from the **.fac** file in the [FIRSTRUN](013_Asset_Account_Lists.md), and are **0** before.
*   If all trades of a component are won, its **OptimalF** is **1.0**. If the balance curve has so little drawdown that theoretically the full capital can be invested in that component. **OptimalF** is **0.999** (still, investing the full capital in a component is normally not recommended). Profitable components have a **OptimalF** between **0.001 and 0.999**. If a component is unprofitable, **OptimalF** is **0.000**. Unexpected small **OptimalF** factors for very profitable components can indicate that either some trades had extreme losses, or that some parameters in the asset list, for instance [MarginCost](192_PIP_PIPCost_Leverage.md), are wrong.
*   In Ralph Vince's publications, **OptimalF** is defined in a slightly different way, requiring a formula containing the maximum loss for calculating the number of lots of a trade. Zorro's **OptimalF** factors are already adjusted by the maximum loss, and thus can be directly multiplied with the capital for getting the optimal margin.
*   The **OptimalF** factors calculation requires a relatively high number of trades per component - ideally more than 100 - for being statistically significant. For this reason, **OptimalF** factors are normally calculated over the whole backtest period even when [WFO](numwfocycles.md) is enabled. This violates the out-of-sample test philosophy, so the backtest performance can be slightly on the optimistic side. For enforcing a totally out-of-sample test, the **[ALLCYCLES](016_OptimalF_money_management.md)** training mode can be set to calculate **OptimalF** factors separately per WFO cycle, albeit in reduced quality due to the smaller number of trades.
*   **OptimalF** is affected by maximum losses in the trade history, and thus tends to decrease when the test period increases. The reason is the same as the drawdown dependency on the test period discussed under [performance](012_Performance_Report.md). 
*   The **OptimalF** calculation assumes that one trade is executed after the other. If the strategy opens several trades simultaneously, as in a portfolio system, divide the investment either by the maximum number of simultaneously open trades, or by the square root of components.
*   **OptimalF** is not suited for strategies that always invest 100% of the capital, such as portfolio rotation or options trading. Instead use [mean-variance](105_markowitz.md) optimized or [momentum-based weights](129_filter_renorm.md) for portfolio rotation strategies.
*   OptimalF factors can be alternatively calculated by script with a user-defined algorithm. For this set both [FACTORS](018_TradeMode.md) and [NOFACTORS](018_TradeMode.md) flags, set **OptimalFRatio** to 0, and set **OptimalF**, **OptimalFLong**, **OptimalFShort** to the script calculated values at the end of the **FACTORS** training run (**if(is(FACCYCLE)) ...**).

### Examples of different investment methods (see also [workshop 6](tutorial_kelly.md)):

```c
_// multi-asset system: reinvest the square root of profits separately per component and long / short trades_
var AvailableCapital = Capital/sqrt(Number\_Of\_Components);
Margin = ifelse(For\_A\_Long\_Trade,OptimalFLong,OptimalFShort)\*AvailableCapital\*sqrt(1+(WinLong-LossLong)/AvailableCapital);
 
_// single-asset system: reinvest the square root of your total profits_
Margin = OptimalF \* Capital \* sqrt(1 + (WinTotal-LossTotal)/Capital);
```

### See also:

[Margin](190_Margin_Risk_Lots.md)[](buylong.md), [Win/Loss](winloss.md), [Markowitz](105_markowitz.md), [Performance](012_Performance_Report.md), [TrainMode](016_OptimalF_money_management.md), [Tutorial](tutorial_kelly.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))