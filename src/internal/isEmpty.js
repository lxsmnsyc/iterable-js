/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { IterableCheck, defineField } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('isEmpty');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);

  return new Iterable(function* () {
    for (const i of iterable) {
      yield false;
      return;
    }
    yield true;
  });
};
