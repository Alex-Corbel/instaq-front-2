<template>
  <div>
    <header>
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <span class="header-icon user-profile-image">
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
    </header>
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
  </div>
</template>

<script>
import { fetchUserProfile } from "../api/Fetcher.js";

export default {
  name: "Profile",
  props: {
    msg: String
  },
  data() {
    return {
      userProfile: {},
      currentPage: 1
    };
  },
  methods: {
    async getUserProfile(pageIndex) {
      this.userProfile = await fetchUserProfile(this.$route.params.username, pageIndex);
    }
  },
  mounted() {
    try {
      if(this.$route.params.pageindex && this.$route.params.pageindex > 1) {
        this.currentPage = parseInt(this.$route.params.pageindex);
      }
      this.getUserProfile(this.currentPage);
    } catch (err) {
      throw err;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-horizontal-center {
  justify-content: center;
}
.round-image {
  border-radius: 100%;
  height: 100px;
  margin: 0 auto;
  width: 100px;
  overflow: hidden;
  transition: top 0.2s ease-in-out, width 0.5s, height 0.5s;
}
.stat-val {
  font-size: 3em;
  padding-top: 20px;
  font-weight: bold;
}

.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}
</style>
