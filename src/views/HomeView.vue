<template>
  <section>
    <ToolBar/>
    <SidePanel/>
    <div class="home-content-container">
      <router-view/>
    </div>
  </section>
</template>

<script>
import SidePanel from '@/components/SidePanel.vue';
import ToolBar from '@/components/ToolBar.vue';
export default {
  components: {
    SidePanel,
    ToolBar
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

