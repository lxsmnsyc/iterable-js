/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#split', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.split();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid number', () => {
    try {
      Iterable.split([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a non-positive number', () => {
    try {
      Iterable.split([1, 2, 3], -1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Array if no errors.', () => {
    const iterable = Iterable.split([1, 2, 3, 4], 2);
    assert(iterable instanceof Array);
  });
  it('should yield the correct value', () => {
    const base = [1, 2, 3, 4];
    const iterable = new Iterable(base).split(2);

    assert(iterable instanceof Array);
    assert(iterable.length === 2);
    assert(iterable[0] instanceof Iterable);
    assert(iterable[1] instanceof Iterable);
  });
});
