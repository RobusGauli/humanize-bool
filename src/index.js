/**
 * humanize-bool (Robus Gauli robusgauli@gmail.com)
 *
 * Copyright © 2018-2019 Robus Gauli. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 *
 * @param {any} arg
 * @returns {object} proxy
 *
 * USAGE:
 * 1. check weather the value is undefined or null?
 *
 * const result = is(value).undefined.or.null()
 *
 * 2. Check weather the value is number or string?
 *
 * const result = is(value).number.or.string()
 *
 * 3. Check weather the value is of type function?
 *
 * const result = is(value).type.func();
 *
 * 4. Check weather is value is of type string or number?
 *
 * const result = is(val).of.type.string.or.number()
 * OR
 * const result = is(val).any.type.string.number()
 * OR
 * const result = is(val).any.type('string', 'number')
 *
 * 5. Check weather value is either cat, dog, car, or robus
 *
 * const result = is(val).any.equalsTo('cat', 'dog', 'car', 'robus')
 *
 */
export default function is(arg) {
  
  const args = Array.prototype.slice.call(arguments)
  
  if (!args.length || args.length > 1) {
    throw new Error('Should have one argument to the function.')
  }
  
  const {
    toString,
    hasOwnProperty: hasProp
  } = Object.prototype;

  
  // Initial Evaluation state
  const evaluationState = {
    all: true,
    values: [],
    types: [],
    positive: true,
    isValueCheck: true,
    undefined: function() {
      if (this.isValueCheck) {
        this.values.push(undefined);
      } else {
        this.types.push('undefined');
      }
    },
    null: function() {
      if (this.isValueCheck) {
        this.values.push(null);
      }
    },
    string: function() {
      if (!this.isValueCheck) {
        this.types.push('string');
      }
    },
    number: function() {
      if (!this.isValueCheck) {
        this.types.push('number');
      }
    },
    object: function() {
      if (!this.isValueCheck) {
        this.types.push('object');
      }
    },
    boolean: function() {
      if (!this.isValueCheck) {
        this.types.push('boolean');
      }
    },
    symbol: function() {
      if (!this.isValueCheck) {
        this.types.push('symbol');
      }
    },
    func: function() {
      if (!this.isValueCheck) {
        this.types.push('function');
      }
    },
    type: function() {
      this.isValueCheck = false;
    },
    or: function() {
      this.all = false;
    },
    any: function() {
      this.all = false;
    },
  };

  function _hasNestedKeys(obj, keys) {
    if (keys.length) {
      const key = keys[0];
      return toString.call(obj) === '[object Object]' &&
        hasProp.call(obj, key) && 
        _hasNestedKeys(obj[key], keys.slice(1))
    }

    return true;
  }

  const callableUtils = {
    withKeys: function(...args) {
      const reducerPredicate = evaluationState.all
        ? (acc, flag) => acc && flag
        : (acc, flag) => acc || flag;
      const predicate = val => hasProp.call(arg, val);

      return args.map(predicate).reduce(reducerPredicate, evaluationState.all)
    },
    withNestedKeys: function(...args) {
      return _hasNestedKeys(arg, args);
    },
    positive: function() {
      return arg > 0;
    },
    negative: function() {
      return arg  < 0
    },
    zero: function() {
      return arg === 0
    },
    nan: function() {
      return toString.call(arg) === '[object Number]' && arg.tostring() === 'NaN';
    },
    infinity: function() {
      return toString.call(arg) === '[object Number]' && arg.toString() === 'Infinity';
    },
    ofLength: function(value) {
      return arg.length === value;
    }
  }

  /**
   * Evaluator decorator takes predicate as an input and returns the function that evaluates to an expression given a predicate.
   *
   * @param {function} predicate
   * @returns {function}
   */
  const evaluator = predicate => (...values) =>
    evaluationState.all
      ? values.map(predicate).reduce((acc, flag) => acc && flag, true)
      : values.map(predicate).reduce((acc, flag) => acc || flag, false);

  // This function evaluates to boolean expression given a values.
  const evaluateValue = evaluator(value => arg === value);
  // This function evaluates to boolean expression given a types.
  const evaluateType = evaluator(value => typeof arg === value);

  // Function that is called by the user code
  const evaluate = (...values) =>
    evaluationState.isValueCheck
      ? evaluateValue(...values, ...evaluationState.values)
      : evaluateType(...values, ...evaluationState.types);

  // Return the proxy back if attribute is missing
  const proxy = new Proxy(evaluate, {
    get(target, name) {
      
      // Call the callable utils if available
      if (hasProp.call(callableUtils, name)) {
        return callableUtils[name];
      }

      if (evaluationState[name]) {
        evaluationState[name].call(evaluationState);
      }


      return proxy;
    }
  });

  return proxy;
}
