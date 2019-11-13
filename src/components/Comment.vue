<template>
  <div class="flex items-center ml-2 justify-start">
    <router-link
      v-bind:to="`/profile/${user_name}`"
      class="cursor-pointer mr-2"
    >
      <span class="font-bold leading-none hover:text-purple-600">{{
        user_name
      }}</span>
    </router-link>
    <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    id: String,
    content: String,
    created_at: String,
    user_name: String,
    user_id: String,
    user_avatar_url: String
  },
  data() {
    return {
      avatarClasses: {
        "w-10": true,
        "h-10": true,
        "rounded-full": true,
        "m-2": true,
        "mr-4": true,
        "p-1": true
      }
    };
  },
  methods: {
  },

};
</script>
