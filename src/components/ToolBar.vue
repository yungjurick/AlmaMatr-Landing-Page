<template>
  <div class="toolbar-container">
    <div class="logo-container">
      <p>Alma<strong>Matr</strong></p>
      <img class="logo-image" src="@/assets/cap.svg" alt="logo">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar'
};
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';
.toolbar-container {
  position: absolute;
  margin: (42.8 * $unit_height) (79.9 * $unit_width);
  margin-bottom: 0;
  font: 100% $font_secondary;
  color: $primary_font;
  font-size: 5rem;
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
}
</style>
