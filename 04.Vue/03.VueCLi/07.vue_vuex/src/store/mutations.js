import { ADD_TODO } from "./mutation-types";

const mutations = {
  [ADD_TODO](state, task) {
    state.todos.unshift({ id: Date.now(), isCompleted: false, task });
  },
};

export default mutations;
