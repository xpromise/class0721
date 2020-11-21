<template>
  <div>
    <h3>home</h3>
    <ul class="nav nav-tabs">
      <li><router-link to="/home/news">News</router-link></li>
      <li><router-link to="/home/message">Message</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
</style>