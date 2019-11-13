<template>
  <div class="flex-container mt-10">
    <div class="flex content-around flex-wrap">
      <div
        class="w-1/3 p-2"
        v-for="post in postsToShow"
        :key="post.id"
      >
      <router-link v-bind:to="'/post/' + post.id" class="cursor-pointer justify-start">
           <img class="h-auto w-auto" v-bind:src="post.image" alt/>
      </router-link>
      </div>
    </div>
    <div class="flex flex-row justify-center mt-5 mb-10">
      <button  v-for="pageNumber in pageList.slice(currentPage === 1 ? currentPage - 1 : currentPage-2, currentPage+1)"
        :key="pageNumber" @click="currentPage = pageNumber" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mr-2 ml-2">
        <strong v-if="pageNumber === currentPage">{{pageNumber}}</strong>
        <span v-else>{{pageNumber}}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileContent",
  props: {
    page: Number,
    postPerPage: Number,
    posts: {},
    postsCount: Number
  },
  data() {
    return {
      postsToShow: {},
      pageList: [],
      maxPage: 0,
      currentPage: 0
    }
  },
  methods: {
    getMaxPage(postsCount, numberOfPostPerPage) {
      return Math.ceil(postsCount / numberOfPostPerPage);
    },
    getPostsToShow(currentPage, posts, numberOfPostPerPage) {
      return posts.slice((currentPage-1)*numberOfPostPerPage, currentPage*numberOfPostPerPage);
    },
    getPageList(maxPage) {
      const list = [];
      for(let i = 1; i <= maxPage; i++) {
        list.push(i);
      }
      return list;
    }
  },
  mounted() {
    this.currentPage = this.page;
    this.maxPage = this.getMaxPage(this.postsCount, this.postPerPage);
    this.postsToShow = this.getPostsToShow(this.currentPage, this.posts, this.postPerPage);
    this.pageList = this.getPageList(this.maxPage);
  },
  watch: {
    currentPage: function (newValue) {
      this.postsToShow = this.getPostsToShow(newValue, this.posts, this.postPerPage);
    }
  }
}
</script>