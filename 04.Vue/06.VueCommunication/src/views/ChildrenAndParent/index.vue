<template>
  <div>
    <A />
    <p>123</p>
    <B />
  </div>
</template>

<script>
import A from "./A";
import B from "./B";

export default {
  name: "ChildrenAndParent",
  data() {
    return {
      title: 'Father'
    }
  },
  components: {
    A,
    B,
  },
  mounted() {
    console.log(this.$children[0].title);
  },
};
</script>

<style>
</style>
