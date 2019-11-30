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
    getAgoText: function() {
      const current_date = new Date();

      let seconds = Math.floor((current_date - this.date) / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      let weeks = Math.floor(days / 7);

      hours = hours - days * 24;
      minutes = minutes - days * 24 * 60 - hours * 60;
      seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
      const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
      ];

      if (weeks >= 1) {
        return (
          this.date.getDay() + " " + this.$t(monthNames[this.date.getMonth()])
        );
      } else if (days >= 1) {
        let day_text = null;
        if (days == 1) day_text = this.$tc("day", 1);
        else day_text = this.$tc("day", 2);
        let duration = days + " " + day_text;
        return this.$t("ago", { duration: duration });
      } else if (hours >= 1) {
        let hour_text = null;
        if (hours == 1) hour_text = this.$tc("hour", 1);
        else hour_text = this.$tc("hour", 2);
        let duration = hours + " " + hour_text;
        return this.$t("ago", { duration: duration });
      } else if (minutes >= 1) {
        let minute_text = null;
        if (minutes == 1) minute_text = this.$tc("minute", 1);
        else minute_text = this.$tc("minute", 2);
        let duration = minutes + " " + minute_text;
        return this.$t("ago", { duration: duration });
      }
    }
  }
};
</script>
