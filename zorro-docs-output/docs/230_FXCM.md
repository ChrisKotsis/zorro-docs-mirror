---
title: "FXCM"
source: "https://zorro-project.com/manual/en/fxcm.htm"
---

# FXCM

# FXCM Plugin

The included FXCM plugin allows direct trading with FXCM Markets Ltd or FXCM Australia Pty. Ltd on demo and real accounts, without the need to use the MT4 platform. FXCM offers some advantages, such as index, commodity, and cryptocurrency CFDs, free tick-based, good-quality historical price data, a free API, and no minimum monthly investments.

For opening a demo or real account, visit [FXCM.](https://www.fxcm.com) The demo account will normally expire after a month of no trading, but can be renewed indefinitely by opening a new demo account.

  !!  For using the FXCM API, you must unzip a bunch of DLLs. They are contained in the **FXCM.zip** archive in the Zorro installation. Unpack them directly into the Zorro main folder. The DLLs beginning with **"api-ms-win-core"** are only needed for very old Windows versions such as Vista or Server 2012. XP is not supported by the FXCM API. When you successfully installed the DLLs, the FXCM plugin will appear in the Broker scrollbox.

Zorro login fields for FXCM:

<table class="auto-style2"><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>FXCM Account ID</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>FXCM Password</td></tr></tbody></table>

[Asset list](013_Asset_Account_Lists.md) example: **AssetsFXCM.csv**

[Accounts.csv](013_Asset_Account_Lists.md) example entries:

<table cellpadding="2" cellspacing="0" class="auto-style2"><tbody><tr><td class="auto-style1" style="height: 19px"><strong>Name</strong></td><td class="auto-style1" style="height: 19px"><strong>Broker</strong></td><td class="auto-style1" style="height: 19px"><strong>Account</strong></td><td class="auto-style1" style="height: 19px"><strong>User</strong></td><td class="auto-style1" style="height: 19px"><strong>Pass</strong></td><td class="auto-style1" style="height: 19px"><strong>Assets</strong></td><td class="auto-style1" style="height: 19px"><strong>CCY</strong></td><td class="auto-style1" style="height: 19px"><strong>Real</strong></td><td class="auto-style1" style="height: 19px"><strong>NFA</strong></td><td class="auto-style1" style="height: 19px"><strong>Plugin</strong></td></tr><tr><td class="auto-style1" style="height: 22px">FXCM Demo</td><td class="auto-style1" style="height: 22px">FXCM</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">U4567890</td><td class="auto-style1" style="height: 22px">1234</td><td class="auto-style1" style="height: 22px">AssetsFXCM</td><td class="auto-style1" style="height: 22px">EUR</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">0</td><td class="auto-style1" style="height: 22px">FXCM</td></tr><tr><td class="auto-style1">FXCM Real</td><td class="auto-style1">FXCM</td><td class="auto-style1">0</td><td class="auto-style1">0</td><td class="auto-style1">0</td><td class="auto-style1">AssetsFXCM</td><td class="auto-style1">EUR</td><td class="auto-style1">1</td><td class="auto-style1">0</td><td class="auto-style1">FXCM</td></tr></tbody></table>

### FXCM symbols

The default **AssetsFix.csv** uses different CFD symbols. Use **AssetsFXCM.csv** for trading CFDs with FXCM.

### Additional data

The FXCM plugin supports the following data streams:

*   [marketVal](022_Price_History.md): Spread in historical data.
*   [marketVol](022_Price_History.md): Tick frequency in historical data.

### Supported broker commands

The FXCM plugin supports the [brokerCommand](113_brokerCommand.md) function with the following commands:

*   **SET\_PATCH**
*   **SET\_WAIT**
*   **SET\_DELAY**  
    

### Known FXCM API issues

You can trade with FXCM either through the [MT4 bridge](mt4plugin.md), or with a direct API connection through the FXCM plugin. Direct API connection is preferable due to higher speed and lower slippage. The FXCM plugin uses the latest API version 1.62.

*   **No XP** - the FXCM API requires Windows 7 or above.
*   **Single account** - for different FXCM accounts also use different user names for logging in.
*   **Single session** - some FXCM accounts are pre-set to connect only to a single session. For trading with several Zorros on the same account, contact FXCM and let them switch your account to multiple sessions.
*   **Orphaned trades** - if the FXCM server does not respond to a trade command in time, but opens the trade nevertheless, the trade gets orphaned. This is a very rare event, but it can happen. Compare the open trades with the trade status page from time to time, and check the log for [Warning 070](errors.md). Orphaned trades are not under Zorro control and must be closed manually.

### Error messages

Here's a list of explanations from FXCM for some of their error messages:

**ORA-20103 - Session expired:** Your connection has been lost. This error message could be displayed due to a number of reasons, including network instability, a system issue or a program crash. If the problem is a system issue, please try to reboot.  
  
**ORA-20143 - Order price too far from market price:** This error message is generated when the Buy Limit price is above the Bid price.

**ORA-20112 - Limit price did not pass validation:** This error message is generated when the Limit price does not correspond to the ask price for the order type required. Ff the Time in Force is IOC or FOK then the Buy limit price should be >= Ask price.

**ORA-20113 - Insufficient margin in session:** This error message is generated when you don’t have enough margin.

**ORA-20102 - Access Violation:** This error message is generated when a trade account is missing from the dealer account.

**ORA-20105 - Order price did not pass validation:** The rejected orders error message is generated when the stop price is too close the the ask price. For example, if the Ask price was 9911 and your Stop price 99=9917, you would receive this error message.

**ORA-20008 - Failed to create order, primary validation:** This error message is generated when Range prices are below the Ask price. For example if orders were placed on news events, and the spreads got wider.

**How can I tell what account type I have?** Checking on Trading station: To check the type of account you have, you can login to the Trading Station and look in the tab “Accounts”. Scroll to the end and find column Type. Y = Hedging is allowed; N = Hedging is not allowed, O = Netting only, D = Day netting, F = FIFO.

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [MT4 bridge](mt4plugin.md), [IB plugin](062_DefineApi_LoadLibrary.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))