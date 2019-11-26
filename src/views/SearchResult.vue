<template>
<div>
  <div v-if="postsSearches && this.$router.currentRoute.params.type == 'posts'" class="container mx-auto mt-24 md:mt-18 h-screen">
    <div
      class="flex items-center justify-center"
      v-for="post in postsSearches"
      :key="post.id"
    >
      <Post :id="post.id" :haveStories="false" />
    </div>
    <Toast
      :toast="{ class: toastClass }"
      :message="{
        class: ['font-semibold', 'mx-2', 'text-left', 'flex-auto'],
        text: $t('bookmarked-msg')
      }"
      :beforeIcon="null"
      :afterIcon="{ content: ['fas', 'save'], class: ['mr-1'] }"
    />
  </div>
  <div
      v-else-if="usersSearches.length > 0 && this.$router.currentRoute.params.type == 'users'"
      class="flex items-center justify-center mt-24"
      v-for="user in usersSearches"
      :key="user.id"
    >
      <div class="md:flex bg-white rounded-lg p-6">
        <img
          class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
          :src="user.avatar_url"
        />
        <div class="text-center md:text-left">
          <router-link :to="'/profile/'+user.user_name" class="text-lg">{{user.user_name}}</router-link>
          <div class="text-gray-600">Followers : {{user.followers_aggregate.aggregate.count}}</div>
          <div class="text-gray-600">Followees : {{user.follows_aggregate.aggregate.count}}</div>
          <div class="text-gray-600">Posts : {{user.posts_aggregate.aggregate.count}}</div>
        </div>
      </div>
    </div>
  <div v-else class="container mx-auto mt-24 md:mt-18 h-screen">
    <div class="text-center">
      <p>No result :(</p>
    </div>
  </div>
</div>
</template>

<script>
import store from '../store/index.js'
import { action_types } from "../store/types"
import { mapState } from "vuex";
import Post from "../components/Post";
import Toast from "../components/Toast";

export default {
  name: "SearchResult",
  components: { Post, Toast},
  data() {
    return {
      toastClass: {
        toast: true,
        "ew-toast-show": false,
        "p-2": true,
        "bg-purple-200": true,
        "text-purple-500": true,
        "leading-none": true,
        "rounded-full": true,
        "lg:inline-flex": true
      }
    };
  },
  methods: {
  },
  mounted(){
    if(this.$router.currentRoute.params.type == 'users'){
      store.dispatch(action_types.SEARCH_USERS, this.$router.currentRoute.params.searchString)
    }else if(this.$router.currentRoute.params.type == 'posts'){
      store.dispatch(action_types.SEARCH_POSTS, this.$router.currentRoute.params.searchString)
    }
    
  },
  computed: {
    ...mapState({
        usersSearches: state => state.usersSearches,
        postsSearches: state => state.postsSearches
    })
  }

};
</script>
