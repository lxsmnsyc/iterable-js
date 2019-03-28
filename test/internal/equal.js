/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#equal', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.equal();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a second invalid Iterable', () => {
    try {
      Iterable.equal(Iterable.just(10));
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should yield the true if both iterables yield the same sequence', () => {
    for (const c of Iterable.equal([10], [10])) {
      assert(c === true);
    }
  });

  it('should yield the true if both iterables yield the same sequence', () => {
    for (const c of Iterable.equal([10], [11])) {
      assert(c === false);
    }
  });
});
