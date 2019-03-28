/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#intercalate', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.intercalate();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a second invalid Iterable', () => {
    try {
      Iterable.intercalate(Iterable.just(10));
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should yield the correct sequence', () => {
    const expected = [10, 20, 30];
    for (const c of Iterable.intercalate([10, 30], [20])) {
      assert(expected.shift() === c);
    }
  });
});
