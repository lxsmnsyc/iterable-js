/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#startWith', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.startWith();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.startWith([1, 2, 3, 4]);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct sequence', () => {
    const base = [1, 2, 3, 4];
    const expected = [5, 6, 1, 2, 3, 4];
    const iterable = new Iterable(base).startWith(5, 6);
    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
});
