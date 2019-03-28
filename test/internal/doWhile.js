/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#doWhile', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.doWhile();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid predicate', () => {
    try {
      Iterable.doWhile([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.doWhile([1, 2, 3, 4], () => c++ < 2);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct value', () => {
    const base = [1, 2, 3, 4];
    const expected = [1, 2, 3, 4, 1, 2, 3, 4];

    let c = 0;
    const iterable = new Iterable(base).doWhile(() => c++ < 1);

    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
});
