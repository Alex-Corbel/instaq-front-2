<template>
  <div>
    <Navbar></Navbar>
    <Profile></Profile>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Profile from './components/Profile.vue'

export default {
  name: 'app',
  components: {
    Profile,
    Navbar
  }
}
</script>

<style>

</style>
