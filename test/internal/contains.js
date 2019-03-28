/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#contains', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.contains();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable', () => {
    assert(Iterable.contains([1, 2, 3, 4], 3) instanceof Iterable);
  });
  it('should yield true if the Iterable yields the value', () => {
    for (const c of Iterable.contains([1, 2, 3, 4], 3)) {
      assert(c === true);
    }
  });
  it('should yield false if the Iterable does not yield the value', () => {
    for (const c of new Iterable([1, 2, 3, 4]).contains(5)) {
      assert(c === false);
    }
  });
});
