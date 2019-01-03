<template>
  <div class="toolbar-container">
    <div class="logo-container">
      <p>Alma<strong>Matr</strong></p>
      <img class="logo-image" src="@/assets/cap.svg" alt="logo">
    </div>
    <div class="nav">
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'ToolBar',
    methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.toolbar-container {
  display: flex;
  width: 80%;
  position: absolute;
  // margin: (42.8 * $unit_height) (79.9 * $unit_width);
  margin-bottom: 0;
  font: 100% $font_secondary;
  color: $primary_font;
  font-size: 1rem;
  font-weight: 400;

  .logo-container {
    display: flex;
    strong {
      font-weight: bold;
    }
    .logo-image {
      height: 30px;
      width: 30px;
      margin: 3.9px 0 0 3.9px;
    }
  }

  .nav {
    position: absolute;
    right: 0;
  }
}
</style>
