import { IterableCheck, defineField } from './utils';
import reduce from './reduce';
/**
 * @ignore
 */
const FIELD = defineField('intersperse');
/**
 * @ignore
 */
export default (iterable, value) => {
  IterableCheck(iterable, 1, FIELD);

  return reduce(iterable, (acc, item) => {
    if (typeof acc === 'undefined') {
      return [item];
    }
    acc.push(value);
    acc.push(item);
    return acc;
  });
};
