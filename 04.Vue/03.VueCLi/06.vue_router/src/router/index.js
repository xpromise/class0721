// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import About from "../views/About";
import Home from "../views/Home";

// 安装插件
// 一旦安装插件，就会全局注册两个组件：router-link router-view
// 还会给原型上添加一个属性
Vue.use(VueRouter);

const router = new VueRouter({
  // 定义路由的配置
  routes: [
    {
      path: "/about", // 路由路径
      component: About, // 路由组件
    },
    {
      path: "/home",
      component: Home,
    },
    {
      // 当路径是/时，会切换到/home
      path: "/",
      redirect: "/home", // 重定向
    },
  ],
});

export default router;
