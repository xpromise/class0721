<template>
  <div id="app">
    app...
    <el-button type="danger" @click="open">主要按钮</el-button>

    <el-carousel trigger="click" height="150px" arrow="never">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    open() {
      this.$message("提示文字~~~~");
    },
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

.el-carousel__item h3 {
  background-color: hotpink;
  height: 100%;
}
</style>
