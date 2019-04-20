<template>
  <section class="landing-container">
    <div class="bg-image"/>
    <tool-bar/>
    <h1 class="landing-header-title">Turn your university network into community</h1>
    <div class="searchbox-container">
      <SearchBox />
    </div>
    <!-- <EditProfile v-if="isEditingProfile" /> -->
  </section>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue';
import SearchBox from '@/components/SearchBox.vue';
import EditProfile from '@/components/EditProfile.vue';

export default {
  name: 'LandingView',
  components: {
    ToolBar
  },
  components: {
    ToolBar,
    SearchBox,
    EditProfile
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
    currentLocation() {
      return this.$store.getters.location;
    },
    isEditingProfile() {
      return this.$store.getters.editProfile;
    }
  },
  watch: {
    currentUser(val) {
      if(val) {
        this.$router.push('/home');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.landing-container {
  height: 100vh;
  .landing-header-title {
    color: white;
    font-family: $font_title;
    font-size: 42px;
    font-weight: 400;
    line-height: 62px;
    margin: 25px 0 45px 45px;
  }

  .bg-image {
    position: absolute;
    background: url('../assets/background.jpg');
    height: 100vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    
    &:before {
      content: '\A';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.15);
    }
  }

  .searchbox-container {
    width: 420px;
    margin-left: 103px;
  }
}
</style>
