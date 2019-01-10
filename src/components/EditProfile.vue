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

          <b-form-row style="margin-bottom: 18px;">
            <!-- <b-col>
              <b-img thumbnail fluid :src="currentUser.imageUrl" alt="Thumbnail" />
            </b-col> -->
            <b-col style="text-align: center;">
              <image-input v-model="form.avatar">
                <div slot="activator">
                  <b-img v-if="!form.avatar" thumbnail fluid :src="require('../assets/add-image.png')" alt="Thumbnail" />
                  <b-img v-else thumbnail fluid :src="form.avatar.imageURL" alt="avatar" />
                </div>
              </image-input>
            </b-col>
            <!-- <b-col>
              <b-img thumbnail fluid :src="require('../assets/add-image.png')" alt="Thumbnail" />
            </b-col> -->
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
                          v-model="form.location"
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
        let ac = place.address_components;
        let lat = place.geometry.location.lat();
        let lon = place.geometry.location.lng();
        let city = ac[0]["short_name"];
        console.log(place)
        this.form.location = city;
        console.log(`The user picked ${city} with the coordinates ${lat}, ${lon}`);
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
        bio: null
      },
      gradClass: [
          { text: 'Select Class', value: null },
          '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'
        ],
      googlePlacesSetup: false,
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
      return this.error !== null
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
      this.validateForm();
      //this.handleSubmit();

      this.$store.commit('setLoading', true)
      setTimeout(() => {
        this.$store.commit('setLoading', false)
        this.error = null
      }, 500)

    },
    validateForm() {

    },
    handleSubmit () {

      let userRef = database.database().ref('users/' + this.currentUser.id);
      let imgUrl = this.currentUser.imageUrl;

      if (this.form.avatar) {
        let imagePathReference = database.storage().ref("user-images/" + this.currentUser.id + "/image.jpg");

        let imgFile = this.form.avatar.formData.get('file');
        
        imagePathReference.put(imgFile).then(function(snapshot) {
          console.log(snapshot);
          console.log('Image upload successful!');
          // Add image download url to user object
          imagePathReference.getDownloadURL().then(function(url){
            console.log(url);
            imgUrl = url;
          }, (error) => {
            //loader.hide();
            alert(error);
          });

        }, (error) => {
          //loader.hide();
          alert(error);
          return;
        });
      }

      userRef.update({
        vocation: this.form.vocation,
        schoolAndClass: this.form.schoolAndClass,
        location: this.form.location,
        bio: this.form.bio,
        imageUrl: imgUrl
      }).then(function() {
        //loader.hide();
      });
      
    },
    clearForm() {
      this.form.avatar = null;
      this.form.vocation = '';
      this.form.schoolAndClass = '';
      this.form.location = '';
      this.form.bio = '';
    },
    hidingModal(evt) {
      if(this.currentUser.location === null || this.currentUser.location === undefined) {
        evt.preventDefault();
        this.error = "Please enter your current city."
      } else {
        this.$store.dispatch('setEditProfile', false)
      }
    }
  }
}
</script>

<style scoped>
.img-thumbnail {
  height: 150px;
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
  background-color: #FFF;
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
