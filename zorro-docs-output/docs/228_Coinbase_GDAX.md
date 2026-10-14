---
title: "Coinbase / GDAX"
source: "https://zorro-project.com/manual/en/gdax.htm"
---

# Coinbase / GDAX

# Coinbase Pro Plugin (deprecated)

**[Coinbase](https://pro.coinbase.com)** alias **GDAX** is an insurance backed cryptocurrency exchange. There are two Zorro plugins that use the Coinbase Pro API, one developed by a Zorro user and available on [Github](https://github.com/kzhdev/gdax_zorro_plugin), one included in the Zorro S distribution (Zorro 2.41 or above).

For using the plugin, first generate an API Key on the Coinbase Pro website. In Zorro, select **CoinbasePro** from the scrollbox, enter the API key and the passphrase (with a space in between) in the **User ID** input box, and the secret in the **Password** input box.

<table><tbody><tr><td style="background-color: #CCCCCC"><strong>User</strong></td><td>Key Passphrase</td></tr><tr><td style="background-color: #CCCCCC"><strong>Password</strong></td><td>Secret</td></tr></tbody></table>

[Accounts.csv](013_Asset_Account_Lists.md) example entry:

<table cellpadding="2" cellspacing="0" class="hidden-xs"><tbody><tr><td class="auto-style1" style="height: 19px"><strong>Name</strong></td><td class="auto-style1" style="height: 19px"><strong>Server</strong></td><td class="auto-style1" style="height: 19px"><strong>Account</strong></td><td class="auto-style1" style="height: 19px"><strong>User</strong></td><td class="auto-style1" style="height: 19px"><strong>Pass</strong></td><td class="auto-style1" style="height: 19px"><strong>Assets</strong></td><td class="auto-style1" style="height: 19px"><strong>CCY</strong></td><td class="auto-style1" style="height: 19px"><strong>Real</strong></td><td class="auto-style1" style="height: 19px"><strong>NFA</strong></td><td class="auto-style1" style="height: 19px"><strong>Plugin</strong></td></tr><tr><td class="auto-style1" style="height: 22px">Coinbase</td><td class="auto-style1" style="height: 22px">Coinbase</td><td class="auto-style1" style="height: 22px">USD</td><td class="auto-style1" style="height: 22px">ap2412057834 xf9qp</td><td class="auto-style1" style="height: 22px">akh3dfE3webnF++</td><td class="auto-style1" style="height: 22px">AssetsCB</td><td class="auto-style1" style="height: 22px">USD</td><td class="auto-style1" style="height: 22px">1</td><td class="auto-style1" style="height: 22px">14</td><td class="auto-style1" style="height: 22px">CoinbasePro.dll</td></tr></tbody></table>

Please note: Coinbase no longer supports their **CoinbasePro** API, so the plugins are deprecated.

### Supported broker commands

The Coinbase Pro plugin supports the [brokerCommand](113_brokerCommand.md) function with the following standard commands:

*   **GET\_MAXTICKS**
*   **GET\_MAXREQUESTS**
*   **GET\_LOCK**
*   **SET\_SYMBOL**
*   **SET\_AMOUNT**
*   **SET\_DIAGNOSTICS**
*   **GET\_COMPLIANCE**
*   **SET\_ORDERTYPE** (1=FOK, 2=GTC, 3=IOC)
*   **SET\_PRICETYPE** (1=Quotes, 2=Trades)
*   **GET\_POSITION** (balance of the given coin symbol)
*   **GET\_UUID**
*   **SET\_UUID**

Some additional commands have been implemented:

*   **2000** (**CBP\_ENABLE\_POSTONLY\_ORDERFLAG**) - Sets "post\_only" flag for orders. 1: enabled (default), 0: disabled.
*   **2001** (**CBP\_GENERATE\_ASSETLIST\_TEMPLATE**) - Generates a template asset list in "Log\\AssetsCoinbaseProTemplate.csv"..  
    Arguments: Comma-separated list of Coinbase Pro Symbols, e.g. "BTC-USD,ETH-USD", or 0 for all assets  
    Note: LotAmount can be reconfigured to a larger value because SET\_AMOUNT is supported.  
    Note: Generated PipCost field assumes quoted currency is account currency. User is advised to reconfigure based on account currency and LotAmount.  
    

### Remarks

*   **Symbols** are of the type **"AAA-BBB"**, where **AAA** is the coin and **BBB** the counter currency. Example asset list entries:  
    ```c
    Name,Price,Spread,RollLong,RollShort,PIP,PIPCost,MarginCost,Market,LotAmount,Commission,Symbol
    BTC/USD,30784.41000000,0.01000000,0.0,0.0,1.000000e-02,1.000000e-10,-100,0,1.000000e-08,0.000,BTC-USD
    ETH/USD,1827.64000000,0.01000000,0.0,0.0,1.000000e-02,1.000000e-10,-100,0,1.000000e-08,0.000,ETH-USD
    ```
    
*   **Asset parameters.** All data besides spread and price must be manually entered in the asset list. PIP size and LotAmount can be set arbitrarily, but Coinbase Pro has minimum lot sizes for some assets. Lots sizes can be taken from the Coinbase Pro website and converted to the corresponding lot amounts.
*   Market and limit orders are supported. Trades use UUID identifiers; the trade ID is the hash of the UUID.

### See also:

[Links](247_Links_Books.md), [order](111_order.md), [brokers](214_Brokers_Data_Feeds.md), [broker plugin](brokerplugin.md), [Binance](219_Binance.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))