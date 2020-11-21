<template>
  <ul>
    <li>id: {{ message.id }}</li>
    <li>name: {{ message.name }}</li>
    <li>content: {{ message.content }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      messages: [
        { id: 1, name: "name111", content: "content111" },
        { id: 2, name: "name222", content: "content222" },
        { id: 3, name: "name333", content: "content333" },
      ],
      message: {},
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        const id = +newVal.params.id;
        this.message = this.messages.find((message) => message.id === id);
      },
      // 正常情况下，watch只有值发生变化的时候才会调用
      // 一上来会调用一次
      immediate: true,
    },
  },
};
</script>

<style>
</style>