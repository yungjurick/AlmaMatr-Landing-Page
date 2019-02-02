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
  </full-page> -->
  <div>
    <div class="bg-image" />
    <ToolBar />

    <h1 class="heading">Turn your university network into community</h1>

    <b-container>
      <b-row>
        <div style="width: 400px;">
          <SearchBox />
        </div>
      </b-row>
    </b-container>
  </div>
      <!-- <b-container fluid>
        <b-row>
          <b-col md="2">
            <SidePanel />
          </b-col>
          <b-col>
            CONTENT HERE
          </b-col>
        </b-row>
      </b-container> -->

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

    <EditProfile v-if="isEditingProfile" /> -->

</template>

<script>
import ToolBar from './ToolBar.vue';
import SearchBox from './SearchBox.vue';
import EditProfile from './EditProfile.vue';
import SidePanel from './SidePanel.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      loader: null
    }
  },
  mounted() {
    // if(this.isLoading) {
    //   this.loader = this.$loading.show()
    // }
  },
  components: {
    ToolBar,
    SearchBox,
    EditProfile,
    SidePanel
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
      if(val && !val.location) {
        this.$store.dispatch('setEditProfile', true);
      }
    }
  }
};
</script>

<style lang="scss">

@import '../assets/theme.scss';

.bg-image {
    position: absolute;
    background: url('../assets/background.jpg');
    height: 100vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;

    &:after {
      content:'\A';
      position:absolute;
      width:100%; height:100%;
      top:0; left:0;
      background: black;
      opacity: 0.1989397321428572;
    }
}

.heading {
  color: white;
  font-family: $font_main;
  margin-top: 45px;
  margin-left: 65px;
  margin-bottom: 45px;
}

</style>
