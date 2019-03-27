/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { IterableCheck, defineField } from './utils';
import map from './map';
import indexOf from './indexOf';

/**
 * @ignore
 */
const FIELD = defineField('contains');
/**
 * @ignore
 */
export default (iterable, value) => {
  IterableCheck(iterable, 1, FIELD);
  return map(indexOf(iterable, value), x => x > -1);
};
