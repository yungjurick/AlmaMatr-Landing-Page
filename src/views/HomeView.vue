<template>
  <section>
    <ToolBar />
    <SidePanel v-if="enableFeatures" />
    <div class="home-content-container">
      <ProfileEdit v-if="isEditingProfile" />
      <router-view v-if="enableFeatures" />
      <!-- <ProfileEdit v-if="showModal" @close="showModal = false" /> -->
    </div>
    <!-- <EditProfile v-if="isEditingProfile" /> -->
    
  </section>
</template>

<script>
import SidePanel from '@/components/SidePanel.vue';
import ToolBar from '@/components/ToolBar.vue';
import EditProfile from '@/components/EditProfile.vue';
import ProfileEdit from '@/components/ProfileEdit.vue';

export default {
  components: {
    SidePanel,
    ToolBar,
    EditProfile,
    ProfileEdit
  },
  data() {
    return {
      showModal: false,
      enableFeatures: false
    };
  },
  created() {
    if (this.currentUser) {
      if (!this.currentUser.class || !this.currentUser.country) {
        this.$store.dispatch('setEditProfile', true);
      } else {
        this.enableFeatures = true;
      }
    }
    //this.enableFeatures = (this.currentUser) ? (this.currentUser.class !== null) : false;
  },
  mounted() {},
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
  	isEditingProfile() {
  		return this.$store.getters.editProfile;
    }
  },
  watch: {
    currentUser(val) {
      if(val && (!val.class || !val.country)) {
        this.$store.dispatch('setEditProfile', true);
      } else {
        this.enableFeatures = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';
.home-content-container {
  height: auto;
  width: $main_content_width;
}
@media (min-width: 768px) {
  .home-content-container {
    margin-left: 290px;
    height: calc(100vh - 65px);
  }
}
@media (max-width: 768px) {
  .home-content-container {
    padding-left: 0;
  }
}
</style>

