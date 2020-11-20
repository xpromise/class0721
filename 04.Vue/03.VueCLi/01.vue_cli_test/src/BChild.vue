<template>
  <div>
    <!-- 显示头部 -->
    <!-- 通过name属性来决定使用哪个具名插槽 -->
    <slot name="header"></slot>
    <p>---------</p>
    <!-- 显示内容区 -->
    <slot name="main"></slot>

    <p>---------</p>
    <!-- 显示底部 -->
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "BChild",
};
</script>

<style>
</style>
