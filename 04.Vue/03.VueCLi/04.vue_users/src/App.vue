<template>
  <div>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else>
      Most Star Repo is <a :href="repo.url">{{ repo.name }}</a>
    </h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      repo: {
        url: "",
        name: "",
      },
    };
  },
  mounted() {
    // 将loading改为true：代表请求中
    this.isLoading = true;

    axios
      .get(`https://api.github.com/search/repositoriesxxxxx?q=v&sort=stars`)
      .then((res) => {
        // 代表请求完成
        this.isLoading = false;

        const { name, html_url: url } = res.data.items[0];
        this.repo.url = url;
        this.repo.name = name;
      })
      .catch((err) => {
        // 代表请求完成
        this.isLoading = false;
        console.log("err", err);
        alert("网络错误，请刷新试试~");
      });
  },
};
</script>

<style>
</style>
