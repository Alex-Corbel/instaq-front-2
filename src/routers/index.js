import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import ErrorPage from "../views/Error.vue";
import CreatePost from "../views/CreatePost.vue";
import FirstSteps from "../views/FirstSteps.vue";
import Splashscreen from "../views/Splashscreen.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/splashscreen",
      name: "Splashscreen",
      component: Splashscreen
    },
    {
      path: "/first-step",
      name: "FirstSteps",
      component: FirstSteps
    },
    {
      path: "/",
      name: "Root",
      component: Home
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/profile/:username/:pageIndex?",
      name: "Profile",
      component: Profile
    },
    {
      path: "/create-post",
      name: "CreatePost",
      component: CreatePost
    },
    {
      path: "*",
      name: "Error",
      component: ErrorPage
    }
  ]
});
