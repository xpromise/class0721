<template>
  <div id="app">
    <h1>app...</h1>
    <Child name="jack" age="18" @click="111" @add="222"/>
  </div>
</template>

<script>
import Child from "./Child";

export default {
  name: "App",
  components: {
    Child,
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
