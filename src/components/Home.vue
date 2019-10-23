<template>
  <div class="container">
  {{ $keycloak.userName }}
  <br/>
  {{ $keycloak.fullName }}
  <br/>
  User id: {{ $keycloak.subject }}
    <div class="section" v-for="post in posts" :key="post.id">
      <div  class="card is-horizontal columns">
        <div class="card-image column is-three-fifths">
          <figure class="image is-4by3">
            <img
              v-bind:src="post.image"
              alt="this used to be photo"
            />
          </figure>
        </div>
        <div class="card-content column is-two-fifths">
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img v-bind:src="post.user.avatar" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{post.user.firstname}} {{post.user.lastname}}</p>
              <p class="subtitle is-6">
                <router-link v-bind:to="'/profile/'+post.user.username" class="tag is-rounded">@{{post.user.username}}</router-link>
              </p>
            </div>
          </div>

          <div class="content">
            {{post.description}}
          </div>
          <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <font-awesome-icon icon="heart" />
            </span>
          </a>
          <p> {{post.like}} J'aime</p>
        </div>
      </nav>
      <div class="comments">
        <p v-for="comment in post.comments" :key="comment.uuid"><strong>{{comment.user.username}}</strong> : {{comment.message}}</p>
        <div class="new-comment">
          <div class="control">
            <input class="input is-small" type="text" placeholder="Commentaire">
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { fetchNewsFeed } from "../api/Fetcher.js";

export default {
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async getNewsFeed() {
      this.posts = await fetchNewsFeed();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments {
  border-radius: 5px;
  border: 1px solid lightgrey;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
}
.new-comment {
  margin-top: 10px;
}
</style>