/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#sort', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.sort();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a non-function provided (except undefined)', () => {
    try {
      Iterable.sort([1, 2, 3], 1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.sort([1, 2, 3, 4]);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct sequence', () => {
    const base = [1, 3, 2, 4];
    const expected = [1, 2, 3, 4];
    const iterable = new Iterable(base).sort();
    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
  it('should yield the correct sequence with comparator', () => {
    const base = [1, 3, 2, 4];
    const expected = [1, 2, 3, 4];
    const iterable = new Iterable(base).sort((a, b) => a - b);
    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
});
