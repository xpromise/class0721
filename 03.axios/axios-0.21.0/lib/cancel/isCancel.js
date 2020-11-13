'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
  // return Boolean(value && value.__CANCEL__);
};
