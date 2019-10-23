import Vue from 'vue'
import router from './routers/index'
import App from './App.vue'
import "../node_modules/bulma/css/bulma.css"
import '@fortawesome/fontawesome-free-webfonts'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as initOptions from '../keycloak.json'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import axios from 'axios';

library.add(faHeart)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

function tokenInterceptor () {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
    return config
  }, error => {
    return Promise.reject(error)
  })
}

Vue.use(VueKeyCloak, {
  init: {
    onLoad: 'login-required'
  },
  config: initOptions.default,
  onReady: (keycloak) => {
    console.log(`I wonder what Keycloak returns: ${keycloak}`)
    tokenInterceptor()
    /* eslint-disable no-new */
    new Vue({
      el: "#app",
      router: router,
      render: h => h(App)
    })
  }
})
