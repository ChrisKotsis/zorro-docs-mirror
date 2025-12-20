---
title: "Lecture 7"
source: "https://zorro-project.com/manual/en/Lecture 7.htm"
---

# Lecture 7

# Lecture 7 – Visualization and Reporting with R

In [Advanced R Tutorial](http://www.rfortraders.com/code/advanced-r-tutorial/), [FINC 621](http://www.rfortraders.com/code/finc-621/), [R Programming](http://www.rfortraders.com/code/r-programming/)

By now you should be familiar with most of the core functionality of the R programming language. We can perform simulations, graph results, create summary statistics, export our results to files and accomplish almost any programming feat by simply using the base installation of R. In this lecture I want to introduce a few tools (libraries) that extend R’s reach. Especially, in terms of producing robust and elegant visualizations and drafting reproducible reports.

#### Graphing

All of our graphing needs up to this point have been met by the **plot()**, **lines()** and **abline()** functions. We can do better than this.

[Hadley Wickham](http://had.co.nz/) has created a great library that takes graphing/plotting in R to a whole new level. The library is called **ggplot2** and much more information about it can be found here: [ggplot2 examples.](http://ggplot2.org/)

According to the ggplot2 website: _“ggplot2 is a plotting system for R, based on the grammar of graphics, which tries to take the good parts of base and lattice graphics and none of the bad parts. It takes care of many of the fiddly details that make plotting a hassle (like drawing legends) as well as providing a powerful model of graphics that makes it easy to produce complex multi-layered graphics.”_

Let’s take a look at a few examples. (I will closely follow the examples presented [here.](http://docs.ggplot2.org/current/qplot.html))

##### qplot()

We will be utilizing the _mtcars_ data frame that is already accessible through R. Here’s what it looks like:

![cars dataframe in R](../images/cars-dataframe.png)

The **qplot()** function is similar to the **plot()** function in many respects.

<table><tbody><tr id="p3351"><td class="code" id="p335code1"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">require</span><span style="color: #080;">(</span>ggplot2<span style="color: #080;">)</span>
 qplot<span style="color: #080;">(</span>mpg, wt, <span style="color: #0000FF; font-weight: bold;">data</span> <span style="color: #080;">=</span> <span style="color: #CC9900; font-weight: bold;">mtcars</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![ggplot in R ](../images/graph11.png)

<table><tbody><tr id="p3352" class="alt-table-row"><td class="code" id="p335code2"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;"># Add different colors based on the cylinder type </span>
 qplot<span style="color: #080;">(</span>mpg, wt, <span style="color: #0000FF; font-weight: bold;">data</span> <span style="color: #080;">=</span> <span style="color: #CC9900; font-weight: bold;">mtcars</span>, colour <span style="color: #080;">=</span> cyl<span style="color: #080;">)</span></pre></td></tr></tbody></table>

![ggplot graph in R 2](../images/graph2.png)

<table><tbody><tr id="p3353"><td class="code" id="p335code3"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;"># Different styling based on the cylinder type</span>
 qplot<span style="color: #080;">(</span>mpg, wt, <span style="color: #0000FF; font-weight: bold;">data</span> <span style="color: #080;">=</span> <span style="color: #CC9900; font-weight: bold;">mtcars</span>, size <span style="color: #080;">=</span> cyl<span style="color: #080;">)</span></pre></td></tr></tbody></table>

![ggplot graph in R 3](../images/graph3.png)

<table><tbody><tr id="p3354" class="alt-table-row"><td class="code" id="p335code4"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;"># One or two sided faceting formula</span>
 qplot<span style="color: #080;">(</span>mpg, wt, <span style="color: #0000FF; font-weight: bold;">data</span> <span style="color: #080;">=</span> <span style="color: #CC9900; font-weight: bold;">mtcars</span>, facets <span style="color: #080;">=</span> vs ~ am<span style="color: #080;">)</span></pre></td></tr></tbody></table>

![ggplot in R 4](../images/graph4.png)

##### Graphics grammar syntax

Let’s take a look at a more interesting example that leverages the graphics grammar paradigm. More information on what a graphics grammar is can be found [here.](http://vita.had.co.nz/papers/layered-grammar.pdf)

<table><tbody><tr id="p3355"><td class="code" id="p335code5"><pre class="rsplus" style="font-family:monospace;"> stocks <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span><span style="color: #080;">(</span>signal <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">sample</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"Buy"</span>, <span style="color: #ff0000;">"Sell"</span><span style="color: #080;">)</span>, <span style="color: #ff0000;">100</span>, <span style="color: #0000FF; font-weight: bold;">replace</span> <span style="color: #080;">=</span> TRUE<span style="color: #080;">)</span>, returns <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">100</span>, <span style="color: #ff0000;">0</span>, <span style="color: #ff0000;">0.6</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
&nbsp;
obj <span style="color: #080;">&lt;-</span> ggplot<span style="color: #080;">(</span>stocks, aes<span style="color: #080;">(</span>x<span style="color: #080;">=</span>returns<span style="color: #080;">)</span><span style="color: #080;">)</span>
obj <span style="color: #080;">&lt;-</span> obj <span style="color: #080;">+</span> geom_histogram<span style="color: #080;">(</span>aes<span style="color: #080;">(</span>y<span style="color: #080;">=</span>..<span style="">density</span>..<span style="color: #080;">)</span>, binwidth<span style="color: #080;">=</span>.8, colour<span style="color: #080;">=</span><span style="color: #ff0000;">"red"</span>, fill<span style="color: #080;">=</span><span style="color: #ff0000;">"grey"</span><span style="color: #080;">)</span> 
obj <span style="color: #080;">&lt;-</span> obj <span style="color: #080;">+</span> geom_density<span style="color: #080;">(</span>alpha<span style="color: #080;">=</span>.2, fill<span style="color: #080;">=</span><span style="color: #ff0000;">"purple"</span><span style="color: #080;">)</span>
obj</pre></td></tr></tbody></table>

![ggplot2 graph](../images/ggplot2-graph.png)

#### Reporting

No matter how sophisticated or elegant your statistical analysis happens to be, if you can’t report your results in a meaningful and reproducible way to your management or end-users of your research, your conclusions will be lost. The following steps outline one easy way for weaving together your analytics with your reporting and presenting the end result in a clean and comprehensive manner.

##### Rstudio

Rstudio is currently one of the best IDE’s (Integrated Development Environment) available for the R language. It is 100% free, is cross-platform (meaning that it works on windows, linux and mac machines) and enables R programmers to become more productive by providing them with all the functionality they could possibly need within the IDE.

Rstudio can be downloaded from [Rstudio.com](http://www.rstudio.com/). Rstudio bundles various third party libraries that we will be utilizing in this lecture. One of them is **knitr**. This library was created by [Yihui Xie](http://yihui.name/knitr/) and allows one to create PDF reports that include embedded R code along with LaTeX formatting. To find more about what LaTeX is and how it can help you write better documents, click here: [LaTeX details.](http://en.wikipedia.org/wiki/LaTeX)

In order to use the **knitr** library, LaTeX needs to be installed on your computer. If you are using a windows machine, you can obtain LaTeX from here: [LaTeX for Windows.](http://miktex.org/download) If you are using a mac, you can get LaTeX from here: [LaTeX for Mac.](http://pages.uoregon.edu/koch/texshop/) Once you have downloaded and installed Rstudio, there is no need to install **knitr**. It is already part of the Rstudio installation.

##### How to create a simple .pdf report with Rstudio

Here are some basics:

1.  Open Rstudio, click on File -> New -> R Sweave
    
    ![Rstudio Knitr document](../images/Rstudio-Knitr-document.png)
    
2.  Let’s start off with a simple example that doesn’t include any R code yet. Type the following between the begin{document} and end{document} tags. _Hello R world. This is my first LaTeX document._
3.  Now click on the _Compile PDF_ button above and save the file to an appropriate location.
4.  This is what you will see. A complete .pdf document.

![Knitr pdf document](../images/Knitr-pdf-document.png)

Let’s take this a step further and add some R code and some formatting into the mix. Here’s what the complete document contents should look like:

<table><tbody><tr id="p3356" class="alt-table-row"><td class="code" id="p335code6"><pre class="rsplus" style="font-family:monospace;"> \documentclass<span style="color: #080;">{</span>article<span style="color: #080;">}</span>
&nbsp;
 \begin<span style="color: #080;">{</span>document<span style="color: #080;">}</span>
&nbsp;
   Hello R world. <span style="">This</span> <span style="color: #0000FF; font-weight: bold;">is</span> my first LaTeX document. 
&nbsp;
   <span style="color: #080;">&lt;&lt;</span>echo <span style="color: #080;">=</span> TRUE, <span style="color: #0000FF; font-weight: bold;">message</span> <span style="color: #080;">=</span> FALSE<span style="color: #080;">&gt;&gt;=</span>
&nbsp;
    x <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">1000</span><span style="color: #080;">)</span>
    <span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>x<span style="color: #080;">)</span>
&nbsp;
   @
&nbsp;
 \<span style="color: #0000FF; font-weight: bold;">end</span><span style="color: #080;">{</span>document<span style="color: #080;">}</span></pre></td></tr></tbody></table>

The _echo = TRUE_ command tells knitr to output the code to the pdf file. Not only is the code echoed to the user, it is also executed and the result prints to the pdf document.

![pdf with graph knitr](../images/pdf-with-graph-knitr.png)

Here’s a slightly more complicated example that passes a variable calculated from R back to the LaTeX text. I have also added some formatting to the pdf document itself for adjusting the margins slightly. Notice the use of the **Sexpr** command in the example below:

<table><tbody><tr id="p3357"><td class="code" id="p335code7"><pre class="rsplus" style="font-family:monospace;"> \documentclass<span style="color: #080;">{</span>article<span style="color: #080;">}</span>
&nbsp;
  \usepackage<span style="color: #080;">[</span>
   top    <span style="color: #080;">=</span> 1.00cm,
   bottom <span style="color: #080;">=</span> 1.00cm,
   left   <span style="color: #080;">=</span> 2.00cm,
   right  <span style="color: #080;">=</span> 1.50cm<span style="color: #080;">]</span><span style="color: #080;">{</span>geometry<span style="color: #080;">}</span>
&nbsp;
 \begin<span style="color: #080;">{</span>document<span style="color: #080;">}</span>
&nbsp;
   Hello R world. <span style="">This</span> <span style="color: #0000FF; font-weight: bold;">is</span> my first LaTeX document. 
&nbsp;
   <span style="color: #080;">&lt;&lt;</span>echo <span style="color: #080;">=</span> TRUE, <span style="color: #0000FF; font-weight: bold;">message</span> <span style="color: #080;">=</span> FALSE<span style="color: #080;">&gt;&gt;=</span>
&nbsp;
    x <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">1000</span><span style="color: #080;">)</span>
    <span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>x<span style="color: #080;">)</span>
   @
&nbsp;
   Now we will compute something <span style="color: #0000FF; font-weight: bold;">else</span> <span style="color: #0000FF; font-weight: bold;">with</span> R<span style="color: #080;">:</span>
&nbsp;
   <span style="color: #080;">&lt;&lt;</span>echo <span style="color: #080;">=</span> TRUE, <span style="color: #0000FF; font-weight: bold;">message</span> <span style="color: #080;">=</span> FALSE<span style="color: #080;">&gt;&gt;=</span>
&nbsp;
   <span style="color: #228B22;"># Here's a coin toss simulation</span>
   N        <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">100</span>
   coinToss <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">sample</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #080;">-</span><span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span><span style="color: #080;">)</span>, <span style="color: #ff0000;">100</span>, <span style="color: #0000FF; font-weight: bold;">replace</span> <span style="color: #080;">=</span> TRUE<span style="color: #080;">)</span>
&nbsp;
   @
&nbsp;
  The number of heads that occur <span style="color: #0000FF; font-weight: bold;">while</span> tossing 
  a fair coin \Sexpr<span style="color: #080;">{</span>N<span style="color: #080;">}</span> times <span style="color: #0000FF; font-weight: bold;">is</span><span style="color: #080;">:</span> \Sexpr<span style="color: #080;">{</span><span style="color: #0000FF; font-weight: bold;">length</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">which</span><span style="color: #080;">(</span>coinToss <span style="color: #080;">==</span> <span style="color: #ff0000;">1</span><span style="color: #080;">)</span><span style="color: #080;">)</span><span style="color: #080;">}</span>
&nbsp;
 \<span style="color: #0000FF; font-weight: bold;">end</span><span style="color: #080;">{</span>document<span style="color: #080;">}</span></pre></td></tr></tbody></table>

Formatting a LaTeX document is something that we have not covered in this class. [Here’s a](http://www.stdout.org/~winston/latex/latexsheet.pdf) cheat sheet that might come in handy when working with LaTeX syntax.

![knitr with R output](../images/knitr-with-R-output.png)