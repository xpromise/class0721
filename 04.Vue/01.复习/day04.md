# day04

## props

- 用于父子组件通信（传递动态数据）

```js
// 父组件给子组件设置标签属性
<Child :key="value" />

// 子组件需要声明接受
{
  props: ['key'],
  props: {
    key: Number
  },
  props: {
    key: {
      type: Number,
      required: true, // 必传参数
      // default: 18, // 可选参数
      validator(value) {
        return value > 18 && value < 60;
      }
    }
  }
}

// 子组件使用
this.xxx
```

- 父组件给子组件数据：将数据通过 props 直接传递
- 子组件给父组件数据：父组件定义更新数据的方法，以 props 方式传递给子组件，子组件声明接受调用函数，传递数据给父组件

## render 方法

```js
import Vue from "vue"; --> vun.runtime.esm.js
vun.runtime.esm.js 只包含运行时版本（不具备编译模板能力）
通过render方法，就能具备编译模板能力

new Vue({
  render: h => h(App)
}).$mount("#app");
```
