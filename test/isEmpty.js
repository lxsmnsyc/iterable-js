/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#isEmpty', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.isEmpty();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.isEmpty([1, 2, 3]);
    assert(iterable instanceof Iterable);
  });
  it('should yield true if the Iterable is empty', () => {
    const iterable = Iterable.isEmpty([]);
    for (const c of iterable) {
      assert(c === true);
    }
  });
  it('should yield false if the Iterable is not empty', () => {
    const iterable = new Iterable([1, 2, 3]).isEmpty();
    for (const c of iterable) {
      assert(c === false);
    }
  });
});
