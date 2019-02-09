<template>
  <div class="main-content">
    <div class="bg-image"/>
    <b-container fluid style="padding-top: 80px;">
      <b-row class="text-center">
        <b-col style="font-size: 40px; color: #fff; font-weight: 700;">University Meetups</b-col>
      </b-row>
      <b-row
        class="text-center"
        style="padding-top: 80px; font-family: 'Lato', sans-serif; font-weight: 300; font-size: 46px; color: #fff;"
      >
        <b-col>Coming soon</b-col>
      </b-row>
      <b-row
        align-h="center"
        class="text-center"
        style="padding-top: 40px; font-family: 'Lato', sans-serif; font-weight: 300; font-size: 30px; color: #fff;"
      >
        <b-col md="5">We are currently working on this feature and will launch soon!</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Meetups',
  components: {},
  computed: {}
};
</script>

<style lang="scss">
@import '../assets/theme.scss';

.bg-image {
  position: absolute;
  background: url('../assets/meetup-events.jpg');
  height: 100%;
  width: calc(100% - 290px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;

  &:before {
    content: '\A';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.66);
  }
}
</style>
