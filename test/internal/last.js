/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#last', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.last();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a non-function provided (except undefined)', () => {
    try {
      Iterable.last([1, 2, 3], 1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.last([1, 2, 3]);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct result.', () => {
    const base = [1, 2, 3];
    const iterable = new Iterable(base.slice(0)).last(x => typeof x === 'number');

    for (const i of iterable) {
      assert(base.pop() === i);
    }
  });
});
