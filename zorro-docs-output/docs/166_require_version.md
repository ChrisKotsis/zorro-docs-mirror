---
title: "require, version"
source: "https://zorro-project.com/manual/en/version.htm"
---

# require, version

## version(): var

Returns Zorro's version number with two digits behind the decimal.

## require(var Version): int

Returns nonzero when Zorro's version number is equal or higher than **Version**. Otherwise prints an error message, terminates the session, and returns 0. Pass a negative **Version** number when [Zorro S](restrictions.md) is also required.

### Examples:

```c
if(version() < 2.14)
  return quit("Zorro 2.14 or above needed for this script!");

if(!require(-2.14)) return; _// need Zorro S 2.14 or above_
```

### See also:

[printf](143_printf_print_msg.md), [run](088_run.md), [wait](sleep.md), [quit](172_quit.md), [SPONSORED](013_Asset_Account_Lists.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))