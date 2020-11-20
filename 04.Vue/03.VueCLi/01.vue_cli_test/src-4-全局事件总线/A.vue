<template>
  <div>
    <h3>AAAAA</h3>
    <p>{{ num }}</p>
  </div>
</template>

<script>
export default {
  name: "A",
  data() {
    return {
      num: 0,
    };
  },
  mounted() {
    this.$bus.$on("add", () => {
      this.num += 1;
    });
  },
};
</script>

<style>
</style>
