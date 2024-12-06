# Syntax converter


## Tokenize

Parse the arithmetical expression with parentheses into a hierarchical structure:

```
Input:   "A + B * (C * (D - E) + (F - G))"
Output:  [
           "A", "+", "B", "*",
           [
             "C", "*",
             ["D", "-", "E"],
             "+",
             ["F", "-", "G"],
           ]
         ]
         
         // ...or similar via objects
```


## Infix → Postfix

Convert the Infix notation into the Postfix:

```
Infix:    A + B + C - D
Postfix:  A B + C + D -

Infix:    A + B / C - D * E
Postfix:  A B C / + D E * -

Infix:    ((A + B) – C * (D / E)) + F
Postfix:  A B + C D E / * - F +
```
