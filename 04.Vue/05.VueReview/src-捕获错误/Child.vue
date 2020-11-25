<template>
  <div>
    <h2>Child...</h2>
    <p>{{ count }}</p>
    <button @click="handleClick">按钮</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  data() {
    return {
      count: 0,
    };
  },
  mounted() {
    throw new Error("Child 111出错了");
  },
  methods: {
    handleClick() {
      this.count++;
      throw new Error("Child 222出错了");
    },
  },
};
</script>

<style>
</style>