<template>
  <div class="flex flex-col justify-center items-center container mx-auto mt-24 md:mt-18">
    <div
      v-if="creatingPost"
    >
      <p class="mb-5 uppercase tracking-wide text-indigo-600 font-bold text-xl">
        {{ $t("new_post.creation") }}
      </p>
      <div class="spinner bg-p"></div>
    </div>
    <div
      v-else
      class="flex flex-col md:w-1/2 w-full justify-center items-center"
    >
      <span
        class="mb-5 uppercase tracking-wide text-indigo-600 font-bold text-xl"
        >{{ $t("new_post.title") }}</span
      >
      <label
        class="mb-5 w-full flex flex-col items-center px-4 py-6 bg-white text-purple md:rounded-lg shadow-lg tracking-wide uppercase border border-purple cursor-pointer hover:bg-purple hover:text-purple-400"
      >
        <svg
          class="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
          />
        </svg>
        <img class="mt-2" v-if="url" :src="url" />
        <span class="mt-2 text-base leading-normal">{{
          $t("new_post.choose_a_file")
        }}</span>
        <input
          type="file"
          class="hidden"
          v-on:change="handleFileUpload()"
          id="file"
          ref="file"
          accept="image/png, image/jpeg"
        />
      </label>
      <div
        class="bg-white w-full p-1 text-purple md:rounded-lg shadow-lg tracking-wide uppercase border border-purple cursor-pointer hover:bg-purple hover:text-purple-400 mb-5"
      >
        <textarea
          v-model="description"
          v-bind:placeholder="$t('new_post.placeholder_description')"
          class="w-full outline-none"
          rows="5"
          cols="33"
        ></textarea>
      </div>
      <p v-if="this.error" class="text-red-800 mb-5">{{ error }}</p>
      <button
        v-on:click="createPost()"
        class="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
      >
        {{ $t("publish") }}
      </button>
    </div>
    <Toast
      :toast="{ class: toastClass }"
      :message="{
        class: ['font-semibold', 'mx-2', 'text-left', 'flex-auto'],
        text: toastMsg
      }"
      :beforeIcon="{ content: ['far', 'times-circle'], class: ['mr-1'] }"
      :afterIcon="null"
    />
  </div>
</template>

<script>
import { fetchAsync, fetcher } from '@/api/fetcher';
import { mutations } from '@/api/mutations';
import store from '@/store';
import Toast from '@/components/Toast'
export default {
  name: "CreatePost",
  components: {Toast},
  data() {
    return {
      description: undefined,
      file: '',
      error: undefined,
      creatingPost: false,
      url: undefined,
      toastClass: {
        toast: true,
        "ew-toast-show": false,
        "p-2": true,
        "bg-purple-200": true,
        "text-purple-500": true,
        "leading-none": true,
        "rounded-full": true,
        "lg:inline-flex": true
      },
      toastMsg: undefined
    }
  },
  methods: {
    displayToast() {
      this.toastClass["ew-toast-show"] = true;
      setTimeout(() => {
        this.toastClass["ew-toast-show"] = false;
      }, 2000);
    },
    toBase64(file){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })},
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    async createPost() {
      if(!this.file || this.file === '') {
        this.error = this.$t('new_post.error.no_image_selected')
      } else if(!this.isFileImage(this.file)) {
        this.error = this.$t('new_post.error.bad_file_type')
      } else if(!this.description || this.description.length < 5) {
        this.error = this.$t('new_post.error.bad_description')
      } else {
        this.creatingPost = true
        this.toBase64(this.file).then(async (base64) => {
          const response = await fetchAsync(
            store.state.token,
            fetcher,
            mutations.UPLOAD_IMAGE,
            { userId: store.state.userId, image: base64}
          );
          const data = response.data.uploadImage
          if(!response.errors){
            const res = await fetchAsync(
              store.state.token,
              fetcher,
              mutations.INSERT_POST,
              {
                content: this.description,
                photo_url: data.url,
                thumbnail_url: data.url_thumbnail
              }
            )
            if(res.data.insert_post.returning[0].id){
              this.$router.push("/#/home")
            }else{
              this.toastMsg = this.$t('server_error')
              this.displayToast()
            }

          }else{
            this.creatingPost = false
            if (response.errors[0].message === "Picture not explicit"){
              this.toastMsg = this.$t('not_explicit')
              this.displayToast()
            }else{
              this.toastMsg = this.$t('server_error')
              this.displayToast()
            }
          }
        });
      }
    },
    isFileImage(file) {
      return file && file['type'].split('/')[0] === 'image';
    }
  }
};
</script>
