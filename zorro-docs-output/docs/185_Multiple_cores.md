---
title: "Multiple cores"
source: "https://zorro-project.com/manual/en/numcores.htm"
---

# Multiple cores

## NumCores

Determines the number of logical CPU cores for [WFO](numwfocycles.md) training ([Zorro S](restrictions.md) required). Either a positive value for the number of cores to use, or a negative value for the number of cores not to use, f.i. **\-1** for using all available cores but one. Default = **0** for no multi-core training. The WFO cycles are evenly distributed among parallel Zorro processes assigned to different CPU cores. The more cores, the faster is the training run; f.i. assigning 5 cores of a 6-core CPU will reduce the training time by 80%.

## Core

The current core number in a WFO multicore training run, or the current [process number](engine.md), or **0** when no multicore process is running (read/only).

### Type:

**int**

### Remarks:

*   **NumCores** must be set in the [INITRUN](013_Asset_Account_Lists.md). [Sliders](141_slider.md) and other user interface controls should be at default settings for WFO training, since their positions are not transferred to other cores.
*   Zorro supports up to 192 cores. How many cores are really used depends on available CPU threads (logical processors) and on the number of WFO cycles. Obviously, the number of used cores won't exceed the number of WFO cycles, but it is possible to set up more cores than CPU threads are available. Training will then consume most CPU resources and can render the PC temporarily unresponsive. The number of physical and logical threads is displayed in the Windows Task Manager.
*   Multicore training uses the [command line](coommand.md) for passing parameters and script name to the separate training processes. The script name must be command line compliant, i.e. no blanks and no path, and the script must be located in the **StrategyFolder** given in [Zorro.ini](007_Training.md). No additional parameters can be passed to the training processes via command line.
*   The processes run as minimized Zorro instances. The message windows display only the cycles trained by the dedicated process. Parameter diagrams in multi-core mode are generated from the main process only, not from the parallel processes. The [TESTNOW](018_TradeMode.md) flag is not compatible with multicore training.
*   Training [R-based algorithms](rbridge.md) works also in multi-core mode. Several R instances will then run in parallel. The used R libraries must support parallel processes. That's not the case when they connect to a local or remote server (such as **H2O**), or when they use the GPU or other hardware resources (such as **Keras**, **TensorFlow**, or **MxNe**t in GPU mode).
*   Normally only the main process can write to the log file. For getting logs also from the additional cores, set **[LogNumber](numtotalcycles.md) = Core**.
*   Aside from WFO, Zorro processes on different cores can also be started by command line and communicate with each other. For details see [processes](engine.md).

### Example:

```c
NumCores = -2; _// use all logical cores but two_
```

### See also:

[NumWFOCycles](numwfocycles.md), [Training](007_Training.md), [Processes](engine.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))