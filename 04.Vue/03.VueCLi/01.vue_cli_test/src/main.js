// @ts-nocheck
import Vue from "vue";

import App from "./App";

Vue.config.productionTip = false;

const vm = new Vue({
  render: h => h(App)
}).$mount("#app");

console.log("vm", vm);
