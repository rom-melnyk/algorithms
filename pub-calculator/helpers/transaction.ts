import { Person, validatePeople } from './types';

/**
 * Manage interpersonal money transactions.
 */
export class Transaction {
  public constructor(
    public readonly debtor: Person,
    public readonly creditor: Person,
    public amount: number,
  ) {
   validatePeople([debtor, creditor]);
  }

  public get id() {
    return `${this.debtor} - ${this.creditor}`;
  }

  public get reverseId() {
    return `${this.creditor} - ${this.debtor}`;
  }

  public addAmount(amount: number) {
    this.amount += amount;
  }

  public toString() {
    return `${this.debtor} pays ${this.creditor} ${this.amount.toFixed(2)}`;
  }
}
