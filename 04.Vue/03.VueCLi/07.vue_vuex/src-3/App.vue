<template>
  <div>
    <p>
      clicked: {{ count }} times, count is
      {{ oddOrEven }}
    </p>
    <select v-model="num">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="DECREMENT(num)">-</button>
    <button @click="incrementIfOdd(num)">incrementIfOdd</button>
    <button @click="incrementAsync(num)">incrementAsync</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
/*
  mapState 映射vuex状态数据到组件data数据中
  mapGetters 映射vuex getters数据到组件computed数据中
  mapActions 映射vuex actions函数到组件methods中
  mapMutations 映射vuex mutations函数到组件methods中
*/

export default {
  name: "App",
  data() {
    return {
      num: 1,
    };
  },
  computed: {
    /*
      mapState(["count"])的返回值是一个对象

      {
        count() {
          return this.$store.state.count
        }
      }
    */
    ...mapState(["count"]),
    ...mapGetters(["oddOrEven"]),
  },
  methods: {
    ...mapActions(["incrementIfOdd", "incrementAsync"]),
    ...mapMutations(["INCREMENT", "DECREMENT"]),

    increment() {
      // 调用的就是mutation函数
      this.INCREMENT(this.num);
    },
  },
};
</script>

<style>
</style>