/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import flat from './flat';
/**
 * @ignore
 */
export default (...iterables) => flat(new Iterable(iterables));
