/* eslint-disable no-restricted-syntax */
import { DoubleIterableCheck, defineField } from './utils';
import reduce from './reduce';
/**
 * @ignore
 */
const FIELD = defineField('intercalate');
/**
 * @ignore
 */
export default (iterable, other) => {
  DoubleIterableCheck(iterable, other, FIELD);

  return reduce(iterable, (acc, item) => {
    if (typeof acc === 'undefined') {
      return [item];
    }
    for (const i of iterable) {
      acc.push(i);
    }
    acc.push(item);
    return acc;
  });
};
