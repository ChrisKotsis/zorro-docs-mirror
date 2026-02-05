---
title: "putvar, getvar"
source: "https://zorro-project.com/manual/en/putvar.htm"
---

# putvar, getvar

## putvar (string FileName, string VarName, var Value)

## getvar (string FileName, string VarName): var

Writes, updates, or reads a variable to or from a file or the Windows registry. Can be used for storing data globally or exchanging data between different scripts or Zorro instances.

### Parameters:

<table border="0"><tbody><tr><td><strong>FileName</strong></td><td>Name of the file. If it does not exist, it is created. If <strong>0</strong>, the variable is stored in the Windows registry.</td></tr><tr><td><strong>VarName</strong></td><td>Name of the variable.</td></tr><tr><td><strong>Value</strong></td><td>Value to be written or updated.</td></tr></tbody></table>

### Returns:

Current variable value (**getvar**). If the variable does not yet exist, **0** is returned.

### Remarks:

*   If several Zorro instances access the same variable at the same time, it should be [locked](167_lock_unlock.md) between reading and writing.
*   The variables are stored in a normal text file that can be viewed with a text editor or spreadsheet program. But it must not be manually edited or modified unless it is ensured that the file size does not change. Any variable in the file has a fixed line length for speedier access.

### Example:

```c
function increase\_global\_counter(string Name)
{
  string FileName = "\\\\Log\\\\Counters.csv";
  lock();
  int Counter = getvar(FileName,Name);
  putvar(FileName,Name,Counter+1);
  unlock();
}
```

### See also:

[file](158_File_access.md), [strvar](str_.md), [lock](167_lock_unlock.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))