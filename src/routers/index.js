import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Profile from "../components/Profile.vue";
import Signup from "../components/Signup.vue";
import ErrorPage from "../components/Error.vue";
import AddPhoto from "../components/AddPhoto.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/profile/:username",
        name: "Profile",
        component: Profile
      },
      {
        path: "/signup",
        name: "Signup",
        component: Signup
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
      },

  ]
});
