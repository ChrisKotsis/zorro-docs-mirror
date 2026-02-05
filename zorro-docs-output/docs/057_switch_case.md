---
title: "switch .. case"
source: "https://zorro-project.com/manual/en/switch.htm"
---

# switch .. case

## switch (expression) { case value: instructions...  default: instructions... }

The **switch** statement allows for branching on multiple values of an **int** variable or expression. The expression is evaluated and compared with the **case** values. If it matches any of the **case** values, the instructions following the colon are executed. The execution continues until either the closing bracket or a **break** statement is encountered. If the expression does not match any of the **case** statements, and if there is a **default** statement, the instructions following **default:** are executed, otherwise the switch statement ends.

### Example:

```c
int choice;
...
switch(choice)  
{  
  case 0:  
    printf("Zero! ");  
    break;  
  case 1:  
    printf("One! ");  
    break;  
  case 2:   
    printf("Two! ");
    break;  
  default:  
    printf("None of them! ");  
}
```

### See also:

[if](052_if_else.md), [while](053_while_do.md), [break](acrt-break.md), [continue](acrt-continue.md), [comparisons](comparisions.md) [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice\(window.location.href.lastIndexOf\('/'\)\))