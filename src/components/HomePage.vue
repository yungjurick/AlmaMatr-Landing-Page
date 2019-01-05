<template>
  <section class="main-view">
    <div class="bg-image" />
    <ToolBar />
    <h1 class="heading">Turn your university network into community</h1>
    <b-container>
      <b-row>
        <div style="width: 400px;">
          <SearchBox />
        </div>
      </b-row>
    </b-container> 
  </section>
</template>

<script>
import ToolBar from './ToolBar.vue';
import SearchBox from './SearchBox.vue'

export default {
  name: 'HomePage',
  components: {
    ToolBar,
    SearchBox
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
  background: url('../assets/background.jpg');
  background-size: cover;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: -1;
}
.bg-image {
    position: absolute;
    background: url('../assets/background.jpg');
    height: 100vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
}
.bg-image:after {
    content:'\A';
    position:absolute;
    width:100%; height:100%;
    top:0; left:0;
    background: black;
    opacity: 0.1989397321428572;
}
.heading {
  color: white;
  font-family: $font_main;
  margin-top: 45px;
  margin-left: 65px;
  margin-bottom: 45px;
}

</style>
