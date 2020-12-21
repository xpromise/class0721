<template>
  <div>
    <h2><router-link to="/">回到首页</router-link></h2>
    <button @click="handleClick">按钮</button>
    <!-- <MyButton @click="handleClick($event)" @xxx="xxx($event)" /> -->
    <MyButton @click.native="handleClick" />
  </div>
</template>

<script>
import MyButton from "./MyButton";
/*
  事件：
      原生DOM元素绑定事件
        事件名是原生DOM事件事件名，绑定就是原生DOM事件
        事件名不是原生DOM事件事件名，绑定就是自定义事件
      组件绑定事件
        所有事件都是自定义事件

      一般只会给组件绑定自定义事件，给普通元素绑定没有意义
      绑定自定义事件目的：
        给子组件传递一个函数，子组件触发这个函数从而修改父组件数据（子-->父）

      $event 代表事件触发时传递的第一个参数

      事件修饰符
        .prevent
        .stop
        .native  给组件绑定事件时使用的，作用：给组件的第一个元素绑定事件
      按键修饰符
        @keyup.enter
        @keyup.13

      触发自定义事件方式：
        1. this.$emit('eventName', xxx)
        2. this.$listeners.eventName(xxx)

    应用场景：
      在父组件下面有两个子组件，需要切换显示，切换显示是在子组件完成的
        父组件定义切换显示的方法，通过自定义事件绑定给子组件，子组件通过触发自定义事件来切换显示
      表格修改功能时，跳转到了新页面进行修改，点击取消要回来展示另外一个组件

      <el-button @click="xxx"></el-button>

      使用某个el组件时，他没有click功能，但是我们需要
        @click.native
*/
export default {
  name: "MyEvents",
  methods: {
    handleClick(event) {
      console.log("hello", event);
    },
    xxx(a, b) {
      console.log(a, b);
    },
  },
  components: {
    MyButton,
  },
};
</script>
