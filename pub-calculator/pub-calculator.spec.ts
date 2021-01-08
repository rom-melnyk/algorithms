import * as assert from 'assert';
import { Calculator } from './pub-calculator';
import * as receipts from './receipts.json';

describe('', () => {
  let calculator: Calculator;

  beforeEach(() => calculator = new Calculator(receipts));

  it('should print bills (simple calculation technik)', () => {
    const bills = calculator.getBills();
    assert.deepStrictEqual(bills, [
      'Tim pays Mary 9.45',
      'Roman pays Tim 10.00',
      'Roman pays Mary 20.25',
      'Roman pays Astrid 8.60',
      'Astrid pays Tim 40.80',
      'Astrid pays Mary 19.65',
    ]);
  });

  it('should print bills (optimized calculation)', () => {
    const bills = calculator.getBills(true);
    assert.deepStrictEqual(bills, [
      'Tim pays Mary 9.45',
      'Roman pays Tim 10.00',
      'Roman pays Mary 28.85',
      'Astrid pays Tim 40.80',
      'Astrid pays Mary 11.05',
    ]);
  });
});
