---
title: "FTP transfer"
source: "https://zorro-project.com/manual/en/ftp.htm"
---

# FTP transfer

# FTP functions

The FTP functions can be used for uploading or downloading files from a web server.

## ftp\_download(string url, string path, string username, string password)

Starts a file download from a FTP server. Returns **0** if an error occured, nonzero otherwise. Use **ftp\_status** to check when the transfer was complete.

## ftp\_upload(string url, string path, string username, string password)

Starts a a file upload to a FTP server. Returns **0** if an error occured, nonzero otherwise. Use **ftp\_status** to check when the transfer was complete. 

## ftp\_getdate(string url, string username, string password)

Starts a file access for getting the timestamp and size of a file stored on a FTP server. Returns **0** if an error occured, nonzero otherwise. Use **ftp\_status** to check when the file access was complete. 

## ftp\_stop()

Stops the currently running FTP transfer.

## ftp\_size(): long

Returns the total file size of the current/last file in bytes.

## ftp\_sent(): long

Returns the amount of sent data of the current/last file in bytes.

## ftp\_timestamp(): long

Returns the timestamp of the current/last file, after **ftp\_getdate()** was executed successfully.

## ftp\_status()

Returns the status of a currently running or the last FTP transfer:  
  
**\-1** if the last FTP transfer was stopped because of an error  
**0** if the FTP transfer is still running  
**1** if the last FTP transfer was successful  

## ftp\_log (var mode)

Enables/disables the logging of FTP transfers. The logfile is named **"ftp\_log.txt"**.

### Parameters:

**url** - URL of the file to be downloaded, or destination URL for a file upload (e.g.: "ftp://www.testhoster.com/downloads/test.txt").  
**path** - local path + filename (e.g.: "testdir/test.txt")  
**username** - FTP username  
**password** - FTP password  
**mode** - **1** to enable, **0** to disable FTP logging  

### Remarks:

*   Only one FTP transfer can be run at the same time. After calling **ftp\_download(), ftp\_upload() or ftp\_getdate()** wait until the value of **ftp\_status()** is nonzero.
*   For uploading or downloading to SFTP servers, or for other FTP/SFTP operations such as creating directories, get [curl.exe](https://curl.haxx.se/windows/) and run it with [exec](151_exec.md). Example: **exec("C:\\\\Tools\\\\curl.exe","-k \\"sftp:/myserver.host/upload/\\" --user \\"myname:pass\\" -T \\"Data\\\\file.txt\\" --ftp-create-dirs",1);**.  
    

### Example:

```c
function main() 
{ 
_//Downloads the file "myfile.txt" and saves it in the Data folder_ 
  ftp\_download("ftp://www.testhost.com/files/myfile.txt","Data/myfile.txt","username","password"); 
  while(!ftp\_status()) _//as long as the download is running_
    wait(50);
  if (ftp\_status() == 1) 
    printf("\\nDownload successful!"); 
  else 
    printf("\\nDownload failed!"); 
}
```

### See also:

[http functions](160_HTTP_functions.md), [file functions](158_File_access.md), [email](155_email.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))