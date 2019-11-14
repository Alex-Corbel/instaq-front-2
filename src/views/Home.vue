<template>
  <div class="container mx-auto mt-24 md:mt-18 h-screen">
    <div class="flex items-center justify-center" v-for="post in posts" :key="post.id">
      <Post
        :id="post.id"
        :username="post.username"
        :image="post.image"
        :haveStories="post.haveStories"
        :isLike="post.isLike"
        :likes="post.likes"
        :isMark="post.isMark"
        :description="post.description"
        :userImage="post.userImage"
        :commentsCount="post.commentsCount"
        :lastComment="post.lastComment"
        :date="post.date"
        v-on:bookmarked="displayToast"
      >
      </Post>
    </div>
    <Toast
      :toast="{'class': toastClass}"
      :message="{'class': ['font-semibold', 'mx-2', 'text-left', 'flex-auto'],
                 'text': $t('bookmarked-msg')}"
      :beforeIcon="null"
      :afterIcon="{'content': ['fas', 'save'], 'class': ['mr-1']}"
    />
  </div>
</template>

<script>

// import { fetchNewsFeed } from "../api/fetcher.js"
import Post from '../components/PostAsList'
import Toast from '../components/Toast'

export default {
  name: "Home",
  components: {Post, Toast},
  props: {
    msg: String
  },
  data() {
    return {
      toastClass: {
        'toast': true,
        'ew-toast-show': false,
        'p-2': true,
        'bg-purple-200': true,
        'text-purple-500': true,
        'leading-none': true,
        'rounded-full': true,
        'lg:inline-flex': true
      },
      posts: [
        {
          id: "test1",
          image: "https://tailwindcss.com/img/card-top.jpg",
          username: "nina",
          userImage: "https://scontent-cdt1-1.cdninstagram.com/vp/fe2fa838d3c546c7b70c22395f63a796/5E56EF49/t51.2885-19/s150x150/42595108_1043995229094899_5199110465027833856_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
          isLike: false,
          likes: 400,
          haveStories: true,
          isMark: true,
          description: 'Hello bitch 1',
          commentsCount: 0,
          date: new Date('November 1, 19 04:20')
        },
        {
          id: "test2",
          image: "https://tailwindcss.com/img/card-top.jpg",
          userImage: "https://scontent-cdt1-1.cdninstagram.com/vp/fe2fa838d3c546c7b70c22395f63a796/5E56EF49/t51.2885-19/s150x150/42595108_1043995229094899_5199110465027833856_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
          username: "nina",
          isLike: true,
          likes: 400,
          haveStories: false,
          isMark: false,
          description: 'Hello bitch 2',
          commentsCount: 1,
          lastComment: {username: "lperdereau", text: "To beautiful"},
          date: new Date('November 10, 19 01:00')
        },
        {
          id: "test3",
          image: "https://tailwindcss.com/img/card-top.jpg",
          userImage: "https://scontent-cdt1-1.cdninstagram.com/vp/fe2fa838d3c546c7b70c22395f63a796/5E56EF49/t51.2885-19/s150x150/42595108_1043995229094899_5199110465027833856_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
          username: "nina",
          isLike: true,
          likes: 400,
          haveStories: true,
          isMark: false,
          description: 'Hello bitch 3',
          commentsCount: 100,
          lastComment: {username: "lperdereau", text: "To beautiful"},
          date: new Date('November 10, 19 03:00')
        }
      ]
    }
  },
  methods: {
    async getNewsFeed() {
      // this.posts = await fetchNewsFeed();
    },
    displayToast(){
      this.toastClass['ew-toast-show'] = true;
      setTimeout(()=> {
        this.toastClass['ew-toast-show'] = false;
      }, 1000)
    }
  },
  mounted() {
    try {
      this.getNewsFeed();
    } catch (err) {
      throw err;
    }
  }
};
</script>

<style>
.toast {
  position: fixed;
  bottom: -50px;
  transition: transform 0.5s;
}

.ew-toast-show {
  transform: translateY(-70px);
}
</style>