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

    // 将promise对象状态改成成功状态resolved
    function resolve() {
      // 让promise对象状态只能修改一次
      if (that._status !== "pending") return;
      that._status = "resolved";
    }

    // 将promise对象状态改成失败状态rejected
    function reject() {
      // 让promise对象状态只能修改一次
      if (that._status !== "pending") return;
      that._status = "rejected";
    }

    // 同步调用
    executor(resolve, reject);
  }

  w.MyPromise = MyPromise;
})(window);

// function Person(name) {
//   // this就是实例对象
//   this.name = name;
// }

// const p = new Person('jack');
