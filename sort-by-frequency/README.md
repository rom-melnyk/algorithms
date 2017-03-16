# Sort by frequency


## Description
1. Input is an array of numbers.
2. They should be sorted by frequency of appearance (non-descending);  
   if 2+ numbers have same frequency, they should be sort in acsending order.
3. More details in `description/` folder


## Run
**Windows with Cygwin:**
```
( cat data.txt | wc -l && cat data.txt ) | node sort-by-freq.js
```

**Linux:** same way but replace `()` with `{}`.


### Notes here
The `data.txt` does not actually match the given spec (it does not contain the _number-of-lines_ at the line #1). But it's easier to emulate _number-of-lines_ via `wc` and keep raw numbers in `data.txt`.


# Credits
Thanks **Sviatoslav Novosiadlyj** for the task.
