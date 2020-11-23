<template>
  <li @mouseenter="isShow = true" @mouseleave="isShow = false">
    <label>
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.task }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import { UPDATE_TODO, DEL_TODO } from "../../store/mutation-types";

export default {
  name: "TodoItem",
  props: ["todo"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    ...mapMutations([UPDATE_TODO, DEL_TODO]),
    del() {
      if (window.confirm(`您确认要删除数据吗?`)) {
        this[DEL_TODO](this.todo.id);
      }
    },
  },
  computed: {
    isCompleted: {
      get() {
        return this.todo.isCompleted;
      },
      set() {
        // 更新vuex的todos数据
        this[UPDATE_TODO](this.todo.id);
      },
    },
  },
};
</script>

<style>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>