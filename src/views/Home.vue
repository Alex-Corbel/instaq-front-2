<template>
  <div class="container mx-auto mt-24 md:mt-18 h-screen">
    <div
      class="flex items-center justify-center"
      v-for="post in posts"
      :key="post.id"
    >
      <Post :id="post.id" :haveStories="false" />
    </div>
    <InfiniteLoading spinner="spiral" @infinite="infiniteHandler">
      <div slot="no-more">___</div>
    </InfiniteLoading>
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
</template>

<script>
import { mapState } from "vuex";
import { action_types } from "../store/types";
import { store } from "../main";
import Post from "../components/Post";
import Toast from "../components/Toast";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "Home",
  components: { Post, Toast, InfiniteLoading },
  props: {
    msg: String
  },
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
    displayToast() {
      this.toastClass["ew-toast-show"] = true;
      setTimeout(() => {
        this.toastClass["ew-toast-show"] = false;
      }, 1000);
    },
    infiniteHandler($state) {
      store.dispatch(
        action_types.UPDATE_TIMELINE_OFFSET,
        store.state.timelineOffset + 10
      );
      store.dispatch(action_types.RETRIEVE_TIMELINE).then(timeline => {
        if (timeline.length <= 0) {
          $state.complete();
          return;
        }
        $state.loaded();
      });
    }
  },
  computed: {
    ...mapState({
      posts: state => state.timeline
    })
  },
  mounted() {
    store.dispatch(action_types.RETRIEVE_TIMELINE);
  }
};
</script>