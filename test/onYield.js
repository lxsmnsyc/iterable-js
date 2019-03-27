/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#onYield', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.onYield();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid predicate', () => {
    try {
      Iterable.onYield([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.onYield([1, 2, 3], () => {});
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct result.', () => {
    let flag = true;
    const base = [1, 2, 3];
    const iterable = new Iterable(base.slice(0)).onYield((x) => { flag = flag && x === base.shift(); });

    for (const i of iterable) {
    }
    assert(flag === true);
  });
});
