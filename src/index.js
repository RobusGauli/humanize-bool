
/**
 * Is (Robus Gauli robusgauli@gmail.com)
 *
 * Copyright © 2018-2019 Robus Gauli. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


function is() {
  const hasProp = Object.prototype.hasOwnProperty;
  const args = Array.prototype.slice.call(arguments)

  // types and value for a given JS data
  const valuesMap = {
    undefined: undefined,
    null: null,
  }
  const typesMap = {
    undefined: 'undefined',
    object: 'object',
    boolean: 'boolean',
    symbol: 'symbol',
    function: 'function'
  }

  const obj = {
    all: true,
    and: true,
    values: [],
    types: [],
    isValueCheck: true,
    undefined: function () {
      if (this.isValueCheck) {
        this.values.push(valuesMap.undefined);
      } else {
        this.types.push(typesMap.undefined);
      }
    },
    null: function () {
      if (this.isValueCheck) {
        this.values.push(valuesMap.null);
      }
    },
    object: function() {
      if(!this.isValueCheck) {
        this.types.push(typesMap.object);
      }
    },
    boolean: function() {
      if (!this.isValueCheck) {
        this.types.push(typesMap.boolean)
      }
    },
    symbol: function() {
      if (!this.isValueCheck) {
        this.types.push(typesMap.symbol);
      }
    },
    func: function() {
      if (!this.isValueCheck) {
        this.types.push(typesMap.function)
      }
    },
    type: function () {
      this.isValueCheck = false;
    },
    or: function() {
      this.and = false;
    },
    any: function() {
      this.all = false;
    }
  }

  function compute(values) {
    // need to evaluate the expression  
    return obj.isValueCheck
      ? valueCompute(values)
      : typeCompute(values)
  }

  function typeCompute(...values) {
    const computedFlags = obj.unionFlags.map(flag => args.map(arg => typeof arg === flag));
    const userComputedFlags = values.map(value => args.map(arg => typeof arg === value));
    
    console.log(userComputedFlags);
    console.log(computedFlags);
    return 'type';
  }

  function valueCompute(value) {
    return 'value'
  }
  // what i wanna do it return the function as an proxy back to the user
  const proxy = new Proxy(compute, {
    get(target, name) {
      if (obj[name]) {
        obj[name].call(obj)
      }
      return proxy;
    }
  })

  return proxy;
}

export default is;
