import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import ErrorPage from "../views/Error.vue";
import AddPhoto from "../views/AddPhoto.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/profile/:username/:pageindex?",
      name: "Profile",
      component: Profile
    },
    {
      path: "/addphoto",
      name: "AddPhoto",
      component: AddPhoto
    },
    {
      path: "*",
      name: "Error",
      component: ErrorPage
    }
  ]
});
