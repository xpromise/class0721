<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo" />
      <TodoList :todos="todos" :delTodo="delTodo" />
      <TodoFooter :completedCount="completedCount" :total="total" />
    </div>
  </div>
</template>
<script>
import TodoHeader from "./views/TodoHeader";
import TodoList from "./views/TodoList";
import TodoFooter from "./views/TodoFooter";

export default {
  name: "App",
  data() {
    return {
      todos: [
        { id: 1, task: "抽烟", isCompleted: false },
        { id: 2, task: "喝酒", isCompleted: true },
        { id: 3, task: "烫头", isCompleted: false },
      ],
    };
  },
  methods: {
    addTodo(task) {
      this.todos.unshift({ id: Date.now(), task });
    },
    delTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
  computed: {
    completedCount() {
      return this.todos.reduce((p, c) => {
        return p + (c.isCompleted ? 1 : 0);
      }, 0);
    },
    total() {
      return this.todos.length;
    },
  },
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