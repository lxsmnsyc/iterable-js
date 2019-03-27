/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#onDone', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.onDone();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid predicate', () => {
    try {
      Iterable.onDone([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.onDone([1, 2, 3], () => {});
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct result.', () => {
    let flag = false;
    const iterable = new Iterable([1, 2, 3]).onDone(() => { flag = true; });

    for (const i of iterable) {
    }
    assert(flag === true);
  });
});
