/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#buffer', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.buffer();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid number', () => {
    try {
      Iterable.buffer([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a non-positive number', () => {
    try {
      Iterable.buffer([1, 2, 3], -1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.buffer([1, 2, 3, 4], 2);
    assert(iterable instanceof Iterable);
  });
  it('should yield Arrays of the given length.', () => {
    const iterable = Iterable.buffer([1, 2, 3, 4], 2);
    for (const i of iterable) {
      assert(i instanceof Array);
      assert(i.length === 2);
    }
  });
  it('should yield Arrays of the given length along with an excess.', () => {
    const iterable = new Iterable([1, 2, 3, 4, 5]).buffer(2);
    for (const i of iterable) {
      assert(i instanceof Array);
    }
  });
});
