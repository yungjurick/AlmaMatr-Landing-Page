<template>
  <section>
  	<ToolBar />
    <SidePanel />
    <router-view />
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

<style>
</style>
