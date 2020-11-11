"use strict";

var utils = require("./../utils");
var buildURL = require("../helpers/buildURL");
var InterceptorManager = require("./InterceptorManager");
var dispatchRequest = require("./dispatchRequest");
var mergeConfig = require("./mergeConfig");

/**
 * 构造函数Axios
 * 上面有各种发送请求的方法 GET、POST...
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  // 默认请求配置
  this.defaults = instanceConfig;
  // 拦截器
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

/**
 * 真正用来发送请求的方法
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API

  // axios(url, config) --> request(url, config)
  // axios(config) --> request(config)
  if (typeof config === "string") {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  /*
    axios({
      method: 'POST',
      url: 'xxx',
      // headers: {
      //   'content-type': 'application/json'
      // }
      data: { xxx }
    })
  */
  // 合并默认配置和用户传入的配置
  config = mergeConfig(this.defaults, config);

  // 设置请求方式
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }

  // 拦截器执行流程
  // dispatchRequest 发送请求的方法
  var chain = [dispatchRequest, undefined];
  // 生成了一个成功的promise
  var promise = Promise.resolve(config);

  // 遍历请求拦截器所有函数，将每一个函数插入到chain的前面
  // handlers [{拦截器1}, {拦截器2}]
  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    // 往数组的最前面插入元素
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  // 遍历响应拦截器所有函数，将每一个函数插入到chain的后面
  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  /*
     [
        请求拦截器成功回调2, 请求拦截器失败回调2, 
        请求拦截器成功回调1, 请求拦截器失败回调1, 
        dispatchRequest, undefined, 
        响应拦截器成功回调1, 响应拦截器失败回调1,
        响应拦截器成功回调2, 响应拦截器失败回调2,
      ]
  */

  while (chain.length) {
    // 将chain数组中的回调移除前面两个，分别作为成功。失败
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(
    /^\?/,
    ""
  );
};

// 给Axios原型上添加 'delete', 'get', 'head', 'options' 这四个请求方式
// 本质上这四个请求方式就是调用 request 方法
utils.forEach(
  ["delete", "get", "head", "options"],
  function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function (url, config) {
      return this.request(
        // 合并配置：合并两个对象成一个对象
        // 后面对象会覆盖前面的
        mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data,
        })
      );
    };
  }
);

// 给Axios原型上添加 "post", "put", "patch" 这四个请求方式
// 本质上这四个请求方式就是调用 request 方法
utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(
      mergeConfig(config || {}, {
        method: method,
        url: url,
        data: data,
      })
    );
  };
});

module.exports = Axios;
