<template>
  <div>
    <ul>
      <!-- 
        路由传参的方式：
          1. params参数
            路由配置：
              {
                path: '/xxx/:id', // :id 动态路由匹配，能匹配多个地址
                component: Xxx
              }

            跳转路由路径
              <router-link to="/xxx/1">xxx</router-link>

            子路由接受 :id 的参数
              this.$route.params.id 

            当 :id 的参数发生变化时，需要使用watch监视属性的变化，来更新数据 
              watch: {
                $route: {
                  handler(newVal) {
                    const id = +newVal.params.id;
                    this.message = this.messages.find((message) => message.id === id);
                  },
                  // 正常情况下，watch只有值发生变化的时候才会调用
                  // 一上来会调用一次
                  immediate: true,
                },
              },
       -->
      <li v-for="message in messages" :key="message.id">
        <router-link :to="`/home/message/detail/${message.id}`">{{
          message.content
        }}</router-link>
      </li>
    </ul>
    <!-- 显示路由组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.messages = [
        { id: 1, content: "message001" },
        { id: 2, content: "message002" },
        { id: 3, content: "message003" },
      ];
    }, 1000);
  },
};
</script>

<style>
</style>