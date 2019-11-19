<template>
  <div class="container mx-auto mt-24 md:mt-18">
    <div class="flex justify-center" v-if="username === '' || username != usernameParam">
      {{$t("unknown_user")}}
    </div>
    <div v-else>
      <ProfileHeader />
      <ProfileContent :postPerPage="postPerPage" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileHeader from "../components/ProfileHeader";
import ProfileContent from "../components/ProfileContent";
import { action_types } from "../store/types";
import { store } from "../main";

export default {
  name: "Profile",
  components: { ProfileHeader, ProfileContent },
  data() {
    return {
      postPerPage: 6,
      usernameParam: this.$router.currentRoute.params.username,
      currentPageParam: Number(this.$router.currentRoute.params.pageindex || 1)
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.usernameParam = to.params.username;
    this.currentPageParam = to.params.pageIndex || 1;
    this.updateStore();
    this.$forceUpdate();
    next();
  },
  mounted() {
    this.usernameParam = this.$router.currentRoute.params.username;
    this.currentPageParam = Number(
      this.$router.currentRoute.params.pageindex || 1
    );
    this.updateStore();
  },
  methods: {
    updateStore: function() {
      store.dispatch(
        action_types.RETRIEVE_PROFILE_FROM_NAME,
        this.usernameParam
      );
      store.dispatch(
        action_types.UPDATE_CURRENT_PROFILE_PAGE_INDEX,
        this.currentPageParam
      );
    }
  },
  computed: {
    ...mapState({
      username: state => state.profileFromName.user_name,
      currentPage: state => state.currentProfilePageIndex
    })
  }
};
</script>
