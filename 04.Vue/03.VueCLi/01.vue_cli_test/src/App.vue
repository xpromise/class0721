<template>
  <!-- 模板页面：写页面的 -->
  <div class="app">
    <h1>hello vue cli</h1>
    <p class="app-text">{{ num }}</p>
    <button @click="add">add</button>

    <!-- 通过标签属性的方式（props方式），给子组件传递数据 -->
    <Father :num="num" />
    <Father :num="num" />
    <Father :num="num" />
    <Father :num="num" />
  </div>
</template>

<script>
import Father from "./views/Father";

/*
  data有两种写法：1. 对象 2. 函数
    在普通页面中，两种写法都想
    但是在组件中，必须使用函数

      如果在组件中，data使用对象，复用组件时这多个组件会共享同一份data数据
      如果在组件中，data使用函数，复用组件时这多个组件会调用函数得到一份新data数据，
        每个组件的data数据都会不一样，所以不会互相影响
*/

// 写组件配置对象
export default {
  name: "App", // 组件名称
  data() {
    return {
      num: 0
    };
  },
  methods: {
    add() {
      this.num++;
    }
  },
  // 注册组件
  components: {
    Father
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}

.app {
  height: 100%;
  background-color: yellowgreen;
  .app-text {
    color: hotpink;
  }
}
</style>
