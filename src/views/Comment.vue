<template>
  <div class="flex items-center justify-center">
    <div class="overflow-hidden shadow-lg w-4/5 mt-24">
      <div class="flex items-center h-450">
        <div class="w-2/3 ">
          <img class="w-full blurry" :src="post.thumbnail_url" v-if="!loaded">
        <img :class="imageClass" :src="post.photo_url" :onload="changeThumbnail()">
        </div>

        <div class="w-1/3 h-450 ">
          <div class="flex items-center">
            <router-link
              v-bind:to="
                (haveStories ? '/stories/' : '/profile/') + post.user.user_name
              "
              class="cursor-pointer"
            >
              <img
                :src="post.user.avatar_url"
                alt="User image"
                :class="avatarClasses"
              />
            </router-link>
            <router-link
              v-bind:to="'/profile/' + post.user.user_name"
              class="cursor-pointer"
            >
              <span class="font-bold leading-none hover:text-purple-600">{{
                post.username
              }}</span>
            </router-link>
          </div>
          <div class="flex items-center m-2 justify-between">
            <div class="jpustify-start">
              <font-awesome-icon
                v-on:click="switchLike"
                :icon="['far', 'heart']"
                size="lg"
                :class="{
                  hidden: postIsLike,
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
                  hidden: !postIsLike,
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
            {{ post.likes_aggregate.aggregate.count }} {{ $t("likes") }}
          </div>
          <div class="flex items-center mt-1 ml-2 justify-start">
            <router-link
              v-bind:to="'/profile/' + username"
              class="cursor-pointer mr-2"
            >
              <span class="font-bold leading-none hover:text-purple-600">{{
                post.user.user_name
              }}</span>
            </router-link>
            <span>{{ post.contenty }}</span>
          </div>
          <div class="overflow-y-auto max-h-full">
            <div
              class="flex items-center ml-2 justify-start"
              v-for="comment in post.comments"
              :key="comment"
            >
              <router-link
                v-bind:to="'/profile/' + comment.user.user_name"
                class="cursor-pointer mr-2"
              >
                <span class="font-bold leading-none hover:text-purple-600">{{
                  comment.user.user_name
                }}</span>
              </router-link>
              <span>{{ comment.content }}</span>
            </div>
          </div>
          <div
            class="flex items-center m-2 justify-start text-gray-500 font-light"
          >
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
          <Toast
            ref="bookmark-toast"
            :toast="{
              class: [
                'p-2',
                'bg-indigo-800',
                'items-center',
                'text-indigo-100',
                'leading-none',
                'lg:rounded-full',
                'flex',
                'lg:inline-flex'
              ]
            }"
            :message="{
              class: ['font-semibold', 'mr-2', 'text-left', 'flex-auto'],
              text: $t('bookmarked-msg')
            }"
            :beforeIcon="{ content: ['far', 'paper-plane'] }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "../components/Toast";
import store from "@/store";
import { queries } from '@/api/queries'
import { fetchAsync, fetcher } from "@/api/fetcher";
export default {
  name: "Comment",
  components: { Toast },
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
      postIsMark: this.isMark,
      postIsLike: this.isLike,
      duration: null,
      post: null
    };
  },
  methods: {
    switchBookmark: function() {
      this.postIsMark = !this.postIsMark;
      if (this.postIsMark) this.$toasted.global.bookmarked();
    },
    switchLike: function() {
      if (!this.postIsLike) this.post.likes = this.post.likes + 1;
      else this.post.likes = this.post.likes - 1;
      this.postIsLike = !this.postIsLike;
    },
    changeThumbnail: function () {
      this.loaded = true
      this.imageClass.hidden= false
    }
  },
  created() {
    console.log(queries)
        fetchAsync(store.state.token, fetcher, queries.post_detail, {
          post_id: this.$router.currentRoute.params.id
        }).then((res) => {
          this.post = res.data.post[0]
        })

  }
};
</script>
