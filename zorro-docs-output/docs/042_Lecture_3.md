---
title: "Lecture 3"
source: "https://zorro-project.com/manual/en/Lecture 3.htm"
---

# Lecture 3

# Lecture 3 – Matrices and Libraries

#### Matrices in R

A matrix is a very useful mathematical construct. Matrices provide a mechanism for easily manipulating large collections of data. Matrix Mathematics is a vast topic and there exist numerous papers and publications that talk about all the possible uses of matrices. Suffice it to say that this class is only going to use a small subset of these theorems. In R, a matrix can be created in the following manner:

<table><tbody><tr id="p2141"><td class="code" id="p214code1"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#specify an empty marix with 3 rows and 3 columns</span>
 emptyMat <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">3</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">3</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

Matrices are created column first. If you want to create the rows first, make sure to use the **byrow = TRUE** attribute.

<table><tbody><tr id="p2142" class="alt-table-row"><td class="code" id="p214code2"><pre class="rsplus" style="font-family:monospace;"> mat1 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">5</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">3</span>, byrow <span style="color: #080;">=</span> TRUE<span style="color: #080;">)</span></pre></td></tr></tbody></table>

as opposed to:

<table><tbody><tr id="p2143"><td class="code" id="p214code3"><pre class="rsplus" style="font-family:monospace;"> mat2 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">5</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">3</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

##### Naming Convention for Matrices

Since a matrix is an object within R, one can change the name attribute of the matrix. Names are assigned to the rows and to the columns of a matrix. The following three snippets of code accomplish this.

<table><tbody><tr id="p2144" class="alt-table-row"><td class="code" id="p214code4"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#Method 1</span>
 mat3 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">16</span>,<span style="color: #ff0000;">0</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">4</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">4</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">dimnames</span><span style="color: #080;">(</span>mat3<span style="color: #080;">)</span> <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">list</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"Row1"</span>, <span style="color: #ff0000;">"Row2"</span>, <span style="color: #ff0000;">"Row3"</span>, <span style="color: #ff0000;">"Row4"</span><span style="color: #080;">)</span>,
                        <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"Col1"</span>, <span style="color: #ff0000;">"Col2"</span>, <span style="color: #ff0000;">"Col3"</span>, <span style="color: #ff0000;">"Col4"</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
 <span style="color: #228B22;">#Method 2</span>
 mat4 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">16</span>,<span style="color: #ff0000;">0</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">4</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">4</span>, <span style="color: #0000FF; font-weight: bold;">dimnames</span> <span style="color: #080;">=</span>
                <span style="color: #0000FF; font-weight: bold;">list</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"Row1"</span>, <span style="color: #ff0000;">"Row2"</span>, <span style="color: #ff0000;">"Row3"</span>, <span style="color: #ff0000;">"Row4"</span><span style="color: #080;">)</span>,
                     <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"Col1"</span>, <span style="color: #ff0000;">"Col2"</span>, <span style="color: #ff0000;">"Col3"</span>, <span style="color: #ff0000;">"Col4"</span><span style="color: #080;">)</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
 <span style="color: #228B22;">#Method 3</span>
 myRowNames  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"r1"</span>, <span style="color: #ff0000;">"r2"</span>, <span style="color: #ff0000;">"r3"</span>, <span style="color: #ff0000;">"r4"</span><span style="color: #080;">)</span>
 myColNames  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"c1"</span>, <span style="color: #ff0000;">"c2"</span>, <span style="color: #ff0000;">"c3"</span>, <span style="color: #ff0000;">"c4"</span><span style="color: #080;">)</span>
 matrixNames <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">list</span><span style="color: #080;">(</span>myRowNames, myColNames<span style="color: #080;">)</span>
 mat5        <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">16</span>,<span style="color: #ff0000;">0</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">)</span>,<span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">4</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">4</span>, <span style="color: #0000FF; font-weight: bold;">dimnames</span> <span style="color: #080;">=</span> matrixNames<span style="color: #080;">)</span></pre></td></tr></tbody></table>

#### Fun with Matrices

The following basic operations can be performed on matrices:

##### Addition

Provided that the number of rows and columns are the same for the matrices being added, once can do the following:

<table><tbody><tr id="p2145"><td class="code" id="p214code5"><pre class="rsplus" style="font-family:monospace;"> m1 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">4</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 m2 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">5</span>,<span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 m3 <span style="color: #080;">&lt;-</span> m1 <span style="color: #080;">+</span> m2</pre></td></tr></tbody></table>

##### Subtraction

<table><tbody><tr id="p2146" class="alt-table-row"><td class="code" id="p214code6"><pre class="rsplus" style="font-family:monospace;"> m1 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">7.8</span>,<span style="color: #ff0000;">2.4</span>,<span style="color: #ff0000;">3.3</span>,<span style="color: #ff0000;">4.0</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 m2 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">5</span>,<span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 m3 <span style="color: #080;">&lt;-</span> m1 <span style="color: #080;">-</span> m2</pre></td></tr></tbody></table>

##### Multiplication

When multiplying together two matrices, make sure that the inner dimensions match. For example, it is fine to multiply a 2×3 with a 3×4 matrix. It is not ok to multiply together a 2×3 with a 4×4 matrix.

<table><tbody><tr id="p2147"><td class="code" id="p214code7"><pre class="rsplus" style="font-family:monospace;"> m1 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">7.8</span>,<span style="color: #ff0000;">2.4</span>,<span style="color: #ff0000;">3.3</span>,<span style="color: #ff0000;">4.0</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 m2 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">matrix</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">5</span>,<span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">nrow</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">ncol</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 m3 <span style="color: #080;">&lt;-</span> m1 <span style="color: #080;">%*%</span> m2</pre></td></tr></tbody></table>

##### Other

Matrix division is not defined. Rather, one can think of matrix division as multiplication by a matrix times the inverse of the second matrix. Remember also that, AB is not equal to BA in matrix land. Another operation that can be defined with matrices is that of exponentiation. This is a more involved topic and will not be covered in this class.

#### Determinant and Inverse

The determinant of a matrix A can be written as **det(A)** or |A|. The inverse of a matrix A can be written as inv(A) or A^-1.  
The determinant and the inverse of a matrix in R can be computed with the following functions: **det()** and **solve()**.

#### Sourcing Files

R code can be composed entirely within a simple text file. For more advanced editing capability, check out the following links:

*   [Tinn-R](http://www.sciviews.org/Tinn-R/)
*   [Notepad++](http://notepad-plus-plus.org/)
*   [Sublime 2](http://www.sublimetext.com/2)
*   [RStudio](http://www.rstudio.org/)

As mentioned in Class 1, there are 3 ways to get code into R.  
1\. Write code directly into the R console  
2\. Write code into a text file and copy/paste it into the R console  
3\. Write code into a text file, save the text file as a .R file and then invoke the **source()** command to load the contents of that file into memory.

<table><tbody><tr id="p2148" class="alt-table-row"><td class="code" id="p214code8"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#specify the path of the .R file</span>
 fileName <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">"c:/myCode.R"</span>
 <span style="color: #228B22;">#load the code into memory</span>
 <span style="color: #0000FF; font-weight: bold;">source</span><span style="color: #080;">(</span>fileName<span style="color: #080;">)</span></pre></td></tr></tbody></table>

#### Finding Packages

One of the benefits of the R environment is the abundance of open-source code in the form of external libraries/packages. The vast majority of these add-ons can be found here:  
[http://cran.r-project.org](http://cran.r-project.org/). Libraries are typically organized by subject matter. For a useful breakdown, click on _Packages -> CRAN Task Views_.

#### Installing Packages

There are two ways to install packages in R. The first way is via the GUI, and the second way is by issuing the appropriate command in the console.

##### Installing via the GUI

![Package loading in R](../images/loadPackages.png "Loading packages in R")

Package Loading in R

1.  Click on Packages -> Install package(s)
2.  Select a CRAN mirror site from the drop-down window.
3.  Select the appropriate package from the drop-down window and click OK.
4.  A diagnostic message will appear on the screen and the package will be loaded into the appropriate library folder.

There is a difference between installing a package and loading a package. The installation procedure will expose the new library/package to the R environment. This task only needs to occur once. In order to use the functions and classes within the newly installed package, the **library()** or **require()** commands need to be specified. This needs to occur every time the R workspace is re-loaded. The following command loads the newly installed package into memory.

<table><tbody><tr id="p2149"><td class="code" id="p214code9"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">library</span><span style="color: #080;">(</span>xts<span style="color: #080;">)</span></pre></td></tr></tbody></table>

Here, we have made the assumption that the xts package was installed. If all goes well, nothing will appear on the screen. If the package has not been previously installed, R will issue an error message.

##### Installing via the Command Prompt

To install a package from the command prompt, simply issue the following command.

<table><tbody><tr id="p21410" class="alt-table-row"><td class="code" id="p214code10"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">install.<span style="">packages</span></span><span style="color: #080;">(</span><span style="color: #ff0000;">"xts"</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

Like most functions, the **install.packages()** function takes multiple arguments. Various repositories and alternate file locations can be specified.

#### Useful Financial Packages

This class will briefly cover 2 packages. These are xts and quantmod. The xts package is a timeseries package and comes in very handy when dealing with ordered observations. The quantmod package allows for some extended graphing functionality and works well with xts.

##### xts()

Over the years, various practitioners and academics have written functions in R that deal with financial timeseries data. Given that the bulk of xts is written in C, it is ideal for fast lookups and indexing.  
An xts timeseries obect is composed of an index and coredata. The index contains the time information and the coredata contains the raw data. The following examples illustrate the creation and manipulation of xts objects. The first example is taken directly from the ?xts help file.

<table><tbody><tr id="p21411"><td class="code" id="p214code11"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">(</span>sample_matrix<span style="color: #080;">)</span>
 myXts <span style="color: #080;">&lt;-</span> as.<span style="">xts</span><span style="color: #080;">(</span>sample_matrix, descr<span style="color: #080;">=</span><span style="color: #ff0000;">'my new xts object'</span><span style="color: #080;">)</span> 
 <span style="color: #0000FF; font-weight: bold;">class</span><span style="color: #080;">(</span>myXts<span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">str</span><span style="color: #080;">(</span>myXts<span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#attribute 'descr' hidden from view </span>
 <span style="color: #0000FF; font-weight: bold;">head</span><span style="color: #080;">(</span>myXts<span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">attr</span><span style="color: #080;">(</span>myXts,<span style="color: #ff0000;">'descr'</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#sub-setting all of 2007</span>
 myXts<span style="color: #080;">[</span><span style="color: #ff0000;">'2007'</span><span style="color: #080;">]</span>
&nbsp;
 <span style="color: #228B22;">#March 2007 to the end of the data set</span>
 myXts<span style="color: #080;">[</span><span style="color: #ff0000;">'2007-03::'</span><span style="color: #080;">]</span>
&nbsp;
 <span style="color: #228B22;">#March 2007 to the end of 2007</span>
 myXts<span style="color: #080;">[</span><span style="color: #ff0000;">'2007-03::2007'</span><span style="color: #080;">]</span> <span style="color: #228B22;">#the whole data set</span>
 myXts<span style="color: #080;">[</span><span style="color: #ff0000;">'::'</span><span style="color: #080;">]</span>
&nbsp;
 <span style="color: #228B22;">#the beginning of the data through 2007</span>
 myXts<span style="color: #080;">[</span><span style="color: #ff0000;">'::2007'</span><span style="color: #080;">]</span>
&nbsp;
 <span style="color: #228B22;">#just the 3rd of January 2007</span>
 myXts<span style="color: #080;">[</span><span style="color: #ff0000;">'2007-01-03'</span><span style="color: #080;">]</span></pre></td></tr></tbody></table>

The first line of the previous example invokes the **data()** command. Typically, external packages include both functions and supporting data. The included data is meant to assist the user in understanding the functionality of the package. The **as.xts()** command casts the matrix into an xts object. In this example, the row-names of the matrix are converted into an index object and the rest of the data into the coredata. The **::** operator is used to extract specific data from the xts object.  
The next example extracts the index and the coredata from myXts.

<table><tbody><tr id="p21412" class="alt-table-row"><td class="code" id="p214code12"><pre class="rsplus" style="font-family:monospace;"> timeInfo <span style="color: #080;">&lt;-</span> index<span style="color: #080;">(</span>myXts<span style="color: #080;">)</span>
 dataInfo <span style="color: #080;">&lt;-</span> coredata<span style="color: #080;">(</span>myXts<span style="color: #080;">)</span></pre></td></tr></tbody></table>

The timeInfo object should now only contain the time-information. The command **class(timeInfo)** reveals that we are dealing with a POSIXct object. It is good practice to convert any timestamps into POSIXct from now on.  
Before we move on to more intricate timeseries examples, we need to address the conversion of strings into POSIXct objects. Typically, timestamps are formatted as strings initially when read in from Excel or other databases. Before we can convert the strings into POSIXct, we need to let R know what format we are dealing with. The next example illustrates this.

<table><tbody><tr id="p21413"><td class="code" id="p214code13"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#read in file from C: drive</span>
 x <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">read.<span style="">csv</span></span><span style="color: #080;">(</span><span style="color: #ff0000;">"C:/Users/yourname/Desktop/pricesFile.txt"</span>, stringsAsFactors <span style="color: #080;">=</span> FALSE<span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">head</span><span style="color: #080;">(</span>x<span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#convert the first column from a character into a POSIXct object so that we can use it</span>
 <span style="color: #228B22;">#to create an xts object.</span>
&nbsp;
 timeI <span style="color: #080;">&lt;-</span> x$Date
 <span style="color: #0000FF; font-weight: bold;">class</span><span style="color: #080;">(</span>timeI<span style="color: #080;">)</span>
 xtsIndex  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">as.<span style="">POSIXct</span></span><span style="color: #080;">(</span>timeI, <span style="color: #0000FF; font-weight: bold;">format</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"%m/%d/%Y"</span><span style="color: #080;">)</span>
 xtsPrices <span style="color: #080;">&lt;-</span> xts<span style="color: #080;">(</span>x<span style="color: #080;">[</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span>, xtsIndex<span style="color: #080;">)</span></pre></td></tr></tbody></table>

After converting a regular timeseries into an xts object, it becomes fairly easy to perform sub-setting, indexing and merging operations.

<table><tbody><tr id="p21414" class="alt-table-row"><td class="code" id="p214code14"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#indexing </span>
 xtsPrices<span style="color: #080;">[</span><span style="color: #ff0000;">'2006-07-11::2007-05-10'</span><span style="color: #080;">]</span>
&nbsp;
 <span style="color: #228B22;">#create a dummy xts series</span>
 xtsDummy <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">1.2</span> <span style="color: #080;">*</span> xtsPrices<span style="color: #080;">[</span><span style="color: #ff0000;">1</span><span style="color: #080;">:</span><span style="color: #ff0000;">10</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">]</span> <span style="color: #080;">-</span> xtsPrices<span style="color: #080;">[</span><span style="color: #ff0000;">1</span><span style="color: #080;">:</span><span style="color: #ff0000;">10</span>,<span style="color: #ff0000;">3</span><span style="color: #080;">]</span>
&nbsp;
 <span style="color: #228B22;">#merging</span>
 xtsMerged <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">merge</span><span style="color: #080;">(</span>xtsPrices<span style="color: #080;">[</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">]</span>, xtsPrices<span style="color: #080;">[</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">]</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

##### quantmod()

After installing and loading quantmod, we can use the following functions to visualize financial timeseries data. The following link provides some useful information about quantmod. [http://www.quantmod.com](http://www.quantmod.com/). The examples that follow are taken directly from the quantmod website.

<table><tbody><tr id="p21415"><td class="code" id="p214code15"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#install package</span>
 <span style="color: #0000FF; font-weight: bold;">install.<span style="">packages</span></span><span style="color: #080;">(</span><span style="color: #ff0000;">"quantmod"</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#load package</span>
 <span style="color: #0000FF; font-weight: bold;">library</span><span style="color: #080;">(</span>quantmod<span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#Goldman OHLC from yahoo </span>
 getSymbols<span style="color: #080;">(</span><span style="color: #ff0000;">"GS"</span><span style="color: #080;">)</span> 
 chartSeries<span style="color: #080;">(</span>GS<span style="color: #080;">)</span> 
 barChart<span style="color: #080;">(</span>GS,theme<span style="color: #080;">=</span><span style="color: #ff0000;">'white.mono'</span>, bar.<span style="">type</span><span style="color: #080;">=</span><span style="color: #ff0000;">'hlc'</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#how about some candles, this time with color</span>
 candleChart<span style="color: #080;">(</span>GS,multi.<span style="">col</span><span style="color: #080;">=</span>TRUE,theme<span style="color: #080;">=</span><span style="color: #ff0000;">'white'</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#and a line, with the default color scheme</span>
 lineChart<span style="color: #080;">(</span>GS,line.<span style="">type</span><span style="color: #080;">=</span><span style="color: #ff0000;">'h'</span>,TA<span style="color: #080;">=</span>NULL<span style="color: #080;">)</span> 
&nbsp;
 <span style="color: #228B22;">#(December '07 to last observation in '08)</span>
 candleChart<span style="color: #080;">(</span>GS,<span style="color: #0000FF; font-weight: bold;">subset</span><span style="color: #080;">=</span><span style="color: #ff0000;">'2007-12::2008'</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#slightly different syntax - after the fact. </span>
 <span style="color: #228B22;">#also changing the x-axis labeling </span>
 candleChart<span style="color: #080;">(</span>GS,theme<span style="color: #080;">=</span><span style="color: #ff0000;">'white'</span>,type<span style="color: #080;">=</span><span style="color: #ff0000;">'candles'</span><span style="color: #080;">)</span> 
 reChart<span style="color: #080;">(</span>major.<span style="">ticks</span><span style="color: #080;">=</span><span style="color: #ff0000;">'months'</span>,<span style="color: #0000FF; font-weight: bold;">subset</span><span style="color: #080;">=</span><span style="color: #ff0000;">'first 16 weeks'</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#The TA argument is one way to specify the</span>
 <span style="color: #228B22;">#indicators to be applied to the chart. NULL means don't draw any. </span>
 chartSeries<span style="color: #080;">(</span>GS, TA<span style="color: #080;">=</span>NULL<span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#Now with some indicators applied</span>
 chartSeries<span style="color: #080;">(</span>GS, theme<span style="color: #080;">=</span><span style="color: #ff0000;">"white"</span>, TA<span style="color: #080;">=</span><span style="color: #ff0000;">"addVo(); addBBands(); addCCI()"</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#The same result could be accomplished a bit more interactively:</span>
 chartSeries<span style="color: #080;">(</span>GS, theme<span style="color: #080;">=</span><span style="color: #ff0000;">"white"</span><span style="color: #080;">)</span>
 addVo<span style="color: #080;">(</span><span style="color: #080;">)</span>      <span style="color: #228B22;">#add volume</span>
 addBBands<span style="color: #080;">(</span><span style="color: #080;">)</span>  <span style="color: #228B22;">#add Bollinger Bands</span>
 addCCI<span style="color: #080;">(</span><span style="color: #080;">)</span>     <span style="color: #228B22;">#add Commodity Channel Index</span>
&nbsp;
 <span style="color: #228B22;">#Yahoo! OHLC from yahoo</span>
 getSymbols<span style="color: #080;">(</span><span style="color: #ff0000;">"YHOO"</span><span style="color: #080;">)</span>
 chartSeries<span style="color: #080;">(</span>YHOO, TA<span style="color: #080;">=</span>NULL<span style="color: #080;">)</span>
 addTA<span style="color: #080;">(</span>OpCl<span style="color: #080;">(</span>YHOO<span style="color: #080;">)</span>,<span style="color: #0000FF; font-weight: bold;">col</span><span style="color: #080;">=</span><span style="color: #ff0000;">'blue'</span>, type<span style="color: #080;">=</span><span style="color: #ff0000;">'h'</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#With newTA it is possible to create a #generic TA function. Let's call it addOpCl </span>
 addOpCl <span style="color: #080;">&lt;-</span> newTA<span style="color: #080;">(</span>OpCl,<span style="color: #0000FF; font-weight: bold;">col</span><span style="color: #080;">=</span><span style="color: #ff0000;">'green'</span>,type<span style="color: #080;">=</span><span style="color: #ff0000;">'h'</span><span style="color: #080;">)</span> 
 addOpCl<span style="color: #080;">(</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

[Next: R Lecture 4](041_Lecture_4.md)

#### References

*   CRAN, CRAN Packages, http://cran.r-project.org
*   Rmetrics, Rmetrics, http://www.rmetrics.org
*   Quantmod, Package by Jeff Ryan, URL http://www.quantmod.com
*   [Sample stock prices](http://www.rfortraders.com/wp-content/uploads/2012/11/stockPrices.txt)