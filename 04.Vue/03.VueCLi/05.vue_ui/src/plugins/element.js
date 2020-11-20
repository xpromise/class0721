import Vue from "vue";
import { Button, Carousel, Message } from "element-ui";

// 安装插件 --> 全局注册组件
Vue.use(Button);
Vue.use(Carousel);

Vue.prototype.$message = Message;
