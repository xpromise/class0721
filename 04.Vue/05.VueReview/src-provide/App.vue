<template>
  <div id="app">
    <h1>app...</h1>
    <Parent />
  </div>
</template>

<script>
import Parent from "./Parent";

export default {
  name: "App",
  provide: {
    // 放置需要传递给后代组件的数据
    // 适用于祖孙组件通信（组件必须有嵌套关系）
    name: "培华",
    
  },
  components: {
    Parent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
