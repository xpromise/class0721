<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="!comments.length">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <CommentDel
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </div>
</template>
<script>
import CommentDel from "../CommentDel";

export default {
  name: "CommentList",
  data() {
    /*
      1. props方案
        数据源的位置：
          如果单个组件用，就定义在单个组件内部
          如果多个组件用，就定义在公共的父组件
      2. 全局事件总线
        数据源的位置：哪个组件需要数据展示，就放哪里    
    */
    return {
      comments: [
        { id: 1, name: "huahua", content: "抽烟喝酒烫头" },
        { id: 2, name: "jinge", content: "抽烟喝酒洗脚" },
      ],
    };
  },
  mounted() {
    // 绑定自定义事件
    this.$bus.$on("addComment", (name, content) => {
      this.comments.unshift({
        id: Date.now(),
        name,
        content,
      });
    });

    this.$bus.$on("delComment", (id) => {
      this.comments = this.comments.filter((comment) => comment.id !== id);
    });
  },
  components: {
    CommentDel,
  },
};
</script>

<style>
.reply {
  margin-top: 0px;
}
</style>