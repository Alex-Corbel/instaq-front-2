import Vue from 'vue'
import router from './routers/index'
import App from './App.vue'
import "../node_modules/bulma/css/bulma.css"
import '@fortawesome/fontawesome-free-webfonts'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
})
