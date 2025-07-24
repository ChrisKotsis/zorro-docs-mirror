---
title: "Lite-C Headers"
source: "https://zorro-project.com/manual/en/litec_h.htm"
---

# Lite-C Headers

# Header files

The following standard header files are used in Zorro strategy scripts and/or in C++ strategy DLLs:

### #include <litec.h>

Standard header for lite-C, contains standard variable type definitions. Automatically included in **default.c**.

### #include <trading.h>

Standard header for strategy scripts, with definitions of the structs **GLOBALS**, **TRADE**, **ASSET**, **T6**, etc. Automatically included in **default.c** and **zorro.h**.

### #include <variables.h>

Standard header for strategy scripts; contains #defines for all predefined trading variables. This file 'translates' the struct members into easier to memorize variable names. Automatically included in **default.c** and **zorro.h.**  

### #include <functions.h>

Standard header for strategy scripts, with definitions of all functions. Automatically included in **default.c** and **zorro.h**.  

### #include <default.c>

Standard header for lite-C strategy scripts; includes all the headers above. Automatically included when no other **#include** statement is found in the main script. Otherwise it must be explicitly included.

### #include <windows.h>

Optional lite-C header; contains common definitions and functions from the Windows API. Requires including **<default.c>** when trading functions are used.

### #include <stdio.h>

Optional lite-C header; contains all usual file, directory, and sort/search functions from the standard C libraries **io.h**, **stdio.h**, **stdlib.h**, **direct.h**. Requires including **<default.c>** when trading functions are used.

### #include <r.h>

Optional header for the [R bridge](rbridge.md). Can be included in lite-C scripts and/or in C++ strategy DLLs.

### #include <contract.c>

Optional header for [contract](096_contract.md) functions.Can be included in lite-C scripts and/or in C++ strategy DLLs. 

### #include <profile.c>

Optional lite-C header for [histogram plotting](147_plotProfile.md) functions.

### #include <zorro.h>

Header for [C++ strategy DLLs](dlls.md). Not for lite-C.

### #include <legacy.h>

Header for deprecated and outdated lite-C keywords, for backwards compatibility to very old Zorro versions. If your script contains a deprecated keyword, you can include this header. But better remove or replace it.

### See also:

[API](litec_api.md), [scripts](020_Included_Scripts.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))