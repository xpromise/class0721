<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo" />
      <TodoList :todos="todos" :delTodo="delTodo" :updateTodo="updateTodo" />
      <TodoFooter
        :completedCount="completedCount"
        :total="total"
        :checkAllTodos="checkAllTodos"
        :batchDelTodos="batchDelTodos"
      />
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
    const todos = JSON.parse(window.localStorage.getItem("todos")) || [];

    return {
      todos,
      // todos: [
      //   { id: 1, task: "抽烟", isCompleted: false },
      //   { id: 2, task: "喝酒", isCompleted: true },
      //   { id: 3, task: "烫头", isCompleted: false },
      // ],
      // person: {
      //   name: 'jack'
      // }
    };
  },
  methods: {
    addTodo(task) {
      this.todos.unshift({ id: Date.now(), task, isCompleted: false });
    },
    delTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    updateTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.isCompleted = !todo.isCompleted;
    },
    checkAllTodos(isCompleted) {
      // this.todos.forEach((todo) => {
      //   todo.isCompleted = isCompleted;
      // });

      this.todos = this.todos.map((todo) => ({
        ...todo,
        isCompleted,
      }));
    },
    // 批量删除
    batchDelTodos() {
      this.todos = this.todos.filter((todo) => !todo.isCompleted);
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
  /*
    watch监视属性：
      默认情况下：只监视第一层属性（只监视属性的值），所以如果对象中对象发生变化，就监视不到（不会触发函数）

      https://cn.vuejs.org/v2/api/#watch

      1. 浅度监视：只监视一层属性
        用于监视基本类型数据
        用于监视引用类型数据：对象只有一层属性 和 数组里面的值是基本类型的值
        
      2. 深度监视：会监视所有属性（对象中对象）
        用于监视引用类型数据（对象和数组）
          对象中还有对象数据
          数组里面的值是引用类型数据
  */
  watch: {
    // 浅度监视：只监视一层属性
    // todos(newVal) {
    //   window.localStorage.setItem("todos", JSON.stringify(newVal));
    // },

    // 深度监视：会监视所有属性（对象中对象）
    todos: {
      handler(newVal) {
        window.localStorage.setItem("todos", JSON.stringify(newVal));
      },
      deep: true,
    },
  },
  // 关闭浏览器，不会触发卸载等生命周期函数的
  // beforeDestroy() {
  //   window.localStorage.setItem("aaa", "bbb");
  // },
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