<template>
  <div>
    <header>
      <div class='section profile-heading'>
      <div class='columns is-mobile is-multiline'>
        <div class='column is-2'>
          <span class='header-icon user-profile-image'>
            <img class="" alt='' src='http://placehold.it/300x225'>
          </span>
        </div>
        <div class='column is-4-tablet is-10-mobile name'>
          <p>
            <span class='title is-bold'>Paul Miller</span>
            <br>
            <router-link to="/addphoto" class='button is-primary is-outlined' href='#' id='edit-preferences' style='margin: 5px 0'>
              Add pictures
            </router-link>
            <br>
          </p>
          <p class='tagline'>
           Description...
          </p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>30</p>
          <p class='stat-key'>publications</p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>10</p>
          <p class='stat-key'>likes</p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>3</p>
          <p class='stat-key'>friends</p>
        </div>
      </div>
    </div>
    </header>
    <div class="columns is-multiline">
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by2">
              <img src="https://unsplash.it/300/200/?random&pic=1" alt />
            </figure>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by2">
              <img src="https://unsplash.it/300/200/?random&pic=2" alt />
            </figure>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by2">
              <img src="https://unsplash.it/300/200/?random&pic=3" alt />
            </figure>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by2">
              <img src="https://unsplash.it/300/200/?random&pic=4" alt />
            </figure>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by2">
              <img src="https://unsplash.it/300/200/?random&pic=5" alt />
            </figure>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by2">
              <img src="https://unsplash.it/300/200/?random&pic=6" alt />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    msg: String
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
