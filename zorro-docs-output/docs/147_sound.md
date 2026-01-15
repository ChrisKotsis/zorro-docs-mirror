---
title: "sound"
source: "https://zorro-project.com/manual/en/sound.htm"
---

# sound

## sound(string name)

Plays a **.wav** sound file.

### Parameters:

<table border="0" cellpadding="2" cellspacing="2"><tbody><tr valign="top"><td><strong>name</strong></td><td><p>Name of the sound file, f.i. <strong>"test.wav"</strong>. If the file is not found in the Zorro folder, a standard chime is played.</p></td></tr></tbody></table>

### Remarks:

*   Sounds are not played when [Mute](007_Training.md) is set.

### Example:

```c
sound("win.wav");
```

### See also:

[printf](143_printf_print_msg.md), [progress](144_progress.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))