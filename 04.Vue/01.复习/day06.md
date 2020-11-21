## day06

## 组件间通信：

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

5. 插槽

- 使用场景：父给子传递带数据的标签

- 默认插槽

```js
// 父组件给子组件传递带数据的标签
<Child>
  <p>{{ title }}</p>
</Child>
// 子组件使用
<slot></slot>
```

- 具名、命名插槽

```vue
// 父组件给子组件传递带数据的标签
<Child>
  <template slot="header">
    <header>{{ title }}</header>
  </template>

  <template v-slot:main>
    <main>{{ title }}</main>
  </template>

  <template #footer>
    <footer>{{ title }}</footer>
  </template>
</Child>

// 子组件使用
<slot name="header"></slot>
<slot name="footer"></slot>
```

- 作用域插槽

```vue
// 父组件接受子组件传递的数据
<Child>
  <template #header="{ name }">
    <header>{{ name }}</header>
  </template>
</Child>

// 子组件给父组件传递数据
<slot name="header" :name="name"></slot>
```

6. vuex

## 跨域

1. 什么是跨域？
   违背了同源策略

2. 什么是同源策略
   协议名、域名（ip 地址）、端口号三者必须完全一致

3. 什么请求会有跨域问题？
   只有位于客户端的 ajax 请求才可能出现跨域问题，
   其他普通的 http 请求是不存在跨域问题的（script、服务器和服务器之间。。。）

4. 解决跨域方式：

- jsonp

  - 原理：利用 script 标签天然可以跨域的特性进行跨域
  - 步骤：
    - 创建 script 标签
    - 创建全局回调函数
    - 设置 script 的 src 属性，往往会添加一个 callback 请求参数
    - 将 script 标签添加到 body 中生效

- cors

  - 原理：http 协议规定，指定响应头可以资源进行跨域访问
  - access-control-allow-origin 允许那些地址可以跨域
  - access-control-allow-headers 允许哪些请求头可以跨域
  - access-control-allow-methods 允许哪些请求方式可以跨域
  - access-control-max-age 预检请求缓存多久
    - 发送请求的时候，会先发送一个 options 请求，这个请求就叫预检请求
    - 默认请求下，每个请求之前会发，max-age 可以缓存预检请求结果，在缓存期间内，预检就不会再发了

- 服务器代理模式（proxy）
  - 原理：
    - 正常情况下，客户端直接访问目标服务器，会存在跨域问题
    - 在客户端和目标服务器，设置一个代理服务器。
    - 客户端先将请求发送给代理服务器，客户端和代理服务器之间没有跨域问题
      - 客户端和代理服务器运行的是同一个服务器
      - 代理服务器设置类似于 cors 方法解决了跨域
    - 代理服务器接收到请求就会将请求转发到目标服务器上，服务器和服务器之间不存在跨域问题，所以请求 ok
    - 目标服务器将响应返回给代理服务器，代理服务器再讲响应返回给客户端
  - 正向代理
    - 代理客户端，替客户端去转发请求（隐藏真正客户端）
    - 例子：开发中 proxy，翻墙工具
    - 配置：
      - React 脚手架项目中：在 package.json 中配置 proxy
      - Vue 脚手架项目中：在项目根目录创建一个配置文件 vue.config.js，在其中
        ```js
        module.exports = {
          devServer: {
            proxy: {
              "/api": {
                target: "http://localhost:3000",
                pathRewrite: { "^/api": "" },
              },
            },
          },
        };
        ```
  - 反向代理
    - 代理服务器，替服务器先接受请求，然后再将请求分配给某个服务器（隐藏真正的服务器）
    - 例子：nginx

## elementUI

- 按需加载配置：按需加载组件样式
- vue add element 给 vue 脚手架添加 element 的配置
- 将来需要修改的地方：plugins/element.js
  - 用什么组件，需要手动引入且注册
