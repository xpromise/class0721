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

    // debugger;

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
      that._callbacks.onResolved = function () {
        // result函数返回值
        const result = onResolved();
        // 判断返回值是否是promise对象
        if (result instanceof MyPromise) {
          // 返回值是一个promise对象
          // result.then(() => { resolve() }, () => { reject() })
          result.then(resolve, reject);
        } else {
          // 返回值不是promise对象 - 返回成功状态
          resolve();
        }
      };
      that._callbacks.onRejected = onRejected;
    });
  };

  w.MyPromise = MyPromise;
})(window);

// function Person(name) {
//   // this就是实例对象
//   this.name = name;
// }

// const p = new Person('jack');
