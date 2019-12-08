<template>
  <div class="container px-3 mx-auto mt-24 h-screen w-full md:w-1/2 lg:w-1/3">
    <div v-if="creatingPost">
      <p class="mb-5 uppercase tracking-wide text-indigo-600 font-bold text-xl">
        {{ $t("save_settings.creation") }}
      </p>
      <div class="spinner bg-p"></div>
    </div>
    <div v-else class="flex flex-col items-center justify-center w-full">
      <div class="w-full py-4">
        <TextInput id="tagname" :placeholder="$t('tagname')" :value="tagname" />
      </div>

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
          $t("profile_picture")
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
      <div class="w-full py-4">
        <Textarea
          id="description"
          :placeholder="$t('description')"
          :value="description"
        />
      </div>
      <button
        v-on:click="updateSettings()"
        class="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
      >
        {{ $t("save") }}
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
import { fetchAsync, fetcher } from "@/api/fetcher";
import { mutations } from "@/api/mutations";
import TextInput from "@/components/TextInput";
import Toast from "@/components/Toast";
import Textarea from "@/components/Textarea";
import { mutation_types } from "@/store/types";
import store from "@/store";
import { mapState } from "vuex";

export default {
  components: { TextInput, Textarea, Toast },
  data() {
    return {
      creatingPost: false,
      file: "",
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
      toastMsg: undefined,
      url: undefined
    };
  },
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    async updateSettings() {
      this.creatingPost = true;
      if (!this.file || this.file === "") {
        const tagname = document.getElementById("tagname").value
        const description =  document.getElementById("description").value
        const res = await fetchAsync(
          store.state.token,
          fetcher,
          mutations.UPDATE_SETTINGS,
          {
            id: store.state.userId,
            user_name: tagname,
            avatar_url: this.avatar_url,
            description
          }
        );
        if (res.data.update_user.returning[0].id == this.userId) {
          store.commit(
            mutation_types.MUTATE_SETTINGS,
            tagname,
            this.avatar_url,
            description
          );
          this.$router.push("/#/profile/"+tagname);
        }
      } else if (!this.isFileImage(this.file)) {
        this.error = this.$t("new_post.error.bad_file_type");
      } else {
        this.toBase64(this.file).then(async base64 => {
          const response = await fetchAsync(
            store.state.token,
            fetcher,
            mutations.UPLOAD_IMAGE,
            { userId: store.state.userId, image: base64 }
          );
          if (response.errors) {
            if (response.errors[0].message === "Picture not explicit") {
              this.toastMsg = this.$t("not_explicit");
            } else {
              this.toastMsg = this.$t("server_error");
            }
          } else {
            const res = await fetchAsync(
              store.state.token,
              fetcher,
              mutations.UPDATE_SETTINGS,
              {
                id: store.state.userId,
                user_name: this.tagname,
                avatar_url: response.data.uploadImage.url,
                description: this.description
              }
            );
            if (res.data.update_user.returning[0].id == this.userId) {
              store.commit(
                mutation_types.MUTATE_SETTINGS,
                this.tagname,
                response.data.uploadImage.url,
                this.description
              );
              this.$router.push("/#/profile/" + this.tagname);
            }
          }
        });
        this.creatingPost = false;
        this.displayToast();
      }
    },
    isFileImage(file) {
      return file && file["type"].split("/")[0] === "image";
    },
    displayToast() {
      this.toastClass["ew-toast-show"] = true;
      setTimeout(() => {
        this.toastClass["ew-toast-show"] = false;
      }, 2000);
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      avatar_url: state => state.profile.avatar_url,
      tagname: state => state.profile.user_name,
      description: state => state.profile.description
    })
  },
  watch: {
    avatar_url(value) {
      this.url = value;
    }
  }
};
</script>
