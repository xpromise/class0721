<template>
  <div>
    <p>
      clicked: {{ $store.state.count }} times, count is
      {{ $store.getters.oddOrEven }}
    </p>
    <select v-model="num">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>

<script>
/*
  组件操作vuex：
    1. 读
      this.$store.state.xxx
    2. 写
      this.$store.dispatch(触发的action函数名称, 传递给action的数据);
*/
export default {
  name: "App",
  data() {
    return {
      num: 1,
    };
  },
  mounted() {
    console.log(this.$store);
  },
  methods: {
    increment() {
      // 更新vuex数据 --> dispatch
      // this.$store.dispatch("increment", this.num);

      // 因为action函数啥也没做
      // 直接调用mutation函数
      this.$store.commit("INCREMENT", this.num);
    },
    decrement() {
      // this.$store.dispatch("decrement", this.num);
      // 直接调用mutation函数
      this.$store.commit("DECREMENT", this.num);
    },
    incrementIfOdd() {
      this.$store.dispatch("incrementIfOdd", this.num);
    },
    incrementAsync() {
      this.$store.dispatch("incrementAsync", this.num);
    },
  },
};
</script>

<style>
</style>