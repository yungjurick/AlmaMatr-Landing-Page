<template>
  <div class="main-content">
    <div class="main-content__top">
      <h1 class="main-content-title">University members in {{ this.currentUser.location }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loader: null
    };
  },
  mounted() {},
  components: {},
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
      if (!val.location) {
        this.$store.dispatch('setEditProfile', true);
      }
    }
  }
};
</script>

<style lang="scss">
@import '../assets/theme.scss';

.heading {
  color: white;
  font-family: $font_main;
  margin-top: 45px;
  margin-left: 65px;
  margin-bottom: 45px;
}
</style>
