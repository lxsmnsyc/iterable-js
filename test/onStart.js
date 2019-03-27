/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#onStart', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.onStart();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid predicate', () => {
    try {
      Iterable.onStart([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.onStart([1, 2, 3], () => {});
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct result.', () => {
    let flag = false;
    const iterable = new Iterable([1, 2, 3]).onStart(() => { flag = true; });

    for (const i of iterable) {
      assert(flag === true);
      return;
    }
  });
});
