<template>
  <div class="flex-container mt-10">
    <div class="flex content-around flex-wrap">
      <div class="w-1/3 p-2" v-for="post in postsToShow" :key="post.id">
        <router-link
          v-bind:to="'/post/' + post.id"
          class="cursor-pointer justify-start"
        >
          <img class="h-auto w-auto" v-bind:src="post.photo_url" alt />
        </router-link>
      </div>
    </div>
    <div class="flex flex-row justify-center mt-5 mb-10">
      <router-link
        v-for="pageNumber in pageList.slice(
          currentPage <= 1 ? currentPage - 1 : currentPage - 2,
          currentPage + 1
        )"
        :key="pageNumber"
        @click="currentPage = pageNumber"
        :to="computeUrl(username, pageNumber)"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mr-2 ml-2"
      >
        <strong v-if="pageNumber === currentPage">{{ pageNumber }}</strong>
        <span v-else>{{ pageNumber }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfileContent",
  props: {
    postPerPage: Number
  },
  data() {
    return {
      postsToShow: [],
      pageList: [],
      maxPages: 0
    };
  },
  computed: {
    ...mapState({
      posts: state => state.profileFromName.posts,
      username: state => state.profileFromName.user_name,
      currentPage: function(state) {
        const newPageIndex = state.currentProfilePageIndex;
        this.postsToShow = this.getPostsToShow(
          newPageIndex,
          this.posts,
          this.postPerPage
        );
        return newPageIndex;
      }
    })
  },
  methods: {
    computeMaxPages(postsCount, numberOfPostPerPage) {
      return Math.ceil(postsCount / numberOfPostPerPage);
    },
    getPostsToShow(currentPage, posts, numberOfPostPerPage) {
      return posts.slice(
        (currentPage - 1) * numberOfPostPerPage,
        currentPage * numberOfPostPerPage
      );
    },
    computePageList(maxPages) {
      const list = [];
      for (let i = 1; i <= maxPages; i++) {
        list.push(i);
      }
      return list;
    },
    computeUrl(username, pageNumber) {
      return `/profile/${username}/${pageNumber}`;
    }
  },
  watch: {
    posts(newPosts) {
      this.maxPages = this.computeMaxPages(newPosts.length, this.postPerPage);
      this.postsToShow = this.getPostsToShow(
        this.currentPage,
        newPosts,
        this.postPerPage
      );
      this.pageList = this.computePageList(this.maxPages);
    }
  }
};
</script>
