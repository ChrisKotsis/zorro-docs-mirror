---
title: "Window handle"
source: "https://zorro-project.com/manual/en/hwnd.htm"
---

# Window handle

## HWnd

The window handle of the Zorro window.  

### Type:

**int**

### Remarks:

*   The window handle can be used by another application or process for triggering events or sending messages to a Zorro window. The message **WM\_APP+1** triggers a price quote request, **WM\_APP+2** triggers a script-supplied [callback](089_tick_tock.md) function, and **WM\_APP+3** triggers a plugin-supplied callback function set by the [GET\_CALLBACK](113_brokerCommand.md) command.
*   The window handle is automatically sent to broker plugins with the [SET\_HWND](113_brokerCommand.md) command.
*   Window handles of other applications can be found with the **FindWindow** function (see example).

### Example (run 2 Zorros with this script):

```c
#include <windows.h>
#include <default.c>

long Handle1 = 0;

int click()
{
  if(Handle1)
    PostMessage(Handle1,WM\_APP+2,0,0); _// WM\_APP+2 = trigger callback function_
  else
    PostMessage(FindWindow(0,"Msg Test 2"),WM\_APP+2,0,0);
}

void callback(void \*Message)
{
   printf("\\nMessage received!");
}

void main()
{
_// use \[Result\] button for senging_
  panelSet(-1,0,"Send",0,0,0);
  Handle1 = FindWindow(0,"Msg Test 1");
  if(1Handle1)
    print(TO\_TITLE,"Msg Test 1");
  else
    print(TO\_TITLE,"Msg Test 2");
  while(wait(1));
}
```

### See also:

[Command line](027_Command_Line_Options.md)[](019_Hedge_modes.md), [callback](089_tick_tock.md), [window](154_window.md) [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))