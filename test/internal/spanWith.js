/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#spanWith', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.spanWith();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid predicate', () => {
    try {
      Iterable.spanWith([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Array of 2 Iterables if no errors.', () => {
    const iterable = new Iterable([1, 2, 3]).spanWith(x => typeof x === 'number');
    assert(iterable instanceof Array);
    assert(iterable.length === 2);
    assert(iterable[0] instanceof Iterable);
    assert(iterable[1] instanceof Iterable);
  });
});
