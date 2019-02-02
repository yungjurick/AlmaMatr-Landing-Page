<template>
  <div class="main-content">
    COMING SOON!
  </div>
</template>

<script>

export default {
  name: 'Meetups',
  data() {
    return {
      loader: null
    }
  },
  mounted() {
  },
  components: {},
  computed: {
    currentUser() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style lang="scss">

@import '../assets/theme.scss';


</style>
