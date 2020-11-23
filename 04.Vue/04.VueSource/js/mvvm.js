// @ts-nocheck
// MVVM相当于Vue
// options 配置对象 { el: '#app', data: { msg: 'xxx' } }
function MVVM(options) {
  // 将options添加到this
  this.$options = options;
  // 定义data变量值为原属性数据data的值
  // this._data值为原属性数据data的值
  var data = (this._data = this.$options.data);
  // 缓存this --> 为了将来可以在其他函数中使用实例对象
  var me = this;

  // 数据代理最终结果：可以通过this直接访问（读、写）data中的数据

  // 1. Object.keys(data) 提取对象所有属性名成为数组
  // 2. 对数组进行遍历，提取每一个属性名，对属性名进行数据代理
  Object.keys(data).forEach(function (key) {
    // 数据代理的方法
    me._proxy(key);
  });

  observe(data, this);

  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  /**
   * 数据代理的方法
   * @param {String} key data中属性名
   */
  _proxy: function (key) {
    // 缓存thiss
    var me = this;
    // 通过Object.defineProperty方法给this添加新属性
    // 设置属性的元属性（定义属性的读取和设置的方法）
    // 读取时实际上读取的原属性data数据的值
    // 设置时实际上 设置的原属性data数据的值
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        // me._data --> 就是原属性数据
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });
  },
};
