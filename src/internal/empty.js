import Iterable from '../iterable';
import { isUndefined } from './utils';

/**
 * @ignore
 */
let INSTANCE;
/**
 * @ignore
 */
export default () => {
  if (isUndefined(INSTANCE)) {
    INSTANCE = new Iterable([]);
  }
  return INSTANCE;
};
