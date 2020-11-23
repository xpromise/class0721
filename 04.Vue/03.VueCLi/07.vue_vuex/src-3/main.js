// @ts-nocheck
import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 应用store
  store,
}).$mount("#app");
