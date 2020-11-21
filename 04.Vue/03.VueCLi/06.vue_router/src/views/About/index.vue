<template>
  <p>about</p>
</template>

<script>
export default {
  name: "About",
  props: ["title"],
  mounted() {
    console.log("about mounted");
  },
  beforeDestroy() {
    console.log("about beforeDestroy");
  },
  activated() {
    console.log("about activated");
  },
  deactivated() {
    console.log("about deactivated");
  },
};
</script>

<style>
</style>