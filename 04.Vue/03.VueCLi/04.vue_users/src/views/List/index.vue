<template>
  <div>
    <h1 v-if="isFirstView">输入用户名搜索</h1>
    <h1 v-else-if="isLoading">loading...</h1>
    <div v-else class="row">
      <div class="card" v-for="user in users" :key="user.id">
        <a :href="user.url" target="_blank">
          <img :src="user.img" style="width: 100px" />
        </a>
        <p class="card-text">{{ user.login }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "List",
  data() {
    return {
      isFirstView: true,
      isLoading: false,
      users: [],
    };
  },
  mounted() {
    this.$bus.$on("search", (searchName) => {
      // 切换loading
      this.isFirstView = false;
      this.isLoading = true;
      // 发送请求
      axios
        .get(`http://localhost:8080/search/users?q=${searchName}`)
        // axios
        // .get(`https://api.github.com/search/users?q=${searchName}`)
        .then((res) => {
          this.isLoading = false;
          // 开发时：请求回来的数据有很多，只需要其中的部分数据
          this.users = res.data.items.map((user) => ({
            login: user.login,
            url: user.html_url,
            img: user.avatar_url,
            id: user.id,
          }));
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
          alert("网络出现故障，请联系管理员~");
        });
    });
  },
};
</script>

<style>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
