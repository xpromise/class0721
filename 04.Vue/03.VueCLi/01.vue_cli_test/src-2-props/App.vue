<template>
  <div>
    <h1>app</h1>
    <p>{{ num }}</p>
    <Child :add="add" age="18" />
  </div>
</template>

<script>
import Child from "./Child";

export default {
  name: "App",
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    add() {
      this.num += 1;
    },
  },
  components: {
    Child,
  },
};
</script>

<style>
</style>
