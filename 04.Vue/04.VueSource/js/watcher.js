/**
 * 响应式
 * @param {*} vm
 * @param {*} exp 表达式
 * @param {*} cb 回调函数（内部保存updatorFn方法，可以用来更新DOM元素）
 */
function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  // 用来存储dep的容器
  this.depIds = {};
  // 表达式的值
  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.get();
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },

  // 把dep添加到watcher保管
  addDep: function (dep) {
    // 1. 每次调用run()的时候会触发相应属性的getter
    // getter里面会触发dep.depend()，继而触发这里的addDep
    // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
    // 则不需要将当前watcher添加到该属性的dep里
    // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
    // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
    // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
    // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
    // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
    // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
    // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
    // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
    // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
    // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher

    /*
       1. 为什么dep中要保存watcher
          响应式数据都有自己的dep，
          更新用户界面的方法在watcher.cb --> updaterFn 用来更新用户界面

          要达到响应式，更新数据的数据，数据要变化，同时用户界面也要发生变化
            响应式数据 --> dep --> watcher --> wacher.cb更新用户界面

          dep保存了watcher，将来才能找到watcher，从而去更新用户界面  

       2. 为什么watcher中要保存dep
          目的：为了防止dep重复保存相同的watcher

          为什么能做到：因为每次dep和watcher都是互相保存的，
            只要watcher中存在当前dep，也就意味着dep也保存了watcher
            只需要判断watcher有无当前dep就能知道dep有无当前watcher
            从而不要重复保存

       3. dep保存watcher的容器为什么设计成数组（subs）
          为了方便遍历使用

       4. watcher保存dep的容器为什么设计成对象（depIds）
          对象查找数据比数组更快

       5. 响应式是如何建立的？
          new Watcher --> this.get() --> this.getVMVal() --> 读取data中的数据 
            --> 触发数据劫持的get --> dep.depend() --> watcher.addDep(dep)
              --> watcher中保存dep dep中保存watcher
          
          将来更新数据的时候，触发数据代理set，触发数据劫持set，更新数据，同时调用
          dep.notify方法，通知保存的所有的watcher去更新用户界面

       <div id="app">
        // 除了事件指令以外的其他指令语法和插值语法都会产生自己watcher
        <p v-text="msg"></p> // watcher0
        <p v-html="msg"></p> // watcher1
        <p>{{person.name}}</p> // watcher2 --> dep2 dep3
        <p>{{count}}</p> // watcher3
        <p>hello mvvm</p> 
        <button v-on:click="handleClick">按钮</button>
       </div>  

       {
         el: '#app'
         data: {
           // 所有响应式数据都会产生dep
           // 一共会产生四个dep
           msg: 'hello', // dep0 --> watcher0 watcher1
           count: 0, // dep1 --> watcher3
           person: { // dep2 --> watcher2
             name: 'jack' // dep3 --> watcher2
           }
         },
         methods: { handleClick() { this.count++; } }
       }
    */

    // this指向Watcher的实例
    // 判断this.depIds(存储dep的容器)是否有直接属性dep.id
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 让dep保存当前watcher
      dep.addSub(this);
      // 让当前watcher保存传入的dep
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    Dep.target = this; // this是当前Watcher的实例
    var value = this.getVMVal(); // 从vm上获取exp的值
    Dep.target = null;
    return value;
  },

  // 从vm上获取exp的值
  getVMVal: function () {
    // this.exp 表达式 --> person.name
    // ['person', 'name']
    var exp = this.exp.split(".");
    // 取出原数据（经过了数据劫持了）
    var val = this.vm._data;
    exp.forEach(function (k) {
      // 此处会真正建立起响应式的入口
      // 第一次 data['person'] --> 触发person数据的get方法
      // 第二次 person.name --> 触发name数据的get方法
      val = val[k];
    });
    return val;
  },
};
