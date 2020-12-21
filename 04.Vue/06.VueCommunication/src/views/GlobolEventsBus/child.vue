<template>
  <div>
    <p>{{ count }}</p>
    <button @click="$bus.$emit('update')">update</button>
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
