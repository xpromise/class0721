// @ts-nocheck
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  // context就是Axios的实例对象
  // context.__proto__上有发送请求的各种方法 GET POST
  var context = new Axios(defaultConfig);
  // 改变 Axios.prototype.request 函数的this，指向context
  // 返回一个新函数，新函数内部调用的还是 request函数
  // instance就是我们最终使用的axios
  var instance = bind(Axios.prototype.request, context);

  // 将Axios.prototype的方法复制到instance（axios）上
  // 所以 axios.get/post()...
  utils.extend(instance, Axios.prototype, context);

  // 将context上的属性复制到instance上
  // 复制默认配置和拦截器到instance上
  utils.extend(instance, context);

  return instance;
}

/*
  1. 为什么axios既能当做函数调用，也能当做对象使用？
    axios({}) --> instance({}) --> request({})
      因为改变了this指向，所以this指向context（就是Axios的实例对象）
    axios.get(url)
      将Axios.prototype的方法复制到instance（axios）上
      utils.extend(instance, Axios.prototype, context);
      
  2. Axios 和 axios 之间的联系
    axios是不是Axios的实例对象？不是，context才是
    但是axios有Axios上的方法（与Axios实例功能很相似，但不完全一样）

  3. axios的功能
    本身是一个request函数
    有 get、post...等方法
    有 defaults、interceptors等属性
    有 create 、all、Cancel 等方法

  4. axios和axios.create()返回的axios有什么区别？
    本身是一个request函数
    有 get、post...等方法
    有 defaults、interceptors等属性

    没有 create 、all、Cancel 等方法
*/

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// 产生一个新的instance（axios）
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// 取消请求方法
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// all方法
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
