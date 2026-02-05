---
title: "ExitCode"
source: "https://zorro-project.com/manual/en/exitcode.htm"
---

# ExitCode

## ExitCode

The exit code of the Zorro application. It not set, Zorro terminates with exit code 0.  

### Type:

**int**

### Remarks:

*   For checking the exitcode in a Windows batch file or Cmd shell, use the **%ERRORLEVEL%** variable and make sure to start the application with **start /wait** (see example).

### Example

```c
_Script Test.c:_
void main() { ExitCode = 777; }

_Cmd Shell:_
start /wait Zorro -run Test
echo %ERRORLEVEL%
```

### See also:

[Command line](027_Command_Line_Options.md)[](019_Hedge_modes.md), [quit](172_quit.md), [HWnd](hwnd.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))