/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#any', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.any();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid predicate', () => {
    try {
      Iterable.any([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.any([1, 2, 3], x => typeof x === 'number');
    assert(iterable instanceof Iterable);
  });
  it('should yield true if the Iterable passes the predicate.', () => {
    const iterable = Iterable.any([1, 2, 3], x => typeof x === 'number');
    for (const i of iterable) {
      assert(i === true);
    }
  });
  it('should yield false if the Iterable fails the predicate.', () => {
    const iterable = new Iterable([1, 2, 3]).any(x => typeof x === 'string');
    for (const i of iterable) {
      assert(i === false);
    }
  });
});
