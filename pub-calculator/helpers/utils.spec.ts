import * as assert from 'assert';
import { groupBy } from './utils';

describe('groupBy', () => {
  const objects: Array<{ a: string, b: number }> = [
    { a: 'aaa', b: 12 },
    { a: 'a',   b: 0 },
    { a: 'ZZZ', b: 12 },
    { a: 'aaa', b: 42 },
  ];

  it('should group by a value', () => {
    const grouped = groupBy(objects, (obj) => obj.a);
    assert.strictEqual(grouped.size, 3);
    assert.deepStrictEqual(grouped.get('aaa'), [{ a: 'aaa', b: 12 }, { a: 'aaa', b: 42 }]);
    assert.deepStrictEqual(grouped.get('a'), [{ a: 'a',   b: 0 }]);
    assert.deepStrictEqual(grouped.get('ZZZ'), [{ a: 'ZZZ', b: 12 }]);
  });

  it('should group all objects when hash returns the same', () => {
    const grouped = groupBy(objects, (obj) => 'static_value');
    assert.strictEqual(grouped.size, 1);
    assert.deepStrictEqual(grouped.get('static_value'), objects);
  });
});
