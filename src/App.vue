<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import '@/assets/css/tailwind.css'

export default {
  name: 'app',
  components: {
    Navbar,
  }
}
</script>
<style>

</style>
