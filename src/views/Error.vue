<template>
  <div class="notfound">
      <h2>404 - Page introuvable</h2>
      <p>La page que vous avez demandé n'existe pas ou a été supprimée.</p>
      <router-link to="/home"><button class="button is-primary">Direction l'accueil</button></router-link>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .notfound {
    padding-top: 100px;
    text-align: center;
  }
  .notfound>h2 {
    font-size: 50px;
    padding-bottom: 20px;
  }
</style>