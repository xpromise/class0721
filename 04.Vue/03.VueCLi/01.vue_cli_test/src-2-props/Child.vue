<template>
  <button @click="handleClick">按钮</button>
</template>

<script>
export default {
  name: "Child",
  props: ["add"],
  methods: {
    handleClick() {
      /*
        当使用props传数据的时候，如果组件声明接受了，就可以直接通过this使用
        如果组件没有声明接受，属性会在this.$attrs上，可以通过$attrs访问
      */
      // console.log(this.$attrs.age);
      this.add();
    },
  },
};
</script>

<style>
</style>
