<template>
  <div class="main-content">
    <b-container fluid style="padding: 0;">
      <b-row no-gutters>
        <b-col class="network-container" md="8">
          <b-container fluid>
            <b-row><h5>My Network</h5></b-row>
            <b-row>
              <b-col>
                <div class="search-bar-container">
                  <input
                    v-model="filter"
                    type="text"
                    placeholder="Search by Name" />
                </div>
                <!-- <SearchBar :searchOptions="usersData" /> -->
              </b-col>
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
      filter: '',
      sortBy: null,
      sortOptions: [
        { value: null, text: 'Sort by' },
        { value: 'name', text: 'Name' },
        { value: 'company', text: 'Company' },
        { value: 'location', text: 'City' }
      ],
      requests: [
        {
          name: 'Jihyun Kim',
          vocation: 'Tech Analyst',
          city: 'Singapore',
          imageUrl: 'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'
        },
        {
          name: 'Tauqir Khan',
          vocation: 'Graduate Trainee',
          city: 'Abu Dhabi',
          imageUrl: 'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'
        },
        {
          name: 'Andrew Callendar',
          vocation: 'Tech Analyst',
          city: 'London',
          imageUrl: 'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'
        }
      ],
      connects: [
        {
          bio:"Testing",
          class:"2021",
          email:"yjk394@nyu.edu",
          id:"TyCQ3kCvKGRsFR4rTqk6bKBpFC13",
          imageUrl:"https://lh5.googleusercontent.com/-U16b6i0OzrQ/AAAAAAAAAAI/AAAAAAAAOnA/Az8XIyTtImE/photo.jpg",
          location:"아부다비",
          name:"Rick Kim",
          university:"NYU Abu Dhabi",
          vocation:"Student"
        },
        {
          bio:"Chill central.",
          class:"2018",
          email:"shehrozeusa@gmail.com",
          id:"p6SE066CRTOKTKRxDo0rtLgypB83",
          imageUrl:"https://firebasestorage.googleapis.com/v0/b/almamater-f5f0a.appspot.com/o/user-images%2Fp6SE066CRTOKTKRxDo0rtLgypB83%2F01.jpg?alt=media&token=09ba6572-6d4f-40b6-953e-9e89447dbd2d",
          location:"Dubai",
          name:"Shehroze Umer Khan",
          university:"NYU Abu Dhabi",
          vocation:"Tech Consultant"
        },
        {
          bio:"Chill central.",
          class:"2018",
          email:"shehrozeusa@gmail.com",
          id:"p6SE066CRTOKTKRxDo0rtLgypB83",
          imageUrl:"https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png",
          location:"Singapore",
          name:"Jihyun Kim",
          university:"NYU Abu Dhabi",
          vocation:"Tech Analyst"
        },
        {
          bio:"Chill central.",
          class:"2018",
          email:"shehrozeusa@gmail.com",
          id:"p6SE066CRTOKTKRxDo0rtLgypB83",
          imageUrl:"https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png",
          location:"London",
          name:"Andrew Callendar",
          university:"NYU Abu Dhabi",
          vocation:"Tech Analyst"
        },
        {
          bio:"Chill central.",
          class:"2017",
          email:"shehrozeusa@gmail.com",
          id:"p6SE066CRTOKTKRxDo0rtLgypB83",
          imageUrl:"https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png",
          location:"Singapore",
          name:"Yi Yi Yeap",
          university:"NYU Abu Dhabi",
          vocation:"Admissions Officer"
        },
        {
          bio:"Chill central.",
          class:"2018",
          email:"shehrozeusa@gmail.com",
          id:"p6SE066CRTOKTKRxDo0rtLgypB83",
          imageUrl:"https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png",
          location:"Abu Dhabi",
          name:"Tauqir Khan",
          university:"NYU Abu Dhabi",
          vocation:"Graduate Trainee"
        },
        {
          bio:"Chill central.",
          class:"2018",
          email:"shehrozeusa@gmail.com",
          id:"p6SE066CRTOKTKRxDo0rtLgypB83",
          imageUrl:"https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png",
          location:"Lahore",
          name:"Farzan Ahmed Khan",
          university:"NYU Abu Dhabi",
          vocation:""
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
      // Using dummy data right now; change to filter user connections
      var users = this.connects.filter((user) => {
          return user.name.toLowerCase().includes(this.filter.toLowerCase());
      });
      return users;
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
    margin: 20px;
  }

  .search-bar-container {
    margin-left: 20px;

    input {
      background: #fff;
      height: 42px;
      width: 50%;
      color: #545454;
      border: 1px solid #cccccc;
      margin-bottom: 0px;
      -webkit-appearance: none;
      border-radius: 4px 0px 0px 4px;
      -moz-border-radius: 4px 0px 0px 4px;
      -webkit-border-radius: 4px 0px 0px 4px;
      display: inline-block;
      text-align: left;
      font-size: 15px;
      font-weight: 500;
      padding: 0px 0px 0px 45px;
      font-size: 16px;
      background: #ffffff url('../../assets/magnifying-glass.png') 16px 13px no-repeat;
      background-size: 15px 15px;
    }
  }

  .search-results-container {
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
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
