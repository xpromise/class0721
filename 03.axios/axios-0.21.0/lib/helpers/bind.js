'use strict';

// fn -- Axios.prototype.request
// thisArg -- context
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    // 将arguments伪数组变成args真数组
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};
