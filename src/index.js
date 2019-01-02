/**
 * Is (Robus Gauli robusgauli@gmail.com)
 *
 * Copyright © 2018-2019 Robus Gauli. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function is() {
  const args = Array.prototype.slice.call(arguments);
  // flags constants
  const NOT = 'NOT';
  const ANY = 'ANY';
  const ALL = 'ALL';

  const OF = 'OF';

  function setCurrentFlag(flag) {
    return function wrapper(target, proxyInstance) {
      target.currentFlag = flag;
      return proxyInstance;
    };
  }

  const flags = {
    not: setCurrentFlag(NOT),
    any: setCurrentFlag(ANY),
    all: setCurrentFlag(ALL),
    of: setCurrentFlag(OF),
  };

  // proxy object to return
  const proxyInstance = new Proxy({
    currentFlag: ALL,
    instanceof(protoType) {
      // compute the flags
      const computedFlags = args
        .map(arg => arg instanceof protoType);

      return this[this.currentFlag](computedFlags);
    },
    equalTo(value) {
      const computedFlags = args
        .map(arg => arg === value);

      return this[this.currentFlag](computedFlags);
    },
    typeof(type) {
      const computedFlags = args.map(arg => typeof arg === type);
      return this[this.currentFlag](computedFlags);
    },
    length(len) {
      if (typeof len !== 'number') {
        throw new TypeError('Len argument must be of type Number.');
      }
      if (!args.length) {
        return args.length === len;
      }
      if (Array.isArray(args[0])) {
        return args[0].length === len;
      }
      return args.length === len;
    },
    ALL(computedFlags) {
      return computedFlags.reduce((acc, val) => acc && val, true);
    },
    NOT(computedFlags) {
      return !this.ALL(computedFlags);
    },
    ANY(computedFlags) {
      return computedFlags.reduce((acc, val) => acc || val, false);
    },
  }, {
    // traps
    get(target, name) {
      if (flags[name]) {
        return flags[name](target, proxyInstance);
      }
      return target[name];
    },
  });

  return proxyInstance;
}

export default is;
