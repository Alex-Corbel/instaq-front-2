<template>
  <div>
    <Navbar v-if="$route.name != 'FirstSteps' && $route.name != 'Splashscreen'"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import "@/assets/css/tailwind.css";

export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>
<style></style>
