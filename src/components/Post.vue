<template>
  <div v-if="post" class="max-w-lg overflow-hidden shadow-lg my-2 container">
    <div class="flex items-center">
      <router-link
        v-bind:to="`/profile/${post.user.user_name}`"
        class="cursor-pointer"
      >
        <img :src="post.user.avatar_url" :class="avatarClasses" />
      </router-link>
      <router-link
        v-bind:to="'/profile/' + post.user.user_name"
        class="cursor-pointer"
      >
        <span class="font-bold leading-none hover:text-purple-600">{{
          post.user.user_name
        }}</span>
      </router-link>
    </div>
    <img class="w-full blurry" :src="post.thumbnail_url" v-if="!loaded" />
    <img
      :class="imageClass"
      :src="post.photo_url"
      :onload="changeThumbnail()"
    />
    <div class="flex items-center m-2 justify-between">
      <div class="justify-start">
        <font-awesome-icon
          v-on:click="switchLike"
          :icon="['far', 'heart']"
          size="lg"
          :class="{
            hidden: post.likes.length > 0,
            'hover:text-purple-600': true,
            'mr-4': true,
            'cursor-pointer': true
          }"
        />

        <font-awesome-icon
          v-on:click="switchLike"
          :icon="['fas', 'heart']"
          size="lg"
          :class="{
            hidden: post.likes.length <= 0,
            'text-purple-600': true,
            'mr-4': true,
            'cursor-pointer': true
          }"
        />

        <font-awesome-icon
          :icon="['far', 'comment']"
          size="lg"
          class="hover:text-purple-600 mr-4 cursor-pointer"
        />

        <font-awesome-icon
          :icon="['far', 'share-square']"
          size="lg"
          class="hover:text-purple-600 mr-4 cursor-pointer"
        />
      </div>
      <div class="justify-end">
        <font-awesome-icon
          v-on:click="switchBookmark"
          :icon="['far', 'bookmark']"
          size="lg"
          :class="{
            hidden: postIsMark,
            'hover:text-purple-600': true,
            'mr-4': true,
            'cursor-pointer': true
          }"
        />

        <font-awesome-icon
          v-on:click="switchBookmark"
          :icon="['fas', 'bookmark']"
          size="lg"
          :class="{
            hidden: !postIsMark,
            'text-purple-600': true,
            'mr-4': true,
            'cursor-pointer': true
          }"
        />
      </div>
    </div>
    <div class="flex items-center m-2 justify-start font-semibold">
      {{ post.likes_aggregate.aggregate.count }}
      {{ $t("likes").toLowerCase() }}
    </div>
    <div class="flex items-center mt-1 ml-2 justify-start">
      <router-link
        v-bind:to="'/profile/' + post.user.user_name"
        class="cursor-pointer mr-2"
      >
        <span class="font-bold leading-none hover:text-purple-600">{{
          post.user.user_name
        }}</span>
      </router-link>
      <span>{{ post.content }}</span>

      <div class="flex items-center m-2 justify-start text-gray-500 font-light">
        {{ this.computeAgoText() }}
      </div>
    </div>

    <div v-if="standalone === false">
      <div
        class="flex items-center mb-1 ml-2 justify-start text-gray-500 font-light"
      >
        <router-link v-bind:to="'/post/' + id" class="cursor-pointer mr-2">
          {{ $tc("view", 2) }} {{ post.comments_aggregate.aggregate.count }}
          {{ $tc("comment", 2) }}
        </router-link>
      </div>
      <Comment
        v-if="comments[0]"
        :key="comments[0].id"
        :id="comments[0].id"
        :content="comments[0].content"
        :created_at="comments[0].created_at"
        :user_name="comments[0].user.user_name"
        :user_id="comments[0].user.id"
        :user_avatar_url="comments[0].user.avatar_url"
      />
    </div>
    <div v-else>
      <Comment
        v-for="comment of comments"
        :key="comment.id"
        :id="comment.id"
        :content="comment.content"
        :created_at="comment.created_at"
        :user_name="comment.user.user_name"
        :user_id="comment.user.id"
        :user_avatar_url="comment.user.avatar_url"
      />
    </div>
    <div
      class="flex items-center m-2 p-2 justify-between border-t-2 border-purple-400"
    >
      <input
        class="justify-start w-full outline-none"
        :placeholder="this.$t('add-comment')"
        v-on:keyup.enter="submitComment()"
        v-model="commentInput"
      />
      <font-awesome-icon
        :icon="['far', 'paper-plane']"
        size="lg"
        class="hover:text-purple-600 cursor-pointer"
        v-on:click="submitComment()"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Comment from "./Comment";
import { store } from "../main";
import { action_types } from "../store/types";
export default {
  name: "Post",
  components: {
    Comment
  },
  props: {
    id: String,
    standalone: Boolean
  },
  data() {
    return {
      imageClass: {
        hidden: true,
        "w-full": true
      },
      avatarClasses: {
        "w-10": true,
        "h-10": true,
        "rounded-full": true,
        "m-2": true,
        "mr-4": true,
        "p-1": true
        // "border-purple-500": this.haveStories,
        // "border-2": this.haveStories
      },
      loaded: false,
      postIsMark: this.isMark,
      duration: undefined,
      timeAgo: undefined,
      commentInput: "",
      postIsLike: this.isLike,
    };
  },
  mounted() {
    TimeAgo.addLocale(en);
    this.timeAgo = new TimeAgo("en-US");
  },
  methods: {
    switchBookmark: function() {
      this.postIsMark = !this.postIsMark;
      if (this.postIsMark) this.$emit("bookmarked");
    },
    switchLike: function() {
      store.dispatch(action_types.UPDATE_POST_LIKE, {
        likeState: this.post.likes.length > 0,
        postId: this.post.id
      });
    },
    computeAgoText: function() {
      return this.timeAgo
        ? this.timeAgo.format(new Date(this.post.created_at).getTime())
        : "";
    },
    submitComment: function() {
      store.dispatch(action_types.SUBMIT_COMMENT, {
        postId: this.post.id,
        content: this.commentInput
      });
      this.commentInput = "";
    },
    changeThumbnail: function() {
      this.loaded = true;
      this.imageClass.hidden = false;
    }
  },
  computed: {
    ...mapState({
      post: function(state) {
        if(this.$router.currentRoute.path.includes('/search/posts/')){
          return state.postsSearches[this.id]
        }else{
          return state.timeline[this.id]
        } 
      },
      comments: function(state) {
        if(this.$router.currentRoute.path.includes('/search/posts/')){
          return state.postsSearches[this.id].comments
        }else{
          return state.timeline[this.id].comments
        }
      }
    })
  }
};
</script>
