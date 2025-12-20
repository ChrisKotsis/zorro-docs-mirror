---
title: "Functions"
source: "https://zorro-project.com/manual/en/function.htm"
---

# Functions

# Functions

A **function** is simply a list of **commands**. When the function is **called**, the commands are executed one after another. Such a command can assign a value to a variable, or call another user-defined or pre-defined function. A function is defined this way:

## functiontype name (Argument1, Argument2, ...) { ... code ... }

**functiontype** is the variable type (such as **var**, **int**...) that the function returns to the caller. If the function returns nothing, write just **void** for the type. The often used type **function** can return either nothing, or an **int**.

**name** is the name of the function. It must follow the same rules as variable names.

**(Argument1, Argument2, ...)** is a list of parameters, named 'arguments', that are passed to the function. Each argument is given with its variable type and name, such as **"var X"**. The function receives these variables from the caller. For each variable that is passed to the function, the parameter list must contain one entry. This entry specifies the type and name with which the variable is referred to inside the function. The parameter list is enclosed in parentheses. If the function expects no parameters, leave the parentheses empty.

**{ ... code ... }** is the function body, enclosed in braces. It's a list of commands that do the real work. When a function is called, execution begins at the start of the function body and terminates (returns to the calling program) when a [return](049_return.md) statement is encountered or when execution reaches the closing brace.

A simple function definition without parameters looks like this:

```c
function alert() 
{ 
  printf("Warning!");
  sound("beep.wav");
}
```

This function is executed whenever the program calls the command **alert()**. The next example is a function that takes two **var** variables as parameters:

```c
function alert2(var Value, var Limit)
{
  if (Value > Limit)
    printf("Warning - value above limit!");
}
```

If a global variable or another object of the same name as the parameter exists, all references within the function refer to the 'local' parameter and not to the 'global' variable. Still, to avoid confusion, don't use the same names for global and local variables. The function may change any of its parameters, as '**value**' in the example, but the original variable in the calling function remains unchanged.

### Return values

A function can return a value to its caller, through the [return](049_return.md) statement. Example:
```c
var average(var a, var b) 
{ 
  return (a+b)/2; 
} 

_// this can be called this way_:
...
x = average(123,456); _// calculate the average of 123 and 456, and assign it to x_
```
For returning multiple values, their [pointers](apointer.md) can be given in the parameter list. Or the function can return a pointer to a static [struct](047_Structs.md) or [array](aarray.md).

### Function prototypes and function pointers

Like all other objects, functions must be defined before they can be called by another function. Sometimes this is inconvenient, for instance if two functions call each other. In that case, a function can be predefined through a **prototype**. The prototype consists of the function title with the list of arguments or argument types, followed by a semicolon, but without the command list in {...}. In the argument list of a prototype, the variable names can be omitted, only the variable types are necessary.Example:
```c
var greater\_of(var,var); _// prototype of function greater\_of_

var greater\_of(var a, var b) _// real function greater\_of_
{
  if (a > b) return a;
  else return b;
}
```

In lite-C a function prototype can also be used as a function pointer. Example:

```c
long MessageBox(HWND,char\*,char\*,long); _// prototype of function MessageBox_
...
MessageBox = DefineApi("user32!MessageBoxA"); _// set the MessageBox pointer to a function in the user32.dll_
```

### Recursive functions

A function can call itself - this is named a **recursive function**. Recursive functions are useful for solving certain mathematical or AI problems. Example:
```c
int factorial(int X)
{
  if (X <= 1) return 1;  
  else if (X >= 10) return(0); _// number becomes too big..._
  else return X\*factorial(X-1);
}
```

Recursive functions must be used with care. If you make a mistake, like a function that infinitely calls itself, you can easily produce a 'stack overflow' which crashes the computer. The stack size allows a recursion depth of around 1000 nested function calls, dependent on number and size of local variables inside the function.

### Overloaded functions

In lite-C, functions can be **overloaded**, which means you can define several functions with the same name, but different parameter lists. The compiler knows which function to use depending on the types and numbers of parameters passed. Example:
```c
var square(var x) 
{ 
  return pow(x,2); 
}

int square(int x) 
{ 
  return(x\*x); 
}
...
var x = square(3.0); _// calls the first square function_
int i = square(3);   _// calls the second square function_
```

### Variable number of parameters

Functions can be called with less or more than given number of parameters when the parameter list has a **"..."** for the last parameter. The function can then be called with less parameters; the missing parameters at the end are replaced with **0**. Functions in an external DLL or library, such as **printf**, can also be called with more parameters. C specific macros such as **va\_start** and **va\_end** then retrieve the additional parameters. Example:
```c
int test(int a,int b,int c,...)
{
  return a+b+c; 
}

void main()
{
  printf("\\n%d",test(1,2,3)); _// 6_
  printf("\\n%d",test(1,2));   _// 3_
  printf("\\n%d",test(1));     _// 1_
  printf("\\n%d",test());      _// 0_
}
```

### **Calling modifiers**

In lite-C, C,or C++ the **\_\_stdcall** calling modifier is used to call Win32 API functions. The called function cleans the stack. The **\_\_cdecl** calling modifier is the default calling convention in C-Script, lite-C, C and C++ programs. Because the stack is cleaned up by the caller, it can do variable argument (**vararg**) functions, like **printf(...)**.

### Special functions

If a function named **main()** exists in the script (see above example), it is automatically called at the start of the program. The program terminates when the **main()** function returns. This is for using a script for other purposes than for trading.

It a function named **[run()](088_run.md)** exists in the script, it is automatically called at the start of the program and also after every bar. The program terminates when there are no more bars, or when \[Stop\] is clicked. More functions that are automatically called at certain events are listed [here](funclist.md).

### See also:

[Variables](aarray.md), [Pointers](apointer.md), [Structs](047_Structs.md)[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))