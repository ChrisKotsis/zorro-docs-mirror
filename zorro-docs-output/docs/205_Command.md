---
title: "Command"
source: "https://zorro-project.com/manual/en/cmd.htm"
---

# Command

## Command\[0\] .. Command\[3\]

Contains the numbers passed with the **\-i** option on the [command line](027_Command_Line_Options.md) (Zorro S only).  

### Type:

**int** 

## Define

The name given with the **\-d** option on the [command line](027_Command_Line_Options.md) (Zorro S only). 

### Type:

**string**

### Remarks:

*   The **Command** variables are used for passing the live trading start date and bar offset to a Zorro instance in [Retest mode](009_Retraining.md).

### Example:

```c
function run()
{
  switch(Command\[0\]) {
    case 1: doThis(); break;
    case 2: doThat(); break;
  }
  ...
}
```

### See also:

[Command line](027_Command_Line_Options.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))