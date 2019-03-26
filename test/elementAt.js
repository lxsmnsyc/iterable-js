/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#elementAt', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.elementAt();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid number', () => {
    try {
      Iterable.elementAt([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a non-positive number', () => {
    try {
      Iterable.elementAt([1, 2, 3], -1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.elementAt([1, 2, 3, 4], 2);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct value', () => {
    const iterable = Iterable.elementAt([1, 2, 3, 4], 2);
    for (const c of iterable) {
      assert(c === 3);
    }
  });
});
