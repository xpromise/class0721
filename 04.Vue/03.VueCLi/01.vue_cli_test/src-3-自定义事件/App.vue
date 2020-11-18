<template>
  <div>
    <h1>app</h1>
    <p>{{ num }}</p>

    <!--
      @add="add"
        绑定自定义事件
        事件名：add
        事件回调函数：add
    -->
    <Child @add="add" />

    <!--
      ref 如果设置给普通DOM元素，那么获取到的就是这个真实DOM元素
        如果设置给组件，那么获取带的就是组件实例对象
     -->
    <!-- <Child ref="child" /> -->

    <button @click="$emit('add')">App组件的按钮</button>
    <button @click="off">解绑事件</button>
  </div>
</template>

<script>
import Child from "./Child";

export default {
  name: "App",
  data() {
    return {
      num: 0,
    };
  },
  mounted() {
    /*
      自定义事件
        作用：用来子组件向父组件通信
        注意: 给哪个组件绑定自定义事件，就只有那个组件可以触发（使用）
      
        使用：
          1. 方式一
            绑定自定义事件
              <Child @add="add" />
            触发事件
              this.$listeners.add();
              this.$emit('add')

          2. 方式二
            绑定自定义事件
              <Child ref="child" />

              mounted() {
                this.$refs.child.$on('add', this.add)
              }

            触发事件
              this.$emit('add')

      所有组件实例对象都具备以下方法：
        $on(eventName, listener)     绑定自定义事件（持久）
        $once(eventName, listener)   绑定自定义事件（一次性）
        $off(eventName, listener)    解绑事件
        $emit(eventName, data)       触发自定义事件
    */
    // console.log(this.$refs.child);

    // 绑定自定义事件
    // this.$refs.child.$once("add", this.add);

    // this.$refs.child.$on("add", this.add);
    // this.$refs.child.$on("add", this.test);
  },
  methods: {
    add(...args) {
      console.log("hello add", args);
      this.num += 1;
    },
    test() {
      console.log("hello test");
    },
    off() {
      // this.$refs.child.$off("add", this.add); // 只解绑指定的回调函数，其他不变
      this.$refs.child.$off("add"); // 解绑所有回调函数
    },
  },
  components: {
    Child,
  },
};
</script>

<style>
</style>
