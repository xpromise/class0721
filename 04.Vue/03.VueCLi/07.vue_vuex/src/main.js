// @ts-nocheck
import Vue from "vue";
import App from "./App";

import store from "./store";
// 引入公共样式
import "./assets/css/common.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 应用store
  store,
}).$mount("#app");
