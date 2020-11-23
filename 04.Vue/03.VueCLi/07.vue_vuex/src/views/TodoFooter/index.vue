<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成 {{ completedCount }}</span> / 全部 {{ total }}
    </span>
    <button class="btn btn-danger" @click="batchDel">清除已完成任务</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { CHECK_ALL_TODOS, BATCH_DEL_TODOS } from "../../store/mutation-types";

export default {
  name: "TodoFooter",
  methods: {
    ...mapMutations([CHECK_ALL_TODOS, BATCH_DEL_TODOS]),
    batchDel() {
      if (window.confirm(`您确认要删除所有完成事项吗?`)) {
        this[BATCH_DEL_TODOS]();
      }
    },
  },
  computed: {
    ...mapGetters(["completedCount", "total"]),
    isCheckAll: {
      get() {
        return this.total && this.completedCount === this.total;
      },
      set(newVal) {
        this[CHECK_ALL_TODOS](newVal);
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