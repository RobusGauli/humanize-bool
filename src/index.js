
/**
 * Is (Robus Gauli robusgauli@gmail.com)
 *
 * Copyright © 2018-2019 Robus Gauli. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


function is(arg) {
  const hasProp = Object.prototype.hasOwnProperty;

  function* chain(...args) {
    for (let arg of args) {
      yield * arg;
    }
  }

  
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
    function: 'function',
    string: 'string',
    number: 'number'
  }

  const obj = {
    all: true,
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
    string: function() {
      if (!this.isValueCheck) {
        this.types.push(typesMap.string);
      }
    },
    number: function() {
      if (!this.isValueCheck) {
        this.types.push(typesMap.number)
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
      this.all = false;
    },
    any: function() {
      this.all = false;
    }
  }
  function computation(predicate) {
    return function(...values) {
      const flags = values.map(predicate);
    
      return obj.all
        ? flags.reduce((acc, flag) => acc && flag, true)
        : flags.reduce((acc, flag) => acc || flag, false);  
    }
  }

  const valueCompute = computation(value =>  arg === value);
  const typeCompute = computation(value => typeof arg === value);

  function compute(...values) {
    // need to evaluate the expression  
    return obj.isValueCheck
      ? valueCompute(...values, ...obj.values)
      : typeCompute(...values, ...obj.types);
  }
  
  // return the proxy back if attribute is missing
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
