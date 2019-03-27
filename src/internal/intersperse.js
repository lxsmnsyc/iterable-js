import { isIterable, BadArgumentError } from './utils';
import { reduce } from './dependency';
/**
 * @ignore
 */
const intersperse = (iterable, value) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.intersperse', 'Iterable');
  }

  return reduce(iterable, (acc, item) => {
    if (typeof acc === 'undefined') {
      return [item];
    }
    acc.push(value);
    acc.push(item);
    return acc;
  });
};
export default intersperse;
