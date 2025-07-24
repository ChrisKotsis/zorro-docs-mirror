---
title: "keys"
source: "https://zorro-project.com/manual/en/keys.htm"
---

# keys

## keys(string format, ...)

Sends key strokes and mouse clicks to the active window or dialog. This way a script can 'remote control' other external programs, f.i. for placing orders in the browser window of a trade web platform.

### Parameters:

**format** - **string** containing the key characters to be sent, in the same format as in [printf](143_printf_print_msg.md). Within the string, the following tokens in square barackets have a special meaning:  
  
**\[Ctrl-\]** - the following character is sent together with the **\[Ctrl\]**\-key.  
**\[Alt-\]**  - the following character is sent together with the **\[Alt\]**\-key.  
**\[Shift-\]** - the following character is sent together with the **\[Shift\]**\-key.  
**\[Win-\]** - the following character is sent together with the **\[Window\]**\-key.  
**\[Click x,y\]** - mouse click on the spot given by the **x**,**y** coordinates relative to the window's upper left corner.  
**\[...\]**   - special function keys, such as **\[enter\]**, **\[tab\]**, **\[del\]**, **\[f1\]** etc. are given in square brackets. Use **\[cur\]**, **\[cul\]**, **\[cuu\]**, **\[cud\]** for the cursor keys.  
**\[\]\]**, **\[\[\]** - the right and left square bracket can be given in square brackets.

### Remarks:

*   The keys are sent to the active window's message loop. This will work for all normal Windows applications, but not for special programs that don't use a message loop.
*   The function returns as soon as the key strokes are sent, but the reaction of the controlled program can take more time. If the key stroke opens a dialog window, use [window](154_window.md) to wait until the dialog is active before sending further keys.
*   This function should not be used to send keys to Zorro itself. Therefore, it should not be called when Zorro is the active window. However, it can be used to send keys to other instances of Zorro.

### Example:

```c
_// Opens Notepad, writes something, saves it, and closes Notepad._
function main()
{
_// start Notepad before_ 
   while(!window("Editor")) wait(100);  _// wait until Notepad is open_
   keys("Zorro is cool!"); _// write something_
   keys("\[Ctrl-\]s");               _// open Save dialog (Ctrl-S)_ 
   while(!window(NULL)) wait(100);     _ // wait until the dialog window is open_
   keys("cool.txt\[Enter\]\[Alt-\]\[F4\]"); _// save as "cool.txt", and exit (Alt-F4)_
}
```

### See also:

[exec](151_exec.md), [window](154_window.md), [mouse](153_mouse.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))