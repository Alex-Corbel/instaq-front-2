import Vue from "vue";
import router from "./routers/index";
import App from "./App.vue";
import "@fortawesome/fontawesome-free-webfonts";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faHeart,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faUser,
  faCompass,
  faComment,
  faShareSquare,
  faBookmark as farBookmark,
  faPaperPlane
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as initOptions from "../keycloak.json";
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import axios from "axios";
import i18n from "./i18n";

library.add([
  farHeart,
  faUser,
  faCompass,
  faSearch,
  faHeart,
  faComment,
  faShareSquare,
  farBookmark,
  faBookmark,
  faPaperPlane
]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.devtools = true;
Vue.config.productionTip = false;

function tokenInterceptor() {
  axios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
}

Vue.use(VueKeyCloak, {
  init: {
    onLoad: "login-required"
  },
  config: initOptions.default,
  onReady: () => {
    tokenInterceptor();
    /* eslint-disable no-new */
    new Vue({ i18n, el: "#app", router: router, render: h => h(App) });
  }
});
