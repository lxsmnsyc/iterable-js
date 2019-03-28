/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#ignoreElements', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.ignoreElements();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.ignoreElements([1, 2, 3, 4]);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct sequence', () => {
    const base = [1, 2, 3, 4];
    const iterable = new Iterable(base).ignoreElements();
    let acc = true;
    for (const i of iterable) {
      acc = false;
    }
    assert(acc);
  });
});
