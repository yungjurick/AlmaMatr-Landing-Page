<template>
  <div class="main-content-container">
    <div class="main-content__top">
      <h1 class="main-content-title">
        Other university members in
        <small
          class="main-content-subtitle"
        >
        {{ location }}
        </small>
      </h1>
    </div>
    <div class="main-content-cards-container">
      <profile-card
        class="card-container"
        v-for="usersInfo in usersData"
        :propData="usersInfo"
        :key="usersInfo.index"
      />
    </div>
  </div>
</template>

<script>
import profileCard from '@/components/profileCard';
export default {
  name: 'Home',
  data() {
    return {
      loader: null,
      location: null
    };
  },
  created() {
    if(this.currentUser) {
      this.location = `${this.currentUser.city}, ${this.currentUser.country}`;
    }
  },
  mounted() {
    if(!this.$store.getters.usersData) 
      this.$store.dispatch('readUserData', `${this.currentUser.country}/${this.currentUser.city}`);
  },
  components: {
    profileCard
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
    isEditingProfile() {
      return this.$store.getters.editProfile;
    },
    usersData() {
      return this.$store.getters.usersData;
    }
  },
  watch: {
    currentUser(val) {
      // For page refresh
      if(val) {
        this.location = `${val.city}, ${val.country}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';
.main-content-container {
  position: relative;
  .main-content__top {
    display: flex;
    align-items: center;
    margin: $main_content_margin;
    background: #fff;
    .main-content-title {
      font-family: $font_secondary;
      font-weight: 700;
      font-size: 19px;
    }
    .main-content-subtitle {
      font-weight: 500;
    }
  }
  .main-content-cards-container {
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
    .card-container {
      margin: 0 10px 10px 0;
    }
  }
}
</style>

