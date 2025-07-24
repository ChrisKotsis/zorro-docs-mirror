---
title: "NumAssetsListed"
source: "https://zorro-project.com/manual/en/numassets.htm"
---

# NumAssetsListed

## NumAssetsListed

Number of assets in the selected [asset list](013_Asset_Account_Lists.md).

## NumAssetsUsed

Number of assets selected by [asset](013_Asset_Account_Lists.md) calls.

### Type:

**int**, read/only

### Example:

```c
for(i=0; i<NumAssetsListed; i++) {
  string AssetName = Assets\[i\];
  ...
}
```

### See also:

[asset](013_Asset_Account_Lists.md), [asset list](013_Asset_Account_Lists.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))