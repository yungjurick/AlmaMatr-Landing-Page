<template>
  <div class="main-content">
    <b-container fluid style="padding: 0;">
      <b-row no-gutters>
        <b-col class="network-container" md="8">
          <b-container fluid>
            <b-row><h5>Network</h5></b-row>
            <b-row class="text-center">
              <b-col><SearchBar :searchOptions="usersData" /></b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="search-results-container">
                  <!-- Display user network here, instead of all users -->
                  <profile-card
                    class="card-container"
                    v-for="usersInfo in usersData"
                    :propData="usersInfo"
                    :key="usersInfo.index"
                  />
                </div>
              </b-col>
            </b-row>
          </b-container>
          
        </b-col>

        <b-col class="request-container" md="4">
          <h5>
            {{ (requests.length === 1) ? 'Request (1)' : `Requests (${requests.length})` }}
          </h5>

          <RequestCell
            v-for="req in requests"
            v-bind:requestUser="req"
            v-bind:key="req.index"
          />

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SearchBar from '../SearchBar.vue';
import RequestCell from './RequestCell.vue';
import profileCard from '../profileCard';

export default {
  name: 'Network',
  data() {
    return {
      connects: [
      ],
      sortBy: null,
      sortOptions: [
        { value: null, text: 'Sort by' },
        { value: 'name', text: 'Name' },
        { value: 'company', text: 'Company' },
        { value: 'location', text: 'City' }
      ],
      requests: [
        {
          uid: '1',
          name: 'Jihyun Kim',
          vocation: 'Tech Analyst',
          city: 'Singapore',
          imageUrl: ''
        },
        {
          uid: '2',
          name: 'Tauqir Khan',
          vocation: 'Graduate Trainee',
          city: 'Abu Dhabi',
          imageUrl: ''
        },
        {
          uid: '3',
          name: 'Andrew Callendar',
          vocation: 'Tech Analyst',
          city: 'London',
          imageUrl: ''
        }
      ]
    }
  },
  components: {
    SearchBar,
    RequestCell,
    profileCard
  },
  mounted() {
    if(!this.$store.getters.usersData)
      this.$store.dispatch('readUserData');
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
    usersData() {
      return this.$store.getters.usersData;
    }
  }
};

</script>

<style lang="scss" scoped>

@import '../../assets/theme.scss';

.network-container {
  h5 {
    font-family: $font_main;
    font-weight: 400;
    margin: 20px 70px;
  }

  .search-results-container {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 70px;
    .card-container {
      margin: 0 10px 10px 0;
    }
  }
}

.tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  min-height: 150px;
  border-radius: 5px;
  background-color: white;
  margin-bottom: 10px;
}

.request-container {
  background-color: #e7e7e7;
  height: calc(100vh - 65px);

  h5 {
    font-family: $font_main;
    margin: 20px;
  }
}

.button {
  font-size: 10px;
  padding: 1px;
  margin-bottom: 2px;
  border-radius: 2px;
}

</style>
