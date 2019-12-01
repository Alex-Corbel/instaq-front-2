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
      <div v-if="username && username.toLowerCase() === current_username.toLowerCase()">
        <button class="w-4/5 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
          <router-link v-bind:to="'/create-post'">{{$t('create_post')}}</router-link>
        </button>
        <router-link v-bind:to="'/settings'" class="pl-4 w-1/5">
          <font-awesome-icon :icon="['fas', 'user-cog']" size="lg" class="hover:text-purple-600 cursor-pointer font-semibold hover:text-white"/>
        </router-link>
      </div>
      <div v-else>
        <button v-on:click="unsubscribe" v-if="isSubscribe" class="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
          {{$t('unfollow')}}
        </button>
        <button v-on:click="subscribe" v-else class="w-full bg-blue-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
          {{$t('follow')}}
        </button>        
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { action_types } from "@/store/types";
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
  methods: {
    subscribe() {
      store.dispatch(action_types.SUBSCRIBE_TO_USER);
    },
    unsubscribe() {
      store.dispatch(action_types.UNSUBSCRIBE_TO_USER);
    }
  },
  computed: {
    ...mapState({
      isSubscribe: state => state.profileFromName.isFollower.aggregate.count > 0,
      current_username: state => state.profile.user_name,
      current_id: state => state.profile.id,
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
