/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#sorted', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.sorted();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a non-function provided (except undefined)', () => {
    try {
      Iterable.sorted([1, 2, 3], 1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.sorted([1, 2, 3, 4]);
    assert(iterable instanceof Iterable);
  });
  it('should yield true if the sequence is sorted by ascending.', () => {
    const base = [1, 2, 3, 4];
    const iterable = new Iterable(base).sorted();
    for (const c of iterable) {
      assert(c === true);
    }
  });
  it('should yield true if the sequence is sorted by comparator.', () => {
    const base = [1, 2, 3, 4];
    const iterable = new Iterable(base).sorted((a, b) => a - b);
    for (const c of iterable) {
      assert(c === true);
    }
  });
  it('should yield false if the sequence is not sorted by ascending.', () => {
    const base = [1, 3, 2, 4];
    const iterable = new Iterable(base).sorted();
    for (const c of iterable) {
      assert(c === false);
    }
  });
  it('should yield false if the sequence is not sorted by comparator.', () => {
    const base = [1, 2, 3, 4];
    const iterable = new Iterable(base).sorted((a, b) => b - a);
    for (const c of iterable) {
      assert(c === false);
    }
  });
});
