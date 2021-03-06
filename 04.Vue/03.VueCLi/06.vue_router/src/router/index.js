// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import About from "../views/About";
import Home from "../views/Home";
import Message from "../views/Home/Message";
import Detail from "../views/Home/Message/Detail";
import News from "../views/Home/News";

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
      children: [
        // 子路由
        {
          path: "/home/message",
          component: Message,
          children: [
            {
              // 加上name属性，就叫做命名路由
              name: "Detail",
              path: "detail/:id", // 动态路由配置，能匹配多个路径
              component: Detail,
              // props函数的返回值，会以props方式传递给组件
              props(route) {
                // console.log(route);
                return {
                  // 展开route.params数据，到对象上
                  ...route.params,
                  ...route.query,
                  // id: route.params.id,
                  // name: route.query.name,
                  // age: route.query.age,
                };
              },
            },
          ],
        },
        {
          path: "news", // 当你路径不是 / 开头，就会以父路由路径补全
          component: News,
        },
      ],
    },
    {
      // 当路径是/时，会切换到/home
      path: "/",
      redirect: "/home", // 重定向
    },
  ],
});

export default router;
