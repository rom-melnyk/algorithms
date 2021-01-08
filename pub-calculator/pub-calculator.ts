import * as receipts from './receipts.json';
import { Transaction } from './helpers/transaction';
import { Person } from './helpers/types';
import { Receipt } from './helpers/receipt';

export class Calculator {
  public constructor(
    private readonly receipts: string[]
  ) {}

  public getBills(optimize = false): string[] {
    // Implement me to return the expected output (see below)
    return [];
  }

  private calculateBills() {
    // ------------ Phase 1: generate all transactions from all attendees to ------------
    const transactions = this.receipts.flatMap((rcp) => {
      const { creditor, debtors, transactionAmount } = new Receipt(rcp);
      return debtors.map((d) => new Transaction(d, creditor, transactionAmount));
    })


    reduce((allTransactions, receipt) => {
      const [amountStr, to, attendees] = receipt.split('');
      const amount = parseFloat(amountStr);

      let transactionsTo = allTransactions.get(to as Person);
      if (!transactionsTo) {
        transactionsTo = new Array<Transaction>();
        allTransactions.set(to as Person, transactionsTo);
      }

      attendees.split(',').forEach((from) => {
        const transaction = new Transaction(from as Person, to as Person, amount);
        transactionsTo!.push(transaction);
      });

      return allTransactions;
    }, new Map<Person, Transaction[]>());
  }
}

const calculator = new Calculator(receipts);
console.log(calculator.getBills());

