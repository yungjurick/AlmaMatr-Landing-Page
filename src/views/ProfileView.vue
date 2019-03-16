<template>
  <div v-if="userInformation" class="profile-container">
    <profile-info :propsData="userInformation"></profile-info>
    <section class="interest-info"></section>
  </div>
</template>

<script>
import profileInfo from '@/components/Profile/ProfileInfoContainer';
export default {
  data() {
    return {};
  },
  components: {
    profileInfo
  },
  mounted() {
    this.$store.dispatch('readUserByUID', this.$route.params.uid);
  },
  computed: {
    userInformation() {
      return this.$store.state.userData;
    }
  }
};
</script>

<style lang="scss" scoped>
.profile-container {
  .interest-info {
    background-color: #f7f7f7;
    height: 100vh;
  }
}
</style>
