<template>
  <div class="container">
    <div class="section">
      <div class="card is-horizontal columns">
        <div class="card-image column is-three-fifths">
          <figure class="image is-4by3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Great_Wave_off_Kanagawa2.jpg"
              alt="this used to be photo"
            />
          </figure>
        </div>
        <div class="card-content column is-two-fifths">
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">John Smith</p>
              <p class="subtitle is-6">
                <router-link to="/profile" class="tag is-rounded">@johnsmith</router-link>
              </p>
            </div>
          </div>

          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            <a>@bulmaio</a>
          </div>
          <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <font-awesome-icon icon="heart" />
            </span>
          </a>
          <p> 15 688 J'aime</p>
        </div>
      </nav>
      <div class="content">
        <p><strong>Username</strong> Wow quelle magnifique photo</p>
      </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  text-align: center;
}
</style>