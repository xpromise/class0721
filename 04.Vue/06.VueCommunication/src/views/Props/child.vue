<template>
  <div>
    <p>子组件count: {{ count }}</p>
    <button @click="add">update</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  // 不声明props接受属性，属性就在$attrs
  // props: ["count"],
  // props: {
  //   count: Number,
  // },
  // props数据是只读不能修改
  // props: {
  //   count: {
  //     type: Number,
  //     required: true,
  //     validator(value) {
  //       return value >= 0 && value <= 10;
  //     },
  //     // default: 0
  //   },
  //   add: {
  //     type: Function,
  //     required: true,
  //   },
  // },
  // inheritAttrs: false,
};
</script>
