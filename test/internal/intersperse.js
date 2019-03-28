/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#intersperse', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.intersperse();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should yield the correct sequence', () => {
    const expected = [10, 20, 30];
    const iterable = new Iterable([10, 30]).intersperse(20);
    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
});
