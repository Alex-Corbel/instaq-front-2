<template>
  <div class="flex flex-col md:flex-row ml-5 mr-5 items-center justify-center">
    <div class="flex-shrink-0">
      <router-link
        v-bind:to="(haveStories ? '/stories/' : '/profile/') + username"
        class="cursor-pointer justify-start"
      >
        <img :src="avatar" alt="User image" :class="avatarClasses" />
      </router-link>
    </div>
    <div class="ml-8 justify-center">
      <div
        class="uppercase tracking-wide text-indigo-600 font-bold text-xl mb-2"
      >
        {{ username }}
      </div>
      <div class="flex justify-between">
        <div class="p-1">
          <strong>{{ postsCount || 0 }}</strong> {{ $tc("post", 2) }}
        </div>
        <div class="p-1">
          <strong>{{ followersCount || 0 }}</strong> {{ $tc("follower", 2) }}
        </div>
        <div class="p-1">
          <strong>{{ followingCount || 0 }}</strong> {{ $tc("following", 2) }}
        </div>
      </div>
      <p class="mt-2 mb-2 text-gray-600">{{ bio }}</p>
      <div v-if="username === $route.params.username">
        <button class="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          <router-link v-bind:to="'/create-post'">{{$t('create_post')}}</router-link>
        </button>
      </div>
      <div v-else>
        <button class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          {{$t('follow')}}
        </button>
      </div>
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
        "w-48": true,
        "h-48": true,
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
      username: state => state.profileFromName.user_name,
      bio: state => state.profileFromName.description,
      avatar: state => state.profileFromName.avatar_url,
      followersCount: state =>
        state.profileFromName.followers_aggregate.aggregate.count,
      followingCount: state =>
        state.profileFromName.follows_aggregate.aggregate.count,
      postsCount: state =>
        state.profileFromName.posts_aggregate.aggregate.count,
      name: state =>
        `${state.profileFromName.firstname} ${state.profileFromName.lastname}`
    })
  }
};
</script>
