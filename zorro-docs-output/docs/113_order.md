---
title: "order"
source: "https://zorro-project.com/manual/en/order.htm"
---

# order

## order (int type): int

User-supplied function that is called by the trade engine every time when Zorro enters or exits a trade. Can be used to access external broker APIs, control external trade platforms by sending [key strokes](152_keys.md) or mouse clicks, or just pop up a [message](143_printf_print_msg.md) for manually entering or exiting a trade.

### Parameters:

**type** - **1** for entering, **2** for exiting a trade.

### Returns:

**0** when the trade could not be opened or closed, **1** otherwise.

### Remarks:

*   If an **order** function is defined in the script, it replaces the trade functions of the selected broker plugin.
*   All [trade variables](018_TradeMode.md) f.i. for determining the asset and algo are available in the order function.

### Example:

```c
int order(int type)
{
  string bs = "Buy";
  if(type == 2) bs = "Sell";
  string ls = "Long";
  if(TradeIsShort) ls = "Short";
  play("alert.wav");
  return msg("%s %s!",bs,ls);
}
```

### See also:

[Brokers](214_Brokers_Data_Feeds.md), [enterShort/Long](buylong.md), [exitShort/Long](selllong.md), [msg](143_printf_print_msg.md), [login](112_login.md), [API](litec_api.md), [broker plugin](brokerplugin.md), [user supplied functions](funclist.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))