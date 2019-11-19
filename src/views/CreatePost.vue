<template>
  <div class="container mx-auto mt-24 md:mt-18">
    <div v-if="creatingPost" class="flex flex-col bg-gray-200 mb-10 p-4 justify-center items-center rounded">
      <p class="mb-5 uppercase tracking-wide text-indigo-600 font-bold text-xl">{{$t('new_post.creation')}}</p>
      <img class="w-32" src="https://areviewsapp.com/img/loading.gif"/>
    </div>
    <div v-else class="flex flex-col bg-gray-200 mb-10 p-4 justify-center items-center rounded">
      <span class="mb-5 uppercase tracking-wide text-indigo-600 font-bold text-xl">{{$t('new_post.title')}}</span>
      <input v-on:change="handleFileUpload()" class="mb-5" type="file" id="file" ref="file" accept="image/png, image/jpeg">
      <textarea v-model="description" class="mb-5" v-placeholder="t('new_post.placeholder_description')" id="description" name="post" rows="5" cols="33"></textarea>
      <p v-if="this.error" class="text-red-800 mb-5">{{error}}</p>
      <button v-on:click="createPost()" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        {{$t('publish')}}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "CreatePost",
  data() {
    return {
      description: undefined,
      file: '',
      error: undefined,
      creatingPost: false
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    createPost() {
      if(!this.file || this.file === '') {
        this.error = this.$t('new_post.error.no_image_selected')
      } else if(!this.isFileImage(this.file)) {
        this.error = this.$t('new_post.error.bad_file_type')
      } else if(!this.description || this.description.length < 5) {
        this.error = this.$t('new_post.error.bad_description')
      } else {
        this.creatingPost = true
        // TODO :
        // - Upload image to get image url
        // - Call graphql api to create post
        // - Redirect to created post
      }
    },
    isFileImage(file) {
      return file && file['type'].split('/')[0] === 'image';
    }
  }
};
</script>
