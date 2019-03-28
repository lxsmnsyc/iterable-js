/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#leftJoin', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.leftJoin();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a second invalid Iterable', () => {
    try {
      Iterable.leftJoin(Iterable.just(10));
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should yield the correct sequence', () => {
    const expected = [1, 2, 2, 3, 4, 4, 4, 2];
    const iterable = new Iterable([1, 2, 2, 3, 4]).leftJoin([6, 4, 4, 2]);
    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
});
