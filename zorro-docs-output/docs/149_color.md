---
title: "color"
source: "https://zorro-project.com/manual/en/color.htm"
---

# color

## color (var Value_,_ int Color1, int Color2, _int Color3, int Color4_) : int

Returns the color corresponding to a position within a range of up to 4 colors; used for plotting heatmaps or multiple curves.

### Parameters:

<table border="0"><tbody><tr><td><strong>Value</strong></td><td>The color position within the range in percent; from <strong>0</strong> for <strong>color1</strong> until <strong>100</strong> for <strong>color4</strong>.</td></tr><tr><td><strong>Color1..Color4</strong></td><td>The color range, starting with <strong>color1</strong> and ending with <strong>color4</strong>. For 2-color or 3-color ranges, <strong>color3</strong> and <strong>color4</strong> can be omitted. See <a href="colors.htm">Colors</a> for the color format.</td></tr></tbody></table>

### Returns

Color within the range

## colorScale (int Color, var Scale) : int

Returns the color multiplied with a scaling factor.

### Parameters:

<table border="0"><tbody><tr><td><strong>Color</strong></td><td>The color to be scaled.</td></tr><tr><td><strong>Scale</strong></td><td>The scaling factor in percent, &lt; 100 for reducing the brightness and &gt; 100 for increasing it.</td></tr></tbody></table>

### Returns

**Color \* Factor**.

### Remarks:

*   **color(Value,WHITE,BLACK)** produces a greyscale.
*   **colorScale(Color,110)** increases the brightness of **Color** by 10%.
*   For putting a color together from RGB values, use the expression **(Red<<16)+(Green<<8)+Blue**.  
     

### Example:

```c
for(i=0; i<N; i++)  
  for(j=0; j<N; j++)  
    plotGraph("Heatmap",j+1,-i-1,SQUARE,color(Correlations\[i\]\[j\]\*100,BLUE,RED));
```

### See also:

[plot](146_plot_plotBar.md), [](142_panel.md)[Colors](206_Colors.md)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))