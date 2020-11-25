<template>
  <div>
    <h2>Child...</h2>
  </div>
</template>

<script>
export default {
  name: "Child",
  // props: ["name"],
  mounted() {
    // 没有声明接受的props属性
    // 1. 子组件通过 this.$attrs 获取
    // 2. 同时这个属性会显示在子组件标签上
    // console.log(this.$attrs);
    console.log(this.$listeners);
  },
  inheritAttrs: false, // 不在标签上显示 attrs 的属性
};
</script>

<style>
</style>