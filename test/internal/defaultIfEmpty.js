/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#defaultIfEmpty', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.defaultIfEmpty();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable', () => {
    assert(Iterable.defaultIfEmpty([], 100) instanceof Iterable);
  });
  it('should yield the default value if the Iterable is Empty', () => {
    for (const c of Iterable.empty().defaultIfEmpty(100)) {
      assert(c === 100);
    }
  });
  it('should yield the values if the Iterable is not empty', () => {
    const base = [10, 20, 30, 40];
    for (const c of new Iterable(base.slice(0)).defaultIfEmpty(100)) {
      assert(c === base.shift());
    }
  });
});
