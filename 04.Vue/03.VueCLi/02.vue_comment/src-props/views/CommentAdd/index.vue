<template>
  <div class="col-md-4">
    <form class="form-horizontal" @submit.prevent="add">
      <div class="form-group">
        <label>用户名</label>
        <input
          type="text"
          class="form-control"
          placeholder="用户名"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea
          class="form-control"
          rows="6"
          placeholder="评论内容"
          v-model="content"
        ></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default pull-right">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "CommentAdd",
  props: {
    addComment: Function,
  },
  data() {
    return {
      name: "",
      content: "",
    };
  },
  methods: {
    add() {
      const { name, content } = this;
      if (!name || !content) {
        alert("请输入用户名和评论内容");
        return;
      }
      // 添加评论
      this.addComment(name, content);
      // 清空用户数据
      this.name = '';
      this.content = '';
    },
  },
};
</script>
<style></style>