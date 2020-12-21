<template>
  <div>
    <p>{{ count }}</p>
    <button @click="$emit('update:count', count + 1)">update</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  props: ["count"],
};
</script>

<style>
</style>
