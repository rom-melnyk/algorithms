import { Person, validatePeople } from './types';

/**
 * Manage interpersonal money transactions.
 */
export class Transaction {
  public static id(dbt: string, crd: string) {
    return `${dbt} - ${crd}`;
  }

  private readonly _id: string;
  private readonly _oppositeId: string;

  public constructor(
    public readonly debtor: Person,
    public readonly creditor: Person,
    public readonly amount: number,
  ) {
   validatePeople([debtor, creditor]);

   this._id = Transaction.id(this.debtor, this.creditor);
   this._oppositeId = Transaction.id(this.creditor, this.debtor);
  }

  public get id() {
    return this._id;
  }

  public get oppositeId() {
    return this._oppositeId;
  }

  public toOpposite() {
    return new Transaction(this.creditor, this.debtor, -this.amount);
  }

  public toString() {
    return `${this.debtor} pays ${this.creditor} ${this.amount.toFixed(2)}`;
  }
}
