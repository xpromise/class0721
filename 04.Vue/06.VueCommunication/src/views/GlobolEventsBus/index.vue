<template>
  <div>
    <Child :count="count" />
  </div>
</template>

<script>
import Child from "./child";
/*
  全局事件总线：
    1. 使用场景：任意组件
    2. 原理：
      基于自定义事件
      将能定义事件对象（Vue的实例）绑定在Vue的原型对象上
      在main.js的new Vue beforeCreate生命周期绑定
        在这里绑定所有组件都可以使用
      这样所有组件实例对象都能通过原型方式继承到事件对象，从而去绑定或触发事件
*/

export default {
  name: "GlobolEventsBus",
  data() {
    return {
      count: 0,
    };
  },
  components: {
    Child,
  },
  mounted() {
    this.$bus.$on("update", () => {
      this.count += 1;
    });
  },
};
</script>
