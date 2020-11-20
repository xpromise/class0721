<template>
  <div>
    <h3>BBBBB</h3>
    <button @click="add">add</button>
  </div>
</template>

<script>
export default {
  name: "B",
  methods: {
    add() {
      this.$bus.$emit("add");
    },
  },
};
</script>

<style>
</style>
