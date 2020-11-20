<template>
  <div>
    <!-- 以标签属性（props）方式传递person数据 -->
    <slot name="list" :person="person"></slot>
  </div>
</template>

<script>
export default {
  name: "CChild",
  data() {
    return {
      person: {
        name: "jack",
        age: 18,
      },
    };
  },
};
</script>

<style>
</style>
