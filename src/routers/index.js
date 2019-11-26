import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import ErrorPage from "../views/Error.vue";
import CreatePost from "../views/CreatePost.vue";
import FirstSteps from "../views/FirstSteps.vue";
import Splashscreen from "../views/Splashscreen.vue";
import Settings from "../views/Settings.vue";
import PostDetails from "../views/PostDetails.vue";
import SearchResult from "../views/SearchResult.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/splashscreen",
      name: "Splashscreen",
      component: Splashscreen
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
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
      path: "/post/:postId",
      name: "PostDetails",
      component: PostDetails
    },
    {
      path: "/search/:type/:searchString",
      name: "SearchResult",
      component: SearchResult
    },
    {
      path: "*",
      name: "Error",
      component: ErrorPage
    }
  ]
});
