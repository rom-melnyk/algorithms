import { Person, validatePeople } from './types';

/**
 * Manage interpersonal money transactions.
 */
export class Transaction {
  public constructor(
    public readonly from: Person,
    public readonly to: Person,
    public readonly amount: number,
  ) {
   validatePeople([from, to]);
  }

  public isSimilarTo(t: Transaction) {
    return this.from === t.from && this.to === t.to;
  }

  public isInvertedTo(t: Transaction) {
    return this.from === t.to && this.to === t.from;
  }

  public add(t: Transaction) {
    return new Transaction(this.from, this.to, this.amount + t.amount);
  }

  public toString() {
    return `${this.from} pays ${this.to} ${this.amount.toFixed(2)}`;
  }
}
