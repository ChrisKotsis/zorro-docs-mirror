---
title: "zInit, zOpen, ..."
source: "https://zorro-project.com/manual/en/engine.htm"
---

# zInit, zOpen, ...

# Zorro processes. Integration in 3rd party software.

Zorro can be used for trading, backtests, optimizations, or other computations under control from either a VC++ project, a software application, or a Zorro 'master' instance. For this purpose, a **ZorroControl** DLL provides functions to start, stop, and exchange information with one or several Zorro processes (up to 72). A Zorro process is a single Zorro.exe instance running a given script and returning a result. In this way Zorro scripts can be run from other trading platforms, user interfaces, or software tools. 

<table align="center" border="0"><tbody><tr><td bgcolor="#0000FF" class="auto-style1" valign="middle"><div align="center" class="auto-style1"><strong><br><br>Your<br>&nbsp;Application</strong></div></td><td><strong><br><br><img class="auto-style2" height="36" src="../images/arrow.gif" width="30"></strong></td><td align="center" bgcolor="#0000FF" class="Stil2"><strong><br><br class="auto-style1">&nbsp;</strong><span class="auto-style1"><strong>Zorro<br>&nbsp;Control</strong></span><strong><br class="auto-style1"></strong></td><td class="Stil4"><strong><br class="auto-style1"><br class="auto-style1"><img class="auto-style1" height="36" src="../images/arrow.gif" width="30"><br><br></strong></td><td align="center" bgcolor="#0000FF" class="Stil4"><strong><br class="auto-style1"><br class="auto-style1"><span class="auto-style1">&nbsp;Zorro</span><br class="auto-style1"><span class="auto-style1">&nbsp;EXE</span></strong></td><td class="Stil4"><strong><br class="auto-style1"><br class="auto-style1"><img class="auto-style1" height="36" src="../images/arrow.gif" width="30"><br><br></strong></td><td align="center" bgcolor="#0000FF" class="Stil4"><strong><br class="auto-style1"><br class="auto-style1"><span class="auto-style1">&nbsp;Zorro</span><br class="auto-style1"><span class="auto-style1">&nbsp;Script</span></strong></td></tr></tbody></table>

<table align="center" border="0"><tbody><tr><td bgcolor="#0000FF" class="auto-style1" valign="middle"><div align="center" class="auto-style1"><strong><br><br>&nbsp;Zorro<br>&nbsp;EXE</strong></div></td><td><strong><br><br><img class="auto-style2" height="36" src="../images/arrow.gif" width="30"></strong></td><td align="center" bgcolor="#0000FF" class="Stil2"><strong><br><br class="auto-style1">&nbsp;</strong><span class="auto-style1"><strong>Master<br>&nbsp;Script</strong></span><strong><br class="auto-style1"></strong></td><td class="Stil4"><strong><br class="auto-style1"><img class="auto-style1" height="36" src="../images/arrow.gif" width="30"><br><img class="auto-style1" height="36" src="../images/arrow.gif" width="30"><br></strong></td><td align="center" bgcolor="#0000FF" class="Stil4"><strong><br class="auto-style1"><br class="auto-style1"><span class="auto-style1">&nbsp;Zorro</span><br class="auto-style1"><span class="auto-style1">&nbsp;Processes</span></strong></td><td class="Stil4"><strong><br class="auto-style1"><img class="auto-style1" height="36" src="../images/arrow.gif" width="30"><br><strong><img class="auto-style1" height="36" src="../images/arrow.gif" width="30"></strong><br></strong></td><td align="center" bgcolor="#0000FF" class="Stil4"><strong><br class="auto-style1"><br class="auto-style1"><span class="auto-style1">&nbsp;Zorro</span><br class="auto-style1"><span class="auto-style1">&nbsp;Scripts</span></strong></td></tr></tbody></table>

The following functions are available in the ZorroControl DLL as well as in the Zorro API. They can be called from other programs, or directly from a Zorro 'master' script:

## zInit (int Num, int Size): int

Initializes the interprocess communication and determines the maximum number of processes and the size of the data area per process. Must be called first from the ZorroControl DLL and from all Zorro processes. Returns **0** when no communication channel could be established, otherwiee nonzero.

## zOpen (int Id, const char\* Commandline): HANDLE

Starts a single Zorro process with the given identifier and command line. Must be called from the ZorroControl DLL or the master instance. Returns the process handle, or 0 when no process could be started due to an error in the command line, no Zorro S license, no Zorro.exe in the same folder, or a failed **zInit** call. For starting the process with no window, use the **\-h** [command line](027_Command_Line_Options.md) option.

## zStatus (int Id): int

Returns 1 when the process is still running, 0 otherwise. Must be called from the ZorroControl DLL or master instance. 

## zClose (int Id)

Closes the Zorro process with the given **Id**. **Id == 0** closes all Zorro processes. Must be called from the ZorroControl DLL or the master instance.

## zData (int Id): void\*

Returns a pointer to a memory area of the previously given **Size** for exchanging data and information with the Zorro process with the given **Id**. Every process has its own data area, but can also read or write to other processes' data areas. For the data area, a byte-aligned struct can be defined that contains the variables to be exchanged (see example). 

### Parameters:

<table border="0"><tbody><tr><td><strong>Num</strong></td><td>Total number of processes to handle, <strong>2..72</strong>. The master instance is always process 1.</td></tr><tr><td><strong>Size</strong></td><td>Size of the data area for information exchange per process, in bytes. 8 bytes per <strong>var</strong>, 4 bytes per <strong>int</strong>.</td></tr><tr><td><strong>Id</strong></td><td>Process identifier number, <strong>2..Num</strong>, or <strong>1</strong> for the master instance.</td></tr><tr><td><strong>Commandline</strong></td><td><a href="command.htm">Command line parameters</a> for the Zorro process. If no script name is given, the script of the master instance is used.</td></tr></tbody></table>

### Returns:

Nonzero when successful, **0** otherwise.  

### Remarks:

*   An integration toolkit is included in the Zorro distribution and can be used with [Zorro S](restrictions.md). It consists of the ZorroControl DLL and an example project in **Source\\ZorroControl**. It's a simple console application that starts a Zorro process and retrieves a random number as result.
*   Interprocess communication is handled via memory mapped I/O.
*   A process can read its own Id from the [Core](numcores.md) variable.
*   When running multiple Zorro processes in parallel with the same script, make sure that they don't write into the same logs or temporary files. The [Script](020_Included_Scripts.md) string can be used to let any process use different file names. Logs are only generated by client processes when the [LogNumber](numtotalcycles.md) variable is nonzero.
*   If Zorros run on different servers, use [http functions](160_HTTP_functions.md) for communication. Data can be exchanged by reading from or writing into files on a cloud server.
*   The **\-h** [command line option](027_Command_Line_Options.md) runs the process in minimized mode. The **\-run** command line options lets the process automatically terminate after executing the script.
*   No further license fees required when using the Zorro integration toolkit for private purposes. For redistribution, or for a 'tighter' integration using a tailored Zorro DLL or the Zorro source code, please contact [info@opgroup.de](mailto:info@opgroup.de?subject=Engine API).

### Example (see also the Process.c script):

```c
_// data struct that is exchanged between 2 Zorros_
typedef struct INFO { 
  var Position; 
} INFO;

INFO \*Own, \*Other;

void main()
{
_// initialize IPC_
  if(!zInit(2,sizeof(INFO))) {
    printf("Can't initialize process!"); 
    return;
  } 
_// if main process, start second Zorro
_  if(Core <= 1) zOpen(2,"-w 320"); _// shift window to the side_
_// get pointers to own and other data struct_
  Own = zData(Core);
  Other = zData(3-Core); _// Core is 1 or 2_
_// define sliders_ 
  slider(1,1,1,100,"This",0);
  slider(2,1,1,100,"Other",0);
_// permanently replicate the 'Other' slider to the other Zorro
_  while(wait(1)) {
    slider(1,Own->Position);
    Other->Position = slider(2);
  }
  zClose(2);
}
```

### See also:

[Licenses](restrictions.md), [Core](numcores.md), [command line](027_Command_Line_Options.md) [► latest version onlin](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))