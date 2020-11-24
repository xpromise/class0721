// @ts-nocheck
/**
 * 编译模板的构造函数
 * @param {String | Element} el 元素选择器和元素
 * @param {Object} vm MVVM实例对象
 */
function Compile(el, vm) {
  // 将vm添加到this.$vm上：为了给其他函数使用
  this.$vm = vm;
  // 判断el是否是元素节点：是 --> 就返回这个元素  不是 --> 获取元素并返回
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if (this.$el) {
    // 解析模板的三个步骤：
    // 1. 将el元素的所有子节点添加到文档碎片节点中
    // 所有文档碎片节点的子节点就是el元素的子节点
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 编译模板 、解析模板
    this.init();
    // 3. 将解析后的文档碎片节点添加到页面中生效
    this.$el.appendChild(this.$fragment);
    // 优点：DOM操作都是在文档碎片节点中操作的（也就是说，在内存中操作的），整体性能会更好
  }
}

Compile.prototype = {
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    this.compileElement(this.$fragment);
  },

  /**
   * 编译元素
   * @param {*} el 元素
   */
  compileElement: function (el) {
    // 取出el的所有子节点
    var childNodes = el.childNodes,
      me = this;

    // 将childNodes变成真数组然后进行遍历
    [].slice.call(childNodes).forEach(function (node) {
      // node 就是每一个子节点
      // text 取出子节点的文本内容
      var text = node.textContent;
      // 定义一个用来匹配 插值语法 的正则表达式
      var reg = /\{\{(.*)\}\}/;

      // 判断子节点是否是元素节点
      if (me.isElementNode(node)) {
        me.compile(node);
        // 再判断子节点是否文本节点
        // 如果是，再判断节点的文本内容是否包含插值语法
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 解析插值语法
        // node 当前遍历子节点
        // RegExp.$1 --> 匹配(.*)里面的内容 --> 插值语法中的表达式 --> 表达式
        me.compileText(node, RegExp.$1);
      }

      // 判断元素是否有子节点
      if (node.childNodes && node.childNodes.length) {
        // 说明当前元素有子节点 --> 函数的递归调用
        // 最终目的：遍历所有子元素，对其的插值语法进行处理
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    var nodeAttrs = node.attributes,
      me = this;

    [].slice.call(nodeAttrs).forEach(function (attr) {
      var attrName = attr.name;
      if (me.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    });
  },

  // node 就是当前遍历的子元素
  // exp --> expression 表达式（插值语法中的表达式）
  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf("v-") == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf("on") === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  },
};

// 指令处理集合
var compileUtil = {
  // node 当前遍历的元素
  // vm   MVVM的实例
  // exp  表达式
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, "text");
  },

  html: function (node, vm, exp) {
    this.bind(node, vm, exp, "html");
  },

  model: function (node, vm, exp) {
    this.bind(node, vm, exp, "model");

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener("input", function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  class: function (node, vm, exp) {
    this.bind(node, vm, exp, "class");
  },

  // node 当前遍历的元素
  // vm   MVVM的实例
  // exp  表达式
  // dir --> directive 指令 --> text (插值语法会当做v-text指令去解析)
  bind: function (node, vm, exp, dir) {
    // 取出updater（专门用来更新DOM元素的）方法
    // updater.textUpdater
    var updaterFn = updater[dir + "Updater"];

    // const val = this._getVMVal(vm, exp) --> 从vm._data取出表达式的值
    // textUpdater(node, val)
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  eventHandler: function (node, vm, exp, dir) {
    var eventType = dir.split(":")[1],
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  /**
   * 获出表达式的值
   * @param {*} vm 实例
   * @param {*} exp 表达式
   */
  _getVMVal: function (vm, exp) {
    /*
        exp person.name

        第一次：
            val：所有data数据
            exp：['person', 'name']
            内部遍历：
                k: 'person'
                val[k] --> data['person'] --> { name: 'jack' }
                val = { name: 'jack' }

                k: 'name'
                val[k] --> { name: 'jack' }['name'] --> 'jack'
                val = 'jack'
            将 val 返回出去
    */
    var val = vm._data;
    exp = exp.split(".");
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm._data;
    exp = exp.split(".");
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  },
};

var updater = {
  /**
   * 更新插值语法的内容
   * @param {*} node 元素
   * @param {*} value 表达式的值
   */
  textUpdater: function (node, value) {
    // 设置元素的文本内容为表达式的值
    // 元素内容就从 插值语法 替换成了 表达式的值
    node.textContent = typeof value == "undefined" ? "" : value;
  },

  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == "undefined" ? "" : value;
  },

  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, "").replace(/\s$/, "");

    var space = className && String(value) ? " " : "";

    node.className = className + space + value;
  },

  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == "undefined" ? "" : value;
  },
};
