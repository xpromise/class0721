// @ts-nocheck
/* 
  this指向：看调用方式
    1. 直接调用函数  window
      在 ES5 严格模式 this 指向 undefined
    2. 隐式调用（对象调用方式） 调用的对象
      a.b.c.d() 指向c
    3. 显示调用(call/apply) 指向传入的第一个参数
    4. new调用 指向产生的实例对象
    
    5. 回调函数
      定时器回调函数 window
        在 ES5 严格模式 this 指向 undefined
      DOM事件回调函数 绑定事件的DOM元素
      React生命周期函数 组件实例对象
      React普通函数 默认是undefined
    
    6. 箭头函数
      没有自己的this、arguments
      看离他最近包裹它函数的this
*/

(function (w) {
  function MyPromise(executor) {
    // promise对象就是this --> new关键字
    const that = this;
    // 初始化promise对象是pending状态
    // _开头的属性是私有属性，外界不允许操作
    that._status = "pending";
    that._result = undefined;
    // 用来存储成功、失败回调函数的容器
    that._callbacks = {};

    // that.__my_promise__ = true;

    function resolve(value) {
      // 让promise对象状态只能修改一次
      if (that._status !== "pending") return;
      // 将promise对象状态改成成功状态resolved
      that._status = "resolved";
      that._result = value;
      // 触发/调用 onResolved 函数
      setTimeout(function () {
        // 异步调用 setTimeout
        // that._callbacks.onResolved && that._callbacks.onResolved(value);
        // 新的运算符 ?. 可选链
        that._callbacks.onResolved?.(value);
      }, 0);
    }

    // 将promise对象状态改成失败状态rejected
    function reject(reason) {
      // 让promise对象状态只能修改一次
      if (that._status !== "pending") return;
      that._status = "rejected";
      that._result = reason;
      // 触发/调用 onRejected 函数
      setTimeout(function () {
        that._callbacks.onRejected?.(reason);
      }, 0);
    }

    // 同步调用
    executor(resolve, reject);
  }

  MyPromise.prototype.then = function (onResolved, onRejected) {
    // this指向实例对象promise
    const that = this;

    // then方法只传一个回调，当接收到失败的promise时，将失败promise往下传递（返回值也是失败的，且结果值与其一致）
    // 为了then方法不传第二个函数（失败回调）服务
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // catch方法，当接收到成功的promise时，将成功promise往下传递（返回值也是成功的，且结果值与其一致）
    // 为了catch方法不传第一个回调服务
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;

    // 返回新的promise对象 --> 为了链式调用
    return new MyPromise(function (resolve, reject) {
      // 状态怎么改变？
      // 什么场景要调用resolve，什么场景要调用reject
      /*
        then返回值是一个新的promise1对象，
            他的状态看里面函数调用的返回值：
              如果返回值是一个promise2对象，那么这个promise2的状态是什么，promise1的状态就是什么
              如果返回值不是promise对象，或者没有返回值，那么promise1对象默认是成功状态
              如果函数调用报错了，那么promise1对象就会是失败状态
      */

      // 需求：得到onResolved、onRejected函数调用的返回值
      // 将成功、失败回调添加容器中（注意：没有调用）
      that._callbacks.onResolved = function (value) {
        try {
          // 放置可能出错代码
          // result函数返回值
          const result = onResolved(value);
          // 判断返回值是否是promise对象
          if (result instanceof MyPromise) {
            // 返回值是一个promise对象
            // result.then(
            //   (value) => {
            //     resolve(value);
            //   },
            //   (reason) => {
            //     reject(reason);
            //   }
            // );
            result.then(resolve, reject);
          } else {
            // 返回值不是promise对象 - 返回成功状态
            resolve(result);
          }
        } catch (e) {
          // error 失败的原因
          // onResolved方法报错了
          reject(e);
        }
      };

      that._callbacks.onRejected = function (reason) {
        try {
          // 放置可能出错代码
          // result函数返回值
          const result = onRejected(reason);
          // 判断返回值是否是promise对象
          if (result instanceof MyPromise) {
            // 返回值是一个promise对象
            // result.then(() => { resolve() }, () => { reject() })
            result.then(resolve, reject);
          } else {
            // 返回值不是promise对象 - 返回成功状态
            resolve(result);
          }
        } catch (e) {
          // onRejected方法报错了
          reject(e);
        }
      };
    });
  };

  MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  MyPromise.resolve = function (value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolve) => resolve(value));
    }
  };

  MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  };

  MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
      // 成功结果值数组
      const result = [];
      // 接受数组的长度
      const total = promises.length;
      // 已完成数量
      let completedNum = 0;

      promises.forEach((item, index) => {
        // 判断item是否是promise
        // 是 判断promise的状态，通过then
        // 不是 就当做成功的promise使用
        if (item instanceof MyPromise) {
          // item.then((value) => {}, (reason) => {
          //   reject(reason)
          // })
          item.then((value) => {
            // 不行：问题就是result结果值顺序不对
            // result.push(value)
            resolveAllPromise(index, value);
          }, reject);
        } else {
          resolveAllPromise(index, item);
        }
      });

      function resolveAllPromise(index, value) {
        result[index] = value;
        completedNum++;
        if (total === completedNum) {
          resolve(result);
        }
      }
    });
  };

  MyPromise.allSetteld = function (promises) {
    return new MyPromise((resolve) => {
      const result = [];
      let completedNum = 0;
      const total = promises.length;

      promises.forEach((item, index) => {
        if (item instanceof MyPromise) {
          item.then(
            (value) => {
              result[index] = {
                status: "resolved",
                value,
              };
              resolveAllPromise();
            },
            (reason) => {
              result[index] = {
                status: "rejected",
                reason,
              };
              resolveAllPromise();
            }
          );
        } else {
          result[index] = {
            status: "resolved",
            value: item,
          };
          resolveAllPromise();
        }
      });

      function resolveAllPromise() {
        completedNum++;
        if (completedNum === total) {
          resolve(result);
        }
      }
    });
  };

  w.MyPromise = MyPromise;
})(window);

// function Person(name) {
//   // this就是实例对象
//   this.name = name;
// }

// const p = new Person('jack');
