// @ts-nocheck
// import Vue from "vue/dist/vue.esm.js";
import Vue from "vue";

import App from "./App";
import Child from "./views/Child";

// Vue.config.devtools = true;
// 关闭生产提示
Vue.config.productionTip = false;

// console.log(Child);
// 在new Vue之前做全局操作
// Vue.component("Child", Child);
Vue.component(Child.name, Child);

new Vue({
  render: h => h(App)
  // createElement具备模板能力
  // render: createElement => createElement(App)

  // components: {
  //   App
  // }
}).$mount("#app");

/*
    文档：https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A

    import Vue from "vue"; --> vun.runtime.esm.js
    1. vun.runtime.esm.js 只包含运行时版本（不具备编译模板能力）
      优点：
        1. 使用简单
        2. 体积小

    import Vue from "vue/dist/vue.esm.js";
    2. vun.esm.js 完整版本（具备编译模板能力）
      - 引入组件
      - 注册组件
      - 页面中使用组件

      问题：
        1. 太麻烦了
        2. 文件体积更大
*/
