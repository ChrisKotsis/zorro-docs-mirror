---
title: "SaveMode"
source: "https://zorro-project.com/manual/en/loadstatus.htm"
---

# SaveMode

## saveStatus(string FileName)

## loadStatus(string FileName)

Saves and loads the current trading status to a **.trd** file in the **Data** folder. The file contains the status of open real and phantom trades, the status of the sliders, and component specific variables ([AlgoVar](algovar.md)). This function can be used to resume trading at the last stored state in case of a server crash or reboot, or to let a fallback server take over the trading in case of a hardware failure.  

### Parameters:

<table border="0"><tbody><tr><td><strong>FileName</strong></td><td><p>Name and path of the file, or <strong>0</strong> for a default name like <strong>"Data\\scriptname.trd"</strong>.</p></td></tr></tbody></table>

  

## SaveMode

This variable determines by several flags what's saved or loaded in the **.trd** file in \[Trade\] mode or when calling the [saveStatus](loadstatus.md)/[loadStatus](loadstatus.md) functions.

### Flags:

**SV\_SLIDERS**  - save/load slider positions (default).  
**SV\_ALGOVARS**  - save/load all [AlgoVars](196_AlgoVar_AssetVar_AssetStr.md) (default).  
**SV\_ALGOVARS2** - save/load all [AlgoVars2](196_AlgoVar_AssetVar_AssetStr.md).  
**SV\_TRADES**  - save/load all open trades (default).  
**SV\_STATS**  - save/load [statistics data](winloss.md), to be continued in the next session**.  
SV\_BACKUP**  - after loading, save a backup of the **.trd** file (default).  
**SV\_HTML**  - after loading trades in \[Test\] mode, generate a HTML file with the list of open trades.

### Type:

**int**

### Remarks:

*   Depending on **SaveMode**, the system status is automatically loaded in \[Trade\] mode at session start from a **Data\\\*.trd** file.The file is updated at any trade or at the end of a [trading](004_Trading_Strategies.md) session. Set **SaveMode = 0** for preventing the automatic saving and loading. In \[Test\] mode the **saveStatus**/**loadStatus** functions can be used for saving or loading.
*   The flags can be combined by adding (see example), and can be separately set or reset with the **setf** and **resf** macros.
*   For properly resuming statistics from the previous session, the end of that session must be within the [LookBack](181_LookBack_UnstablePeriod.md) period of the current session.
*   All needed assets and algos must have been selected in the initial run for loading their **AlgoVars**; slider ranges must have been set in the initial run for loading slider positions. Static variables that have an effect on trade handling must be restored with [putvar](150_putvar_getvar.md) / [getvar](150_putvar_getvar.md).
*   Trades can be alternatively loaded directly from the broker account with the [brokerTrades](113_brokerCommand.md) function. In that case make sure that the **SV\_TRADES** flag is not set. The broker API must support the **GET\_TRADES** command.

### Example:

```c
function run()
{
  if(Bar >= 1) { _// default asset is selected after first run_
    AlgoVar\[0\] = 123;
    SaveMode = SV\_ALGOVARS+SV\_ALGOVARS2; 
    saveStatus("Data\\\\Test.trd");
    AlgoVar\[0\] = 456;
    printf("\\n %.0f",AlgoVar\[0\]);
    loadStatus("Data\\\\Test.trd");
    printf("\\n %.0f",AlgoVar\[0\]);
    quit("ok!");
  }
}
```

### See also:

[AlgoVar](196_AlgoVar_AssetVar_AssetStr.md), [assetHistory](loadhistory.md), [Trading](004_Trading_Strategies.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))