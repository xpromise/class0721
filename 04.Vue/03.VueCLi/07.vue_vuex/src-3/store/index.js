import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

// 安装插件
Vue.use(Vuex);

// store对象中包含读取数据和更新数据的方法
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

export default store;
