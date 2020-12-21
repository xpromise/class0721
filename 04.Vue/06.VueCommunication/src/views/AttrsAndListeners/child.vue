<template>
  <div>
    child~~

    <c v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import C from "./c";

export default {
  name: "Child",
  components: {
    C,
  },
};
</script>

<style>
</style>
