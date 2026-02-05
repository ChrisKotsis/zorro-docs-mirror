---
title: "window"
source: "https://zorro-project.com/manual/en/window.htm"
---

# window

## window(string title) : HWND

Returns a handle to the active window when its title bar contains the **title** string. Can be used to wait until a certain window or dialog becomes active.

### Parameters:

**title** - part of the window title (case sensitive), or **0** for returning the handle to the window that recently became active.  

### Returns:

**HWND** of the found active window. Otherwise **0**.

### Remarks:

*   Normally Zorro's own window is the active window, unless another application was started or a Windows dialog became active.

### Example:

See [keys](152_keys.md).

### See also:

[keys](152_keys.md), [order](111_order.md), [exec](151_exec.md), [mouse](153_mouse.md), [HWnd](hwnd.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))