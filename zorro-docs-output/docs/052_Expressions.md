---
title: "Expressions"
source: "https://zorro-project.com/manual/en/expressions.htm"
---

# Expressions

# Expressions

An expression is an arithmetical operation that delivers a result, which can then be assigned to a variable or object parameter. The arithmetic expression may be composed of any numbers, further variables or object parameters, function calls, brackets, and arithmetic operators.  
  
The following operators are available in expressions:

<table border="0" cellspacing="2" cellpadding="2"><tbody><tr><td valign="top"><b>=</b></td><td>Assigns the result right of the '=' to the variable left of the '='.</td></tr><tr><td valign="top"><b>+-*/</b></td><td>The usual mathematical operators. * and / have a higher priority than + and -.</td></tr><tr><td valign="top"><span><b>%</b></span></td><td>Modulo operator, the integer remainder of a division.</td></tr><tr><td valign="top"><span><b>|</b></span></td><td>Bitwise OR, can be used to set certains bits in a variable.</td></tr><tr><td valign="top"><span><b>^</b></span></td><td>Bitwise exclusive OR, can be used to toggle certain bits in a variable.</td></tr><tr><td valign="top">~</td><td>Bitwise invert, toggles all bits of a variable.</td></tr><tr><td valign="top"><span><b>&amp;</b></span></td><td>Bitwise AND, can be used to reset certains bits in a variable.</td></tr><tr><td valign="top"><span><b>&gt;&gt;</b></span></td><td>Bitwise right shift, can be used to divide a positive integer value by 2.</td></tr><tr><td valign="top"><span><b>&lt;&lt;</b></span></td><td>Bitwise left shift, can be used to multiply a positive integer value by 2.</td></tr><tr><td valign="top"><b>()</b></td><td>Parentheses for defining the priority of mathematical operations.</td></tr></tbody></table>

### Examples:

```c
x = (a + 1) \* b / c;
z = 10;
x = x >> 2; _// divides x by 4_ _(integer only)_
x = x << 3; _// multiplies x by 8_ _ (integer only)_
x = fraction(x) << 10; _// copies the fractional part of x (10 bits) into the integer part_
```

### Assignment operators

The "**\=**"-character can be combined with the basic operators:  
  

<table border="0" cellspacing="2" cellpadding="2"><tbody><tr><td valign="top"><b>+=</b></td><td>Adds the result right of the operator to the variable left of the operator.</td></tr><tr><td valign="top"><b>-=</b></td><td>Subtracts the result right of the operator from the variable left of the operator.</td></tr><tr><td valign="top"><span><b>*</b></span><b>=</b></td><td>Multiplies the variable left of the operator by the result right of the operator.</td></tr><tr><td valign="top"><span><b>/</b></span><b>=</b></td><td>Divides the variable left of the operator by the result right of the operator.</td></tr><tr><td valign="top"><b>%=</b></td><td>Sets the variable left of the operator to the remainder of the division by the result right of the operator.</td></tr><tr><td valign="top">|=</td><td>Bitwise OR's the the result right of the operator and the variable left of the operator.</td></tr><tr><td valign="top">&amp;=</td><td>Bitwise AND's the the result right of the operator and the variable left of the operator.</td></tr><tr><td valign="top">^=</td><td>Bitwise exclusive OR's the the result right of the operator and the variable left of the operator.</td></tr><tr><td valign="top">&gt;&gt;=</td><td>Bitwise right shift the variable left of the operator by the result right of the operator.</td></tr><tr><td valign="top">&lt;&lt;=</td><td>Bitwise left shift the variable left of the operator by the result right of the operator.</td></tr></tbody></table>

### Increment and decrement operators

Variables can be counted up or down by attaching '**++**' or '**\--**' before or after a variable.  
 

<table border="0" cellpadding="2" cellspacing="2"><tbody><tr><td valign="top"><b>x++</b></td><td>Increments <strong>x</strong> by <strong>1</strong>; the result is the previous value of <strong>x</strong> (before incrementing).</td></tr><tr><td valign="top"><b>++x</b></td><td>Increments <strong>x</strong> by <strong>1</strong>; the result is the current (incremented) value of <strong>x</strong>. This is slightly faster than <strong>x++</strong>.</td></tr><tr><td valign="top"><b>x--</b></td><td>Decrements <strong>x</strong> by <strong>1</strong>; the result is the previous value of <strong>x</strong> (before decrementing).</td></tr><tr><td valign="top"><b>--x</b></td><td>Decrements <strong>x</strong> by <strong>1</strong>; the result is the current (decremented) value of <strong>x</strong>. This is slightly faster than <strong>x--</strong>.</td></tr></tbody></table>

### Examples:

```c
x = x + 1; _// add 1 to x_
x += 1; _// add 1 to x_
++x; _// add 1 to x_
```

### Remarks:

*   For setting and resetting flags through the **&** or **|** operators, use **long** or **int** variables.
*    !!  The precedence of comparison and expression operators follows the C/C++ standard. Use parentheses in case of doubt. For instance, the expressions **(x & y == z)** and **((x & y) == z)** give different results because the **&** operator has lower precedence than the **\==** operator.
*   Bugs in expressions - for instance, division by zero - generate results that are not a number (**NaN**). They are printed like **"1.#J"** or **"1.#IND"**. If you see such a number in the log, there's a faulty expression somewhere in your script.

See also:

[Functions](048_Functions.md), [Variables](aarray.md), [Pointers](apointer.md), [Comparisons](comparisions.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))