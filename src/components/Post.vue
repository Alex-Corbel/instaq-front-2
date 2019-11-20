<template>
  <div class="max-w-lg overflow-hidden shadow-lg my-2 container">
    <div class="flex items-center">
      <router-link
        v-bind:to="
          (haveStories ? '/stories/' : '/profile/') + post.user.user_name
        "
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
    <img class="w-full blurry" :src="post.thumbnail_url" v-if="!loaded">
    <img :class="imageClass" :src="post.photo_url" :onload="changeThumbnail()">
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
      {{
          $t("likes").toLowerCase()
      }}
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
    </div>
    <div v-if="post.comments_aggregate.aggregate.count > 1">
      <div
        class="flex items-center mb-1 ml-2 justify-start text-gray-500 font-light"
      >
        <router-link v-bind:to="'/post/' + id" class="cursor-pointer mr-2">
          {{ $tc("view", 2) }} {{ post.comments_aggregate.aggregate.count }}
          {{ $tc("comment", 2) }}
        </router-link>
      </div>
      <div class="flex items-center ml-2 justify-start">
        <router-link
          v-bind:to="'/profile/' + comments[0] ? comments[0].user.username : ''"
          class="cursor-pointer mr-2"
        >
          <span class="font-bold leading-none hover:text-purple-600">{{
            lastComment.user.username
          }}</span>
        </router-link>
        <span>{{ comments[0] ? comments[0].user.content : "" }}</span>
      </div>
    </div>
    <div class="flex items-center m-2 justify-start text-gray-500 font-light">
      {{ this.getAgoText() }}
    </div>
    <div
      class="flex items-center m-2 p-2 justify-between border-t-2 border-purple-400"
    >
      <input
        class="justofy-start w-full outline-none"
        :placeholder="this.$t('add-comment')"
      />
      <font-awesome-icon
        :icon="['far', 'paper-plane']"
        size="lg"
        class="hover:text-purple-600 cursor-pointer"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { store } from "../main";
import { action_types } from "../store/types";
export default {
  name: "Post",
  props: {
    id: String,
    haveStories: Boolean
  },
  data() {
    return {
      imageClass: {
        "hidden": true,
        "w-full": true
      },
      avatarClasses: {
        "w-10": true,
        "h-10": true,
        "rounded-full": true,
        "m-2": true,
        "mr-4": true,
        "p-1": true,
        "border-purple-500": this.haveStories,
        "border-2": this.haveStories
      },
      loaded: false,
      postIsMark: this.isMark,
      duration: undefined
    };
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
    getAgoText: function() {
      const current_date = new Date();

      let seconds = Math.floor((current_date - this.date) / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      let weeks = Math.floor(days / 7);

      hours = hours - days * 24;
      minutes = minutes - days * 24 * 60 - hours * 60;
      seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
      const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
      ];

      if (weeks >= 1) {
        return (
          this.date.getDay() + " " + this.$t(monthNames[this.date.getMonth()])
        );
      } else if (days >= 1) {
        let day_text = null;
        if (days == 1) day_text = this.$tc("day", 1);
        else day_text = this.$tc("day", 2);
        let duration = days + " " + day_text;
        return this.$t("ago", { duration: duration });
      } else if (hours >= 1) {
        let hour_text = null;
        if (hours == 1) hour_text = this.$tc("hour", 1);
        else hour_text = this.$tc("hour", 2);
        let duration = hours + " " + hour_text;
        return this.$t("ago", { duration: duration });
      } else if (minutes >= 1) {
        let minute_text = null;
        if (minutes == 1) minute_text = this.$tc("minute", 1);
        else minute_text = this.$tc("minute", 2);
        let duration = minutes + " " + minute_text;
        return this.$t("ago", { duration: duration });
      }
    },
    changeThumbnail: function () {
      this.loaded = true
      this.imageClass.hidden= false
    }
  },
  computed: {
    ...mapState({
      post: function(state) {
        return state.timeline.filter(post => post.id === this.id)[0];
      }
    })
  }
};
</script>
