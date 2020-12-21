<template>
  <div>
    <!-- <Child
      :name="person.name"
      :age="person.age"
      :sex="person.sex"
      :hobby="person.hobby"
    /> -->
    <!-- <Child v-bind:person="person" /> -->
    <Child
      v-bind="person"
      class="box"
      @click="handleClick"
      @aaa="handleClick"
      @bbb="handleClick"
    />
  </div>
</template>

<script>
import Child from "./child";

export default {
  name: "AttrsAndListeners",
  data() {
    return {
      person: {
        name: "jack",
        age: 18,
        sex: "男",
        hobby: ["rose", "smoke", "drunk"],
      },
    };
  },
  methods: {
    handleClick() {},
  },
  components: {
    Child,
  },
};
</script>
