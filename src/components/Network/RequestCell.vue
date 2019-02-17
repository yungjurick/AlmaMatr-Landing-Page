<template>
  <b-container fluid style="padding: 15px; border-top: 0.5px solid #d9d9d9;">
    <b-row class="text-center" no-gutters>
      <b-col>
        <img :src="requestUser.imageUrl" style="height: 40px; width: 40px; border-radius: 2px;" />
      </b-col>
      <b-col md="8" >
        <b-container style="font-size: 14px;">
          <b-row style="font-weight: 700;">
            {{ requestUser.name }}
          </b-row>
          <b-row>
            {{ `${requestUser.vocation}, ${requestUser.city}` }}
          </b-row>
        </b-container>
      </b-col>
      <b-col>
        <b-container>
          <b-row>
            <b-button class="button" variant="secondary" block>Accept</b-button>
          </b-row>
          <b-row>
            <b-button class="button" variant="outline-secondary" block>Decline</b-button>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>

export default {
  name: 'RequestCell',
  data() {
    return {
      
    }
  },
  props: {
    requestUser: Object
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

@import '../../assets/theme.scss';

.button {
  font-size: 10px;
  padding: 1px;
  margin-bottom: 2px;
  border-radius: 2px;
}

</style>
