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

const Keycloak = require('keycloak-js');
const fs = require('fs');

Vue.config.productionTip = false

let initOptions = JSON.parse(fs.readFileSync('../keycloak.json'));
let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).success((auth) =>{
    
    if(!auth) {
      window.location.reload();
    } else {
      Vue.$log.info("Authenticated");
    }
 
    new Vue({
      render: h => h(App),
    }).$mount('#app')
  

    localStorage.setItem("vue-token", keycloak.token);
    localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

    setTimeout(() =>{
      keycloak.updateToken(70).success((refreshed)=>{
        if (refreshed) {
          Vue.$log.debug('Token refreshed'+ refreshed);
        } else {
          Vue.$log.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).error(()=>{
          Vue.$log.error('Failed to refresh token');
      });


    }, 60000)

}).error(() =>{
  Vue.$log.error("Authenticated Failed");
});
