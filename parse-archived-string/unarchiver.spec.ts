import * as assert from 'assert';
import { unarchive } from './unarchiver';

describe('unarchive()', () => {
  it('should parse string without repeated sequences', () => {
    assert.strictEqual(
      unarchive('asdf'),
      'asdf'
    );
  });

  it('should parse one level of repeated sequences', () => {
    assert.strictEqual(
      unarchive('asd3[f]qw5[po]'),
      'asdfffqwpopopopopo'
    );
  });

  it('should parse 2+ levels deep of repeated sequences', () => {
    assert.strictEqual(
      unarchive('3[f2[a2[bc]]f]'),
      'fabcbcabcbcffabcbcabcbcffabcbcabcbcf'
    );
  });

  it('should parse 2+ digit numbers', () => {
    assert.strictEqual(
      unarchive('z12[a]z'),
      'zaaaaaaaaaaaaz'
    );
  });

  describe('should throw', () => {
    it('should throw on unexpected end of the string', () => {
      assert.throws(
        () => unarchive('5[fa2[ak]')
      );
    });

    it('should throw on unexpected char', () => {
      assert.throws(
        () => unarchive('5a')
      );
    });
  });
});
