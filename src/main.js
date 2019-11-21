import Vue from "vue";
import router from "./routers/index";
import App from "./App.vue";
import "@fortawesome/fontawesome-free-webfonts";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faHeart,
  faBookmark,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faUser,
  faCompass,
  faPlusSquare,
  faComment,
  faShareSquare,
  faBookmark as farBookmark,
  faPaperPlane,
  faTimesCircle
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as initOptions from "../keycloak.json";
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import i18n from "./i18n";
import store from "./store";
import { action_types } from "./store/types";
import "./registerServiceWorker";

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
  faPaperPlane,
  faPowerOff,
  faPlusSquare,
  faTimesCircle
]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.use(VueKeyCloak, {
  init: {
    onLoad: "login-required"
  },
  logout: {
    redirectUri: "http://192.168.1.19:8080/"
  },
  config: initOptions.default,
  onReady: keycloak => {
    store.dispatch(action_types.UPDATE_TOKEN, keycloak.token);
    store.dispatch(action_types.UPDATE_USER_ID, keycloak.idTokenParsed.sub);
    new Vue({
      i18n,
      el: "#app",
      router: router,
      store,
      render: h => h(App)
    });
    store.dispatch(action_types.RETRIEVE_PROFILE).then(() => {
      if (!store.state.profile || store.state.profile.user_name === "") {
        router.replace("/first-step");
        return;
      }
    });
  }
});

export { store };
