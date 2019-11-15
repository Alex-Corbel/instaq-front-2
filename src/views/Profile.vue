<template>
  <div class="container mx-auto mt-24 md:mt-18">
    
    <ProfileHeader />
    
    <ProfileContent
        :postPerPage=3*2
      />
  </div>
</template>

<script>
import ProfileHeader from "../components/ProfileHeader";
import ProfileContent from "../components/ProfileContent";
import { store } from "../main";

export default {
  name: "Profile",
  components: { ProfileHeader, ProfileContent },
  data() {
    return {};
  },
  mounted() {
    store.dispatch("retrieveProfile");
  }
};
</script>
