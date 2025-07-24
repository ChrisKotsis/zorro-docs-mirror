---
title: "progress"
source: "https://zorro-project.com/manual/en/progress.htm"
---

# progress

## progress (int n1, int n2): int

Displays a red/green progress bar during a \[Test\] run. Prevents unresponsiveness during long computations or external function calls.

### Parameters:

<table border="0" cellpadding="2" cellspacing="2"><tbody><tr valign="top"><td><strong>n1</strong></td><td><p>Length of the first part of the progress bar in percent. Green when &gt; 0, red when &lt; 0.</p></td></tr><tr valign="top"><td><strong>n2</strong></td><td><p>Length of the second part of the progress bar in percent; green when &gt; 0, red when &lt; 0, 0 for a neutral bar color.</p></td></tr></tbody></table>

### Returns:

0 when the \[Stop\] key was hit, nonzero otherwise.

### Remarks:

*   If **n1** and **n2** are 0, the progress indicator displays the default bar with the current win/loss situation. If no [run](088_run.md) function is defined, it prints every 30 seconds a dot in the message window for indicating progress.

### Example:

```c
if(!progress(0,0)) return;
```

### See also:

[printf](143_printf_print_msg.md), [wait](sleep.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))