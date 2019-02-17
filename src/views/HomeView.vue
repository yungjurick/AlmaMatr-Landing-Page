<template>
  <section>
    <ToolBar/>
    <SidePanel/>
    <div class="home-content-container">
      <router-view/>
    </div>
    <EditProfile v-if="isEditingProfile" />
  </section>
</template>

<script>
import SidePanel from '@/components/SidePanel.vue';
import ToolBar from '@/components/ToolBar.vue';
import EditProfile from '@/components/EditProfile.vue';

export default {
  components: {
    SidePanel,
    ToolBar,
    EditProfile
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
  	isEditingProfile() {
  		return this.$store.getters.editProfile;
    }
  },
  watch: {}
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

