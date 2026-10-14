---
title: "Dukascopy"
source: "https://zorro-project.com/manual/en/dukascopy.htm"
---

# Dukascopy

# Dukascopy Plugin

Dukascopy is a Swiss bank and ECN broker with a Java-based API. The Dukascopy plugin was developed by Jürgen Reiss and supports Forex trading on demo and real accounts.

The Dukascopy plugin is not included in the Zorro distribution. Get the plugin from Github and also install the Java Development Kit:

*   Download and install the plugin - **dzjforex-0.9.6.zip** or newer - from [https://github.com/juxeii/dztools](https://github.com/juxeii/dztools). The DLL and the **dukascopy** folder both go into your **Plugin** directory.  
    
*   Download and install the latest 32-bit Java JDK from [Oracle](http://www.oracle.com/technetwork/java/javase/downloads). Make sure that it is the 32-bit version (**x86** suffix) since the plugin DLL is a 32-bit library, and that the folder path contains no spaces. In case you already have a recent 32-bit JDK installation you might skip this step.  
     
*   Add the **\\jre\\bin** and the **\\jre\\bin\\client** folders to the front of your **Path** environment variable (ch000549.md) is a howto). Your **Path** environment variable should now begin like this:  
    **C:\\Java\\jdk1.8.0\_121\\jre\\bin;  
    C:\\Java\\jdk1.8.0\_121\\jre\\bin\\client;  
    **... further paths ...  
     
*   Start Zorro. Make sure that you now can select **Dukascopy** from the \[Account\] scrollbox.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>Dukascopy user ID</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>Dukascopy Password</td></tr></tbody></table>

### Remarks

*   Currently only Forex and CFDs are supported (no stocks, binary options, etc.).
*   The history downloading from Dukascopy servers is sometimes not reliable; just try again in case of errors.
*   The source code of the Dukascopy plugin can be downloaded from [https://github.com/juxeii/dztools](https://github.com/juxeii/dztools).
*   This plugin was not developed by oP group. For support or reporting problems, please contact the author on his GitHub account or on the [Zorro user forum](http://www.opserver.de/ubb7/ubbthreads.php?ubb=showflat&Number=447697&#Post447697).
*   Another Dukascopy plugin was recently developed by Metakod on the [Zorro user forum](https://opserver.de/ubb7/ubbthreads.php?ubb=showflat&Number=473439&page=1). You can get it here: [http://metakod.com/mk/tools/12](http://metakod.com/mk/tools/12).

### Supported broker commands

The plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **GET\_MAXREQUESTS**
*   **GET\_PRICETYPE**
*   **GET\_LOCK**
*   **SET\_PATCH**
*   **SET\_ORDERTEXT**
*   **GET\_DIGITS**
*   **GET\_MAXLOT**
*   **GET\_MINLOT**
*   **GET\_MARGININIT**
*   **GET\_TRADEALLOWED**
*   **GET\_TIME**
*   **GET\_MAXTICKS**
*   **GET\_SERVERSTATE**
*   **GET\_ACCOUNT**
*   **SET\_HWND**
*   **SET\_SLIPPAGE**
*   **SET\_LIMIT** 

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MTR4 bridge](mt4plugin.md), [IB bridge](062_DefineApi_LoadLibrary.md), [FXCM plugin](230_FXCM.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))