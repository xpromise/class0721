# day01

## Vue

- 渐进式 JS 框架

- MVC

  - M - Model 数据层（数据库）
  - V - View 视图层（页面、ejs）
  - C - Controler 控制层（路由）

- MVVM

  - M - Model 数据层（data、computed...）
  - V - View 视图层（模板页面）
  - VM - ViewModel 视图模型层（vm 实例对象）
  - 数据能由 ViewModel 操作渲染到视图层上（当数据将来发生修改，自动重新渲染到视图层上-响应式）
  - 页面数据发生变化，能由 ViewModel 操作来修改数据层的数据
    - 数据 M --> V 也能 V --> M, 叫做双向数据绑定

- new Vue(config)
```vue
new Vue({ el: '#app', data: {}, methods: {}, computed: {}, watch: {} })
```

## 模板语法

- 双大括号表达式（插值语法）

  - 语法：{{JS表达式}}
  - 作用：用来渲染 JS 动态数据
  - 注意：只能用于标签内，不能作为标签属性

- 指令语法
  - 语法： v-xxx:propName="JS 表达式" v-xxx="JS 表达式"
  - 作为标签属性使用
  - v-model
    - 用来双向数据绑定
    - `v-model="msg"`
  - v-bind
    - 用来单向数据绑定（强制绑定数据）
    - `v-bind:value="msg"`
    - 简写 `:value="msg"`
  - v-on
    - 用来绑定事件
    - `v-on:click="handleClick"`
    - 简写 `@click="handleClick"`

## 计算属性和监视属性

- computed 计算属性

  - 只读计算属性
    ```js
    computed: { fullName() { return xxx; } }
    ```
  - 可读可写计算属性
    ```js
    computed: { fullName: { get() {}, set(newVal) {} } }
    ```
  - 通常情况下，计算属性内部会使用 data 数据。一旦内部使用的 data 数据发生变化，计算属性就会重新计算结果。如果 data 数据没有变化，就不会重新计算，使用上一次的缓存结果（有缓存）。

- watch
  ```js
    watch: { firstName(newVal, oldVal) {  } }
  ```
  - 监视一个已存在的 data 属性，一旦 data 属性发生变化，就会调用相应的函数处理

## 样式处理

- class
  - `<p class="red">xxx</p>`
  - `<p :class="red">xxx</p>`
  - `<p :class="{red: isRed}">xxx</p>`
  - `<p :class="[red, 'green']">xxx</p>`

- style
  - `<p style="font-size: 16px;">xxx</p>`
  - `<p :style="{fontSize: '16px'}">xxx</p>`

- 如果样式是动态（可变的）用 style，如果静态写死就用 class
