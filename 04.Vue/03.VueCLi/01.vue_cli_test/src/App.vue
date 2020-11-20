<template>
  <div>
    <h1>App</h1>

    <!--
      组件写成双标签，里面放入标签数据，那么这个标签数据就会以插槽的方式传递给子组件

      默认插槽
    -->
    <AChild>
      <p>hello atguigu00</p>
      <p>hello atguigu11</p>
      <p>hello atguigu22</p>
    </AChild>

    <!-- 具名、命名插槽: 给每一个插槽取一个名字 -->
    <BChild>
      <!-- 旧语法：slot="名称" -->
      <template slot="header">
        <header>头部...{{ title }}</header>
      </template>

      <!-- 新语法：v-slot:名称 -->
      <template v-slot:main>
        <main>内容区...</main>
      </template>

      <!-- 新语法可以简写：#名称 -->
      <template #footer>
        <footer>底部...</footer>
      </template>
    </BChild>

    <!-- 作用域插槽 -->
    <CChild>
      <!-- 父组件插槽可以接受子组件通过slot传递的props数据 -->
      <!-- <template #list="slotProps"> -->
      <!-- <template v-slot:list="slotProps"> -->

      <!-- { person } -> 就是对数据进行解构赋值 -->
      <!-- <template #list="{ person }"> -->

      <template #list="{ person: { name, age } }">
        <ul>
          <li>姓名：{{ name }}</li>
          <li>年龄：{{ age }}</li>
        </ul>
      </template>
    </CChild>
  </div>
</template>

<script>
import AChild from "./AChild";
import BChild from "./BChild";
import CChild from "./CChild";

export default {
  name: "App",
  data() {
    return {
      title: "hello atguigu",
    };
  },
  components: {
    AChild,
    BChild,
    CChild,
  },
};
</script>

<style>
</style>
