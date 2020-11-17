<template>
  <div>
    <h2>Father组件...</h2>
    <p></p>
    <Child />
  </div>
</template>

<script>
export default {
  name: "Father", // 组件名称
  // 声明接受props数据的类型
  // 一定要声明接受数据，否则数据不能通过this直接访问
  // props: ["num"], // 代表要接受的数据是num
  // props: {
  //   num: Number // 代表要接受的数据是num且类型是number
  // },
  props: {
    num: {
      // 代表要接受的数据是num、类型是number、必须传
      type: Number,
      required: true
    }
  },
  // data: {
  //   aaa: 123
  // },
  data() {
    return {};
  },
  mounted() {
    console.log(this.num);
  }
};
</script>

<style></style>
