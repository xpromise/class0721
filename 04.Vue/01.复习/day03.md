# day03

## 过滤器

- 用来格式化数据（时间）

- 局部过滤器

```js
// 定义过滤器
{
  filters: {
    formatDate(value, str) {
      return dayjs(value).format(str);
    }
  }
}
// 使用过滤器
{{time | formatDate('YYYY-MM-DD HH:mm:ss')}}
```

- 全局过滤器

```js
// 定义过滤器
Vue.filter('formatDate', function(value, str) {
    return dayjs(value).format(str);
  })
}
// 使用过滤器
{{time | formatDate('YYYY-MM-DD HH:mm:ss')}}
```

## 指令

- v-model
- v-bind
- v-if / v-else / v-else-if
- v-show
- v-on
- v-for

- v-text 用于显示元素 textContent、innerText
- v-html 用于显示元素 innerHTML
- v-cloak 用于防止闪现（从插值语法变成真正数据），配置 [v-cloak]{ display: none; }
- v-pre 显示最原始的内容，不会被 Vue 解析
- v-once 只被 Vue 解析一次（只渲染一次）

- 自定义局部指令

```js
{
  directives: {
    'upper-text': function (el, binding) {
      el.textContent = binding.value.toUpperCase();
    }
  }
}
```

- 自定义全局指令

```js
Vue.directive("upper-text", function (el, binding) {
  el.textContent = binding.value.toUpperCase();
});
```

## ref

- 用来获取 DOM 元素或者组件实例对象

```js
// 设置ref
<input ref="name" />;
// 获取ref的值
this.$refs.name;
```

## 插件

- 扩展 Vue 的功能

```js
// 定义插件
// 方式一
function MyPlugin(Vue) {}
// 方式二
const MyPlugin = {
  install: function (Vue) {},
};

// 使用插件
Vue.use(MyPlugin);
```

## key

- key 有什么用？

  - 能让相同层级节点更新时性能更好

- key 的值是什么？
  - 能用 id 用 id
  - 如果没有 id，只有往数组后面添加、删除，或者数据如果不变可以用 index

## 响应式

- 什么是响应式数据？

  - 更新了数据，数据会变化，同时页面也会变化

- 哪些数据是响应式数据？
  - data 中定义的数据
  - 注意：如果给 data 数据后面新添加属性，这些属性不是响应式
    - 如果想变成响应式数据，需要使用 `this.$set() / Vue.set()`

## 组件

```js
// 定义组件
const Component = Vue.extend(组件配置对象);

// 注册局部组件
{
  components: {
    Component: Component,
    Component: 组件的配置对象,
  }
}

// 注册全局组件
Vue.component(组件名称, Component);
Vue.component(组件名称, 组件的配置对象);
```

## 脚手架

- 安装包
  - npm i @vue/cli -g

- 创建脚手架
  - vue create xxx

- 启动开发环境
  - npm run serve

- 启动生产环境
  - npm run build
