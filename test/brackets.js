/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';

/* eslint-disable no-undef */
describe('<brackets>', () => {
  it('should return the nth-yield of the given Iterable', () => {
    const base = [1, 2, 3, 4];
    assert(new Iterable(base)[0] === base[0]);
  });
  it('should return the undefined if the index is out of bounds', () => {
    const base = [1, 2, 3, 4];
    assert(typeof new Iterable(base)[5] === 'undefined');
  });
});
