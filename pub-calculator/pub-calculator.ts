import * as receipts from './receipts.json';
import { Transaction } from './helpers/transaction';
import { Receipt } from './helpers/receipt';
import { groupBy } from './helpers/utils';
import { people } from './helpers/types';

export class Calculator {
  public constructor(
    private readonly receipts: string[]
  ) {}

  public getBills(optimize = false): string[] {
    const transactions = this.calculateTransactions();
    const bills = new Array<string>();

    for (const debtor of people) {
      for (const creditor of people) {
        const transaction = transactions.get(Transaction.id(debtor, creditor));
        if (transaction) {
          bills.push(transaction.toString());
        }
      }
    }

    return bills;
  }

  private calculateTransactions() {
    const allTransactions = this.receipts
      // ------ Phase 1: generate all transactions ------
      // Traverse all receipts; generate valid transactions from all attendees to creditor.
      .flatMap((rcp) => {
        const { creditor, debtors, transactionAmount } = new Receipt(rcp);
        return debtors.map((debtor) => new Transaction(debtor, creditor, transactionAmount));
      });

    const groupedTransactions = Array
      .from(
        // ------ Phase 2: combine transactions into "from-to" groups ------
        // Multiple transactions like "Roman pays Astrid" are expected (originating from multiple receipts).
        groupBy(allTransactions, 'id').values()
      )
      // ------ Phase 3: merge "A -> R" and "R -> A" together ------
      // Think {R -> A, €15} == {A -> R, -€15}.
      .reduce((grouped, transactions) => {
        const { id, oppositeId } = transactions[0];
        const oppositeGroup = grouped.get(oppositeId);
        if (oppositeGroup) {
          // Found an "opposite" group? — Join it (as "opposite" transactions).
          const oppositeTransactions = transactions.map((t) => t.toOpposite());
          return grouped.set(oppositeId, oppositeGroup.concat(oppositeTransactions));
        } else {
          // Otherwise establish the new group.
          return grouped.set(id, transactions);
        }
      }, new Map<string, Transaction[]>());

    // ------ Phase 4: merge all transactions inside "from-to" groups ------
    // {R -> A, €15}  ....
    // {R -> A, €5}      :----> {R -> A, €17}
    // {R -> A, -€3}   ...:
    const mergedTransactions = Array.from(groupedTransactions.values())
      .map((transactions) => {
        const { debtor, creditor } = transactions[0];
        const totalAmount = transactions.reduce((sum, { amount }) => sum + amount, 0);
        return new Transaction(debtor, creditor, totalAmount);
      })
      // ------ Phase 5: normalize negative transactions ------
      // {A -> R, -€15} should be stored as {R -> A, €15}.
      .map((transaction) => transaction.amount > 0 ? transaction : transaction.toOpposite());

    return groupBy(mergedTransactions, 'id');
  }
}

const calculator = new Calculator(receipts);
console.log(calculator.getBills());

