<template>
  <b-navbar toggleable="md" type="dark" class="nav-background">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#" class="logo">
      Alma<strong>Matr</strong>
      <img src="../assets/logo-white.png" class="d-inline-block align-top" alt="BV" style="width: 30px; height: 30px; margin-top: 5px; margin-left: 5px; transform: rotate(18deg);" />
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" style="color: white;">
        <b-nav-item href="#">Home</b-nav-item>

        <template v-if="!currentUser">
          <b-nav-item href="#">Product</b-nav-item>
          <b-nav-item href="#">Features</b-nav-item>
          <b-nav-item @click="googleLogin" href="#">Sign in</b-nav-item>
        </template>

        <template v-else>
          <b-nav-item href="#">Inbox</b-nav-item>
          <b-nav-item href="#">Connects</b-nav-item>
          <b-nav-item href="#" class="profile_image">
            <b-dropdown variant="link" offset="-120" no-caret>
              <template slot="button-content">
                <img :src="currentUser.imageUrl" style="width: 35px; height: 35px; border-radius: 50%; border: 1px solid white;">
              </template>
              <b-dropdown-item @click="toggleProfileEdit" href="#">Edit Profile</b-dropdown-item>
              <b-dropdown-item @click="logout" href="#">Sign out</b-dropdown-item>
            </b-dropdown>
          </b-nav-item>
        </template>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import database from '@/services/database'
  //import store from '@/store'

  export default {
    name: 'ToolBar',
    data() {
      return {
        error: ''
      }
    },
    computed: {
      currentUser() {
        return this.$store.getters.user;
      }
    },
    methods: {
      async googleLogin() {

        let loader = this.$loading.show();

        let result = await database.signIn();
        if (result.message) {
          this.error = result.message;
          console.log(this.error)
        }
        loader.hide();
      },
      async logout() {
        let loader = this.$loading.show();
        await database.signOut();

        setTimeout(() => {
          loader.hide()
        }, 500)
      },
      toggleProfileEdit() {
        this.$store.dispatch('setEditProfile', true)
      }
    }
  };
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.logo {
  padding-left: 50px;
}
.nav-background {
  border-bottom: 1px solid white;
  font-size: 16px;
  font-family: $font_secondary;

  .navbar-nav .profile_image a.nav-link {
    padding: 0;
  }

  .navbar-nav .nav-link {
    color: white;
  }

}

.navbar-nav .profile_image a.nav-link .dropdown .dropdown-menu {
  background-color: #000;

  // .dropdown-item{
  //   color: #fff;
  // }
}

</style>
