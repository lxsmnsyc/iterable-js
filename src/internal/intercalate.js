/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError } from './utils';
import { reduce } from './dependency';
/**
 * @ignore
 */
const intercalate = (iterable, other) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.intercalate', 'Iterable');
  }
  if (!isIterable(other)) {
    throw new BadArgumentError(2, 'Iterable.intercalate', 'Iterable');
  }

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
export default intercalate;
