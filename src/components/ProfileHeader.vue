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
      <div class="p-1"><strong>{{ postsCount || 0 }}</strong> {{$tc('post', 2)}} </div>
      <div class="p-1"><strong>{{ followersCount || 0 }}</strong> {{$tc('follower', 2)}} </div>
      <div class="p-1"><strong>{{ followingCount || 0 }}</strong> {{$t('following')}} </div>
    </div>
    <p class="mt-3 text-gray-600">{{ bio }}</p>
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfileHeader",
  props: {
    haveStories: Boolean
  },
  data() {
    return {
      avatarClasses: {
        "w-30": true,
        "h-30": true,
        "rounded-full": true,
        "m-2": true,
        "mr-4": true,
        "p-1": true,
        "border-purple-500": this.haveStories,
        "border-2": this.haveStories
      }
    };
  },
  computed: {
    ...mapState({
      username: state => state.profile.user_name,
      bio: state => state.profile.description,
      avatar: state => state.profile.avatar_url,
      followersCount: state =>
        state.profile.followers_aggregate.aggregate.count,
      followingCount: state => state.profile.follows_aggregate.aggregate.count,
      postsCount: state => state.profile.posts_aggregate.aggregate.count,
      name: state => `${state.profile.firstname} ${state.profile.lastname}`
    })
  }
};
</script>
