<template>
  <div>
    <h2>Child...</h2>
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: "Child",
  inject: ["name"], // 声明接受父组件传递的数据
};
</script>

<style>
</style>