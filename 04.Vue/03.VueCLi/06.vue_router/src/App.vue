<template>
  <div class="container">
    <h1>Router Page</h1>
    <div class="row">
      <div class="col-md-4">
        <ul class="nav nav-pills nav-stacked">
          <!-- 
            router-link 路由链接导航
              切换地址

              当你点击选中 router-link 时，会添加两个类名：router-link-exact-active router-link-active
                active-class 可以修改 router-link-active
                exact-active-class 可以修改 router-link-exact-active

                文档：https://router.vuejs.org/zh/api/#router-link-props

            router-view 显示对应的路由组件
              内部会根据当前的地址，遍历路由中routes配置，找到相应的组件显示
           -->
          <li>
            <!-- <router-link
              active-class="active"
              exact-active-class="exact-active"
              to="/about"
            > -->
            <router-link to="/about">About</router-link>
          </li>
          <li><router-link to="/home">Home</router-link></li>
        </ul>
      </div>
      <div class="col-md-8">
        <!-- 显示对应的路由组件 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.router-link-active {
  color: red !important;
}
</style>