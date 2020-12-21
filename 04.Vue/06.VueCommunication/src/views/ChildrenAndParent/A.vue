<template>
  <div>aaa</div>
</template>

<script>
export default {
  name: "A",
  data() {
    return {
      title: "AAA",
    };
  },
  mounted() {
    console.log(this.$parent.title);
  },
};
</script>