<template>
  <div id="app">
    <h1>app...</h1>
    <Child v-if="isChildShow" />
    <p v-else>子组件出错了~</p>
  </div>
</template>

<script>
import Child from "./Child";

export default {
  name: "App",
  data() {
    return {
      isChildShow: true,
    };
  },
  components: {
    Child,
  },
  errorCaptured(err) {
    console.log(err);
    this.isChildShow = false;
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
