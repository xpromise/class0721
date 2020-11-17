// @ts-nocheck
import Vue from "vue";

import App from "./App";
import Child from "./views/Child";

// console.log(Child);
// 在new Vue之前做全局操作
// Vue.component("Child", Child);
Vue.component(Child.name, Child);

new Vue({
  render: h => h(App)
}).$mount("#app");
