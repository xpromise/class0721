const getters = {
  completedCount(state) {
    return state.todos.reduce((p, c) => p + (c.isCompleted ? 1 : 0), 0);
  },
  total(state) {
    return state.todos.length;
  },
};

export default getters;
