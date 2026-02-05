---
title: "Comparisons"
source: "https://zorro-project.com/manual/en/comparisions.htm"
---

# Comparisons

## Comparisons

A comparison is a special type of [expression](050_Expressions.md) that delivers either **true** (nonzero) or **false** (zero) as a result. There are special comparison operators for comparing variables or expressions:  
  

<table border="0" cellspacing="2" cellpadding="2"><tbody><tr><td valign="top"><strong>==</strong></td><td>True if the expressions left and right of the operator are equal.</td></tr><tr><td valign="top"><strong>!=</strong></td><td>True if the expressions left and right of the operator are not equal.</td></tr><tr><td valign="top"><strong>&gt;</strong></td><td>True if the expression <em><span class="links"></span></em>left of the operator is greater than the expression right of the operator.</td></tr><tr><td valign="top"><strong>&gt;=</strong></td><td>True if the expression <em><span class="links"></span></em>left of the operator is greater than or equal to the expression right of the operator.</td></tr><tr><td valign="top"><strong>&lt;</strong></td><td>True if the expression <em><span class="links"></span></em>right of the operator is greater than the expression left of the operator.</td></tr><tr><td valign="top"><strong>&lt;=</strong></td><td>True if the expression<em><span class="links"> </span></em>right of the operator is greater than or equal to the expression left of the operator.</td></tr><tr><td valign="top"><strong>and, &amp;&amp;</strong></td><td>True if the expressions left and right of the operator are both true.</td></tr><tr><td valign="top"><strong>or, ||</strong></td><td>True if any one of the expressions left and right of the operator is true.</td></tr><tr><td valign="top"><strong>not, !</strong></td><td>True if the expression right of the operator is not true.</td></tr><tr><td valign="top"><strong>()</strong></td><td>Brackets, for defining the priority of comparisions. Always use brackets when priority matters!</td></tr></tbody></table>

### Remarks:

*   The "equals" comparison is done with '==', to differentiate it from the assignment instruction with '**\=**'. Wrongly using '=' instead of '==' causes no error message from the compiler because it's a valid assignment, but is a frequent bug in scripts.
*   Comparing floating point variables (**var**, **double**, **float**, **DATE**) with '==' returns normally **false** because they are almost never absolutely identical. Only exception are simple cases such as comparison with **0**. Otherwise, use only **\>**, **\>=**, **<**, **<=**, or the [between](068_between.md) function for comparing floating point variables with each other.
*   For comparing the content of structs or arrays, compare their elements. Strings can be compared with each other with the [strstr](str_.md) or [strcmp](str_.md) functions. For case insensitive comparing strings with string constants, (f.i. **if(Asset == "EUR/USD) ...** ) the operators  **'=='** and '**!=**' can be also used.
*   The precedence of comparison and expression operators follows the C/C++ standard. Use parentheses in case of doubt. For instance, the expressions **(x & y == z)** and **((x & y) == z)** give different results because the **&** operator has lower precedence than the **\==** operator.
*   Unlike C/C++, lite-C evaluates all parts in a **&&** or **||** comparison, even if one of it evaluates to false. Therefore, avoid constructs like **if (p && p->data == 1)..;** use **if (p) if (p->data == 1)..** instead.

### Examples:

```c
10 < x _// true if x is greater than 10_
(10 <= x) and (15 => x) _// true if x is between 10 and 15_
!((10 <= x) and (15 => x)) _// true if x is less than 10 or greater than 15 (lite-C only)_
```

### See also:

 [Functions](048_Functions.md), [Variables](aarray.md), [Pointers](apointer.md), [Expressions](050_Expressions.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))