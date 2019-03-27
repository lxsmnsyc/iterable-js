/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#count', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.count();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable', () => {
    assert(Iterable.count([1, 2, 3, 4]) instanceof Iterable);
  });
  it('should yield the correct size if the Iterable yields the value', () => {
    for (const c of new Iterable([1, 2, 3, 4]).count()) {
      assert(c === 4);
    }
  });
});
