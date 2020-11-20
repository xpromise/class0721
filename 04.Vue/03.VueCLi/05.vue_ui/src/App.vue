<template>
  <div id="app">
    <el-button type="primary" @click="open">el-button</el-button>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    open() {
      this.$message("提示~~~~~");
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
