/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#average', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.average();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable', () => {
    assert(Iterable.average([1, 2, 3]) instanceof Iterable);
  });
  it('should yield the correct average if the Iterable yields the value', () => {
    const base = [1, 2, 3];
    for (const c of new Iterable(base).average()) {
      assert(c === base.reduce((x, y) => x + y) / base.length);
    }
  });
});
