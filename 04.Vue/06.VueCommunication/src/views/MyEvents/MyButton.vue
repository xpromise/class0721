<template>
  <div>
    <!-- <button @click="$emit('click', $event)">按钮1</button> -->
    <!-- <button @click="$emit('xxx', 123, 456)">按钮2</button> -->
    <!-- <button @click="$listeners.xxx(123, 456)">按钮2</button> -->
    <button>按钮</button>
  </div>
</template>

<script>
export default {
  name: "MyButton",
  mounted() {
    console.log(this);
  },
};
</script>
