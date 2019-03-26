/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import flat from './flat';


/**
 * @ignore
 */
const concat = (...iterables) => flat(new Iterable(iterables));

export default concat;
