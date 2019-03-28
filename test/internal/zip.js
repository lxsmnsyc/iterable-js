/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#zip', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.zip();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a non-function provided (except undefined)', () => {
    try {
      Iterable.zip([[1, 2, 3]], 1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.zip([[1, 2, 3, 4]]);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct sequence', () => {
    const base1 = 'Hello';
    const base2 = 'World';
    const expected = ['HW', 'eo', 'lr', 'll', 'od'];
    const iterable = new Iterable(base1).zip([base2]);
    let acc = true;
    for (const [a, b] of iterable) {
      acc = acc && a + b === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
  it('should yield the correct sequence with the given zipper', () => {
    const base1 = 'Hello';
    const base2 = 'World';
    const expected = ['HW', 'eo', 'lr', 'll', 'od'];
    const iterable = new Iterable(base1).zip([base2], x => x.reduce((a, b) => a + b));
    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
});
