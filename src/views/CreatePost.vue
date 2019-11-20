<template>
  <div class="container mx-auto mt-24 md:mt-18">
    <div v-if="creatingPost" class="flex flex-col bg-gray-200 mb-10 p-4 justify-center items-center rounded">
      <p class="mb-5 uppercase tracking-wide text-indigo-600 font-bold text-xl">{{$t('new_post.creation')}}</p>
      <img class="w-32" src="https://areviewsapp.com/img/loading.gif"/>
    </div>
    <div v-else class="flex flex-col mb-10 p-4 justify-center items-center rounded">
      <span class="mb-5 uppercase tracking-wide text-indigo-600 font-bold text-xl">{{$t('new_post.title')}}</span>
      <label class="mb-5 w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-400">
          <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <img class="mt-2" v-if="url" :src="url" />
          <span class="mt-2 text-base leading-normal">{{$t('new_post.choose_a_file')}}</span>
          <input type='file' class="hidden"  v-on:change="handleFileUpload()" id="file" ref="file" accept="image/png, image/jpeg"/>
      </label>
      <div class="bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-400 mb-5">
        <textarea v-model="description" v-bind:placeholder="$t('new_post.placeholder_description')" class="m-1" rows="5" cols="33"></textarea>
      </div>
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
      creatingPost: false,
      url: undefined
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.file);
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
