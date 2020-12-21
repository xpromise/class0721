<template>
  <div>
    <!-- <Child :count="count" @update="update" /> -->
    <Child :count.sync="count" />
  </div>
</template>

<script>
import Child from "./child";

export default {
  name: "Sync",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    update(count) {
      this.count = count;
    },
  },
  components: {
    Child,
  },
};
</script>
