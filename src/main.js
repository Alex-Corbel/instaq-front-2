import Vue from 'vue'
import router from './routers/index'
import App from './App.vue'
import "../node_modules/bulma/css/bulma.css"
import '@fortawesome/fontawesome-free-webfonts'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
})
