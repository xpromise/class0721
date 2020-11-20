// @ts-nocheck
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";

Vue.config.productionTip = false;

// 应用elementUI插件
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
