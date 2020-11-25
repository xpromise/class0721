<template>
  <div>
    <p>parent...</p>
    <Child />
  </div>
</template>

<script>
import Child from "./Child";

export default {
  name: "Parent",
  components: {
    Child,
  },
  inject: ["name"],
};
</script>

<style>
</style>