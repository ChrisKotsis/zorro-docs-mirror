---
title: "Lecture 6"
source: "https://zorro-project.com/manual/en/Lecture 6.htm"
---

# Lecture 6

# Lecture 6 – Stochastic Processes and Monte Carlo

In [Beginner R Tutorial](http://www.rfortraders.com/code/beginner-r-tutorial/), [FINC 621](http://www.rfortraders.com/code/finc-621/), [R Programming](http://www.rfortraders.com/code/r-programming/)

The use of probability and statistics is ubiquitous in quantitative finance. All of the observable prices, volumes, order arrival rates, etc, are due to supply and demand imbalances. However, keeping track of all the supply and demand imbalances becomes cumbersome as the number of variables increases. Statistical tools are vital in explaining and modeling these effects. Stochastic processes and Monte Carlo analysis are some of the tools that are used in the fields of finance, economics and marketing.

#### Random Variables

The term random variable is somewhat of a misnomer. A random variable, in effect, is neither random nor a variable. It is a function that maps a particular sample space **Ω** onto the real number line **R**. We can express the above statement in mathematical notation as follows: **X : S → R**. For every event in S, X is a function that maps s to a real number.

![random variable in R](../images/random_variable.png)

The following examples will help illustrate the difference between the a) experiment, b) sample space and c) mapping to the real line.

##### Flipping 2 coins

Consider flipping a fair coin 2 times. In this case, the **experiment** is the act of tossing the fair coin 2 times. The **sample space** is all the possible outcomes of the experiment. In this simple example, the sample space consists of {Head, Head}, {Head, Tail}, {Tail, Head} and {Tail, Tail}. Each **{}** item is an event in the sample space S. A random variable X is simply the function that takes each **{}** and maps it into a number.

![flip coins in R](../images/flip-coins-in-R.png)

##### Tossing 1 die

In this experiment, you toss 1 fair die and count the number of dots that appear face up. The sample space is S = {1,2,3,4,5,6}. We can define a random variable X that assigns the number of dots to the real numbers {1,2,3,4,5,6}

#### Stochastic Process

Another name for _Stochastic Process_ is _Random Process_. Roughly speaking, one can think of such a process as a set of random variables indexed by time. Consider the case of a repeated coin toss. This process is called a _Bernoulli Process_. In effect, we have a sequence of random variables that can take on either the values 0 or 1. In this case, we are implicitly defining a random variable that maps the outcome of a head to 0 and the outcome of a tail to 1. More formally: A Bernoulli Process is a finite or infinite sequence of independent random variables X1, X2, X3, X4, … , such that:

1.  For each i,the value of Xi is either 0 or 1.
2.  For all values of i, the probability that Xi = 1 is the same number p.

#### Brownian Motion

Our end goal will be to write down a stochastic process for a particular stock or equity index. In order to do so, we need to explore the notion of a _Wiener Process_; otherwise known as Brownian Motion. This process forms the basic building block of more advanced models. The three properties of Brownian Motion are:

1.  W0 = 0.
2.  Wt is almost surely continuous.
3.  Wt has independent increments with Wt−Ws = N(0, t−s) for 0 < s < t.

##### Brownian Motion Example

Let’s take a look at an example of Brownian Motion.

<table><tbody><tr id="p3151"><td class="code" id="p315code1"><pre class="rsplus" style="font-family:monospace;"> bm <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">cumsum</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">1000</span>,<span style="color: #ff0000;">0</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
bm <span style="color: #080;">&lt;-</span> bm <span style="color: #080;">-</span> bm<span style="color: #080;">[</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>bm, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"Brownian Motion"</span>, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"blue"</span>, type <span style="color: #080;">=</span> <span style="color: #ff0000;">"l"</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![brownian motion in R](../images/brownian-motion-in-R.png)

Next, let’s take a look whether any dependence exists between consecutive observations.

<table><tbody><tr id="p3152" class="alt-table-row"><td class="code" id="p315code2"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">acf</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">diff</span><span style="color: #080;">(</span>bm<span style="color: #080;">)</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"Autocorrelation of Wt"</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![autocorrelation in R](../images/autocorrelation-in-R.png)

We can even investigate whether the differences are normally distributed.

<table><tbody><tr id="p3153"><td class="code" id="p315code3"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">par</span><span style="color: #080;">(</span>mfrow <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">hist</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">diff</span><span style="color: #080;">(</span>bm<span style="color: #080;">)</span>, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"orange"</span>, breaks <span style="color: #080;">=</span> <span style="color: #ff0000;">100</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"Wt-s Distribution"</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">qqnorm</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">diff</span><span style="color: #080;">(</span>bm<span style="color: #080;">)</span><span style="color: #080;">)</span>
 <span style="color: #0000FF; font-weight: bold;">qqline</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">diff</span><span style="color: #080;">(</span>bm<span style="color: #080;">)</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![random walk distribution in R](../images/random-walk-distribution.png)

#### Monte Carlo Analysis

Monte Carlo analysis is a practical technique that has a long history and a ton of theory behind it. Fermi, Ulam and Von Neumann used statistical sampling ideas back in the 1930’s and 1940’s. The origins of statistical sampling date back to Laplace in the early 1800’s. The name Monte Carlo Analysis was suggested by Metropolis in 1946. Monte Carlo was used on the ENIAC computer to do neutron transport calculations in th mid 1940’s. Today, Monte Carlo analysis is utilized in all fields of research. The main assumption of this approach is that a randomly chosen sample tends to exhibit the same properties as the population from which it as drawn. Before we apply this technique to modeling stock prices, let’s take a look at a simple example.

##### How many runs of 4 do we expect in a sequence of 1000 coin tosses?

In other words, we toss a coin 1000 times. How many times should we expect to see 4 heads or 4 tails in a row? This is a problem that can easily be solved by repeated sampling from a known distribution.

<table><tbody><tr id="p3154" class="alt-table-row"><td class="code" id="p315code4"><pre class="rsplus" style="font-family:monospace;"> run4 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">numeric</span><span style="color: #080;">(</span><span style="color: #ff0000;">10000</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">for</span><span style="color: #080;">(</span>i <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span><span style="color: #ff0000;">10000</span><span style="color: #080;">)</span> <span style="color: #080;">{</span>
   run4<span style="color: #080;">[</span>i<span style="color: #080;">]</span> <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">sum</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">rle</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">sample</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #080;">-</span><span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span><span style="color: #080;">)</span>, <span style="color: #ff0000;">1000</span>, TRUE<span style="color: #080;">)</span><span style="color: #080;">)</span>$lengths <span style="color: #080;">==</span> <span style="color: #ff0000;">4</span><span style="color: #080;">)</span>
<span style="color: #080;">}</span>
<span style="color: #0000FF; font-weight: bold;">hist</span><span style="color: #080;">(</span>run4<span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">mean</span><span style="color: #080;">(</span>run4<span style="color: #080;">)</span></pre></td></tr></tbody></table>

![histogram in R](../images/histogram-in-R.png)

Armed with our basic building block (Brownian Motion, we can go on to construct a plausible model for the behavior of actual stock prices. Before we proceed with constructing a model, let’s take a look at some of the stylized facts of actual stock prices.

##### Prices and Returns

<table><tbody><tr id="p3155"><td class="code" id="p315code5"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #228B22;">#load quantmod</span>
<span style="color: #0000FF; font-weight: bold;">library</span><span style="color: #080;">(</span>quantmod<span style="color: #080;">)</span>
getSymbols<span style="color: #080;">(</span><span style="color: #ff0000;">"AAPL"</span><span style="color: #080;">)</span>
price_AAPL <span style="color: #080;">&lt;-</span> AAPL<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>price_AAPL, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"The price of AAPL"</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![stock price in R](../images/stock-price-in-R.png)

The first thing we notice is that this price series doesn’t appear to be stationary. In other words, there is no obvious mean price and it doesn’t make sense to talk about the standard deviation of the price. Working with such non-stationary timeseries is a hassle. If prices are not convenient to work with, then what should we use instead? Let’s take a look at the percentage returns of this stock.

<table><tbody><tr id="p3156" class="alt-table-row"><td class="code" id="p315code6"><pre class="rsplus" style="font-family:monospace;"> returns_AAPL <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">diff</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">log</span><span style="color: #080;">(</span>price_AAPL<span style="color: #080;">)</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>returns_AAPL, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"AAPL % returns"</span>, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"navyblue"</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">hist</span><span style="color: #080;">(</span>returns_AAPL, breaks <span style="color: #080;">=</span> <span style="color: #ff0000;">100</span>, <span style="color: #0000FF; font-weight: bold;">col</span><span style="color: #080;">=</span><span style="color: #ff0000;">"brown"</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![stock return distribution in R](../images/stock-return-distribution-in-R.png)

Apart from some clustering in the returns plot, it appears that the returns are distributed somewhat like a normal (Gaussian) distribution. This is an exciting fact since we already know how to work with normal distributions! How about independence? Are these returns independent of each other in time? Here’s a quick way to partially answer that question:

<table><tbody><tr id="p3157"><td class="code" id="p315code7"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">acf</span><span style="color: #080;">(</span>returns_AAPL<span style="color: #080;">[</span><span style="color: #080;">-</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"Autocorrelation plot of returns"</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![autocorrelation of returns in R](../images/autocorrelation-of-returns-in-R.png)  
Notice that there doesn’t seem to be any autocorrelation between consecutive returns. What are the mean and standard deviation of these returns?

<table><tbody><tr id="p3158" class="alt-table-row"><td class="code" id="p315code8"><pre class="rsplus" style="font-family:monospace;"> mR  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">mean</span><span style="color: #080;">(</span>returns_AAPL<span style="color: #080;">[</span><span style="color: #080;">-</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span><span style="color: #080;">)</span>
sdR <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">sd</span><span style="color: #080;">(</span>returns_AAPL<span style="color: #080;">[</span><span style="color: #080;">-</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span><span style="color: #080;">)</span>
<span style="color: #080;">&gt;</span> mR
 <span style="color: #080;">[</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span> <span style="color: #ff0000;">0.001369495</span>
<span style="color: #080;">&gt;</span> sdR
 <span style="color: #080;">[</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span> <span style="color: #ff0000;">0.02572958</span></pre></td></tr></tbody></table>

##### Leap of Faith

So, the typical argument goes as follows:

*   We want to deal with stationary timeseries since we have a ton of statistical tools available at our disposal that deal with such timeseries.
*   Prices are surely non-stationary. Is there any other transformation of prices that, at least, looks like it might be stationary?
*   It seems like percentage returns fit the bill.
*   It also looks like percentage returns have a stable mean and standard deviation.
*   So we can make the claim that percentage returns are normally distributed with mean μ and standard deviation σ.

Now, remember what our end goal is. We want a way to simulate stock prices. In order to do so, we need to come up with a model of how the prices behave (are distributed.) If returns are normally distributed, then how are prices distributed? The answer to this question is straightforward. A little math shows us the answer: Rt = log(Pt/Pt−1). The logarithm of the price is normally distributed. This means that price has a lognormal distribution. A straightforward method to simulate a stock price is to draw a random normal number with a certain mean and standard deviation value, and then exponentiate this number. Based on the formula from above: Pt = Pt−1\*e^Rt. To summarize:

1.  Draw a random number from N(μ, σ).
2.  Exponentiate that number and mulitply it by Pt−1.
3.  Repeat for t = 1…N.

<table><tbody><tr id="p3159"><td class="code" id="p315code9"><pre class="rsplus" style="font-family:monospace;"> N     <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">1000</span>
mu    <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">0.0010</span>
sigma <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">0.025</span>
p  <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">100</span>, <span style="color: #0000FF; font-weight: bold;">rep</span><span style="color: #080;">(</span>NA, N<span style="color: #080;">-</span><span style="color: #ff0000;">1</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">for</span><span style="color: #080;">(</span>i <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">2</span><span style="color: #080;">:</span>N<span style="color: #080;">)</span>
   p<span style="color: #080;">[</span>i<span style="color: #080;">]</span> <span style="color: #080;">&lt;-</span> p<span style="color: #080;">[</span>i<span style="color: #080;">-</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span> <span style="color: #080;">*</span> <span style="color: #0000FF; font-weight: bold;">exp</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">rnorm</span><span style="color: #080;">(</span><span style="color: #ff0000;">1</span>, mu, sigma<span style="color: #080;">)</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>p, type <span style="color: #080;">=</span> <span style="color: #ff0000;">"l"</span>, <span style="color: #0000FF; font-weight: bold;">col</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"brown"</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"Simulated Stock Price"</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

![simulation of stock price in R](../images/simulation-of-stock-price-in-R.png)

##### Portfolio Simulation

Next, we will take a look at a simple portfolio simulation example.

<table><tbody><tr id="p31510" class="alt-table-row"><td class="code" id="p315code10"><pre class="rsplus" style="font-family:monospace;"> <span style="color: #0000FF; font-weight: bold;">require</span><span style="color: #080;">(</span>MASS<span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">require</span><span style="color: #080;">(</span>quantmod<span style="color: #080;">)</span>
&nbsp;
<span style="color: #228B22;">#load a few symbols into memory</span>
getSymbols<span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">"AAPL"</span>, <span style="color: #ff0000;">"QQQQ"</span>, <span style="color: #ff0000;">"SPY"</span>, <span style="color: #ff0000;">"GOOG"</span>, <span style="color: #ff0000;">"CVX"</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
&nbsp;
<span style="color: #228B22;">#plot the prices of these stocks </span>
<span style="color: #0000FF; font-weight: bold;">par</span><span style="color: #080;">(</span>mfrow <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>AAPL<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"AAPL"</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>QQQQ<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"QQQQ"</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>SPY<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"SPY"</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>GOOG<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"GOOG"</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>CVX<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"CVX"</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">par</span><span style="color: #080;">(</span>mfrow <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
&nbsp;
<span style="color: #228B22;">#compute price matrix</span>
pM <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">cbind</span><span style="color: #080;">(</span>AAPL<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, QQQQ<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, SPY<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, GOOG<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span>, CVX<span style="color: #080;">[</span>,<span style="color: #ff0000;">6</span><span style="color: #080;">]</span><span style="color: #080;">)</span>
&nbsp;
<span style="color: #228B22;">#compute returns matrix</span>
rM <span style="color: #080;">&lt;-</span>  <span style="color: #0000FF; font-weight: bold;">apply</span><span style="color: #080;">(</span>pM,<span style="color: #ff0000;">2</span>,<span style="color: #0000FF; font-weight: bold;">function</span><span style="color: #080;">(</span>x<span style="color: #080;">)</span> <span style="color: #0000FF; font-weight: bold;">diff</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">log</span><span style="color: #080;">(</span>x<span style="color: #080;">)</span><span style="color: #080;">)</span><span style="color: #080;">)</span>
&nbsp;
<span style="color: #228B22;">#look at pairwise charts</span>
<span style="color: #0000FF; font-weight: bold;">pairs</span><span style="color: #080;">(</span>coredata<span style="color: #080;">(</span>rM<span style="color: #080;">)</span><span style="color: #080;">)</span>
&nbsp;
<span style="color: #228B22;">#compute the covariance matrix</span>
covR <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">cov</span><span style="color: #080;">(</span>rM<span style="color: #080;">)</span>
&nbsp;
<span style="color: #228B22;">#use this covariance matrix to simulate 
<span lang="de"># </span>normal random numbers<span lang="de"> </span>that share a 
<span lang="de"># </span>similar correlation structure with actual data</span>
meanV <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">apply</span><span style="color: #080;">(</span>rM, <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">mean</span><span style="color: #080;">)</span>
rV    <span style="color: #080;">&lt;-</span> mvrnorm<span style="color: #080;">(</span>n <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">nrow</span><span style="color: #080;">(</span>rM<span style="color: #080;">)</span>, mu <span style="color: #080;">=</span> meanV, Sigma <span style="color: #080;">=</span> covR<span style="color: #080;">)</span>
&nbsp;
<span style="color: #228B22;">#simulate prices based on these correlated random variables</span>
&nbsp;
<span style="color: #228B22;">#calculate mean price</span>
p0 <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">apply</span><span style="color: #080;">(</span>pM,<span style="color: #ff0000;">2</span>,<span style="color: #0000FF; font-weight: bold;">mean</span><span style="color: #080;">)</span>
sPL <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">list</span><span style="color: #080;">(</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">for</span><span style="color: #080;">(</span>i <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span><span style="color: #0000FF; font-weight: bold;">ncol</span><span style="color: #080;">(</span>rM<span style="color: #080;">)</span><span style="color: #080;">)</span><span style="color: #080;">{</span>
   sPL<span style="color: #080;">[</span><span style="color: #080;">[</span>i<span style="color: #080;">]</span><span style="color: #080;">]</span> <span style="color: #080;">&lt;-</span><span style="color: #0000FF; font-weight: bold;">round</span><span style="color: #080;">(</span>p0<span style="color: #080;">[</span>i<span style="color: #080;">]</span><span style="color: #080;">*</span><span style="color: #0000FF; font-weight: bold;">exp</span><span style="color: #080;">(</span><span style="color: #0000FF; font-weight: bold;">cumsum</span><span style="color: #080;">(</span>rV<span style="color: #080;">[</span>,i<span style="color: #080;">]</span><span style="color: #080;">)</span><span style="color: #080;">)</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">)</span>
<span style="color: #080;">}</span>
&nbsp;
<span style="color: #228B22;">#plot simulated prices</span>
<span style="color: #0000FF; font-weight: bold;">par</span><span style="color: #080;">(</span>mfrow <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">c</span><span style="color: #080;">(</span><span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">)</span><span style="color: #080;">)</span> 
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>sPL<span style="color: #080;">[</span><span style="color: #080;">[</span><span style="color: #ff0000;">1</span><span style="color: #080;">]</span><span style="color: #080;">]</span>,main<span style="color: #080;">=</span><span style="color: #ff0000;">"AAPLsim"</span>,type<span style="color: #080;">=</span><span style="color: #ff0000;">"l"</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>sPL<span style="color: #080;">[</span><span style="color: #080;">[</span><span style="color: #ff0000;">2</span><span style="color: #080;">]</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"QQQQ sim"</span>,type <span style="color: #080;">=</span> <span style="color: #ff0000;">"l"</span><span style="color: #080;">)</span>
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>sPL<span style="color: #080;">[</span><span style="color: #080;">[</span><span style="color: #ff0000;">3</span><span style="color: #080;">]</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"SPY sim"</span>, type <span style="color: #080;">=</span> <span style="color: #ff0000;">"l"</span><span style="color: #080;">)</span> 
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>sPL<span style="color: #080;">[</span><span style="color: #080;">[</span><span style="color: #ff0000;">4</span><span style="color: #080;">]</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"GOOG sim"</span>,type <span style="color: #080;">=</span> <span style="color: #ff0000;">"l"</span><span style="color: #080;">)</span> 
<span style="color: #0000FF; font-weight: bold;">plot</span><span style="color: #080;">(</span>sPL<span style="color: #080;">[</span><span style="color: #080;">[</span><span style="color: #ff0000;">5</span><span style="color: #080;">]</span><span style="color: #080;">]</span>, main <span style="color: #080;">=</span> <span style="color: #ff0000;">"CVX sim"</span>, type <span style="color: #080;">=</span> <span style="color: #ff0000;">"l"</span><span style="color: #080;">)</span></pre></td></tr></tbody></table>

In the prior example, we gather daily data for 5 stocks and we compute the covariance matrix of the returns, along with an average price for each security. Since the purpose of this exercise is to generate a realistic simulation of the portfolio, we use the function mvrnorm() to create a matrix of random normal variables that are correlated in a similar manner as the original data. The following graphs display the original stock prices, the pairwise plot of their returns and the simulated stock prices. One can also look at the correlation matrix of the actual returns and the simulated returns and verify that they are similar.

![price graph in R](../images/price-graph-in-R.png)

![correlation of stocks in R](../images/correlation-of-stocks-in-R.png)

![simulated stock prices in R](../images/simulated-stock-prices-in-R.png)

[Next: R Lecture 7](044_Lecture_7.md)

#### References

1.  [Stochastic Process](http://en.wikipedia.org/wiki/Stochastic_process)
2.  [Random Variable and Process](http://www.iitg.ernet.in/scifac/qip/public_html/cd_cell/chapters/Statistical%20Signal%20Processing.pdf)
3.  [Bernoulli Process](http://en.wikipedia.org/wiki/Bernoulli_process)
4.  [Wiener Process](http://en.wikipedia.org/wiki/Wiener_process)