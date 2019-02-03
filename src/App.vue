<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loader: null
    };
  },
  mounted() {
    if (this.isLoading) {
      this.loader = this.$loading.show();
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
    isLoading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    isLoading(val) {
      if (val === false) {
        this.loader.hide();
      } else {
        this.loader = this.$loading.show();
      }
    }
  }
};
</script>
