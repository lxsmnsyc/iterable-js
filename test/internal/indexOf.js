/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#indexOf', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.indexOf();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.indexOf([1, 2, 3], 3);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct result.', () => {
    const base = [1, 2, 3];
    const iterable = new Iterable(base.slice(0)).indexOf(3);

    for (const i of iterable) {
      assert(base.indexOf(3) === i);
    }
  });
});
