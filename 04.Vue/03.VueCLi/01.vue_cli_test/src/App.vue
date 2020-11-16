<template>
  <!-- 模板页面：写页面的 -->
  <div class="app">
    <h1>hello vue cli</h1>
    <p class="app-text">{{ num }}</p>
    <button @click="add">add</button>
  </div>
</template>

<script>
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
