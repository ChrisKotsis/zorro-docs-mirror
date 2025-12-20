---
title: "return"
source: "https://zorro-project.com/manual/en/return.htm"
---

# return

## return

## return _expression_

Terminates the function. In the second case the given expression, variable, or constant is returned as result to the calling function, where it can be evaluated.

### Parameters:

**expression** - value to be returned, like a variable, [expression](050_Expressions.md) or constant.

### Example:

```c
var compute\_days(var age, var days)
{
  return age \* days;
}
```

See also:

[function](048_Functions.md), [expression](050_Expressions.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))