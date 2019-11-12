<template>
  <div class="flex flex-row items-center justify-center">
    <div v-if="currentPage > 1" class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{{currentPage - 1}}</div>
    <div class="text-gray-700 font-bold text-center bg-gray-400 px-4 py-2 m-2">{{currentPage}}</div>
    <div v-if="currentPage < totalPage" class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{{currentPage + 1}}</div>
  </div>
</template>

<script>
export default {
  name: "ProfilePagination",
  props: {
    currentPage: Number,
    postsCount: Number,
    userName: String,
    numberOfLine: Number
  },
  data() {
    return {
      totalPage: null,
    }
  },
  methods: {
    getMaxPage: function(postsCount, numberOfLine) {
      if(postsCount) {
        return Math.ceil(postsCount / (3 * numberOfLine))
      }
      return 0;
    }
  },
  mounted() {
    if(this.postsCount) {
      this.totalPage = this.getMaxPage(this.postsCount, this.numberOfLine);
    }
  },
  watch: {
        'postsCount': function(newVal){
        if (newVal) {
          this.totalPage = this.getMaxPage(newVal, this.numberOfLine);
        }
      }
    }
}
</script>