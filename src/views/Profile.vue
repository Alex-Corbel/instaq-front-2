<template>
  <div v-if="firstname" class="container mx-auto mt-24 md:mt-18">
    
    <ProfileHeader
        :username="username"
        :bio="bio"
        :website="website"
        :postsCount="postsCount"
        :followingCount="followingCount"
        :followersCount="followersCount"
        :avatar="avatar"
        :firstname="firstname"
        :lastname="lastname"
    >
    </ProfileHeader>
    
    <ProfileContent
        :page=1
        :postPerPage=3*2
        :posts="posts"
        :postsCount="postsCount"
      >
    </ProfileContent>
  </div>
  <div v-else class="flex mt-32 justify-center">
    <img class="w-40 h-40" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/ab79a231234507.564a1d23814ef.gif"/>
  </div>
</template>

<script>
import ProfileHeader from '../components/ProfileHeader'
import ProfileContent from '../components/ProfileContent'
import userData from '../fixtures/users.json'
import postData from '../fixtures/posts.json'

export default {
  name: "Profile",
  components: {ProfileHeader, ProfileContent},
  data() {
    return {
      username: this.$route.params.username,
      bio: null,
      avatar: null,
      website: null,
      followersCount: null,
      followingCount: null,
      postsCount: null,
      firstname: null,
      lastname: null
    };
  },
  methods: {
    getHeaderInformations: function (username) {
      if (username) {
        return userData.find(user =>
          user.username.toString().toLowerCase() === username.toString().toLowerCase()
        );
      }
    },
    getContentInformations: function (username) {
      if (username) {
        return postData.filter(post =>
          post.username.toString().toLowerCase() === username.toString().toLowerCase()
        );
      }
    }
  },
  mounted() {
    let data = this.getHeaderInformations(this.username);
    this.posts = this.getContentInformations(this.username);
    this.bio = data.bio
    this.avatar = data.avatar
    this.website = data.website
    this.followingCount = data.followingCount
    this.followersCount = data.followersCount
    this.postsCount = data.postsCount
    this.firstname = data.firstname
    this.lastname = data.lastname
  },
};
</script>