/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('<constructor>', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      const i = new Iterable();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
});
