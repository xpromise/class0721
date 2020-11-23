<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader />
      <TodoList />
      <TodoFooter />
    </div>
  </div>
</template>
<script>
import TodoHeader from "./views/TodoHeader";
import TodoList from "./views/TodoList";
import TodoFooter from "./views/TodoFooter";

export default {
  name: "App",
  components: {
    TodoHeader,
    TodoList,
    TodoFooter,
  },
};
</script>
<style>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>