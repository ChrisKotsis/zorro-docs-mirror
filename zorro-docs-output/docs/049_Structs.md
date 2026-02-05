---
title: "Structs"
source: "https://zorro-project.com/manual/en/structs.htm"
---

# Structs

# Structs

A **struct** is an assembled object that contains variables, pointers, or further structs. Members of a struct are individually accessed using the struct name, followed by a '.' and the member name. Example:

```c
typedef struct { 
  int x; 
  int y; 
  string name;
} SPOT;  _// defines a struct type named "SPOT"_
...
SPOT myspot; _// creates an uninitalized SPOT struct named "myspot"_  
SPOT\* pspot; _// creates an uninitalized pointer to a SPOT struct_
...
myspot.x = 10;
myspot.name = "test!";
```

A struct can contain [pointers](apointer.md) to previously defined structs, and even pointers on itself, but no pointers to later defined structs:

```c
typedef struct SPOT { 
  int x; 
  int y; 
  string name;
  struct SPOT\* next; _// pointer to a SPOT struct_
} SPOT;  _// defines a struct type named "SPOT"_
```

In lite-C, struct pointers can be initialized to a static struct. Example**:**

```c
SPOT\* myspot = { x = 1; y = 2; name = "my struct"; }  
_// creates a new SPOT struct with initial values that is then referenced through the myspot pointer_
```

Working with structs is explained in any C/C++ book, so we won't cover it here in detail. For creating structs or arrays of structs at run time, the standard C library functions **[malloc](sys_malloc.md)** and **[free](sys_free.md)** can be used. For initializing or copying structs, use the C library functions **memset()** and **memcpy()**:

```c
function foo()
{
  SPOT myspot; 
  memset(myspot,0,sizeof(myspot)); _// set the struct content to zero (it's undefined after malloc)_
  myspot.x = 1;  
  SPOT\* spot\_array = malloc(100\*sizeof(myspot)); _// creates an array of 100 SPOT structs_
  memcpy(&spot\_array\[0\],myspot,sizeof(myspot));  _// copy the myspot struct to the first member of the array_
  ...
  free(myspot\_array); _// removes the created structs_
}
```

 !!  There is plenty information about C, C++, or Windows library functions on the Internet or in online C courses. It is highly recommended for advanced lite-C programming to work through such a course or book and learn about **malloc**, **memcpy** and all the other library functions that you can use.

## sizeof(struct)

The **sizeof()** macro that is used in the example above gives the size of a variable or a struct instance in bytes. This can be used to initialize structs:
```c
#define zero(struct) memset((void\*)&struct,0,sizeof(struct))
...
SPOT speed;
zero(speed);	_// initializes the SPOT struct "speed" to zero_
```

 !!  Unlike C/C++, **sizeof(some struct)** requires that at least one instance of the struct exists. Otherwise **sizeof** will return 0.

 !!  Arrays are internally treated as a pointer to a memory area. So, **sizeof(some array)** and **sizeof(some pointer)** always evaluates to **4** because that is the size of a pointer.

### See also:

[Variables](aarray.md), [pointers](apointer.md), [functions](048_Functions.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))