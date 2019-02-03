<template>
  <section>
    <SidePanel/>
    <router-view/>
  </section>
</template>

<script>
import SidePanel from '@/components/SidePanel.vue';
export default {
  components: {
    SidePanel
  }
};
</script>

<style>
</style>
