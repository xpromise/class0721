<template>
  <div>
    <h3>AChild...</h3>

    <!-- 使用父组件以插槽方式传递的标签数据 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AChild",
};
</script>

<style>
</style>
