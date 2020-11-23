import { INCREMENT } from "./mutation-types";
/**
 * 用来间接更新数据的方法对象
 *    包含n个方法，来间接更新数据
 *    通常会做异步操作，将操作完成的数据交给mutations函数更新
 */
const actions = {
  // actions函数第一个参数是一个对象：store --> 内部有dispatch/commit/state等
  // actions函数第二个参数：外面调用dispatch传递过来的数据
  // increment(store, num) {
  //   // console.log(store, num);
  //   // 触发某一个mutation函数
  //   // store.commit(触发的mutation函数名称, mutation函数要接受的数据);
  //   store.commit("INCREMENT", num);
  // },
  // decrement({ commit }, num) {
  //   commit("DECREMENT", num);
  // },
  incrementIfOdd({ commit, state: { count } }, num) {
    if (count % 2 === 1) {
      commit(INCREMENT, num);
    }
  },
  incrementAsync({ commit }, num) {
    setTimeout(() => {
      commit(INCREMENT, num);
    }, 1000);
  },
};

export default actions;
