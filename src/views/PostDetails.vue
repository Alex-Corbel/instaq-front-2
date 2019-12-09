<template>
  <div class="container mx-auto mt-24 md:mt-18 h-screen">
    <div class="flex items-center justify-center">
      <Post v-if="finished" :id="id" :standalone="true" />
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
import { action_types } from "../store/types";
import { store } from "../main";

export default {
  name: "PostDetails",
  components: { Post },
  data() {
    return {
      id: this.$router.currentRoute.params.postId,
      finished: undefined
    };
  },
  async mounted() {
    this.finished = await store.dispatch(
      action_types.RETRIEVE_POST_DETAIL,
      this.id
    );
  }
};
</script>
