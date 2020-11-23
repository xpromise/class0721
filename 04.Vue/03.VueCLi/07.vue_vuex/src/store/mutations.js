import {
  ADD_TODO,
  UPDATE_TODO,
  DEL_TODO,
  CHECK_ALL_TODOS,
  BATCH_DEL_TODOS,
} from "./mutation-types";

const mutations = {
  [ADD_TODO](state, task) {
    state.todos.unshift({ id: Date.now(), isCompleted: false, task });
  },
  [UPDATE_TODO](state, id) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }

      return todo;
    });
  },
  [DEL_TODO](state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  },
  [CHECK_ALL_TODOS](state, isCompleted) {
    state.todos = state.todos.map((todo) => ({ ...todo, isCompleted }));
  },
  [BATCH_DEL_TODOS](state) {
    state.todos = state.todos.filter((todo) => !todo.isCompleted);
  },
};

export default mutations;
