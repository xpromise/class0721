<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{ completedCount }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="batchDel">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "TodoFooter",
  props: {
    completedCount: Number,
    total: Number,
    checkAllTodos: Function,
    batchDelTodos: Function,
  },
  methods: {
    batchDel() {
      if (window.confirm(`您确认要删除已完成待办事项码?`)) {
        this.batchDelTodos();
      }
    },
  },
  computed: {
    isCheckAll: {
      get() {
        return this.completedCount === this.total && this.total !== 0;
      },
      set(val) {
        this.checkAllTodos(val);
      },
    },
  },
  
};
</script>

<style>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>