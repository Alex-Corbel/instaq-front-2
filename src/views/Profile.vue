<template>
  <div class="container mx-auto mt-24 md:mt-18 h-screen">
    <div class="flex justify-center">
      <ProfileHeader
        :username="username"
        :bio="bio"
        :website="website"
        :postsCount="postsCount"
        :followingCount="followingCount"
        :followersCount="followersCount"
        :image="image"
        :name="name"
      >
      </ProfileHeader>
    </div>
  </div>
    <!--<div class="">
      <div class="">
        <div class="">
          <span class="">
            <img v-bind:src="userProfile.avatar" />
          </span>
        </div>
        <div class="column is-4-tablet is-10-mobile name">
          <p>
            <span class="title is-bold">{{ userProfile.firstname }} {{ userProfile.lastname }}</span>
            <br />
            <router-link
              to="/addphoto"
              class="button is-primary is-outlined"
              href="#"
              id="edit-preferences"
              style="margin: 5px 0"
            >Ajouter une photo</router-link>
            <br />
          </p>
          <p class="tagline">{{ userProfile.description }}</p>
        </div>
        <div class="column is-2-tablet is-4-mobile has-text-centered">
          <p class="stat-val">{{userProfile.publicationCount || 0}}</p>
          <p class="stat-key">Publications</p>
        </div>
        <div class="column is-2-tablet is-4-mobile has-text-centered">
          <p class="stat-val">{{userProfile.followerCount || 0}}</p>
          <p class="stat-key">Abonnés</p>
        </div>
        <div class="column is-2-tablet is-4-mobile has-text-centered">
          <p class="stat-val">{{userProfile.followingCount || 0}}</p>
          <p class="stat-key">Abonnements</p>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-one-quarter-desktop is-half-tablet"
        v-for="post in userProfile.posts"
        :key="post.id"
      >
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by2">
              <img v-bind:src="post.image" alt/>
            </figure>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li v-if="currentPage > 1">
            <router-link v-bind:to="'/profile/'+ this.$route.params.username + '/' + (currentPage-1)"><a class="pagination-link">{{ (currentPage - 1) }}</a></router-link>
          </li>
          <li>
            <router-link v-bind:to="'/profile/'+ this.$route.params.username + '/' + (currentPage)"><a class="pagination-link is-current" aria-current="page">{{ currentPage }}</a></router-link>
          </li>
          <li>
            <router-link v-bind:to="'/profile/'+ this.$route.params.username + '/' + (currentPage+1)"><a class="pagination-link">{{ (currentPage + 1) }}</a></router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>-->
</template>

<script>
import ProfileHeader from '../components/ProfileHeader'

export default {
  name: "Profile",
  components: {ProfileHeader},
  data() {
    return {
      username: this.$route.params.username,
      bio: null,
      image: null,
      website: null,
      followersCount: null,
      followingCount: null,
      postsCount: null,
      name: null
    };
  },
  methods: {
    getHeaderInformations: function (username) {
      if (username)
        return {'bio': 'coucou',
                'name': 'Louis Perdereau',
                'image': 'https://scontent-cdt1-1.cdninstagram.com/vp/cbe5e1957a350d57f58d7f45f99287d6/5E45DEC4/t51.2885-19/11282006_435888173258072_222583534_a.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com',
                'website': 'https://louisperdereau.fr',
                'followingCount': 10,
                'followersCount': 20,
                'postsCount': 160}
    }
  },
  mounted() {
    let data = this.getHeaderInformations(this.username);
    this.bio = data.bio
    this.image = data.image
    this.website = data.website
    this.followingCount = data.followingCount
    this.followersCount = data.followersCount
    this.postsCount = data.postsCount
    this.name = data.name
  },
};
</script>