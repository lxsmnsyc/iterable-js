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
import { isNumber } from 'util';
import { isIterable, ITERATOR } from './internal/utils';
import {
  map, filter, concat, just, first, last, repeat,
  startWith, zip, flat, all, any, isEmpty, empty,
  skip, take, takeLast, skipLast, split, skipWhile,
  takeWhile, onYield, onDone, onStart, count, contains,
  indexOf, find, breakWith, spanWith, partition,
  flatMap, range, elementAt, replace,
} from './internal/dependency';

/**
 * The Iterable class serves as a super set of all objects
 * that implements the Iteration Protocol.
 *
 * Iterable allows the unification and abstraction
 * of these objects.
 *
 * Iterable also provides operators which allows to
 * transform an Iterable into a new one, making Iterable
 * an Immutable.
 */
export default class Iterable {
  /**
   * Returns an Iterable with the given object.
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

    return new Proxy(this, {
      get(target, index) {
        if (typeof index === 'string' && index in target) {
          return target[index];
        }
        if (isNumber(index)) {
          return target.get(index);
        }
        return undefined;
      },
    });
  }

  /**
   * Similar to elementAt, excepts that this method
   * returns the actual value at the given index.
   * @param {!number} index
   * @returns {any}
   */
  get(index) {
    const { it } = this;
    let step = 0;
    for (const i of it) {
      if (step === index) {
        return i;
      }
      step += 1;
    }
    return undefined;
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
   * Split an Iterable into a longest prefix such that all
   * the elements of it do not satisfy a given predicate,
   * and the rest of the Iterable following them.
   * @param {Iterable} it
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static breakWith(it, predicate) {
    return breakWith(it, predicate);
  }

  /**
   * Split an Iterable into a longest prefix such that all
   * the elements of it do not satisfy a given predicate,
   * and the rest of the Iterable following them.
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  breakWith(predicate) {
    return breakWith(this.it, predicate);
  }

  /**
   * Concatenates the given set of Iterables into a single Iterable.
   *
   * If a value is an Iterable, concat removes a single layer
   * of nesting
   * @param  {...any} its
   * @returns {Iterable}
   */
  static concat(...its) {
    return concat(...its);
  }

  /**
   * Concatenates the given Iterables to this Iterable.
   *
   * If a value is an Iterable, concat removes a single layer
   * of nesting
   *
   * @param  {...any} its
   * @returns {Iterable}
   */
  concat(...its) {
    return concat(this.it, ...its);
  }

  /**
   * Returns an Iterable that yields a Boolean that indicates
   * whether the source Iterable yielded a specified item.
   * @param {Iterable} it
   * @param {any} value
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static contains(it, value) {
    return contains(it, value);
  }

  /**
   * Returns an Iterable that yields a Boolean that indicates
   * whether the source Iterable yielded a specified item.
   * @param {any} value
   * @returns {Iterable}
   */
  contains(value) {
    return contains(this.it, value);
  }

  /**
   * Returns an Iterable that counts the total number of items
   * yielded by the source Iterable and yields this count.
   * @param {Iterable} it
   * @returns {Iterable}
   */
  static count(it) {
    return count(it);
  }

  /**
   * Returns an Iterable that counts the total number of items
   * yielded by this Iterable and yields this count.
   * @returns {Iterable}
   */
  count() {
    return count(this.it);
  }

  /**
   * Returns an Iterable that yields the single item at a specified
   * index in a sequence of yields from the source Iterable.
   * @param {!Iterable} it
   * @param {!number} index
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given index is not a number.
   * @returns {Iterable}
   */
  static elementAt(it, index) {
    return elementAt(it, index);
  }

  /**
   * Returns an Iterable that yields the single item at a specified
   * index in a sequence of yields from this Iterable.
   * @param {!number} index
   * @throws {TypeError}
   * throws error if the given index is not a number.
   * @returns {Iterable}
   */
  elementAt(index) {
    return elementAt(this.it, index);
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
   * Finds the index of the first element that satisfy a predicate.
   * @param {Iterable} it
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static find(it, predicate) {
    return find(it, predicate);
  }

  /**
   * Finds the index of the first element that satisfy a predicate.
   * @param {function(x: any):boolean} predicate
   * @returns {Iterable}
   */
  find(predicate) {
    return find(this.it, predicate);
  }

  /**
   * Returns an Iterable that yields the first value of the source
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
   * Returns an Iterable that yields the first value of this
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
   * Returns an Iterable that yields items based on applying a
   * function that you supply to each item yielded by the source
   * Iterable, where that function returns an Iterable, and then
   * merging those resulting Iterable and yielding the results of this merger.
   * @param {!Iterable} it
   * @param {function(x: any):Iterable} mapper
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given mapper is not a function
   * @returns {Iterable}
   */
  static flatMap(it, mapper) {
    return flatMap(it, mapper);
  }

  /**
   * Returns an Iterable that yields items based on applying a
   * function that you supply to each item yielded by this
   * Iterable, where that function returns an Iterable, and then
   * merging those resulting Iterable and yielding the results of this merger.
   * @param {function(x: any):Iterable} mapper
   * @throws {TypeError}
   * throws error if the given mapper is not a function
   * @returns {Iterable}
   */
  flatMap(mapper) {
    return flatMap(this.it, mapper);
  }

  /**
   * Returns an Iterable that yields the index of the
   * given value if it the source Iterable yields the same
   * value.
   * @param {Iterable} it
   * @param {any} value
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static indexOf(it, value) {
    return indexOf(it, value);
  }

  /**
   * Returns an Iterable that yields the index of the
   * given value if it this Iterable yields the same
   * value.
   * @param {any} value
   * @returns {Iterable}
   */
  indexOf(value) {
    return indexOf(this.it, value);
  }

  /**
   * Returns an Iterable that yields true if this
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
   * Returns an Iterable that yields the true if this
   * Iterable is empty.
   * @returns {Iterable}
   */
  isEmpty() {
    return isEmpty(this.it);
  }

  /**
   * Returns an Iterable that yields a single value.
   * @param {any} value
   * @returns {Iterable}
   */
  static just(value) {
    return just(value);
  }

  /**
   * Returns an Iterable that yields the last value of the source
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
   * Returns an Iterable that yields the last value of this
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
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given action is not a function
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
   * @throws {TypeError}
   * throws error if the given action is not a function
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
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given action is not a function
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
   * @throws {TypeError}
   * throws error if the given action is not a function
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
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given consumer is not a function
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
   * @throws {TypeError}
   * throws error if the given consumer is not a function
   * @returns {Iterable}
   */
  onYield(fn) {
    return onYield(this.it, fn);
  }

  /**
   * Given a predicate and an Iterable, return a pair of Iterables
   * which do and do not satisfy the predicate, respectively.
   * @param {Iterable} it
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given consumer is not a function
   * @returns {Iterable}
   */
  static partition(it, predicate) {
    return partition(it, predicate);
  }

  /**
   * Given a predicate and an Iterable, return a pair of Iterables
   * which do and do not satisfy the predicate, respectively.
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given consumer is not a function
   * @returns {Iterable}
   */
  partition(predicate) {
    return partition(this.it, predicate);
  }

  /**
   * Returns an Iterable that yields a sequence of numbers
   * within a specified range.
   * @param {!number} start
   * @param {!number} end
   * @param {?number} steps
   * @returns {Iterable}
   */
  static range(start, end, steps) {
    return range(start, end, steps);
  }

  /**
   * Repeats the yielded values of a source Iterable by a certain
   * amount.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static repeat(it, amount) {
    return repeat(it, amount);
  }

  /**
   * Repeats the yielded values of this Iterable by a certain
   * amount.
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  repeat(amount) {
    return repeat(this.it, amount);
  }

  /**
   * Returns an Iterable that replaces the value at the
   * given index of the source Iterable with the given value.
   * @param {Iterable} it
   * @param {!number} index
   * @param {any} value
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given index is not a number.
   * @returns {Iterable}
   */
  static replace(it, index, value) {
    return replace(it, index, value);
  }

  /**
   * Returns an Iterable that replaces the value at the
   * given index of this Iterable with the given value.
   * @param {!number} index
   * @param {any} value
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given index is not a number.
   * @returns {Iterable}
   */
  replace(index, value) {
    return replace(this.it, index, value);
  }

  /**
   * Returns an Iterable that skips the first count items yielded by
   * the source Iterable and yields the remainder.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static skip(it, amount) {
    return skip(it, amount);
  }

  /**
   * Returns an Iterable that skips the first count items yielded by
   * the source Iterable and yields the remainder.
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  skip(amount) {
    return skip(this.it, amount);
  }

  /**
   * Returns an Iterable that drops a specified number of items
   * from the end of the sequence yielded by the source
   * Iterable.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static skipLast(it, amount) {
    return skipLast(it, amount);
  }

  /**
   * Returns an Iterable that drops a specified number of items
   * from the end of the sequence yielded by this Iterable.
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  skipLast(amount) {
    return skipLast(this.it, amount);
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
   * Split an Iterable into a longest prefix such that all
   * the elements of it do satisfy a given predicate,
   * and the rest of the Iterable following them.
   * @param {Iterable} it
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static spanWith(it, predicate) {
    return spanWith(it, predicate);
  }

  /**
   * Split an Iterable into a longest prefix such that all
   * the elements of it do satisfy a given predicate,
   * and the rest of the Iterable following them.
   * @param {function(x: any):boolean} predicate
   * @throws {TypeError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  spanWith(predicate) {
    return spanWith(this.it, predicate);
  }

  /**
   * Given an index, get a two-tuple of Iterable
   * from the start of the source Iterable,
   * and the Iterable that follows them.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Array}
   */
  static split(it, amount) {
    return split(it, amount);
  }

  /**
   * Given an index, get a two-tuple of Iterable
   * from the start of this Iterable,
   * and the Iterable that follows them.
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Array}
   */
  split(amount) {
    return split(this.it, amount);
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
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static take(it, amount) {
    return take(it, amount);
  }

  /**
   * Returns an Iterable that yields only the first count items yielded by
   * this Iterable.
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  take(amount) {
    return take(this.it, amount);
  }

  /**
   * Returns an Iterable that yields at most the last amount
   * items yielded by the source Iterable.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static takeLast(it, amount) {
    return takeLast(it, amount);
  }

  /**
   * Returns an Iterable that yields at most the last amount
   * items yielded by the source Iterable.
   * @param {!number} amount
   * @throws {TypeError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  takeLast(amount) {
    return takeLast(this.it, amount);
  }

  /**
   * Returns an Iterable that yields items yielded by the source Iterable
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
   * Returns an Iterable that yields items yielded by this Iterable
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
   * throws error if the given iterables is not an array
   * @throws {TypeError}
   * throws error if the given zipper is not a function or undefined
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
   * throws error if the given iterables is not an array
   * @throws {TypeError}
   * throws error if the given zipper is not a function or undefined
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
