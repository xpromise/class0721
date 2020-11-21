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

          2. query
            路由链接设置
              <router-link to="/xxx?name=jack&age=18">xxx</router-link>
            子组件获取
              this.$route.query  

          3. props
            将原先的params参数和query参数以props方式传递给组件
              子组件配置
                props(route) {
                  return {
                    ...route.params,
                    ...route.query,
                  };
                },    
              子组件声明接受
                props: ['id', 'name', 'age']
              子组件使用
                this.xxx    

          4. 命名路由
            - 路由取个名字
              {
                name: "Detail", // 命名路由
                path: "detail/:id",
                component: Detail,
              }
            - 路由路径
              <router-link
                :to="{
                  name: 'Detail', // 跳转哪个命名路由
                  params: {
                    id: message.id,
                  },
                  query: {
                    name: 'jack',
                    age: 18,
                  },
                }"
              >xxx</router-link>

          5. 给相同层级的路由组件一起传递公共参数
            传参
              <router-view key="value"></router-view>
            路由组件声明接受
              props: ['key']
            路由组件使用
              this.xxx    

       -->
      <li v-for="message in messages" :key="message.id">
        <!-- <router-link :to="`/home/message/detail/${message.id}?name=jack&age=18`">{{
          message.content
        }}</router-link> -->

        <router-link
          :to="{
            name: 'Detail', // 跳转哪个命名路由
            params: {
              id: message.id,
            },
            query: {
              name: 'jack',
              age: 18,
            },
          }"
          >{{ message.content }}</router-link
        >
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