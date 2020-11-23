<template>
  <ul class="todo-main">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import TodoItem from "../TodoItem";

export default {
  name: "TodoList",
  computed: {
    ...mapState(["todos"]),
  },
  components: {
    TodoItem,
  },
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>