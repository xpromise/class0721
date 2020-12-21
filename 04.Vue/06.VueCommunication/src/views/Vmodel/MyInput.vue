<template>
  <!-- <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  /> -->

  <input
    type="text"
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
/*
  应用场景：表单项
*/
export default {
  name: "MyInput",
  // props: ["value"],
  mounted() {
    console.log(this);
  },
};
</script>

<style>
</style>
