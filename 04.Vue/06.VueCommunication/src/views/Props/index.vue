<template>
  <div>
    <h2><router-link to="/">回到首页</router-link></h2>
    <p>count: {{ count }}</p>
    <Child :count="count" :add="add" />
  </div>
</template>

<script>
import Child from "./child";

export default {
  name: "Props",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    add() {
      this.count += 1;
    },
  },
  components: {
    Child,
  },
};
</script>
