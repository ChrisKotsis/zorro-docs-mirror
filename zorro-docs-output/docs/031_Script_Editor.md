---
title: "Script Editor"
source: "https://zorro-project.com/manual/en/npp.htm"
---

# Script Editor

### Notepad++ script editor

Notepad++ (official website: [https://notepad-plus-plus.org](https://notepad-plus-plus.org)) is an open source text editor by Don Ho, included in the Zorro distribution under the GNU General Public License (Notepad++\\license.txt) as a replacement of the previous SED editor.The source code of Notepad++ is available under the URLs in Notepad++\\readme.txt. The editor configuration and language highlighting have been adapted to Zorro's C functions and keywords. You can change the default editor in [Zorro.ini](007_Training.md).  
  
  
![Notepad++](../images/npp2.jpg)  
  
\- For running the current script with Zorro, hit **F5**, or click the 'Z' icon in the toolbar.  
\- For opening the Zorro manual at the keyword under the cursor, hit **F1**, or right click and select **Help**.  
\- Installing updates from the N++ website will overwrite the editor and language configurations. For restoring them, preserve the following Zorro-specific files and copy them back after the update: **langs.xml; shortcuts.xml; autoCompletion\\c.xml; plugins\\config.\\\*.\***.  
\- For adding Zorro functions and shortcuts to another Npp instance, copy the above files to the Npp folders. The **LanguageHelp** and **CustomizeToolbar** plugins must be installed.  
  
The command reference below was compiled by Andres Gomez Casanova for a prior Notepad++ version; the commands added or modified for Zorro have been marked with \*.  

# File menu

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent1" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #4F81BD 1.0pt;
  border-left:none;border-bottom:solid #4F81BD 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #4F81BD 1.0pt;
  border-left:none;border-bottom:solid #4F81BD 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-O</span></b></p></td><td valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Open File</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-N</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�New File</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-S</span></b></p></td><td valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Save File</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-Alt-S</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Save As</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-Shift-S</span></b></p></td><td valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Save All</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-P</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Print</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Alt-F4</span></b></p></td><td valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Exit</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-Tab</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Next Document (also shows list of open files). Can be disabled - see Settings/Preferences/Global.</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-Shift-Tab</span></b></p></td><td valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Previous Document (also shows list of open files). Can be disabled - see above.</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Ctrl-Numpadn</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�Go to the n-th document on tab bar, n between 1 and 9.</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="FR" style="color:#365F91">Ctrl-PgUp</span></b></p></td><td valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="FR" style="color:#365F91">�Next document</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="FR" style="color:#365F91">Ctrl-PgDn</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="FR" style="color:#365F91">�Previous document</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:
  solid #4F81BD 1.0pt;background:#D3DFEE;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="FR" style="color:#365F91">Ctrl-W</span></b></p></td><td valign="top" style="border:none;border-bottom:
  solid #4F81BD 1.0pt;background:#D3DFEE;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="FR" style="color:#365F91">�Close Current Document</span></p></td></tr></tbody></table>

# Edit menu

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent2" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #C0504D 1.0pt;
  border-left:none;border-bottom:solid #C0504D 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #C0504D 1.0pt;
  border-left:none;border-bottom:solid #C0504D 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-C</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Copy</span><span style="color:#943634"> selection, copy current line*</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Insert</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Copy</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-T</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Copy current line</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-X</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Cut</span><span style="color:#943634"> selection, cut current line*</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Shift-Delete</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Cut</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-V</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Paste</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Shift-Insert</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Paste</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="ES-CO" style="color:#943634">Ctrl-Z</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="ES-CO" style="color:#943634">�Undo</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="ES-CO" style="color:#943634">Alt-Backspace</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="ES-CO" style="color:#943634">�Undo</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="ES-CO" style="color:#943634">Ctrl-Y</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="ES-CO" style="color:#943634">�Redo</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-A</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Select All</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Alt-Shift-Arrow keys, or Alt + Left mouse click</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Column Mode Select</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl + Left mouse click</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Start new selected area. Only multiple stream areas ca be selected this way.</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">ALT-C</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Column Editor</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-D</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Duplicate Current Line</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-T</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Switch the current line position with the previous line position</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-Up</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Move Current Line, or current selection if a single stream, Up</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-Down</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Move Current Line, or current selection if a single stream, Down</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-L</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Delete Current Line</span><span style="color:#943634">*</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-I</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Split Lines</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-J</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Join Lines</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-G</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Launch GoToLine Dialog</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Q</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�</span><span style="color:#943634">Toggle s</span><span lang="EN-US" style="color:#943634">ingle line comment</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-</span><span style="color:#943634">K</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Single line uncomment</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-K</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�</span><span style="color:#943634">S</span><span lang="EN-US" style="color:#943634">ingle line comment</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-</span><span style="color:#943634">Q</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Block comment</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Tab (selection of one or more full lines)</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Insert Tabulation or Space (Indent)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Shift-Tab (selection of one or more full lines)</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Remove Tabulation or Space (outdent)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-BackSpace</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Delete to start of word</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Delete</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Delete to end of word</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-BackSpace</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Delete to start of line</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-Delete</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Delete to end of line</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-U</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Convert to lower case</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-U</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Convert to UPPER CASE</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-B</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Go to matching brace</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Space</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Launch CallTip ListBox</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Shift-Space</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Launch Function Completion ListBox</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Alt-Space</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Launch Path Completion ListBox</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Enter</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Launch Word Completion ListBox</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Alt-R</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Text Direction RTL</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Alt-L</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Text Direction LTR</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Enter</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Split line downwards, or create new line</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Shift-Enter</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Split line downwards, or create new line</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Alt-Enter</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�SInsert new unindented line above current</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:solid #C0504D 1.0pt;
  background:#EFD3D2;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Ctrl-Alt-Shift-Enter</span></b></p></td><td valign="top" style="border:none;border-bottom:solid #C0504D 1.0pt;
  background:#EFD3D2;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�SInsert new unindented line below current</span></p></td></tr></tbody></table>

# Search menu

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent3" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #9BBB59 1.0pt;
  border-left:none;border-bottom:solid #9BBB59 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #9BBB59 1.0pt;
  border-left:none;border-bottom:solid #9BBB59 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-F</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Launch Find Dialog</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-H</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Launch Find / Replace Dialog</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">F3</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Find Next</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Shift-F3</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Find Previous</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-Shift-F</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Find in Files</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">F7</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Switch to Search results window (was Activate sub view before v5.2)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-Alt-F3</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Find (volatile) Next</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-Alt-Shift-F3</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Find (volatile) Previous</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-F3</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Select and Find Next (was Find (Volatile) Next prior to v5.6.5)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-Shift-F3</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Select and Find Previous (was Find (Volatile) Previous prior to v5.6.5)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">F4</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Go to next found</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Shift-F4</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Go to previous found</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-Shift-I</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Incremental Search</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-n</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Jump Down (to next text marked using n-th stye. n is 1 to 5, or 0 for default Found style.</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-Shift-n</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Jump Up (to next text marked using n-th stye. n is 1 to 5, or 0 for default Found style.</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-F2</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Toggle Bookmark</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">F2</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Go To Next Bookmark</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Shift-F2</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Go To Previous Bookmark</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-B</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Go to Matching Brace (caret must be on a brace)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:solid #9BBB59 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl-Alt-B</span></b></p></td><td valign="top" style="border:none;border-bottom:solid #9BBB59 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Select All between Matching Braces (caret must be on a brace)</span></p></td></tr></tbody></table>

# View menu

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent4" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #8064A2 1.0pt;
  border-left:none;border-bottom:solid #8064A2 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #8064A2 1.0pt;
  border-left:none;border-bottom:solid #8064A2 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Ctrl-(Keypad-/Keypad+)</span></b></p></td><td valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�or Ctrl + mouse wheel button (if any) Zoom in (+ or up) and Zoom out (- or down)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Ctrl-Keypad/</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Restore the original size from zoom</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">F11</span></b></p></td><td valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Toggle Full Screen Mode</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">F12</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Toggle Post-It Mode</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Ctrl-Alt-F</span></b></p></td><td valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Collapse the Current Level</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Ctrl-Alt-Shift-F</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Uncollapse the Current Level</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Alt-0</span></b></p></td><td valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Fold All</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Alt-(1~8)</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Collapse the Level (1~8)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Alt-Shift-0</span></b></p></td><td valign="top" style="border:none;background:#DFD8E8;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Unfold All</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:solid #8064A2 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#5F497A">Alt-Shift-(1~8)</span></b></p></td><td valign="top" style="border:none;border-bottom:solid #8064A2 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#5F497A">�Uncollapse the Level (1~8)</span></p></td></tr></tbody></table>

# Macro menu

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent5" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #4BACC6 1.0pt;
  border-left:none;border-bottom:solid #4BACC6 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#31849B">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #4BACC6 1.0pt;
  border-left:none;border-bottom:solid #4BACC6 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#31849B">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#D2EAF1;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#31849B">Ctrl-Shift-R</span></b></p></td><td valign="top" style="border:none;background:#D2EAF1;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#31849B">�Start to record /Stop recording the macro</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#31849B">Ctrl-Shift-P</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#31849B">�Play recorded macro</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:solid #4BACC6 1.0pt;
  background:#D2EAF1;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#31849B">Alt-Shift-S</span></b></p></td><td valign="top" style="border:none;border-bottom:solid #4BACC6 1.0pt;
  background:#D2EAF1;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#31849B">�Trim Trailing and Save</span></p></td></tr></tbody></table>

# Run menu

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent6" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #F79646 1.0pt;
  border-left:none;border-bottom:solid #F79646 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#E36C0A">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #F79646 1.0pt;
  border-left:none;border-bottom:solid #F79646 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#E36C0A">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#FDE4D0;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#E36C0A">F5</span></b></p></td><td valign="top" style="border:none;background:#FDE4D0;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#E36C0A">�</span><span style="color:#E36C0A">Run Script with Zorro</span><span class="auto-style2">*</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span style="color:#E36C0A">Shift</span><span lang="EN-US" style="color:#E36C0A">-F1</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#E36C0A">�</span><span style="color:#E36C0A">Open Zorro H</span><span lang="EN-US" style="color:#E36C0A">elp</span><span style="color:#E36C0A">*</span></p></td></tr><tr><td width="160" valign="top" style="border-style: none; border-color: inherit; border-width: medium; background: #FDE4D0; padding: 0cm 5.4pt; height: 19px;"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#E36C0A">Alt-F</span><span style="color:#E36C0A">3</span></b></p></td><td valign="top" style="border-style: none; border-color: inherit; border-width: medium; background: #FDE4D0; padding: 0cm 5.4pt; height: 19px;"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#E36C0A">�<span lang="EN-US" style="color:#E36C0A">Wikipedia </span>search</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:solid #F79646 1.0pt;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#E36C0A">Alt-F6</span></b></p></td><td valign="top" style="border:none;border-bottom:solid #F79646 1.0pt;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#E36C0A">�Open file in another instance</span></p></td></tr></tbody></table>

# ? menu

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent1" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #4F81BD 1.0pt;
  border-left:none;border-bottom:solid #4F81BD 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #4F81BD 1.0pt;
  border-left:none;border-bottom:solid #4F81BD 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span style="color:#365F91">Ctrl-</span><span lang="EN-US" style="color:#365F91">F1</span></b></p></td><td valign="top" style="border:none;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�About</span></p></td></tr><tr><td width="160" valign="top" style="border:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">Shift+F1</span></b></p></td><td valign="top" style="border:none;  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�</span><span style="color:#365F91">Open Zorro Help*</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:solid #4F81BD 1.0pt;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#365F91">F1</span></b></p></td><td valign="top" style="border:none;border-bottom:solid #4F81BD 1.0pt;background:#D3DFEE;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#365F91">�</span><span style="color:#365F91">Open Zorro Help at Keyword under Cursor*</span></p></td></tr></tbody></table>

# Incremental search widget

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent2" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #C0504D 1.0pt;
  border-left:none;border-bottom:solid #C0504D 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #C0504D 1.0pt;
  border-left:none;border-bottom:solid #C0504D 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Enter</span></b></p></td><td valign="top" style="border:none;background:#EFD3D2;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Next match (same as &gt; button)</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:solid #C0504D 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#943634">Shift+Enter</span></b></p></td><td valign="top" style="border:none;border-bottom:solid #C0504D 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#943634">�Previous match (same as &lt; button)</span></p></td></tr></tbody></table>

# Mouse gestures

<table width="500" border="1" cellpadding="0" cellspacing="0" class="MsoTableLightShadingAccent3" style="border-collapse:collapse;border:none"><tbody><tr><td width="160" valign="top" style="border-top:solid #9BBB59 1.0pt;
  border-left:none;border-bottom:solid #9BBB59 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Shortcut�� ↓</span></b></p></td><td valign="top" style="border-top:solid #9BBB59 1.0pt;
  border-left:none;border-bottom:solid #9BBB59 1.0pt;border-right:none;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">�Action�� ↓</span></b></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Single left click</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Set current line</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Single left click on rightmost status bar pane</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Toggle typing mode between Insert and Overtype</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Single left click on bookmark margin</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Toggle bookmark</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Shift+left click on fold point</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Uncollapse this fold and all those below</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Ctrl+left click on fold point</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Toggle collapsed state of this fold, and propagate below</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Right click</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Pop up context menu</span></p></td></tr><tr><td width="160" valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Double left click</span></b></p></td><td valign="top" style="border:none;background:#E6EED5;
  padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Select word</span></p></td></tr><tr><td width="160" valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Double left click on location pane (status bar)</span></b></p></td><td valign="top" style="border:none;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Go to line</span></p></td></tr><tr><td width="160" valign="top" style="border:none;border-bottom:solid #9BBB59 1.0pt;
  background:#E6EED5;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><b><span lang="EN-US" style="color:#76923C">Triple left click</span></b></p></td><td valign="top" style="border:none;border-bottom:solid #9BBB59 1.0pt;
  background:#E6EED5;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal"><span lang="EN-US" style="color:#76923C">�Select line</span></p></td></tr></tbody></table>