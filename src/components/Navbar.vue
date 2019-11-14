<template>
  <nav class="bg-white p-2 mt-0 fixed w-full z-10 top-0 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <div class="cursor-pointer text-lg">
          <router-link to="/home" id="logo">
            🍑
          </router-link>
        </div>
        <div class="hidden sm:flex sm:items-center">
          <div class="flex items-center border-b border-b-2 border-purple-500" id="search">
            <font-awesome-icon :icon="['fas', 'search']" size="sm" class="mr-4"/>
            <input type="text" :placeholder="$t('research')" class="outline-none">
          </div>
        </div>
        <div class="flex justify-between items-center pt-2">
          <font-awesome-icon :icon="['far', 'compass']" size="lg" class="text-gray-800 hover:text-purple-600 mr-4 cursor-pointer"/>
          <font-awesome-icon :icon="['far', 'heart']" size="lg" class="text-gray-800 hover:text-purple-600 mr-4 cursor-pointer"/>
          <router-link :to="'/profile/' + $keycloak.userName">
            <font-awesome-icon :icon="['far', 'user']" size="lg" class="text-gray-800 hover:text-purple-600 mr-4 cursor-pointer"/>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>
