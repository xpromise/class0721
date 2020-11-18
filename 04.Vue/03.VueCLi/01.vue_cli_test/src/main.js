// @ts-nocheck
import Vue from "vue";

import App from "./App";

Vue.config.productionTip = false;

// 给Vue原型对象上添加一个可以绑定事件的对象
// 可以绑定事件的对象：vm 和 组件实例对象
// Vue.prototype.$bus = new Vue();

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App)
}).$mount("#app");
