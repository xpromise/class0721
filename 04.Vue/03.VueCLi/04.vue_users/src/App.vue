<template>
  <div class="container">
    <Search />
    <List />
  </div>
</template>

<script>
import Search from "./views/Search";
import List from "./views/List";

export default {
  name: "App",
  components: {
    Search,
    List,
  },
};
</script>

<style>
</style>
