function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    // 提取所有data属性进行遍历
    Object.keys(data).forEach(function (key) {
      // me.convert(key, data[key]);
      // 提取所有属性名，定义成响应式数据
      me.defineReactive(this.data, key, data[key]);
    });
  },
  // convert: function(key, val) {
  //     this.defineReactive(this.data, key, val);
  // },

  /**
   * 定义响应式数据的方法
   * @param {*} data 要处理的数据
   * @param {*} key 某一个属性名
   * @param {*} val 某一个属性值
   */
  defineReactive: function (data, key, val) {
    // 每一个响应式数据都会有一个自己的dep
    var dep = new Dep();
    // 递归调用observe
    // 目的：为了将data中所有属性数据都变成响应式数据
    // 例如: person.name --> person要变成响应式，name也要变成响应式
    var childObj = observe(val);

    // 重新定义data中的属性，将其定义成响应式
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        // 返回之前的值
        return val;
      },
      set: function (newVal) {
        // 优化：如果值相等，就不更新了
        if (newVal === val) {
          return;
        }
        // 将旧值改成新值（数据会发生变化）
        val = newVal;
        // 新设置的值，默认不是响应式数据
        // 所以将新值变成响应式数据
        childObj = observe(newVal);
        // 通知订阅者（通过watcher去更新相应的用户界面，从而页面发生变化）
        dep.notify();
      },
    });
  },
};

function observe(value, vm) {
  // 判断value是否是普通对象或数组类型
  if (!value || typeof value !== "object") {
    return;
  }

  // 如果是普通对象或数组就会开始定义响应式
  return new Observer(value);
}

var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  },
};

Dep.target = null;
