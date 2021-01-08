import { people, Person, validatePeople } from './types';

/**
 * Manage Receipt record:
 *   - count creditor and debtors,
 *   - exclude creditor themself from debtors list,
 *   - accountable for the sum each debtor owns to creditor.
 */
export class Receipt {
  public readonly creditor: Person;
  public readonly debtors: Person[];
  public readonly transactionAmount: number;

  public constructor(rcp: string) {
    const [amountStr, creditor, debtorsStr] = rcp.split('') as [string, Person, string];
    const debtors = debtorsStr.split(',') as Person[];

    validatePeople([creditor, ...debtors]);

    this.creditor = creditor;
    this.debtors = debtors.filter((d) => d !== creditor); // Excluding creditor
    this.transactionAmount = parseFloat(amountStr) / debtors.length; // Each creditor owed to debtor
  }
}
