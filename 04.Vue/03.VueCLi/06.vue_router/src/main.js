// @ts-nocheck
import Vue from "vue";
import router from "./router";
import App from "./App";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 应用路由器
  router,
}).$mount("#app");
