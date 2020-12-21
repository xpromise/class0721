<template>
  <ul>
    <li v-for="route in routes" :key="route.path">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </li>
  </ul>
</template>

<script>
import routes from "@/router/routes";

export default {
  name: "Home",
  data() {
    return {
      routes,
    };
  },
};
</script>
