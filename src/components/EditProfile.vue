<template>
  <div>
    <b-modal centered ok-only
             validated
             ok-title="Save"
             ok-variant="danger"
             v-model="showModal"
             title="Build your profile"
             @ok="handleOk"
             @shown="clearForm"
             @hide="hidingModal">
      <b-container fluid>
        <form @submit.stop.prevent="handleSubmit">
          
          <b-form-row>
            <b-col>
            <b-alert variant="danger"
                     :show="hasError">
              {{ this.error }}
            </b-alert>
            </b-col>
          </b-form-row>

          <b-form-row>
            <!-- <b-col>
              <b-img thumbnail fluid :src="currentUser.imageUrl" alt="Thumbnail" />
            </b-col> -->
            <b-col style="text-align: center;">
              <image-input v-model="form.avatar">
                <div class="" slot="activator">
                  <b-img v-if="!form.avatar" thumbnail fluid :src="currentUser.imageUrl" alt="Thumbnail" />
                  <b-img v-else thumbnail fluid :src="form.avatar.imageURL" alt="avatar" />
                </div>
              </image-input>
            </b-col>
            <!-- <b-col>
              <b-img thumbnail fluid :src="require('../assets/add-image.png')" alt="Thumbnail" />
            </b-col> -->
          </b-form-row>

          <b-form-row>
            <b-col class="display-name">
              {{ currentUser.name }}
            </b-col>
          </b-form-row>

          <b-form-group required label="School and Graduating Class"
                    label-for="uni-class">
            <b-form-row no-gutters>
              <b-col>
                <b-form-input
                          type="text"
                          v-model="form.university"
                          required
                          placeholder="NYU Abu Dhabi">
                </b-form-input>
              </b-col>
              <b-col>
                <b-form-select
                              :options="gradClass"
                              required
                              v-model="form.gradClass">
                </b-form-select>
              </b-col>
            </b-form-row>
          </b-form-group>

          <b-form-group label="Where are you currently based?"
                        label-for="userLocation"
                        description="To help find other university members in the same location.">
            <b-form-input id="userLocation"
                          type="text"
                          ref="autocomplete"
                          placeholder="Enter city name">
            </b-form-input>
          </b-form-group>

          <b-form-group id="exampleInputGroup1"
                        label="What do you currently do?"
                        label-for="exampleInput1">
            <b-form-input id="exampleInput1"
                          type="text"
                          v-model="form.vocation"
                          placeholder="e.g Associate at AlphaSights">
            </b-form-input>
          </b-form-group>

          <b-form-group id="exampleInputGroup2"
                        label="How would you describe yourself?"
                        label-for="exampleInput2">
            <b-form-textarea id="exampleInput2"
                          v-model="form.bio"
                          required
                          placeholder="e.g Nature, road trips, tacos and photography. If you've never tried Nutella and ritz, you're wasting your life."
                          :rows="3"
                          :max-rows="6">
            </b-form-textarea>
          </b-form-group>

          </form>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import database from '@/services/database';
import ImageInput from './ImageInput.vue';

export default {

  mounted() {

    this.autocomplete = new google.maps.places.Autocomplete(
        (this.$refs.autocomplete.$refs.input), { types: ['geocode'] }
    );

    this.autocomplete.addListener('place_changed', () => {
        let place = this.autocomplete.getPlace();
        //let ac = place.address_components;
        //let lat = place.geometry.location.lat();
        //let lon = place.geometry.location.lng();
        //let city = ac[0]["short_name"];
        
        let addressComponents = place.address_components;
        let city = addressComponents[0]["short_name"];
        let location = (!place.vicinity) ? city : place.vicinity;

        this.form.location = location;

        //console.log(place)
        //console.log(`The user picked ${city} with the coordinates ${lat}, ${lon}`);
    });
  },
  data () {
    return {
      form: {
        avatar: null,
        vocation: null,
        university: null,
        gradClass: null,
        location: null,
        bio: null,
      },
      gradClass: [
          { text: 'Select Class', value: null },
          '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'
        ],
      showModal: true,
      error: null
    }
  },
  components: {
    ImageInput
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
    isEditingProfile() {
      return this.$store.getters.editProfile;
    },
    hasError() {
      return this.error !== null;
    }
  },
  watch: {
    isEditingProfile(val) {
      this.showModal = val;
    }
  },
  methods: {
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault();
      // Validate and submit form
      if (this.validateForm()) {
        this.error = null;
        this.handleSubmit();
      }
    },
    validateForm() {
      for (let key in this.form) {
        if (key == "avatar") continue;
        if(!this.form[key]) {
          console.log(key);
          return false;
        }
      }
      return true;
    },
    handleSubmit () {
      this.$store.commit('setLoading', true);

      let userRef = database.database().ref('users/' + this.currentUser.id);

      //console.log(this.currentUser);
      //let locationRef = database.database().ref('locations/' + location);

      let user = {
        ...this.currentUser,
        vocation: this.form.vocation,
        university: this.form.university,
        class: this.form.gradClass,
        location: this.form.location,
        bio: this.form.bio
      };

      if (this.form.avatar) {
        userRef.update(user)
        .then(() => {
          const imgFile = this.form.avatar.formData.get('file');
          const fileName = imgFile.name;
          const ext = fileName.slice(fileName.lastIndexOf('.'));

          let imagePathReference = database.storage().ref('user-images/' + this.currentUser.id + '/01' + ext);
          return imagePathReference.put(imgFile);
        })
        .then(snapshot => {
          return snapshot.ref.getDownloadURL();
        })
        .then(url => {
          user.imageUrl = url;
          return userRef.update({ imageUrl: url });
        })
        .then(() => {
          this.$store.dispatch('setUser', user);
          this.$store.commit('setLoading', false);
          this.$store.dispatch('setEditProfile', false);
        })
        .catch(error => {
          console.log(error);
          this.$store.commit('setLoading', false);
        })
      } else {
        userRef.update(user)
        .then(() => {
          this.$store.dispatch('setUser', user);
          this.$store.commit('setLoading', false);
          this.$store.dispatch('setEditProfile', false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit('setLoading', false);
        });
      }

      //console.log(user);
      
    },
    clearForm() {
      this.form.avatar = null;
      this.form.vocation = this.currentUser.vocation;
      this.form.university = this.currentUser.university;
      this.form.gradClass = this.currentUser.class;
      this.form.location = this.currentUser.location; // Figure out a way to prepopulate google places search bar
      this.form.bio = this.currentUser.bio;
    },
    hidingModal(evt) {
      if (!this.currentUser.location) {
        this.error = "Please fill in all the required fields."
      }
      if (this.$store.getters.loading || this.hasError) {
        console.log("Prevent modal from closing.");
        evt.preventDefault();
      } else {
        console.log("Modal is closing.");
        this.$store.dispatch('setEditProfile', false);
        this.error = null;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.img-thumbnail {
  height: 150px;
  border-radius: 50%;
  //width: 100%;
}

.display-name {
  text-align: center;
  color: #808080;
  margin-bottom: 18px;
  font-family: $font_main;
}

.form-group.required .col-form-label:after { 
   content:"*";
   color:red;
}
</style>
<!-- 
  Global styles added to make the Google autocomplete input work in the modal
-->
<style>
  
.pac-container {
  background-color: #fff;
  z-index: 2001;
  position: fixed;
  display: inline-block;
  float: left;
}

.modal {
  z-index: 2000;
}

.modal-backdrop {
  z-index: 1000;
}

/**
* Vue Loading
*/
.vld-overlay.is-full-page {
    z-index: 2001 !important;
}

</style>