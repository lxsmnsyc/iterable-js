/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#just', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.just();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.just(100);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct result.', () => {
    const x = 100;
    const iterable = Iterable.just(x);

    for (const i of iterable) {
      assert(x === i);
    }
  });
});
