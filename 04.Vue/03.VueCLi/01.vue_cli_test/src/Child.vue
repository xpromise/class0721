<template>
  <div>
    <button @click="handleClick">按钮</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  methods: {
    handleClick() {
      /*
        this._events 存储事件的容器

        获取到自定义事件回调函数
          this.$listeners.eventName
      */
      // this.$listeners.add();

      // 触发自定义事件
      this.$emit("add", 1, 2, 3, 4);
    },
  },
};
</script>

<style>
</style>
