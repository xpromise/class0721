# day07

## vue-router

1. 前端路由

- 用来开发 SPA（单页面应用）

2. 单页面应用

- 整个应用只有一个完整页面，页面变化都是在这一个页面更新的
- 点击链接不会刷新整个页面，会局部更新，也会更新浏览历史（地址）
- 点击链接也不会发送请求，自己写 ajax 代码发送请求

3. 简述前端路由的原理

- 点击链接不会刷新整个页面 --> 给 a 标签绑定点击事件，阻止其默认行为
- 会更新浏览历史（地址） --> 调用 history.push(path)，就可以更新了
- 会局部更新 --> 内部会监听浏览历史的变化（history.listen(listener)），一旦发生变化就会遍历路由的所有配置，看当前路径（浏览地址）是否匹配上路由路径（path），匹配上就加载 component

4. vue-router 提供组件

- `<router-link>` 用来路由链接导航
- `<router-view>` 用来显示当前路由组件

5. 路由传参方式

- params
  - 路由配置
    ```js
    path: "/xxx/:xxx";
    ```
  - 路由链接
    ```js
    <router-link to="/xxx/123">xxx</router-link>
    ```
  - 子组件接受 params 参数
    ```js
    this.$route.params.xxx;
    ```
- query
  - 路由链接
    ```js
    <router-link to="/xxx?key=value">xxx</router-link>
    ```
  - 子组件接受 query 参数
    ```js
    this.$route.query.key;
    ```
- props
  - 作用：将 params 参数或 query 参数以 props 形式传递子组件
  - 路由配置
  ```js
    props(route) {
      return {
        ...route.params,
        ...route.query
      }
    }
  ```
  - 子组件声明接受 props
  ```js
  props: ["xxx"];
  ```
  - 子组件使用
  ```js
  this.xxx;
  ```
- 命名路由
  - 作用：写路由路径可以简写（写的更方便）
  - 路由的配置
  ```js
  name: "xxx";
  ```
  - 路由链接
  ```js
  <router-link :to="{ name: 'xxx', params: { yyy }, query: { zzz } }">xxx</router-link>
  ```
- 路由公共参数
  - 作用：统一给同级路由传递公共参数
  - 配置
  ```js
  <router-view :key="value">xxx</router-view>
  ```
  - 子组件声明接受 props
  ```js
  props: ["key"];
  ```
  - 子组件使用
  ```js
  this.key;
  ```

6. 跳转路由链接的方式

- 路由链接导航 router-link
- 编程式导航 this.$router.push/replace/back/forward/go()
- 用法区别：

  - 如果只需要跳转链接，用路由链接导航
  - 如果需要先做一些其他事（发送请求等），再跳转链接，用编程式导航

- 问题：如果编程式导航要参数怎么办?
  - this.$router.push('/home?name=jack&age=18')

7. 缓存路由组件

- `<keep-alive>包裹要缓存的n个组件</keep-alive>` 用来缓存组件

  - include="A,B"
  - exclude="A"
  - :max="10"

- 被 keep-alive 缓存的组件会多两个生命周期函数
  - activated 激活时触发
  - deactivated 离开时（未激活）触发

## vuex

- 作用：用来集中式管理多个组件共享的状态数据

- 包含的内容

  - state
    - 所有状态数据
    - 一般要对数据进行初始化
  - actions
    - 包含 n 个间接更新的函数对象
    - 一般需要发送请求
  - mutations
    - 包含 n 个直接更新的函数对象
    - 一般直接对 state 数据进行修改（不应该在做其他额外操作了，比如发送请求）

- vuex 工作流程
  - 读取
    - 组件直接调用 this.$store.state.xxx
  - 更新
    - 组件调用 this.$store.dispatch('action 函数名称', 数据)
    - 触发某个 actions 函数，actions 函数中发送请求，请求成功调用 commit('mutation 函数名称', 数据)
    - 触发某个 mutations 函数，mutations 函数就会对 state 数据进行直接修改
    - 数据一旦更新，因为响应式的原因，所以用户界面也会发生变化
