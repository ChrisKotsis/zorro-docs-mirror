---
title: "mouse"
source: "https://zorro-project.com/manual/en/mouse.htm"
---

# mouse

## mouse(int\* x, int\* y, HWND hWnd): int

Returns the mouse button state and mouse coordinates, relative to a window or to the screen.

### Parameters:

**x, y** \- pointers to int variables to be filled with the mouse coordinates.  
**hWnd** - window handle as returned by the [window](154_window.md) function, or **0** for returning the mouse position in screen coordinates.  

### Returns:

**0** for no mouse button pressed down, **1** for left, **2** for right, **4** for middle button.

### Remarks:

*   The **mouse** function can be used for calibrating the positions of "Buy" and "Sell" buttons on a broker's web interface, f.i. for binary options. Automated buying and selling can then be performed by clicking those buttons with the [keys](152_keys.md) function.  
    

### Example:

```c
void main()
{
  while(wait(50)) {
    int x,y;
    HWND h = window("Script Editor");
    int button = mouse(&x,&y,h);
    printf("\\r%04d %04d %d",x,y,button);
  }
}
```

### See also:

[window](154_window.md), [keys](152_keys.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))