// @ts-nocheck
import Vue from "vue";

import App from "./App";

// 关闭生产环境提示
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
