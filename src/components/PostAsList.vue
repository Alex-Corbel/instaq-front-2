<template>
  <div class="max-w-lg overflow-hidden shadow-lg my-2">
    <div class="flex items-center">
      <router-link v-bind:to="(haveStories ? '/stories/': '/profile/') + username" class="cursor-pointer">
        <img :src="userImage" alt="User image" :class="avatarClasses"/>
      </router-link>
      <router-link v-bind:to="'/profile/' + username" class="cursor-pointer">
        <span class="font-bold leading-none hover:text-purple-600">{{username}}</span>
      </router-link>
    </div>
    <img class="w-full" :src="image" alt="Sunset in the mountains">
    <div class="flex items-center m-2 justify-between">
      <div class="justify-start">
        <font-awesome-icon
          v-on:click="switchLike"
          :icon="['far', 'heart']"
          size="lg"
          :class="{
            'hidden': postIsLike,
            'hover:text-purple-600': true,
            'mr-4': true,
            'cursor-pointer': true,
          }"/>

        <font-awesome-icon
          v-on:click="switchLike"
          :icon="['fas', 'heart']"
          size="lg"
          :class="{
            'hidden': !postIsLike,
            'text-purple-600': true,
            'mr-4': true,
            'cursor-pointer': true,
          }"/>

        <font-awesome-icon
          :icon="['far', 'comment']"
          size="lg"
          class="hover:text-purple-600 mr-4 cursor-pointer"/>

        <font-awesome-icon
          :icon="['far', 'share-square']"
          size="lg"
          class="hover:text-purple-600 mr-4 cursor-pointer"/>

      </div>
      <div class="justify-end">

        <font-awesome-icon
          v-on:click="switchBookmark"
          :icon="['far', 'bookmark']"
          size="lg"
          :class="{
            'hidden': postIsMark,
            'hover:text-purple-600': true,
            'mr-4': true,
            'cursor-pointer': true,
          }"/>

        <font-awesome-icon
          v-on:click="switchBookmark"
          :icon="['fas', 'bookmark']"
          size="lg"
          :class="{
            'hidden': !postIsMark,
            'text-purple-600': true,
            'mr-4': true,
            'cursor-pointer': true,
          }"/>

      </div>
    </div>
    <div class="flex items-center m-2 justify-start font-semibold">
     {{ likes }} {{ $t('likes') }}
    </div>
    <div class="flex items-center mt-1 ml-2 justify-start">
      <router-link v-bind:to="'/profile/' + username" class="cursor-pointer mr-2">
        <span class="font-bold leading-none hover:text-purple-600">{{username}}</span>
      </router-link>
      <span>{{ description }}</span>
    </div>
    <div v-if="commentsCount>1">
      <div class="flex items-center mb-1 ml-2 justify-start text-gray-500 font-light">
        <router-link v-bind:to="'/post/' + id" class="cursor-pointer mr-2">
          {{ $tc('view', 2)}} {{ commentsCount }} {{ $tc('comment', 2) }}
        </router-link>
      </div>
      <div class="flex items-center ml-2 justify-start">
        <router-link v-bind:to="'/profile/' + lastComment.username" class="cursor-pointer mr-2">
          <span class="font-bold leading-none hover:text-purple-600">{{lastComment.username}}</span>
        </router-link>
        <span>{{ lastComment.text }}</span>
      </div>
    </div>
    <div class="flex items-center m-2 justify-start text-gray-500 font-light">
      {{ this.getAgoText() }}
    </div>
    <div class="flex items-center m-2 p-2 justify-between border-t-2 border-purple-400">
      <input class="justofy-start w-full outline-none" :placeholder="this.$t('add-comment')">
      <font-awesome-icon
          :icon="['far', 'paper-plane']"
          size="lg"
          class="hover:text-purple-600 cursor-pointer"/>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Post',
    props:{
      id: String,
      username: String,
      userImage: String,
      description: String,
      commentsCount: Number,
      lastComment: Object,
      image: String,
      isLike: Boolean,
      haveStories: Boolean,
      isMark: Boolean,
      likes: Number,
      date: Date,
    },
    data(){
        return {
          avatarClasses: {
            'w-10': true,
            'h-10': true,
            'rounded-full': true,
            'm-2': true,
            'mr-4': true,
            'p-1': true,
            'border-purple-500': this.haveStories,
            'border-2': this.haveStories
          },
          postIsMark: this.isMark,
          postIsLike: this.isLike,
          duration: null,
        }
    },
  methods: {
    switchBookmark: function () {
      this.postIsMark= !this.postIsMark
      if (this.postIsMark)
        this.$emit('bookmarked')
    },
    switchLike: function () {
      if (!this.postIsLike)
        this.likes = this.likes+1
      else
        this.likes = this.likes-1
      this.postIsLike= !this.postIsLike
    },
    getAgoText: function (){
      const current_date = new Date()

      let seconds = Math.floor((current_date - (this.date))/1000);
      let minutes = Math.floor(seconds/60);
      let hours = Math.floor(minutes/60);
      let days = Math.floor(hours/24);
      let weeks = Math.floor(days/7);

      hours = hours-(days*24);
      minutes = minutes-(days*24*60)-(hours*60);
      seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
      const monthNames = ["january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
      ];

      if (weeks >= 1) {
        return this.date.getDay() + ' ' + this.$t(monthNames[this.date.getMonth()])
      }else if (days>=1){
        let day_text = null
        if (days == 1)
          day_text = this.$tc('day', 1)
        else
          day_text = this.$tc('day', 2)
        let duration = days + ' ' + day_text
        return this.$t('ago', {'duration': duration})
      }else if (hours>=1){
        let hour_text = null
        if (hours == 1)
          hour_text = this.$tc('hour', 1)
        else
            hour_text = this.$tc('hour', 2)
        let duration = hours + ' ' + hour_text
        return this.$t('ago', {'duration': duration})
      }else if (minutes>=1){
        let minute_text = null
        if (minutes == 1)
          minute_text = this.$tc('minute', 1)
        else
          minute_text = this.$tc('minute', 2)
        let duration = minutes + ' ' + minute_text
        return this.$t('ago', {'duration': duration})
      }
    }
  }
}
</script>
