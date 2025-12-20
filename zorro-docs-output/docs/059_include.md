---
title: "#include"
source: "https://zorro-project.com/manual/en/include.htm"
---

# #include

## #include "filename"

## #include <filename>

Reads an additional script from the given file name and then continues compiling the original script file. This way a strategy can consist of an arbitrary number of scripts.

### Remarks:

*   If the script name is given in angular brackets **<..>**, it is searched in the Zorro **include** folder. The **include** folder contains all common **.h** include files and the **default.c** script with all the trading definitions.
*   If the script name is given in double quotes **"..."**, it can be in any folder; the path must then be given, either an absolute path (f.i. **"C:\\..."**) or relative to the **Zorro** folder (f.i. **"Strategy\\MyIncludes\\..."**). You can omit the **"Strategy\\..."** for including files directly from the **Strategy** folder, since this folder is automatically in the include path.
*   If no **#include** statement is found in the main script, **default.c** is automatically included. Otherwise you need to add **#include <default.c>** either in the included file, or in the main file before any other **#include** statements.

### Example

```c
#include <default.c> _// default trading functions_
#include <windows.h> _// include the Windows API_
#include "Strategy\\common.c"
```

### See also:

[define](060_define_undef.md), [headers](litec_h.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))