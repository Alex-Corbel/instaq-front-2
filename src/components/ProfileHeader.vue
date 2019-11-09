<template>
  <div class="flex items-center justify-between">
    <router-link v-bind:to="(haveStories ? '/stories/': '/profile/') + username" class="cursor-pointer justify-start">
      <img :src="image" alt="User image" :class="avatarClasses"/>
    </router-link>
    <div class="justify-center">
      <h1>{{username}}</h1>
      <div class="justify-around">
        <span>{{postsCount}} {{$tc('post', 2)}}</span>
        <span class="pl-2">{{followingCount}} {{$t('following')}}</span>
        <span class="pl-2">{{followersCount}} {{$tc('follower', 2)}}</span>
      </div>
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileHeader",
  props: {
    username: String,
    name: String,
    bio: String,
    website: String,
    followersCount: Number,
    followingCount: Number,
    postsCount: Number,
    image: String,
    haveStories: Boolean
  },
  data(){
    return {
      avatarClasses: {
        'w-30': true,
        'h-30': true,
        'rounded-full': true,
        'm-2': true,
        'mr-4': true,
        'p-1': true,
        'border-purple-500': this.haveStories,
        'border-2': this.haveStories
      },
    }
  }
}
</script>