---
title: "Pointers"
source: "https://zorro-project.com/manual/en/apointer.htm"
---

# Pointers

# Pointers

Pointers store references to variables. They point to the location in memory where the variable stores it's content. Pointers allow, for instance, the same function to do the same with different global variables, depending on what variable is currently referenced through a certain pointer. Pointers can be used like synonyms or alternative names for single variables or for arrays of variables.

A pointer is defined by adding a '**\***' to the name, like this:

**var \*mypointer; _// defines a pointer of type var with the name mypointer_**

The '\*' is also used for multiplication, but the compiler knows from the context if a pointer or a multiplication is meant.

You can get a pointer to any variable by adding a '**&**' to the variable name:

**var myvar = 77;  
mypointer = &myvar; _// now mypointer points to myvar_**

You can see the '**&**' as the opposite of '**\***'. For accessing a variable that is the target of the pointer, add a '**\***' to the pointer name, just as in the pointer definition. This way the variable can be directly read or set:

**\*mypointer = 66; _// now myvar contains 66_**

Pointers can also point to variable arrays, and can access their elements just by adding the usual **\[0\]**, **\[1\]**, ... etc. to the pointer name. In fact pointers and arrays are the same internal type. When **mypointer** is a pointer to an array, **mypointer+n** is a pointer to the **n**\-th element of that array. Therefore for accessing elements of the array, **\*mypointer** points to the same as element as **mypointer\[0\]** and **\*(mypointer+n)** points to the same element as **mypointer\[n\]**.

### Variable pointers in functions

There can be some situation where variable pointers might be useful. Normally if you pass a variable to a function, the function works merely with a copy of that variable. Changing the variable within the function only affects the copy. However if you pass the pointer to a variable, the function can change the original variable. For getting a pointer to a variable, just place a '**&**' before the variable name. Example:
```c
function change\_variable(var myvar)
{
  myvar += 1;
}


function change\_variable\_p(var \*myvar)
{
  \*myvar += 1;
}
...
var x = 10;
change\_variable(x);   _// now x is still 10_
change\_variable\_p(&x); _// now x is 11_
```

Lite-C automatically detects if a function expects a variable or a pointer to a variable, so you can usually omit the '**&**' and just write:

```c
change\_variable\_p(x); _// now x is 1_
```

### Arrays of pointers or series

When accessing elements in an array of pointers or [series](091_series.md), parentheses must be used:
```c
vars MySeriesArray\[3\]; _// declars an array of series_ 
...
for(i=0; i<3; i++) MySeriesArray\[i\] = series();
...
(MySeriesArray\[0\])\[0\] = 123; _// access the first element of the first array. Mind the parentheses!_
```

### Function pointers

A function pointer is defined just as a function prototype with return and parameter types. Example:
```c
float myfunction(int a, float b); _// define a function pointer named "myfunction" _ 

float fTest(int a, float b) { return (a\*b); }
...
myfunction = fTest;
x = myfunction(y,z);
```
For storing arrays of function pointers in C, **void\*** arrays can be used. Example:
```c
float myfunction(int a, float b); _// define a function pointer_

void\* function\_array\[100\];        _// define a pointer array_

float fTest(int a, float b) { return (a\*b); }
...
function\_array\[n\] = fTest;
myfunction = function\_array\[n\];
x = myfunction(y,z);
```

### See also:

[Variables](aarray.md), [Structs](047_Structs.md), [Functions](048_Functions.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))