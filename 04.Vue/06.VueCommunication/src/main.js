import Vue from "vue";
import App from "./App";
// PWA技术
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins/element";

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
