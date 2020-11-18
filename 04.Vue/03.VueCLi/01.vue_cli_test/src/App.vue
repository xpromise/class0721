<template>
  <div>
    <h1>App</h1>
    <A />
    <B />
  </div>
</template>

<script>
import A from "./A";
import B from "./B";

export default {
  name: "App",
  mounted() {
    console.log("App", this);
  },
  components: {
    A,
    B,
  },
};
</script>

<style>
</style>
