---
title: "Python Bridge"
source: "https://zorro-project.com/manual/en/python.htm"
---

# Python Bridge

# Python Bridge

Python is the most popular interactive script language, created by Guido van Rossum and first released in 1991. Spaces, tabs and line feeds matter in Python code, and enforce a clean code style with correct indentations. Python is interpreted and thus slow compared to compiled languages like C. So it is not suited for high-speed strategies, but its strengths are a simple and modern syntax, and access to all sorts of libraries for machine learning and data analysis. Many tasks can be solved in the same way in lite-C as well as in Python, but Python often has already a dedicated command implemented or library available for that.

There are two methods to run Python code from Zorro. The **Python bridge** allows directly calling Python functions from a Zorro script and using their results for trade signals. A script can start a Python session, send price data or indicator values to it, and use Python machine learning packages for training and prediction. Alternatively, Zorro can directly call the **Python interpreter** **pythonw.exe** and exchange data via files. This method is slower, but works even when the used Python library does not support embedded Python. Examples for both methods are can be found below.

### Installation and test

Here's the procedure (Zorro 2.5 or above)

*   For the 32-bit Zorro version, install **Python 3.6 (32 bit)** or above from [https://www.python.org](https://www.python.org). Note that newer Python versions above 3.6 don't support Win XP and Win 7.
*   For the 64-bit Zorro64 version, install **Python 3.10 (64 bit)** or above.
*   If you have several Python versions, set up the Windows **System Environment Variables** so that the **Path** variable contains the right Python folder. This is not needed for Zorro, but for some Python modules.
*   Open **[Zorro.ini](007_Training.md)** and set **PythonPath** and/or **PythonPath64** to your Python folder that contains the Python DLLs. If the folder has a nonstandard name other than f.i. **Python32** or **Python12-32**, give the direct name of the Python DLL including the path. Examples: **"C:\\Users\\YourName\\AppData\\Local\\Programs\\Python\\Python310-32"** or .**"C:\\MyPythonPath\\Python310.dll".**
*   Start Zorro and run the script **PythonTest**. If everything went well, it prints out 0, 10, 20, 30, 40 and the sum 100.
*   For additional modules, move to the Python folder and install them with **pip**: **python -m pip install \[module name\]**
*   For updating an existing module to the latest version, use **python -m pip install \[module name\] --upgrade**

Make sure that any needed Python module is installed to your Python folder (don't use the pip **\--user** option). Afterwards the module can be mounted with the **import** statement. Please read the remarks about issues with particular modules.

The following functions are available via Python bridge for sending data to Python, performing computations, and receiving data back:

## pyStart(string Filename, int Mode): int

Start a new Python session, and optionally load and run Python code from the file **Filename**. This function must be called before any Python computations can be done. It returns **0** when the Python session could not be started, otherwise nonzero. The Python session will stay alive until the end of the Zorro session.  

### Parameters:

<table border="0"><tbody><tr><td><strong>Filename</strong></td><td><p>Name of a <strong>.py</strong> file in the <strong>Strategy</strong> folder containing all needed Python functions and variables (f.i. <strong>"MySource.py"</strong>), or <strong>0</strong> for not loading a file.</p></td></tr><tr><td><strong>Mode</strong></td><td><p>A combination of the following flags, otherwise <strong>0</strong>.<br><strong>1</strong> - log Python output and errors to the files <strong>PyOut.txt</strong> and <strong>PyError.txt</strong> in the <strong>Log</strong> folder<br><strong>2</strong> - don't release Python variables and modules at session end. Required for some modules (see remarks).<br></p></td></tr></tbody></table>

  

## pyX(string Code): int

Execute Python **Code**. It can contain an expression, like **"a = b + c"**, a function call, a function definition, an import, or any other valid Python statement. If the code cannot be excuted, **0** is returned, otherwise nonzero.  

### Parameters:

<table border="0"><tbody><tr><td><strong>Code</strong></td><td>Python code to be executed. Separate lines with <strong>\n</strong> and mind whitespace indentations.</td></tr></tbody></table>

  

## pySet(string Name, int n)

## pySet(string Name, var d)

## pySet(string Name, string s)

## pySet(string Name, var \*v, int elements)

Store an int, var, string, series or double array in the Python variable **Name**. Since the target type depends on the variable type, make sure to use the correct type. When storing constants, typecast them with **(int)** or **(var)** if in doubt. 

### Parameters:

<table border="0"><tbody><tr><td><strong>Name</strong></td><td>Name of the Python variable to be set (see remarks).</td></tr><tr><td><strong>i</strong></td><td><strong>int</strong> value to be assigned to a Python integer variable.</td></tr><tr><td><strong>d</strong></td><td><strong>var</strong> value to be assigned to a Python floating point variable.</td></tr><tr><td><strong>s</strong></td><td><strong>char* </strong>string to be assigned to a Python Unicode string variable.</td></tr><tr><td><strong>v</strong></td><td>Pointer of the <strong>var</strong> array or series to be assigned to a Python list.</td></tr><tr><td><strong>elements</strong></td><td>Length of the vector or series. Make sure to give the exact number of elements.</td></tr></tbody></table>

 

## pyInt(string Name): int

## pyVar(string Name): var

## pyStr(string Name): string

## pyVec(string Name, var \*v, int elements)

Return the Python variable with the given **Name** as an int, double, string, or array. Errors, such as wrong variable names or types, return **\-1**.

### Parameters:

<table border="0"><tbody><tr><td><strong>Name</strong></td><td>Name of a Python variable, previously defined by <strong>pyX</strong> or <strong>pySet</strong> (see remarks).</td></tr><tr><td><strong>v</strong></td><td>Pointer of the <strong>var</strong> array to be filled with the Python list.</td></tr><tr><td><strong>elements</strong></td><td>Number of elements of the vector; must be identical in the Python code and in the lite-C script.</td></tr></tbody></table>

### Remarks:

*   Variable names cannot contain expressions or elements. **"A"** is ok, but **"A\[1\]"**, **"A.size"**, or **"A+B"** is not.
*   Global variables to be modified by functions must always be declared **global** inside the function.
*   Test your Python commands and functions carefully with the Python console before executing them in a script. Errors - wrong syntax, a wrong path, a missing Python package, or a bad parameter for a Python function - will terminate the Python session.
*   While testing, open Python in **Mode 1** or **3** so that print and error outputs are redirected to the **Log** folder. The print and error output is updated after the end of the script (in **Mode 1**) or after closing Zorro (in **Mode 3**).
*   If you have the choice, do computations on the Zorro side. C and C++ are about 100 times faster than Python. 
*   The **numpy** package does not support multiple runs with embedded Python (details in [this discussion](https://github.com/numpy/numpy/issues/8097)). This is caused by a combination of design flaws in the Python and numpy de-initialization, and affects all modules based on **numpy**, such as scipy, pandas, keras, tensorflow, etc. Since this problem is known for a long time, a shortly fix is not to be expected. For not having to restart Zorro every time after running numpy based code, start Python in Mode **2** or **3**, or run numpy functions by calling the Python executable as in the example below.
*   You can use \[Train\] mode and [WFO](numwfocycles.md) for training Python machine learning algorithms, f.i. a SVM or neural network. For this, send training data to Python at the end of every WFO cycle, and store the trained models in files for later use in the \[Test\] or \[Trade\] session, similar to the **[neural](advisor.md)** function for R. We will provide a **neural** function for Python in a future Zorro version.
*   Packages containing Python, such as Anaconda or Jupyter, do normally not support external Python calls since they set up their own environment. In that case, install additionally a plain Python package.

### Examples:

```c
_// run some Python code_
function main()
{
  if(!pyStart(0,1)) {
    printf("Error - Python won't start!");
    return;
  }

  var Vec\[5\] = { 0,1,2,3,4 };
  pySet("PyVec",Vec,5);
  pyX("for i in range(5): PyVec\[i\] \*= 10\\n");
  pyVec("PyVec",Vec,5);

  int i;
  printf("\\nReturned: ");
  for(i=0; i<5; i++) printf("%.0f ",Vec\[i\]);

_// test a function
_  pyX("def PySum(V):\\n Sum = 0.0\\n for X in V:\\n Sum += X\\n return Sum\\n\\n");
  pyX("Result = PySum(PyVec)");
  printf("\\nSum: %.0f",pyVar("Result"));
}
```
```c
_// run a Python function_
function main()
{
  if(!pyStart("MyPythonScript.py",1)) {
    printf("Error - Python script won't start!");
    return;
  }
  pyX("Result = MyPythonFunction()");
  var Result = pyVar("Result");
  printf("\\nResult: %.2f",Result);
}
```
```c
_// trade by a Python signal_
function run()
{
  if(is(INITRUN))
    if(!pyStart("MyPythonScript.py",1))
      return quit("Error - Python script won't start!");

  asset(Asset);
  pySet("Price",priceC()); _// send current price to Python_
  pyX("Signal = PythonTradeAlgorithm(Price)");
  int Signal = pyInt("Signal"); _// received trade signal
_  if(Signal > 0)
    enterLong();
  else if(Signal < 0)
    enterShort(); 
}
```
```c
_// start Python interpreter and process a data array

// Python side: --------------------------------
#read signals from file_
Signals = \[\]
with open("Data/In.txt","r") as File:
  for Line in File:
    Signals.append(float(Line))
_\# process signals and write result back to file_
Processed = processMyData(Signals)
with open("Data/Out.txt","w") as File:
  for Line in Processed:
    File.write(str(Line))
    File.write('\\n')

_// Zorro side: --------------------------------
/ send signals to file_ 
string Content = zalloc(NumSignals\*32);
for(i=0; i<NumSignals; i++)
  strcat(Content,strf("%.4f\\n",Signals\[i\]));
file\_write("Data\\\\In.txt",Content,0);
_// call the Python interpreter_ 
string PythonPath = "MyPythonPath\\\\Pythonw";
exec(PythonPath,"Strategy/MyPython.py",1);
_// get returned signals_
file\_read("Data\\\\Out.txt",Content,NumSignals\*32);
Signals\[0\] = atof(strtok(Content,"\\n"));
for(i=1; i<NumSignals; i++)
  Signals\[i\] = atof(strtok(0,"\\n"));
...
```

### See also:

[Code conversion](021_Conversion_from_other_platforms.md), [R Bridge](rbridge.md), [Python cheat sheet](https://perso.limsi.fr/pointal/_media/python:cours:mementopython3-english.pdf)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))