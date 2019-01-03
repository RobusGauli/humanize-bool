
/**
 * Is (Robus Gauli robusgauli@gmail.com)
 *
 * Copyright © 2018-2019 Robus Gauli. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


function is() {
  // lets do something really quicky

    const obj = {
      isValueCheck: true,
      unionFlags: [],
      undefined: function() {
        this.unionFlags.push('undefined');
      },
      null: function() {
        this.unionFlags.push('null')
      },
      type: function() {
          this.isValueCheck = false;
      },
    }

    function compute() {
      
    }
  // what i wanna do it return the function as an proxy back to the user
  const proxy =  new Proxy(compute, {
    get(target, name) {
      if (obj[name]) {
        obj[name]();
      }
      return proxy;
    }
  })

  return proxy;
}

export default is;
