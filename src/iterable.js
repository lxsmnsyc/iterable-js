/* eslint-disable no-restricted-syntax */
/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
/**
 * @external {Iteration Protocol} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */
import { isIterable, ITERATOR } from './internal/utils';
import {
  map, filter, concat, just, first, last, repeat,
  startWith, zip, flat, all, any, isEmpty, empty,
  skip, take, takeLast, skipLast, split, skipWhile,
  takeWhile, onYield, onDone, onStart,
} from './internal/dependency';

/**
 * The Iterable class serves as a super set of all objects
 * that implements the Iteration Protocol.
 *
 * Iterable allows the unification of these objects.
 */
export default class Iterable {
  /**
   * Creates an Iterable with the given object.
   *
   * This object must be either a generator or an object
   * that implements the Iteration Protocol.
   *
   * @param {Iterable} iterable
   * @returns {Iterable}
   */
  constructor(iterable) {
    const it = iterable;
    if (it.constructor.name === 'GeneratorFunction') {
      it[ITERATOR] = it;
    }
    /**
     * @ignore
     */
    this.it = it;
  }

  get(index) {
    const { it } = this;
    let step = index;
    for (const i of it) {
      step -= 1;
      if (step === 0) {
        return i;
      }
    }
    return undefined;
  }

  set(index, value) {
    const { it } = this;
    // eslint-disable-next-line func-names
    const gen = function* () {
      let step = index;
      for (const i of it) {
        step -= 1;
        if (step === 0) {
          yield value;
        } else {
          yield i;
        }
      }
    };

    gen[ITERATOR] = gen;

    return new Iterable(gen);
  }

  /**
   * Checks if a given Object follows the Iterator Protocol.
   * @param {Object} it
   * @returns {boolean}
   */
  static is(it) {
    return isIterable(it);
  }

  /**
   * Returns an Iterable that yields true if all of the yields of the
   * source Iterable passes the predicate function, false if not.
   * @param {!Iterable} it
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static all(it, predicate) {
    return all(it, predicate);
  }

  /**
   * Returns an Iterable that yields true if all of the yields of
   * this Iterable passes the predicate function, false if not.
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  all(predicate) {
    return all(this.it, predicate);
  }

  /**
   * Returns an Iterable that yields true if any of the yields of the
   * source Iterable passes the predicate function, false if not.
   * @param {!Iterable} it
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static any(it, predicate) {
    return any(it, predicate);
  }

  /**
   * Returns an Iterable that yields true if any of the yields of
   * this Iterable passes the predicate function, false if not.
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  any(predicate) {
    return any(this.it, predicate);
  }

  /**
   * Concatenates the given set of Iterables into a single Iterable.
   * @param  {...Iterable} its
   * @returns {Iterable}
   */
  static concat(...its) {
    return concat(...its);
  }

  /**
   * Concatenates the given Iterables to this Iterable.
   * @param  {...Iterable} its
   * @returns {Iterable}
   */
  concat(...its) {
    return concat(this.it, ...its);
  }

  /**
   * Returns an Iterable that doesn't yield any value.
   * @returns {Iterable}
   */
  static empty() {
    return empty();
  }

  /**
   * Filters the yields of a source Iterable with a filter function.
   *
   * @param {!Iterable} it
   * @param {function(x: any):boolean} fn
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static filter(it, fn) {
    return filter(it, fn);
  }

  /**
   * Filters the yields of this Iterable with a filter function.
   * @param {function(x: any):boolean} fn
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  filter(fn) {
    return filter(this.it, fn);
  }

  /**
   * Creates an Iterable that yields the first value of the source
   * Iterable.
   * @param {!Iterable} it
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static first(it) {
    return first(it);
  }

  /**
   * Creates an Iterable that yields the first value of this
   * Iterable.
   * @returns {Iterable}
   */
  first() {
    return first(this.it);
  }

  /**
   * Flattens the source Iterable by removing a single layer of
   * nesting for the yielded Iterables.
   * @param {!Iterable} it
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static flat(it) {
    return flat(it);
  }

  /**
   * Flattens this Iterable by removing a single layer of nesting
   * for the yielded Iterables.
   * @returns {Iterable}
   */
  flat() {
    return flat(this.it);
  }

  /**
   * Creates an Iterable that yields true if this
   * Iterable is empty.
   * @param {!Iterable} it
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static isEmpty(it) {
    return isEmpty(it);
  }

  /**
   * Creates an Iterable that yields the true if this
   * Iterable is empty.
   * @returns {Iterable}
   */
  isEmpty() {
    return isEmpty(this.it);
  }

  /**
   * Creates an Iterable that yields a single value.
   * @param {any} value
   * @returns {Iterable}
   */
  static just(value) {
    return just(value);
  }

  /**
   * Creates an Iterable that yields the last value of the source
   * Iterable.
   * @param {Iterable} it
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static last(it) {
    return last(it);
  }

  /**
   * Creates an Iterable that yields the last value of this
   * Iterable.
   * @returns {Iterable}
   */
  last() {
    return last(this.it);
  }


  /**
   * Applies a mapping function to each yielded value of the source
   * Iterable.
   * @param {!Iterable} it
   * @param {function(x: any):any} fn
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given mapper is not a function
   * @returns {Iterable}
   */
  static map(it, fn) {
    return map(it, fn);
  }

  /**
   * Applies a mapping function to each yielded value of this
   * Iterable.
   * @param {function(x: any):any} fn
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  map(fn) {
    return map(this.it, fn);
  }

  /**
   * Attaches a callback to a source Iterable that is
   * executed when the Iterable finishes the iteration
   * process.
   * @param {Iterable} it
   * @param {function(x: any)} fn
   * @returns {Iterable}
   */
  static onDone(it, fn) {
    return onDone(it, fn);
  }

  /**
   * Attaches a callback to this Iterable that is
   * executed when this Iterable finishes the iteration
   * process.
   * @param {function(x: any)} fn
   * @returns {Iterable}
   */
  onDone(fn) {
    return onDone(this.it, fn);
  }

  /**
   * Attaches a callback to a source Iterable that is
   * executed when the Iterable finishes the iteration
   * process.
   * @param {Iterable} it
   * @param {function(x: any)} fn
   * @returns {Iterable}
   */
  static onStart(it, fn) {
    return onStart(it, fn);
  }

  /**
   * Attaches a callback to this Iterable that is
   * executed when this Iterable finishes the iteration
   * process.
   * @param {function(x: any)} fn
   * @returns {Iterable}
   */
  onStart(fn) {
    return onStart(this.it, fn);
  }

  /**
   * Attaches a callback to a source Iterable that is
   * executed whenever the source Iterable yields
   * a value.
   * @param {Iterable} it
   * @param {function(x: any)} fn
   * @returns {Iterable}
   */
  static onYield(it, fn) {
    return onYield(it, fn);
  }

  /**
   * Attaches a callback to this Iterable that is
   * executed whenever this Iterable yields
   * a value.
   * @param {function(x: any)} fn
   * @returns {Iterable}
   */
  onYield(fn) {
    return onYield(this.it, fn);
  }

  /**
   * Repeats the yielded values of a source Iterable by a certain
   * amount.
   * @param {!Iterable} it
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  static repeat(it, count) {
    return repeat(it, count);
  }

  /**
   * Repeats the yielded values of this Iterable by a certain
   * amount.
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  repeat(count) {
    return repeat(this.it, count);
  }

  /**
   * Returns an Iterable that skips the first count items yielded by
   * the source Iterable and yields the remainder.
   * @param {!Iterable} it
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  static skip(it, count) {
    return skip(it, count);
  }

  /**
   * Returns an Iterable that skips the first count items yielded by
   * the source Iterable and yields the remainder.
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  skip(count) {
    return skip(this.it, count);
  }

  /**
   * Returns an Iterable that drops a specified number of items
   * from the end of the sequence emitted by the source
   * Iterable.
   * @param {!Iterable} it
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  static skipLast(it, count) {
    return skipLast(it, count);
  }

  /**
   * Returns an Iterable that drops a specified number of items
   * from the end of the sequence emitted by this Iterable.
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  skipLast(count) {
    return skipLast(this.it, count);
  }

  /**
   * Returns an Iterable that skips all items yielded by the source
   * Iterable as long as a specified condition holds true, but yields
   * all further source items as soon as the condition becomes false.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static skipWhile(it, predicate) {
    return skipWhile(it, predicate);
  }

  /**
   * Returns an Iterable that skips all items yielded by the source
   * Iterable as long as a specified condition holds true, but yields
   * all further source items as soon as the condition becomes false.
   * @param {!function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  skipWhile(predicate) {
    return skipWhile(this.it, predicate);
  }

  /**
   * Given an index, get a two-tuple of Iterable
   * from the start of the source Iterable,
   * and the Iterable that follows them.
   * @param {!Iterable} it
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Array}
   */
  static split(it, count) {
    return split(it, count);
  }

  /**
   * Given an index, get a two-tuple of Iterable
   * from the start of this Iterable,
   * and the Iterable that follows them.
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Array}
   */
  split(count) {
    return split(this.it, count);
  }

  /**
   * Same to concat, except that it prefixes the source Iterable
   * to a set of values into a single Iterable.
   *
   * If a value is an Iterable, startWith removes a single layer
   * of nesting
   *
   * @param {!Iterable} it
   * @param  {...any} its
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static startWith(it, ...its) {
    return startWith(it, ...its);
  }

  /**
   * Same to concat, except that it prefixes this Iterable
   * to a set of values into a single Iterable.
   *
   * If a value is an Iterable, startWith removes a single layer
   * of nesting
   *
   * @param  {...any} its
   * @returns {Iterable}
   */
  startWith(...its) {
    return startWith(this.it, ...its);
  }

  /**
   * Returns an Iterable that yields only the first count items yielded by the
   * source Iterable.
   * @param {!Iterable} it
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  static take(it, count) {
    return take(it, count);
  }

  /**
   * Returns an Iterable that yields only the first count items yielded by
   * this Iterable.
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  take(count) {
    return take(this.it, count);
  }

  /**
   * Returns an Iterable that yields at most the last count
   * items yielded by the source Iterable.
   * @param {!Iterable} it
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  static takeLast(it, count) {
    return takeLast(it, count);
  }

  /**
   * Returns an Iterable that yields at most the last count
   * items yielded by the source Iterable.
   * @param {!number} count
   * @throws {TypeError}
   * throws error if the given count is not a number.
   * @returns {Iterable}
   */
  takeLast(count) {
    return takeLast(this.it, count);
  }

  /**
   * Returns an Iterable that emits items yielded by the source Iterable
   * so long as each item satisfied a specified condition, and then
   * completes as soon as this condition is not satisfied.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static takeWhile(it, predicate) {
    return takeWhile(it, predicate);
  }

  /**
   * Returns an Iterable that emits items yielded by this Iterable
   * so long as each item satisfied a specified condition, and then
   * completes as soon as this condition is not satisfied.
   * @param {!function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  takeWhile(predicate) {
    return takeWhile(this.it, predicate);
  }

  /**
   * combine the yields of multiple Iterables together via a specified function and
   * yields single items for each combination based on the results of this function.
   * @param {!Array} its
   * @param {!function(yields: Array):any} fn
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static zip(its, fn) {
    return zip(its, fn);
  }

  /**
   * combine the yields of this Iterable with multiple Iterables together via a specified
   * function and yields single items for each combination based on the results of this
   * function.
   * @param {!Array} its
   * @param {!function(yields: Array):any} fn
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  zip(its, fn) {
    return zip([this.it, ...its], fn);
  }

  /**
   * Implements the Iterator Protocol for this Iterable.
   */
  [ITERATOR]() {
    return this.it[ITERATOR]();
  }
}
