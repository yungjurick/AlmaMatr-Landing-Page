<template>
  <!--   <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section">
      <div class="bg-image" />
      <ToolBar />

      <h1 v-if="!currentUser" class="heading">Turn your university network into community</h1>
      <h1 v-else class="heading">Welcome, {{ currentUser.name }}!</h1>

      <b-container>
        <b-row>
          <div style="width: 400px;">
            <SearchBox />
          </div>
        </b-row>
      </b-container>
    </div>
    <div class="section">
      Second section ...
    </div>
  </full-page>-->
  <section class="landing-container">
    <div class="bg-image"/>
    <tool-bar/>
    <h1 class="landing-header-title">Turn your university network into community</h1>
    <div class="searchbox-container">
      <SearchBox/>
    </div>
  </section>
  <!-- <b-container fluid>
        <b-row>
          <b-col md="2">
            <SidePanel />
          </b-col>
          <b-col>
            CONTENT HERE
          </b-col>
        </b-row>
  </b-container>-->
  <!--     <div class="bg-image" />
    <ToolBar />

    <h1 v-if="!currentUser" class="heading">Turn your university network into community</h1>
    <h1 v-else class="heading">Welcome, {{ currentUser.name }}!</h1>

    <b-container>
      <b-row>
        <div style="width: 400px;">
          <SearchBox />
        </div>
      </b-row>
    </b-container>

  <EditProfile v-if="isEditingProfile" />-->
</template>

<script>
import ToolBar from '@/components/ToolBar.vue';
import SearchBox from '@/components/SearchBox.vue';
import EditProfile from '@/components/EditProfile.vue';

export default {
  name: 'HomePage',
  components: {
    ToolBar
  },
  data() {
    return {
      loader: null
    };
  },
  mounted() {
    // if(this.isLoading) {
    //   this.loader = this.$loading.show()
    // }
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
    isEditingProfile() {
      return this.$store.getters.editProfile;
    },
    isLoading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    // isLoading(val) {
    //   if(val === false) {
    //     this.loader.hide()
    //   } else {
    //     this.loader = this.$loading.show()
    //   }
    // },
    currentUser(val) {
      if (val && !val.location) {
        this.$store.dispatch('setEditProfile', true);
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
