# day08

## vuex

- 作用：用来集中式管理多个组件共享的状态数据

- 包含的内容

  - state
    - 所有状态数据
    - 一般要对数据进行初始化
  - getters
    - 所有只读计算属性
    - 一定会依赖于某个状态数据
  - actions
    - 包含 n 个间接更新的函数对象
    - 一般需要发送请求
  - mutations
    - 包含 n 个直接更新的函数对象
    - 一般直接对 state 数据进行修改（不应该在做其他额外操作了，比如发送请求）
  - mutation-types
    - mutation 函数的类型常量模块

- vuex 工作流程

  - 读取
    - 组件直接调用 this.$store.state.xxx
      - mapState(['count'])
    - 组件直接调用 this.$store.getters.xxx
      - mapGetters(['oddOrEven'])
  - 更新

    - 组件调用 this.$store.dispatch('action 函数名称', 数据)
      - mapActions(['increment'])
    - 触发某个 actions 函数，actions 函数中发送请求，请求成功调用 commit('mutation 函数名称', 数据)
    - 触发某个 mutations 函数，mutations 函数就会对 state 数据进行直接修改
    - 数据一旦更新，因为响应式的原因，所以用户界面也会发生变化

    - 组件调用 this.$store.commit('mutation 函数名称', 数据)
      - mapMutations(['INCREMENT'])
    - 触发某个 mutations 函数，mutations 函数就会对 state 数据进行直接修改
    - 数据一旦更新，因为响应式的原因，所以用户界面也会发生变化

- 思考：
  - 状态数据要不要定义在 vuex 中？
    - 看数据是否有多个组件要使用（显示、操作）
  - 要对 vuex 的数据进行操作，要不要 actions？
    - 要数据需不需要进一步处理（操作：发送请求...）
  - mutation 函数要定义多少个？
    - 看要对数据进行几种类型的操作

## vue 原理 - 数据代理

- 数据代理：将 data 数据代理 this 上，可以通过 this 直接访问

- 原理：

1. 将 `data` 数据赋值给 `data` 变量和 `this._data` 属性
2. 通过 `Object.keys` 方法变量 `data` 中所有属性，提取到所有属性名成为数组
3. 遍历属性名数组，取出属性名，对属性名调用数据代理 `_proxy` 方法
4. 数据代理方法：通过 `Object.defineProperty` 给 `this` 添加属性名，值定义了 `get` 和 `set` 方法
5. `get` 和 `set` 方法中都是对 `this._data`, 也就是原数据进行读写操作
6. 所以将来就可以直接通过 `this` 访问到 `data` 中的数据，操作 `this` 上的数据，实际操作还是原 `data` 数据
