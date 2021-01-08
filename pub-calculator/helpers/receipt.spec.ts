import * as assert from 'assert';
import { Receipt } from './receipt';
import { Person } from './types';

describe('Receipt', () => {
  it('should fail on invalid person name', () => {
    assert.throws(() => new Receipt('1 Asdf Tim,Roman'));
  });

  it('parse creditor', () => {
    const rcp = new Receipt('1 Roman Roman,Tim,Tim,Roman,Astrid')
    assert.deepStrictEqual(rcp.creditor, 'Roman');
  });

  it('parse debtors (exclude not include creditor)', () => {
    const rcp = new Receipt('1 Roman Roman,Tim,Tim,Roman,Astrid')
    assert.deepStrictEqual(rcp.debtors, ['Tim', 'Tim', 'Astrid'] as Person[]);
  });

  describe('should calculate proper transaction amount', () => {
    it('basic scenario', () => {
      const rcp = new Receipt('30.00 Roman Roman,Tim,Astrid');
      assert.strictEqual(rcp.transactionAmount, 10);
    });

    it('when Creditor brings guest(s)', () => {
      const rcp = new Receipt('40.00 Roman Roman,Roman,Tim,Astrid');
      assert.strictEqual(rcp.transactionAmount, 10);
    });

    it('when Debtors bring guest(s)', () => {
      const rcp = new Receipt('50.00 Roman Roman,Tim,Astrid,Tim,Astrid');
      assert.strictEqual(rcp.transactionAmount, 10);
    });
  });
});
