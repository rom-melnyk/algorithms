import * as assert from 'assert';
import { Receipt } from './receipt';
import { Person } from './types';

describe('Receipt', () => {
  let receipt: Receipt;

  beforeEach(() => receipt = new Receipt('1 Roman Roman,Tim,Tim,Roman,Astrid'));

  it('should fail on invalid person name', () => {
    assert.throws(() => new Receipt('1 Asdf Tim,Roman'));
  });

  it('parse creditor', () => {
    assert.deepStrictEqual(receipt.creditor, 'Roman');
  });

  it('parse debtors (exclude not include creditor)', () => {
    assert.deepStrictEqual(receipt.debtors, ['Tim', 'Tim', 'Astrid'] as Person[]);
  });

  it('should calculate proper transaction amount', () => {
    const r1 = new Receipt('30.00 Roman Roman,Tim,Astrid');
    assert.strictEqual(receipt.transactionAmount, 10);

    const r2 = new Receipt('40.00 Roman Roman,Roman,Tim,Astrid'); // Creditor brought guest(s)
    assert.strictEqual(receipt.transactionAmount, 10);

    const r3 = new Receipt('50.00 Roman Roman,Tim,Astrid,Tim,Astrid'); // Debtors brought guest(s)
    assert.strictEqual(receipt.transactionAmount, 10);
  });
});
