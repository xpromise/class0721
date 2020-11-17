<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <!-- 3. 使用组件 -->
      <CommentAdd />
      <!-- 以标签属性的方式传递（props） -->
      <CommentList :comments="comments" />
    </div>
  </div>
</template>  

<script>
// 1. 引入组件
import CommentAdd from "./views/CommentAdd";
import CommentList from "./views/CommentList";

export default {
  name: "App",
  data() {
    return {
      comments: [
        { id: 1, name: "huahua", content: "抽烟喝酒烫头" },
        { id: 2, name: "jinge", content: "抽烟喝酒洗脚" },
      ],
    };
  },
  // 2. 注册组件
  components: {
    CommentAdd,
    CommentList,
  },
};
</script>  

<style></style>  