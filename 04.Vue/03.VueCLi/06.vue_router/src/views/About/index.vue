<template>
  <p>about</p>
</template>

<script>
export default {
  name: "About",
  props: ["title"],
  mounted() {
    console.log("about", this);
  },
};
</script>

<style>
</style>