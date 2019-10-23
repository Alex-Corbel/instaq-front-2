<template>
<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      INSTA-Q
    </router-link>
  </div>
  <div class="navbar-end">
    <div class="field has-addons wrap">
      <div class="control search">
        <input class="input" type="text" placeholder="Chercher un utilisateur...">
      </div>
      <div class="control">
        <a class="button is-white">
          Chercher
        </a>
      </div>
    </div>
    <div class="navbar-item">
      <div class="buttons">  
        <button
          @click="$keycloak.logoutFn"
          v-if="$keycloak.authenticated"
          class="button is-light"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  width: 100%;
  position: relative
}

.wrap{
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
