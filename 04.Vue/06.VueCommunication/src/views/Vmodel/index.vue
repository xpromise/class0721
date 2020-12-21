<template>
  <div>
    <!-- 给组件绑定了一个value属性，和input事件 -->
    <MyInput v-model="msg" />
  </div>
</template>

<script>
import MyInput from "./MyInput";

export default {
  name: "Vmodel",
  data() {
    return {
      msg: "123",
    };
  },
  components: {
    MyInput,
  },
};
</script>

<style>
</style>
