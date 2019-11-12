<template>
  <div class="container mx-auto mt-24 md:mt-18">
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
        :posts="posts"
      >
    </ProfileContent>

    <ProfilePagination
      :username="username"
      :currentPage=1
      :postsCount="postsCount"
      :numberOfLine=4
    >
    </ProfilePagination>
  </div>
</template>

<script>
import ProfileHeader from '../components/ProfileHeader'
import ProfileContent from '../components/ProfileContent'
import ProfilePagination from '../components/ProfilePagination'
import userData from '../fixtures/users.json'
import postData from '../fixtures/posts.json'

export default {
  name: "Profile",
  components: {ProfileHeader, ProfileContent, ProfilePagination},
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