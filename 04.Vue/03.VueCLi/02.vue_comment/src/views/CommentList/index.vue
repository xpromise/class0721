<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 style="display: none">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <CommentDel v-for="comment in comments" :key="comment.id" :comment="comment" />
    </ul>
  </div>
</template>
<script>
import CommentDel from "../CommentDel";

export default {
  name: "CommentList",
  // 声明接受props
  // 将来可以通过this使用
  props: {
    comments: Array,
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