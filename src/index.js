/**
 * Is (Robus Gauli robusgauli@gmail.com)
 *
 * Copyright © 2018-2019 Robus Gauli. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

export default function is(arg) {
  // Initial Evaluation state
  const evaluationState = {
    all: true,
    values: [],
    types: [],
    isValueCheck: true,
    undefined: function () {
      if (this.isValueCheck) {

        this.values.push(undefined);
      } else {
        this.types.push('undefined');
      }
    },
    null: function () {
      if (this.isValueCheck) {
        this.values.push(null);
      }
    },
    string: function () {
      if (!this.isValueCheck) {
        this.types.push('string');
      }
    },
    number: function () {
      if (!this.isValueCheck) {
        this.types.push('number')
      }
    },
    object: function () {
      if (!this.isValueCheck) {
        this.types.push('object');
      }
    },
    boolean: function () {
      if (!this.isValueCheck) {
        this.types.push('boolean')
      }
    },
    symbol: function () {
      if (!this.isValueCheck) {
        this.types.push('symbol');
      }
    },
    func: function () {
      if (!this.isValueCheck) {
        this.types.push('function')
      }
    },
    type: function () {
      this.isValueCheck = false;
    },
    or: function () {
      this.all = false;
    },
    any: function () {
      this.all = false;
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
  // This functiob evaluates to boolean expression given a types. 
  const evaluateType = evaluator(value => typeof arg === value);

  // Function that is called by the user code
  const evaluate = (...values) => 
    evaluationState.isValueCheck
      ? evaluateValue(...values, ...evaluationState.values)
      : evaluateType(...values, ...evaluationState.types);

  // Return the proxy back if attribute is missing
  const proxy = new Proxy(evaluate, {
    get(target, name) {
      if (evaluationState[name]) {
        evaluationState[name].call(evaluationState)
      }
      return proxy;
    }
  })

  return proxy;
}


