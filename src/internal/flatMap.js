import { IterablePredicateCheck, defineField } from './utils';
import flat from './flat';
import map from './map';
/**
 * @ignore
 */
const FIELD = defineField('flatMap');
/**
 * @ignore
 */
export default (iterable, mapper) => {
  IterablePredicateCheck(iterable, mapper, FIELD);
  return flat(map(iterable, mapper));
};
