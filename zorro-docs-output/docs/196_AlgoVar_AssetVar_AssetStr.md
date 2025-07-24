---
title: "AlgoVar, AssetVar, AssetStr"
source: "https://zorro-project.com/manual/en/algovar.htm"
---

# AlgoVar, AssetVar, AssetStr

## AlgoVar\[0\] .. AlgoVar\[7\], AlgoVar2\[0\] .. AlgoVar2\[7\]

16 general purpose variables for storing values specific to the current asset/algo combination. Every strategy component has its own set of **AlgoVar** variables; the sets are automatically switched with any [algo](095_algo.md) or [asset](013_Asset_Account_Lists.md) call. The variables are stored in **STATUS** structs and can be used in portfolio strategies for values that are common to the algorithm, but different for every component of the strategy. They can also be used to pass asset/algorithm specific parameters to a [TMF](018_TradeMode.md), or for storing parameters when a system is stopped and restarted.

## AlgoPtr\[0\] .. AlgoPtr\[7\], AlgoPtr2\[0\] .. AlgoPtr2\[7\]

15 general purpose **void\*** pointers, for storing algo specific series, arrays, or other pointers. Shared with **AlgoVar**. Supported in 32 and 64 bit modes, but with different pointer size, so keep them at the begin of the array starting with **\[0\]**. Requires a typecast in **.cpp** code.

### Types:

**var, void'  
** 

## AssetVar\[0\] .. AssetVar\[15\]

## AssetStr\[0\] .. AssetStr\[15\]

16 general purpose locations for storing either numeric values, or strings specific to the current asset. Every asset has its own set of **AssetVar/AssetStr** variables; the sets are automatically switched with any [asset](013_Asset_Account_Lists.md) call. The locations are shared, i.e. either **AssetVar\[N\]** or **AssetStr\[N\]** can be used, but not both with the same index **N**. The first 8 variables or strings can be read at start from the [asset list](013_Asset_Account_Lists.md) and stored in the **ASSET** structs. They can be used in portfolio strategies for parameters that are common to the algorithms, but different for every asset. **AssetStr** can only be modified with [strcpy](str_.md) and has a maximum length of 7 characters. Use double quotes (like **"Text"**) for **AssetStr** strings in the asset list for distinguishing them from numbers.

## AssetInt\[0\] .. AssetInt\[31\]

## AssetFloat\[0\] .. AssetFloat\[31\]

32 general purpose **int** or **float** variables for internally storing integers or floats specific to the current asset. They are script-only and not read from the asset list. Two subsequent **AssetInt** or **AssetFloat** are shared with **AssetVar/AssetStr** at half the index, i.e. **AssetVar\[10\]** shares its location with **AssetInt\[20\]** and **AssetInt\[21\]**. **AssetInt** can also be used to store asset-specific **series** or pointers in 32-bit mode.  

## AssetPtr\[0\] .. AssetPtr\[15\]

15 general purpose **void\*** pointers, for storing asset specific series, arrays, or other pointers. Shared with **AssetVar**. Supported in 32 and 64 bit modes, but with different pointer size, so keep them at the begin of the array starting with **\[0\]**. Requires a typecast in **.cpp** code.

### Types:

**var, char\*, int, float, void'** 

## AssetO, AssetH, AssetL, AssetC, AssetP

Arrays of size [NumBars](180_Bar_NumBars.md) in ascending order (no [series](series.md)), containing the open, high, low, close, and mean prices of the current asset for direct access. **AssetC\[Bar\]** is the current close price. In portfolio strategies with assets of different history lengths, not all elements of the arrays are filled. Unfilled elements are zero.

### Type:

**var\***  
     

### Remarks:

*   The variables use the **Skill** arrays of **TRADE** and **STATUS** structs and are defined in **variables.h**.
*   Dependent on the [SAV\_ALGOVARS](loadstatus.md) flag, the **AlgoVar** and **AlgoVar2** variables of all algo/asset components are automatically saved and loaded at the end and after the initial run of a trading session. This way their values are preserved when a trading system is interrupted or restarted (note that pointers are not preserved, but must be assigned at start). Otherwise **AlgoVars** and **AssetVars** are reset to **0** at the begin of a simulation.
*   When training or predicting with an [R machine learning algorithm](advisor.md), **AlgoVar\[0\]..AlgoVar\[7\]** are automatically sent over to R and can there be used for setting up parameters to the learning process.
*   AlgoVar vs static series vs static variables: All three can be used to persistently store per-component numerical parameters. If saving, loading, or reading from the asset list is important, use **AlgoVar**s or **AssetVar**s. If you need more than 16 persistent variables per component, use static [series](091_series.md) (with negative length for not shifting). If the script trades only a single asset and a single algo, you can also use static or global [variables](aarray.md).
*   The [#define](060_define_undef.md) statement can be used for giving **AlgoVar**s or **AssetVar**s meaningful names, like **#define LastWeeksPrice AlgoVar\[0\]**. To store a pointer instead of a **var**, use the **as\_int()** macro, like **#define MyPtr as\_int(AlgoVar\[0\])**.

### Examples:

```c
_// in the run function_
...
algo("XYZ");
AlgoVar\[0\] = 123;
...

_// in the TMF_
...
algo("XYZ");
var MySpecificValue = AlgoVar\[0\];
...
```

### See also:

[algo](095_algo.md), [asset](013_Asset_Account_Lists.md), [TradeVar](018_TradeMode.md), [SAV\_ALGOVARS](loadstatus.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))