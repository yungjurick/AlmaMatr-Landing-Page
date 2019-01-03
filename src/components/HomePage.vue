<template>
  <section class="main-view">
    <div class="bg-shape"/>
    <ToolBar />
    <div class="main-content-container">
      <div class="main-content-left">
        <h1 class="content-top">
          Turn your university network into community
        </h1>
        <!-- <div class="email-input">
          <input type="text" placeholder="Enter your email...">
          <a href="https://www.google.com">
            <img class="email-image" src="@/assets/envelope-regular.svg" alt="email">
          </a>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import ToolBar from './ToolBar.vue';

export default {
  name: 'HomePage',
  components: {
    ToolBar
  }
};
</script>

<style lang="scss">
@import '../assets/theme.scss';
.main-view {
  height: 100vh;
  width: 100vw;
}
.bg-shape {
  position: absolute;
  //background: url('./assets/bg-polygon.svg');
  background-size: cover;
  height: 100vh;
  width: 55vw;
  top: 0;
  right: 0;
  z-index: -1;
}
.main-content-container {
  display: flex;
  height: 100%;
  padding: 0 (79.9 * $unit_width);
  .main-content-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: $primary_font;
    .content-top {
      font-size: 2rem;
      font-weight: 400;
      text-align: left;
      line-height: 12rem;
      margin-bottom: 20 * $unit_height;
    }
    .content-bottom {
      font: 100% $font_secondary;
      font-size: 4rem;
      font-weight: 300;
      text-align: left;
      line-height: 5rem;
      margin-bottom: 67 * $unit_height;
    }
    .email-input {
      width: 299px;
      height: 55px;
      box-shadow: 2px 6px 10px 0 rgba(0, 0, 0, 0.24);
      border-radius: 23px;
      display: flex;
      align-items: center;
      input {
        flex: 1 1 100%;
        font-size: 3rem;
        height: 40%;
        margin-left: 8%;
        &::placeholder {
          font-size: 17px;
        }
        &:focus {
          outline: none;
        }
      }
      .email-image {
        background-color: $primary_color;
        height: 30px;
        width: 30px;
        padding: 13px;
        border-radius: 23px;
        fill: white;
      }
    }
  }
  .main-content-right {
    display: flex;
    align-items: center;
    margin-left: 132 * $unit_width;
    .phone-image {
      height: 522;
      width: 254;
    }
  }
}
</style>
