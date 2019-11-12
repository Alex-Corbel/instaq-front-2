<template>
  <div class="flex-container">
    <div class="flex content-around flex-wrap bg-gray-200">

      <div
        class="w-1/3 p-2"
        v-for="post in posts"
        :key="post.id"
      >
      <router-link v-bind:to="'/post/' + post.id" class="cursor-pointer justify-start">
           <img v-bind:src="post.image" alt/>
      </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileContent",
  props: {
    page: Number,
    posts: []
  }
}
</script>