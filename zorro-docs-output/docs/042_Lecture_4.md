---
title: "Lecture 4"
source: "https://zorro-project.com/manual/en/Lecture 4.htm"
---

# Lecture 4

# Lecture 4 – Regression and Pairs Trading

In [Beginner R Tutorial](http://www.rfortraders.com/code/beginner-r-tutorial/), [FINC 621](http://www.rfortraders.com/code/finc-621/), [R Programming](http://www.rfortraders.com/code/r-programming/)

#### Regression Analysis

Regression is a very important topic. It is a widely used statistical tool in economics, ﬁnance and trading. R provides pre-written functions that perform linear regressions in a very straightforward manner. There exist multiple add-on packages that allow for more advanced functionality. In this class, we will only utilize the **lm()** function which is available in the base installation of R. The following example demonstrates the use of this function:

<table><tbody><tr id="p2541"><td class="code" id="p254code1"><pre class="rsplus" style="font-family:monospace;"> x    <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">1000</span><span style="color: #080;">)</span>
 y    <span style="color: #080;">&lt;-</span> <span style="color: #080;">(</span>x <span style="color: #080;">-</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span> <span style="color: #080;">+</span> <span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">1000</span><span style="color: #080;">)</span>
 outR <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">lm</span><span style="color: #080;">(</span>y ~ x<span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">summary</span><span style="color: #080;">(</span>outR<span style="color: #080;">)</span></pre></td></tr></tbody></table>

What we did above was creat an independent variable x and a dependent variable y. The call to the function **lm()** performed an OLS (Ordinary Least Square’s) ﬁt to the function: y = b0 + b1x + e, where e was distributed as N(mu, sigma^2)

The **~** is used to separate the independent from the dependent variables. The expression **y ~ x** is a formula that speciﬁes the linear model with one independent variable and an intercept. If we wanted to ﬁt the same model, but without the intercept, we would specify the formula as **y ~ x – 1**. This tells R to omit the intercept (force it to zero). The following graph illustrates the best ﬁt lines for a model with and without an intercept. If you know that your model should contain an intercept term, then include it. Otherwise, do not include the intercept. For the subsequent pairs trading example, we are going to assume that the intercept term is equal to 0.

![Graph of regression in R](../images/regression_graph.png "regression in R graph")

Whenever a regression is performed, it is very important to analyze the residuals (e) of the ﬁtted model. If everything goes according to plan, the residuals will be normally distributed with no visible pattern in the data, no auto-correlation and no heteroskedasticity. The residuals can be extracted from the regression object by using the **residuals** keyword.

<table><tbody><tr id="p2542" class="alt-table-row"><td class="code" id="p254code2"><pre class="rsplus" style="font-family:monospace;"> res <span style="color: #080;">&lt;-</span> outR$residuals
 <span style="color: #0000FF; font-weight: bold;">par</span><span style="color: #080;">(</span>mfrow <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>res, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"blue"</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"Residual Plot"</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">acf</span><span style="color: #080;">(</span>res<span style="color: #080;">)</span></pre></td></tr></tbody></table>

Here is a graph of both the residuals themselves and their auto-correlation.  
![residual plot in R and autocorrelation](../images/residuals.png "Regression residuals in R")

The **summary** keyword can be used to obtain the results of the linear regression model ﬁt.

<table><tbody><tr id="p2543"><td class="code" id="p254code3"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">summary</span><span style="color: #080;">(</span>outR<span style="color: #080;">)</span></pre></td></tr></tbody></table>

The p-values and t-statistics can be used to evaluate the statistical signiﬁcance of the coefﬁcients. The smaller the p-value, the more certain we are that the coefﬁcient estimate is close to the actual population coefﬁcient. Notice how both the intercept and the independent variable coefﬁcient is signiﬁcant in this example. The extraction of the coefﬁcients can be accomplished via  
the **coefficients** keyword.

<table><tbody><tr id="p2544" class="alt-table-row"><td class="code" id="p254code4"><pre class="rsplus" style="font-family:monospace;"> outR$coefficients</pre></td></tr></tbody></table>

#### Pairs Trading

What follows is a really simple version of a pairs trade between two equities. The main motivation for the following example is to expose you to obtaining data via the quantmod package and in using the **lm()** function that we covered above.

We will explore a simple two-legged spread between AAPL and QQQ. Once we download and transform the timeseries for both stocks, we will define a simple trading rule and explore the trades that our signal generates. Various trade statistics and graphs will be presented.

##### Step 1: Obtain data via quantmod

<table><tbody><tr id="p2545"><td class="code" id="p254code5"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#Utilize quantmod to load the security symbols</span>
 <span style="color: #0000FF; font-weight: bold;">require</span><span style="color: #080;">(</span>quantmod<span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">symbols</span> <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"AAPL"</span>, <span style="color: #ff0000;">"QQQ"</span><span style="color: #080;">)</span>
 getSymbols<span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">symbols</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

Now that our data frames for AAPL and QQQ are loaded into memory, let’s extract some prices.

##### Step 2: Extract prices and time ranges

<table><tbody><tr id="p2546" class="alt-table-row"><td class="code" id="p254code6"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#define training set</span>
 startT  <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">"2007-01-01"</span>
 endT    <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">"2009-01-01"</span>
 rangeT  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">paste</span><span style="color: #080;">(</span>startT,<span style="color: #ff0000;">"::"</span>,endT,sep <span style="color: #080;">=</span><span style="color: #ff0000;">""</span><span style="color: #080;">)</span>
 tAAPL   <span style="color: #080;">&lt;-</span> AAPL<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span><span style="color: #080;">[</span>rangeT<span style="color: #080;">]</span>
 tQQQ   <span style="color: #080;">&lt;-</span> QQQ<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span><span style="color: #080;">[</span>rangeT<span style="color: #080;">]</span>
&nbsp;
 <span style="color: #228B22;">#define out of sample set</span>
 startO  <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">"2009-02-01"</span>
 endO    <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">"2010-12-01"</span>
 rangeO  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">paste</span><span style="color: #080;">(</span>startO,<span style="color: #ff0000;">"::"</span>,endO,sep <span style="color: #080;">=</span><span style="color: #ff0000;">""</span><span style="color: #080;">)</span>
 oAAPL   <span style="color: #080;">&lt;-</span> AAPL<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span><span style="color: #080;">[</span>rangeO<span style="color: #080;">]</span>
 oQQQ   <span style="color: #080;">&lt;-</span> QQQ<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span><span style="color: #080;">[</span>rangeO<span style="color: #080;">]</span></pre></td></tr></tbody></table>

Notice how we defined and in-sample and out-of-sample range. We will use the in-sample data to compute a simple hedge ratio and then we will apply this hedge ratio to the out of sample data.

##### Step 3: Compute returns and find hedge ratio

<table><tbody><tr id="p2547"><td class="code" id="p254code7"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#compute price differences on in-sample data</span>
 pdtAAPL <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">diff</span><span style="color: #080;">(</span>tAAPL<span style="color: #080;">)</span><span style="color: #080;">[</span><span style="color: #080;">-</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span>
 pdtQQQ <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">diff</span><span style="color: #080;">(</span>tQQQ<span style="color: #080;">)</span><span style="color: #080;">[</span><span style="color: #080;">-</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span>
&nbsp;
 <span style="color: #228B22;">#build the model</span>
 model  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">lm</span><span style="color: #080;">(</span>pdtAAPL ~ pdtQQQ <span style="color: #080;">-</span> <span style="color: #ff0000;">1</span><span style="color: #080;">)</span>
&nbsp;
 <span style="color: #228B22;">#extract the hedge ratio</span>
 hr     <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">as.<span style="">numeric</span></span><span style="color: #080;">(</span>model$coefficients<span style="color: #080;">[</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

##### Step 4: Construct the spread

<table><tbody><tr id="p2548" class="alt-table-row"><td class="code" id="p254code8"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#spread price (in-sample)</span>
 spreadT <span style="color: #080;">&lt;-</span> tAAPL <span style="color: #080;">-</span> hr <span style="color: #080;">*</span> tQQQ
&nbsp;
 <span style="color: #228B22;">#compute statistics of the spread</span>
 meanT    <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">as.<span style="">numeric</span></span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">mean</span><span style="color: #080;">(</span>spreadT,na.<span style="">rm</span><span style="color: #080;">=</span>TRUE<span style="color: #080;">)</span><span style="color: #080;">)</span>
 sdT      <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">as.<span style="">numeric</span></span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">sd</span><span style="color: #080;">(</span>spreadT,na.<span style="">rm</span><span style="color: #080;">=</span>TRUE<span style="color: #080;">)</span><span style="color: #080;">)</span>
 upperThr <span style="color: #080;">&lt;-</span> meanT <span style="color: #080;">+</span> <span style="color: #ff0000;">1</span> <span style="color: #080;">*</span> sdT
 lowerThr <span style="color: #080;">&lt;-</span> meanT <span style="color: #080;">-</span> <span style="color: #ff0000;">1</span> <span style="color: #080;">*</span> sdT
&nbsp;
 <span style="color: #228B22;">#visualize the in-sample spread + stats</span>
 <span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>spreadT, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"AAPL vs. QQQ spread (in-sample period)"</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">abline</span><span style="color: #080;">(</span>h <span style="color: #080;">=</span> meanT, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"red"</span>, lwd <span style="color: #080;">=</span><span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">abline</span><span style="color: #080;">(</span>h <span style="color: #080;">=</span> meanT <span style="color: #080;">+</span> <span style="color: #ff0000;">1</span> <span style="color: #080;">*</span> sdT, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"blue"</span>, lwd<span style="color: #080;">=</span><span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">abline</span><span style="color: #080;">(</span>h <span style="color: #080;">=</span> meanT <span style="color: #080;">-</span> <span style="color: #ff0000;">1</span> <span style="color: #080;">*</span> sdT, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"blue"</span>, lwd<span style="color: #080;">=</span><span style="color: #ff0000;">2</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![trading in R pairs](../images/pairs_trade.png "pairs trading in R")

Let’s look at the distribution of the spread.

<table><tbody><tr id="p2549"><td class="code" id="p254code9"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">hist</span><span style="color: #080;">(</span>spreadT, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"blue"</span>, breaks <span style="color: #080;">=</span> <span style="color: #ff0000;">100</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"Spread Histogram (AAPL vs. QQQ)"</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">abline</span><span style="color: #080;">(</span>v <span style="color: #080;">=</span> meanT, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"red"</span>, lwd <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![distribution of spread in R](../images/spread_histogram.png "spread distribution in R")

##### Step 5: Define the trading rule

Once the spread exceeds our upper threshold, we sell AAPL and buy QQQ. Once the spread drops below our lower threshold, we buy AAPL and sell QQQ.

<table><tbody><tr id="p25410" class="alt-table-row"><td class="code" id="p254code10"><pre class="rsplus" style="font-family:monospace;"> indSell <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">which</span><span style="color: #080;">(</span>spreadT <span style="color: #080;">&gt;=</span> meanT <span style="color: #080;">+</span> sdT<span style="color: #080;">)</span>
 indBuy  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">which</span><span style="color: #080;">(</span>spreadT <span style="color: #080;">&lt;=</span> meanT <span style="color: #080;">-</span> sdT<span style="color: #080;">)</span></pre></td></tr></tbody></table>

##### Step 6: Figure out the trades

<table><tbody><tr id="p25411"><td class="code" id="p254code11"><pre class="rsplus" style="font-family:monospace;"> spreadL  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">length</span><span style="color: #080;">(</span>spreadT<span style="color: #080;">)</span>
 pricesB  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">rep</span><span style="color: #080;">(</span>NA,spreadL<span style="color: #080;">)</span><span style="color: #080;">)</span>
 pricesS  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">rep</span><span style="color: #080;">(</span>NA,spreadL<span style="color: #080;">)</span><span style="color: #080;">)</span>
 sp       <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">as.<span style="">numeric</span></span><span style="color: #080;">(</span>spreadT<span style="color: #080;">)</span>
 tradeQty <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">100</span>
 totalP   <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">0</span>
&nbsp;
 <span style="color: #0000FF; font-weight: bold;">for</span><span style="color: #080;">(</span>i <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span>spreadL<span style="color: #080;">)</span> <span style="color: #080;">{</span>
     spTemp <span style="color: #080;">&lt;-</span> sp<span style="color: #080;">[</span>i<span style="color: #080;">]</span>
     <span style="color: #0000FF; font-weight: bold;">if</span><span style="color: #080;">(</span>spTemp <span style="color: #080;">&lt;</span> lowerThr<span style="color: #080;">)</span> <span style="color: #080;">{</span>
        <span style="color: #0000FF; font-weight: bold;">if</span><span style="color: #080;">(</span>totalP <span style="color: #080;">&lt;=</span> <span style="color: #ff0000;">0</span><span style="color: #080;">)</span><span style="color: #080;">{</span>
           totalP     <span style="color: #080;">&lt;-</span> totalP <span style="color: #080;">+</span> tradeQty
           pricesB<span style="color: #080;">[</span>i<span style="color: #080;">]</span> <span style="color: #080;">&lt;-</span> spTemp
        <span style="color: #080;">}</span>
     <span style="color: #080;">}</span> <span style="color: #0000FF; font-weight: bold;">else</span> <span style="color: #0000FF; font-weight: bold;">if</span><span style="color: #080;">(</span>spTemp <span style="color: #080;">&gt;</span> upperThr<span style="color: #080;">)</span> <span style="color: #080;">{</span>
       <span style="color: #0000FF; font-weight: bold;">if</span><span style="color: #080;">(</span>totalP <span style="color: #080;">&gt;=</span> <span style="color: #ff0000;">0</span><span style="color: #080;">)</span><span style="color: #080;">{</span>
          totalP <span style="color: #080;">&lt;-</span> totalP <span style="color: #080;">-</span> tradeQty
          pricesS<span style="color: #080;">[</span>i<span style="color: #080;">]</span> <span style="color: #080;">&lt;-</span> spTemp
       <span style="color: #080;">}</span>
    <span style="color: #080;">}</span>
 <span style="color: #080;">}</span></pre></td></tr></tbody></table>

##### Step 7: Visualize trades

<table><tbody><tr id="p25412" class="alt-table-row"><td class="code" id="p254code12"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>spreadT, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"AAPL vs. QQQ spread (in-sample period)"</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">abline</span><span style="color: #080;">(</span>h <span style="color: #080;">=</span> meanT, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"red"</span>, lwd <span style="color: #080;">=</span><span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">abline</span><span style="color: #080;">(</span>h <span style="color: #080;">=</span> meanT <span style="color: #080;">+</span> <span style="color: #ff0000;">1</span> <span style="color: #080;">*</span> sdT, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"blue"</span>, lwd <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">abline</span><span style="color: #080;">(</span>h <span style="color: #080;">=</span> meanT <span style="color: #080;">-</span> <span style="color: #ff0000;">1</span> <span style="color: #080;">*</span> sdT, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"blue"</span>, lwd <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">points</span><span style="color: #080;">(</span>xts<span style="color: #080;">(</span>pricesB,index<span style="color: #080;">(</span>spreadT<span style="color: #080;">)</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">col</span><span style="color: #080;">=</span><span style="color: #ff0000;">"green"</span>, cex<span style="color: #080;">=</span><span style="color: #ff0000;">1.9</span>, pch<span style="color: #080;">=</span><span style="color: #ff0000;">19</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">points</span><span style="color: #080;">(</span>xts<span style="color: #080;">(</span>pricesS,index<span style="color: #080;">(</span>spreadT<span style="color: #080;">)</span><span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">col</span><span style="color: #080;">=</span><span style="color: #ff0000;">"red"</span>, cex<span style="color: #080;">=</span><span style="color: #ff0000;">1.9</span>, pch<span style="color: #080;">=</span><span style="color: #ff0000;">19</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![R spread prices](../images/spread_prices.png "spread prices in R")

[Next: R Lecture 5](042_Lecture_5.md)