# Pub calculator

## Given

Four friends, **Tim, Mary, Roman** and **Astrid** regularly visit local pubs.
One of them pays usually pays the bill. At the end of the month they get all receipts together to even out the money.
Build a small app that takes a list of receipts and calculates who owes what amount to whom.

## The [receipts](./receipts.json)

```
   ................. The total sum on the reciept (EUR)
   :
   :      .......... Who paid the bill
   :      :
 40.00   Tim      Mary,Mary,Tim,Roman,Astrid
 45.00   Mary     Mary,Tim,Roman,Astrid
                  \___.____________________/
                      :
                     All the people who attended.
                     If a name occurs twice, that person
                        - inivited a guest,
                        - payed for that guest.
```

For the sake of convenience, a single space is used as field separator; a comma `,` is used to separate attendees list.

## Interface

```
import * as receipts from './receipts.json';

export class Calculator {
  public constructor(receipts: string[]) {}

  public getBills(optimize = false): string[] {
    // Implement to return the expected output (see below).
    // Perform "Bonus round" calculations (see below) with `optimize = true`.
  }
}

const calculator = new Calculator(receipts);
console.log(calculator.getBills());
```

## Expected output

- Tim pays Mary 9.45
- Roman pays Tim 10.00
- Roman pays Mary 20.25
- Roman pays Astrid 8.60
- Astrid pays Tim 40.80
- Astrid pays Mary 19.65

## Typescript

Run `node -r ts-node/register/transpile-only `

## Bonus Round!

Decrease the amount of transactions.  
The cash flows _"Roman --(8.60)--> Astrid --(19.65)--> Mary"_ and _"Roman --(20.25)--> Mary"_ can be reduced to  
_"Roman --(8.60 + 20.25)--> Mary"_ and _"Astrid --(19.65 - 8.60)--> Mary"._

Use the `calculator.getBills(true)` to separate "optimized" bills from basic ones; see [spec file](./pub-calculator.spec.ts).
