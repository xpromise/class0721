import Vue from "vue";
import Vuex from "vuex";
// 安装插件
Vue.use(Vuex);

/**
 * 集中所有数据的对象
 */
const state = {
  // 数据的初始化
  count: 0,
  // person: { name: "jack" },
};

/**
 * 包含了只用来读取的计算数据
 */
const getters = {
  oddOrEven(state) {
    // Math.abs() 取绝对值（正数）
    return Math.abs(state.count) % 2 === 1 ? "奇数" : "偶数";
  },
  // name(state) {
  //   return state.person.name;
  // },
};

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
      commit("INCREMENT", num);
    }
  },
  incrementAsync({ commit }, num) {
    setTimeout(() => {
      commit("INCREMENT", num);
    }, 1000);
  },
};

/**
 * 用来直接更新数据的方法对象
 *    直接对数据进行操作（数据操作后会更新state，从而组件会重新渲染）
 *    mutation函数的数量：看要对数据更新的操作的几种方式
 */
const mutations = {
  // mutation函数第一个参数：state --> 所有状态数据
  // mutation函数第二个参数：num --> 就由上一步actions负责传递过来
  INCREMENT(state, num) {
    state.count += num;
  },
  DECREMENT(state, num) {
    state.count -= num;
  },
};

// store对象中包含读取数据和更新数据的方法
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

export default store;
