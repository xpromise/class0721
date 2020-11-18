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
      <CommentAdd />
      <CommentList />
    </div>
  </div>
</template>  

<script>
import CommentAdd from "./views/CommentAdd";
import CommentList from "./views/CommentList";

export default {
  name: "App",
  components: {
    CommentAdd,
    CommentList,
  },
};
</script>  

<style></style>  