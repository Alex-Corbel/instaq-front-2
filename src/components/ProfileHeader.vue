<template>
<div class="flex flex-col md:flex-row ml-5 mr-5 items-center justify-center">
  <div class="flex-shrink-0">
    <router-link v-bind:to="(haveStories ? '/stories/': '/profile/') + username" class="cursor-pointer justify-start">
      <img :src="avatar" alt="User image" :class="avatarClasses"/>
    </router-link>
  </div>
  <div class="mt-2 ml-8 justify-center">
    <div class="uppercase tracking-wide text-indigo-600 font-bold text-xl mb-3">{{username}}</div>
    <div class="flex justify-between">
      <span><strong>{{ postsCount || 0 }}</strong> {{$tc('post', 2)}}</span>
      <span><strong>{{ followersCount || 0 }}</strong> {{$tc('follower', 2)}}</span>
      <span><strong>{{ followingCount || 0 }}</strong> {{$t('following')}}</span>
    </div>
    <p class="mt-3 text-gray-600">{{ bio }}</p>
  </div>
</div>
</template>

<script>
export default {
  name: "ProfileHeader",
  props: {
    username: String,
    firstname: String,
    lastname: String,
    bio: String,
    website: String,
    followersCount: Number,
    followingCount: Number,
    postsCount: Number,
    avatar: String,
    haveStories: Boolean
  },
  data(){
    return {
      avatarClasses: {
        'w-56': true,
        'h-56': true,
        'rounded-full': true,
        'm-2': true,
        'mr-4': true,
        'p-1': true,
        'border-purple-500': this.haveStories,
        'border-2': this.haveStories,
        'bg-contain': true
      },
    }
  }
}
</script>