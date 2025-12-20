---
title: "AssetMode"
source: "https://zorro-project.com/manual/en/assetmode.htm"
---

# AssetMode

## AssetMode

Asset specific flags that affect the currently selected asset. The following flags can be set or reset with the **setf** and **resf** macros:

### Flags:

<table width="98%" border="0" cellspacing="1" cellpadding="0"><tbody><tr><td><strong>NOPRICE</strong></td><td style="height: 17px">Prevents price updates in live trading while set. Can reduce bandwidth when an asset is temporarily not used or its price is not relevant.</td></tr><tr><td style="height: 17px"><strong>SOFTSWAP</strong></td><td style="height: 17px">Causes <a href="spread.htm">rollover</a> to be continuously accumulated, rather than once per day.</td></tr></tbody></table>

  

### Remarks:

*   An asset must be selected before setting or resetting its flags.

### Example:

```c
setf(AssetMode,NOPRICE);  _// disable asset updates_
```

### See also:

[asset](013_Asset_Account_Lists.md), [setf](168_setf_resf_isf.md), [resf](168_setf_resf_isf.md)  
[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))