import * as receipts from './receipts.json';

export class Calculator {
  public constructor(receipts: string[]) {}

  public getBills(optimize = false): string[] {
    // Implement me to return the expected output (see below)
    return [];
  }
}

const calculator = new Calculator(receipts);
console.log(calculator.getBills());
