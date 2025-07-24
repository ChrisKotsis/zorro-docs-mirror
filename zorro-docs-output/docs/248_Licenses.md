---
title: "Licenses"
source: "https://zorro-project.com/manual/en/restrictions.htm"
---

# Licenses

# Free Zorro license (private algo traders, $30K profit limit)

Naturally, any algorithmic trader wants to use Zorro for earning as much money as possible with as little effort as possible. We want the same for you, but only to a certain limit. After all, Zorro's purpose is distributing money from the rich to the poor, not the other way around. We're also interested in promoting programming and strategy development, so we prefer that you develop your own trading systems, instead of using ours. And we do not want the market to be flooded with Zorro-based trading robots. For all those reasons, the free Zorro license has some restrictions in place:

*   You must be a natural person - not a corporate entity - or a public research institution for using the free Zorro version. Corporations need a Zorro S license, see below.  
     
*   You can use Zorro for an annual trading profit of US$ 30,000. We believe that's enough for a side income of a single person. If you have reached that limit, you're required to either get a Zorro S license, or to stop trading with Zorro for the rest of the year.  
     
*   You can have a capital of up to **US$ 15,000** on a real money account under Zorro control. If the account value exceeds that limit, withdraw the excess profits for continuing with Zorro. This restriction does not apply to demo or paper accounts.  
     
*   You can use the free Zorro version for your own trading only. You can not use it, directly or indirectly, for selling trade signals, for offering trade copy services, or for trading with other people's money, neither with your own systems nor with the included Z systems.  
     
*   You can trade only with a single Zorro, only with a single account, and only on a single PC or VPS. A personal Zorro S license, issued to a natural person, allows multiple Zorro installations on an unlimited number of computers or servers when only the licensee has access to them. Corporations need one Zorro S license per installation or per user ("seat"); please contact us for license bundles.  
     
*   You can use Zorro for developing trading strategies, financial tools, or any other application, and can freely distribute or sell them. But only with included source code. You need a Zorro S license for compiling them to executables and distributing them without source code.  
    

You don't need to observe your account permanently for staying below the capital limit. The free Zorro version knows your account balance and opens no new positions when the limit is reached on a real money account. There is no limit on demo accounts.

The other trading restrictions are not monitored. We trust your honesty not to violate them. Otherwise you're legally required to pay per violation a US$ 1000 penalty fee plus all profit gained to oP group Germany GmbH. We'll gratefully take your money and put it into Zorro development.  
 

# Zorro S license (no limits, multiple instances, additional features)

**Zorro S** ("**S**ponsor") is a special license without the above restrictions, and with some additional features:

<table border="0" class="ms-contemp-main"><tbody><tr align="center"><td class="ms-contemp-top"><b><div align="left"></div></b></td><td class="ms-contemp-top"><b><strong>Zorro</strong></b></td><td class="ms-contemp-top"><strong>Zorro S</strong></td></tr><tr><td class="ms-contemp-even">Account / profit limit</td><td class="ms-contemp-even"><div align="center">15,000 / 30,000</div></td><td class="ms-contemp-even"><div align="center">unlimited</div></td></tr><tr><td class="ms-contemp-odd">Signal providing&nbsp;</td><td class="ms-contemp-odd"><div align="center">-</div></td><td class="ms-contemp-odd"><div align="center">✔</div></td></tr><tr><td class="ms-contemp-even">Minimum bar period</td><td class="ms-contemp-even"><div align="center">1 minute</div></td><td class="ms-contemp-even"><div align="center">1 ms (HFT)</div></td></tr><tr><td class="ms-contemp-odd">Data resolution</td><td class="ms-contemp-odd"><div align="center">1 minute</div></td><td class="ms-contemp-odd"><div align="center">1 tick</div></td></tr><tr><td class="ms-contemp-even">Multiple accounts</td><td class="ms-contemp-even"><div align="center">-</div></td><td class="ms-contemp-even"><div align="center">✔</div></td></tr><tr><td class="ms-contemp-odd">Broker arbitrage<b> *</b></td><td class="ms-contemp-odd"><div align="center">-</div></td><td class="ms-contemp-odd"><div align="center">✔</div></td></tr><tr><td class="ms-contemp-even">Market depth <b>*</b></td><td class="ms-contemp-even"><div align="center">-</div></td><td class="ms-contemp-even">✔</td></tr><tr><td class="ms-contemp-odd">Training algos</td><td class="ms-contemp-odd">Ascent, Pattern,<br>Perceptron, Tree</td><td class="ms-contemp-odd"><div class="auto-style6">+ Genetic,<br>Brute, Extern</div></td></tr><tr><td class="ms-contemp-even">Live retraining</td><td class="ms-contemp-even"><div align="center">-</div></td><td class="ms-contemp-even"><div align="center">✔</div></td></tr><tr><td class="ms-contemp-odd">User-defined GUI</td><td class="ms-contemp-odd"><div align="center">-</div></td><td class="ms-contemp-odd"><div align="center">✔</div></td></tr><tr><td class="ms-contemp-even">Virtual hedging<b></b></td><td class="ms-contemp-even"><div align="center">-</div></td><td class="ms-contemp-even"><div align="center">✔</div></td></tr><tr><td class="ms-contemp-odd">Batch processing<b></b></td><td class="ms-contemp-odd"><div align="center">limited</div></td><td class="ms-contemp-odd"><div align="center">full</div></td></tr><tr><td class="ms-contemp-even">Multiple cores</td><td class="ms-contemp-even"><div align="center">-</div></td><td class="ms-contemp-even"><div align="center">✔</div></td></tr><tr><td class="ms-contemp-odd">Platform integration</td><td class="ms-contemp-odd"><div align="center">-</div></td><td class="ms-contemp-odd"><div align="center">✔</div></td></tr><tr><td class="ms-contemp-even">VC++ integration</td><td class="ms-contemp-even"><div align="center">limited</div></td><td class="ms-contemp-even"><div align="center">full</div></td></tr><tr><td class="ms-contemp-odd">Direct API<br>connections **</td><td class="ms-contemp-odd"><div align="center"><span class="auto-style1">Dukascopy, FIX,<br>FXCM, IEX, IG,<br>Oanda, Rithmic,<br>TDA/Schwab,<br>XTB</span></div></td><td class="ms-contemp-odd"><div class="auto-style6"><span class="auto-style1">+ Binance,<br>&nbsp; Bitfinex, Bittrex,<br>Coinigy, Deribit,<br>Finvasia, Kraken,<br>IBKR, Saxo,<br>Tradier, TradeStation</span></div></td></tr><tr><td class="ms-contemp-even">Platform<br>connections **</td><td class="ms-contemp-even"><div align="center"></div></td><td class="ms-contemp-even"><div class="auto-style6"><span class="auto-style1">+ TWS,<br>MT4, MT5</span></div></td></tr><tr><td class="ms-contemp-odd">Data feeds<b></b></td><td class="ms-contemp-odd"><div align="center" class="auto-style1">AlphaVantage,&nbsp;<br>IEX, EOD, Stooq</div></td><td class="ms-contemp-odd"><div class="auto-style8">+ DTN IQFeed***,<br>NxCore,<br>Quandl/Nasdaq</div></td></tr><tr><td class="ms-contemp-even">API plugin source</td><td class="ms-contemp-even">-</td><td class="ms-contemp-even">on request</td></tr><tr><td class="ms-contemp-odd">Instant strategies<b></b></td><td class="ms-contemp-odd"><div align="center">Z1, Z2, Z8</div></td><td class="ms-contemp-odd"><div class="auto-style6">+ Z7, Z9, Z10,<br>Z12, Z13</div></td></tr></tbody></table>

\* If supported by the broker or exchange  
\*\* All brands and trademarks are property of their owners. Some API and platform plugins are written by Zorro users and not subject to Zorro support. For details please see the specific plugin page in the manual.  
\*\*\* Additional fees may apply.

# How to get Zorro S (free)

The quickest way, of course, is ordering a permanent Zorro S license, or a monthly or annual subscription on the [Zorro download page](https://zorro-project.com/download.php). Your payment will be used to fund Zorro development and add new Zorro features. There are some alternative ways to get a free Zorro S license:  

*   **Contribute something substantial** to the user community, such as an [API plugin](brokerplugin.md) for a broker, feed, or platform. It should be coded in C/C++, and the source code should be available. Contact support@opgroup.de for reviewing your plugin and getting a free Zorro S subscription.  
     
*   Find a Zorro bug in a release candidate. If you discover a new and serious software malfunction prior to the official release, you'll get a free 3 months Zorro S subscription or - if you have Zorro S already - 3 months free support. For identifying and reporting bugs, look [here](bugs.md).  
     
 *   If you are a **charitable, non-religious organization** under tax-exemption status such as IRC 501(c)(3), you are eligible for a free Zorro S subscription. Please contact support@opgroup.de with a description of your organization and a scan of your IRC document for review.  

A Zorro S subscription is automatically verified about once a day at Zorro start. The verification process requires Internet connection. It does not send any personal data. A live trading session is not affected by verification or by an expired license. A permanent or infinite Zorro S license does not use online verification and can run on a machine that is not connected to the Internet.

# Zorro redistribution licenses

We license the [Zorro engine](engine.md) and its source code for deploying trading systems or financial tools, or for developing customized trading tools. For details about branded versions for redistribution, for platform licensing, engine licensing, source code licensing, or outsourcing parts of your platform development please contact [info@opgroup.de](mailto:info@opgroup.de). 

### See also:

[Zorro Home](https://zorro-project.com), [Links](247_Links_Books.md), [Credits](249_Credits_Disclaimer.md), [Zorro / Zorro S license agreement](http://zorro-project.com/license.pdf)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))