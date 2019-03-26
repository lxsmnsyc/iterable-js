import { isIterable, BadArgumentError, isFunction } from './utils';
import flat from './flat';
import map from './map';

/**
 * @ignore
 */
const flatMap = (iterable, mapper) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.flatMap', 'Iterable');
  }
  if (!isFunction(mapper)) {
    throw new BadArgumentError(2, 'Iterable.flatMap', 'function');
  }
  return flat(map(iterable, mapper));
};
export default flatMap;
