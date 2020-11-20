## day05

组件间通信：

1. props

- 适用场景：父子组件

- 父传子

```js
// 父组件传递数据
<Child :name="name" />
// 子组件声明接受props
{
  props: ['name'],
  props: {name: String},
  props: {name: { type: String, required: true, default: xxx, validator() {} }},
}
// 子组件使用
this.xxx
// 如果属性没有通过props声明接受，那么可以通过$attrs来使用
this.$attrs.xxx
```

- 子传父
  - 父组件定义更新数据的方法，传给子组件
  - 子组件调用使用

2. 自定义事件

- 适用场景：子传父

```js
// 方式一：绑定事件
<Child @add="add"/>
// 方式二：绑定事件
<Child ref="child"/>

mounted() {
  this.$refs.child.$on('add', this.add);
}

// 子组件触发事件
this.$listeners.add();
this.$emit('add');
```

3. 全局事件总线

- 适用场景：任意组件

- 原理：

  - 本质上就是自定义事件
  - 给 Vue 的原型添加一个可以绑定事件的对象（Vue 的实例 vm、组件的实例 this）
  - 使用 Vue 的实例 vm 在 main.js 文件中最方便

- 使用方式有两种：

  - `Vue.prototype.$bus = new Vue()`
  - `beforeCreate() { Vue.prototype.$bus = this }`

- 所有组件实例对象都能通过原型链的方式访问到 `$bus` 这个对象，所以就能通过它绑定事件或者触发事件
  - 绑定事件(接受数据)：`this.$bus.$on(eventName, listener)`
  - 触发事件(发送数据)：`this.$bus.$emit(eventName, data)`

4. 消息发布订阅

- 使用场景：任意组件
- 发布（发送数据）：PubSub.publish(msg, data)
- 订阅（接受数据）: PubSub.subscribe(msg, listener)
