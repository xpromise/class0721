import { INCREMENT, DECREMENT } from "./mutation-types";
/**
 * 用来直接更新数据的方法对象
 *    直接对数据进行操作（数据操作后会更新state，从而组件会重新渲染）
 *    mutation函数的数量：看要对数据更新的操作的几种方式
 */
const mutations = {
  // mutation函数第一个参数：state --> 所有状态数据
  // mutation函数第二个参数：num --> 就由上一步actions负责传递过来
  [INCREMENT](state, num) {
    state.count += num;
  },
  [DECREMENT](state, num) {
    state.count -= num;
  },

  // [xx]: function () {}
  // [xx]() {}
};

export default mutations;
