---
title: "File access"
source: "https://zorro-project.com/manual/en/file_.htm"
---

# File access

# File functions

The following functions can be used to read, write, or otherwise handle files:

## file\_copy (string Dest, string Src)

Copies the file with the name **Src** to the file with the name **Dest**. If the **Dest** file already exists, it is overwritten. If **Dest** is a folder ending with a backslash **'\\'**, the file is copied into the destination folder. This function can also be used to rename files by storing them under a different name.

### Parameters:

**Dest** - destination folder or file path (either absolute, or relative to the Zorro folder, e.g. **"Log\\\\MyStrategy.txt"**).  
**Src** - source file path

## file\_delete (string name)

Deletes a file.

### Parameters:

**name** - file path  
   

## file\_length (string name): size\_t

Checks if a file with the given name exists, and returns its length in bytes. If the file was not found, **0** is returned.

### Parameters:

**name** - file path

## file\_date (string name): long

Checks if a file with the given name exists, and returns its last modification date in UTC as the number of seconds since January 1, 1970. The [mtu](month.md) function can convert it to the **DATE** format. If the file was not found, **0** is returned.

### Parameters:

**name** - file path  
 

## file\_select (string path, string filter): string

Opens a file dialog box at a given directory that lets the user select a file name to open or save. Returns the selected file name including path. The returned string keeps its content until the next **file\_select** call.

### Parameters:

**path** - initial directory to open, f.i. **"Data"**, or **0** for opening the Zorro directory.  
**filter** - list of pairs of null-terminated filter strings, or **0** for selecting all files. If the first filter string begins with **'#'**, it generates a save dialog, otherwise an open dialog. The last string must be terminated by two null characters (**"\\0"**). The first string in each pair describes the filter (f.i. **"Parameter Files"**), and the second string specifies the filter pattern (f.i. **"\*.par"**). Example: **"CSV Files\\0\*.csv\\0\\0"**. Multiple filter patterns can be separated with a semicolon (f.i. **"\*.par;\*.fac;\*.c"**). The pattern must not contain spaces. Example of a filter list with three pairs: **"All files (\*.\*)\\0\*.\*\\0Par, Fac\\0\*.par;\*.fac\\0Text files\\0\*.txt\\0\\0"**.  
 

## file\_next (string path): string

Enumerate files in a directory. Returns the first file name (without directory path) that matches the given **path**. Returns the next match when **path** is 0 or an empty string. Returns **0** after the last matching file. 

### Parameters:

**path** \- file path with wildcards (**"Data\\\\MyStrategy\*.par"**) for the first file; **0** for subsequent files.  
   

## file\_content (string name): string (temporary)

Returns a null-terminated temporary string with the content of the file, or **0** when the file was not found. The string keeps its content only until the next **file\_content** call. For multiple files to be read at the same time, allocate buffers and use **file\_read**.

### Parameters:

**name** - file path

## file\_read (string name, string content, size\_t length): size\_t

Reads the content of a file into a string or array, and appends **0** at the end. Returns the number of read bytes.

### Parameters:

**name** - file path  
**content** - **string** or array of any type to be filled with the content of the file; must have a size of at least **length+1**.  
**length** - maximum number of characters or bytes to read, or **0** for reading the whole file into a buffer of sufficient size. 

## file\_write (string name, string content, size\_t length)

Stores the content of a string, series, or other data array in a file.

### Parameters:

**name** - file path  
**content** - **string** or other data to be written.  
**length** - number of bytes to be written, or **0** for writing the complete content of a **string**.

## file\_append (string name, string content, size\_t length)

## file\_appendfront (string name, string content, size\_t length)

Opens a file and appends text or other data either at the end (**file\_append**) or at the begin (**file\_appendfront**). If the file does not exist, it is created.

### Parameters:

**name** - file name with path.  
**content** - text or other data to be appended at the end or begin of the file.  
**length** - number of bytes to be written, or **0** for writing the content of a **string**.

### Remarks:

*   If a file to be read from or written into is not found, an error message will be printed to the message window, and the function returns 0. The error message can be suppressed by adding **'#'** at the begin of the file name (f.i. **file\_content ("#myfilename.txt")**).
*   Standard C file i/o functions - **fopen**, **fclose**, **fread**, **fwrite**, **\_findfirst**, etc. - are also available through **#include <stdio.h>**.  
    

### Examples:

```c
_//script for merging all WFO .par and .fac files
//from two strategies to build a combined strategy_
 
string src1 = "Z1";    _// first strategy, can be identical to dest_
string src2 = "Z1add"; _// second strategy, must be different to dest_
string dest = "Z1";    _// combined strategy_

int file\_merge(int n,string ext)
{
  char name1\[40\],name2\[40\],name3\[40\];
  if(n) {
    sprintf(name1,"Data\\\\%s\_%i.%s",src1,n,ext);
    sprintf(name2,"Data\\\\%s\_%i.%s",src2,n,ext);
    sprintf(name3,"Data\\\\%s\_%i.%s",dest,n,ext);
  } else {
    sprintf(name1,"Data\\\\%s.%s",src1,ext);
    sprintf(name2,"Data\\\\%s.%s",src2,ext);
    sprintf(name3,"Data\\\\%s.%s",dest,ext);  
  }
  if(!file\_date(name1)) 
    return 0; _// file does not exist_
  if(0 != strcmp(name3,name1))
    if(!file\_copy(name3,name1))
      return 0;
  if(!file\_append(name3,file\_content(name2))) 
    return 0;
  return 1;
}

function main()
{
  int cycles = 1;
  for(; cycles < 100; cycles++)
    if(!file\_merge(cycles,"par")) 
      break;
  
  cycles += file\_merge(0,"par");
  cycles += file\_merge(0,"fac");
  
  if(cycles > 3) 
    printf("%i files combined!",cycles);
  else
    printf("Error!");
}
```
```c
_// set up strategy parameters from a .ini file_
function run()
{
  static var Parameter1 = 0, Parameter2 = 0;
  if(is(INITRUN)) { _// read the parameters only in the first run_
    string setup = file\_content("Strategy\\\\mysetup.ini");
    Parameter1 = strvar(setup,"Parameter1");
    Parameter2 = strvar(setup,"Parameter2");
  }
}
 
_// mysetup.ini is a plain text file that contains
// the parameter values in a format like this:
Parameter1 = 123
Parameter2 = 456_
```

### See also:

[keys](152_keys.md), [sprintf](str_.md), [string functions](str_.md), [http functions](160_HTTP_functions.md), [ftp functions](161_FTP_transfer.md), [putvar](150_putvar_getvar.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))