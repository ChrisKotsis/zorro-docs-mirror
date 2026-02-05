---
title: "DefineApi, LoadLibrary"
source: "https://zorro-project.com/manual/en/litec_api.htm"
---

# DefineApi, LoadLibrary

# Using DLLs and APIs

The operating system and its subsystems provide Application Programming Interfaces (**API**) for programs to use their functions. Lite-C can call API functions either based on external Dynamic Link Libraries (DLLs), or on the Component Object Model (COM). DLLs are modules that provide external functions and variables; they are loaded at runtime. When a DLL is loaded, it is mapped into the address space of the calling process.

DLLs can contain two kinds of functions: exported and internal. The exported functions can be called by other modules. Internal functions can only be called from within the DLL where they are defined. Although DLLs can also export variables, their variables are usually only used by their functions. DLLs provide a way to modularize applications so that functionality can be updated and reused more easily. They also help reduce memory overhead when several applications use the same functionality at the same time, because although each application gets its own copy of the data, they can share the code.

The Microsoft� Win32� application programming interface (API) is implemented as a set of dynamic-link libraries, so any process that uses the Win32 API uses dynamic linking.

### Declaring a DLL or Windows API Function

Before an API function from an external DLL can be called, a function prototype must be declared, just as any other function. Example:
```c
long WINAPI MessageBoxA(HWND,char \*,char \*,long);
```

The function prototype - which is in fact a function pointer - must then be initialized with the function address. There are three methods: static initialization in the **api.def** (for functions that are often used), static initialization by an **API(FunctionName,ModuleName)** macro (for functions only defined in a particular header), and dynamic initialization by **DefineApi** (for functions that are only used in a particular appliction).

The most common static API functions are defined in the **api.def** file. It's just a plain text file, so it can easily be modified. Open **api.def** in the Zorro folder, and add a line to it in the style (**FunctionName;ModuleName!ProcName**). **FunctionName** is your declared function, **ModuleName** is the name of the DLL without the **".dll"** extension, and **ProcName** is the name of the function within that DLL (which needs not necessarily be identical to your function name). Example:

```c
MessageBox;user32!MessageBoxA
```

For acessing a function in a Windows header file, the simplest way is using the **API** macro in the script. Example:

```c
long WINAPI MessageBoxA(HWND,char \*,char \*,long);
API(MessageBoxA,user32)
```

**WINAPI** is defined as **\_\_stdcall**, as required for calling a Windows API function. You can find examples of this way to declare external DLL functions in the **include\\windows.h** header file. For implementing your own DLLs you will probably use the **\_\_cdecl** calling convention, which is the default. So make sure that the functions are defined correctly. Also look under [Tips & Tricks](246_Tips_Tricks.md) for using indicators from external DLLs.

For dynamically accessing an API function at runtime, either use the **DefineApi** call, or load the DLL and retrieve the function address through standard Windows functions. The function prototype can be used as a function pointer. Examples:

```c
_// Example1:_
long \_\_stdcall MessageBox(HWND,char \*,char \*,long);
MessageBox = DefineApi("user32!MessageBoxA");

_// Example2:_
long \_\_stdcall MessageBox(HWND,char \*,char \*,long);
long h = LoadLibrary("user32");
MessageBox = GetProcAddress(h,"MessageBoxA");
```

By default, **api.def** contains a selection of C standard functions. The **windows****.h** header contains the Windows API functions. If you need a certain function that is not included, you can add it easily as described under [Converting C++ Code to lite-C](litec_c.md).

For calling functions from a self-written VC++ DLL, put it in the **Strategy** folder, and access its functions in your script as shown below (assume its name is **MyDll.dll** and it exports a function **double square(double)**):

```c
var square(var Arg);
API(square,Strategy\\\\MyDll)

void main()
{
  if(!square)
    printf("No square!"); _// DLL or function not found_
  else
    printf("Square: %.3f",square(3));
}
```
For giving your DLL access to all Zorro functions, let Zorro call a function from your Dll and pass the pointer to the **g** singleton struct. The **g->Functions** pointer is the address of a list of all Zorro functions in the same order as in **include\\func\_list.h**. The function prototypes are coded in **include\\functions.h**. In this way you can access all Zorro functions as if from a strategy DLL or a broker plugin. An example can be found in **Source\\VC++\\ZorroDll.cpp**, which is automatically added to all strategy DLLs. 

### Using C++ classes (

Lite-C can use classes and functions from COM DLLs; the most often used example is the **DirectX** DLL. **Classes** are like [structs](structs.md), but contain not only variables but also functions (**methods**). Any COM class contains three standard methods - **QueryInterface()**, **AddRef()**, and **Release()** - as well as any number of class specific methods. For example, here's the lite-C code for defining a COM class that contains two specific methods, **Func1()** and **Func2()**:

<table border="0" cellpadding="1"><tbody><tr bgcolor="#FFFFFF"><td><pre>typedef struct _IFooVtbl
{    
    HRESULT __stdcall QueryInterface(void* This,IID *riid,void** ppvObject);        
    DWORD   __stdcall AddRef(void* This);    
    DWORD   __stdcall Release(void* This);    
    HRESULT __stdcall Func1(void* This);    
    HRESULT __stdcall Func2(void* This,int);
} IFooVtbl;


typedef interface IFoo { IFooVtbl *lpVtbl; } IFoo;
</pre></td></tr></tbody></table>

Note that each of the methods has an additional parameter called "**This**". You have to pass the **This** pointer parameter explicitly in C, but it can be passed automatically in lite-C. Any additional parameters come after **This**, as above. The interface is then **typedef**'d as a structure that contains a pointer to the **vtable**. For calling methods on COM objects, you can use either a C++-style or 'C'-style syntax. Example:

```c
pIFoo->Func1(); _// C++ style_  
pIFoo->lpVtbl->Func1(pIFoo); _// C style_
```

As lite-C does not support class inheritance, just add all inherited methods, if any, to the class. Example for a DirectX class:

```c
typedef struct ID3DXMeshVtbl  
{  
_// IUnknown methods_  
    long \_\_stdcall QueryInterface(void\* This, REFIID iid, LPVOID \*ppv);  
    long \_\_stdcall AddRef(void\* This);  
    long \_\_stdcall Release(void\* This);

_// methods inherited from ID3DXBaseMesh_
   long \_\_stdcall DrawSubset(void\* This, long AttribId);
   long \_\_stdcall GetNumFaces(void\* This);
   long \_\_stdcall GetNumVertices(void\* This);

_// ID3DXMesh methods_  
   long \_\_stdcall LockAttributeBuffer(void\* This, long Flags, long\*\* ppData);  
   long \_\_stdcall UnlockAttributeBuffer(void\* This)  
   long \_\_stdcall Optimize(void\* This, long Flags, long\* pAdjacencyIn, long\* pAdjacencyOut,   
                     long\* pFaceRemap, LPD3DXBUFFER \*ppVertexRemap,    
                     void\* ppOptMesh)
} ID3DXMeshVtbl;

typedef interface ID3DXMesh { ID3DXMeshVtbl \* lpVtbl; } ID3DXMesh;

...
ID3DXMesh\* pMesh;
...
pMesh->DrawSubSet(0);
long num = pMesh->GetNumFaces();
...
```

### See also:

[Pointers](apointer.md), [structs](047_Structs.md), [functions](048_Functions.md), [Dlls](dlls.md), [plugins](brokerplugin.md) [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))