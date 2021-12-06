There is an archived string; it should be parsed and unarchived.

![Examples](./task.jpg)

EBNF notation:

```
digit           = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
number          = digit, { digit } ;
letter            = "a" | "b" | (* ... | *) "z" ;
word            = letter, { letter } ;
sequence        = number, "[", whole_string, "]" ;
whole_string    = word | sequence, { word | sequence } ;
```
