<template>
  <div>
    <modal>

      <div slot="header" class="form-header">
        <div style="flex: 1;">
          <h3>Edit Profile</h3>
        </div>
      </div>
      
      <div class="form" slot="body">

        <section>
          <div style="display: flex; flex-direction: column;">
            <h5>Profile Image</h5>
            <image-input v-model="form.avatar">
              <div slot="activator" class="photo-upload">
                <b-img v-if="!form.avatar" thumbnail fluid :src="currentUser.imageUrl" alt="Thumbnail" />
                <b-img v-else thumbnail fluid :src="form.avatar.imageURL" alt="avatar" />
              </div>
            </image-input>
          </div>
        </section>

        <section>
          <FormField
            v-model="form.firstName"
            :fieldInfo="{ title: 'First Name', required: true, span: 2, type: 'text', validation: $v.form.firstName }"
          />
          <FormField
            v-model="form.lastName"
            :fieldInfo="{ title: 'Last Name', required: true, span: 2, type: 'text', validation: $v.form.lastName }"
          />
        </section>
        
        <section>
          <!-- <FormField v-model="form.country" :fieldInfo="{ title: 'Current Country', required: true, span: 2 }" /> -->
          <FormField v-model="form.location" :fieldInfo="{ title: 'Current Location', required: true, span: 1, fieldType: 'location', validation: $v.form.location }" />
        </section>

        <section>
          <FormField
            v-model="form.company"
            :fieldInfo="{ title: 'Company', span: 2 }"
          />
          <FormField
            v-model="form.position"
            :fieldInfo="{ title: 'Position', span: 2 }"
          />
        </section>

        <section>
          <FormField
            v-model="form.university"
            :fieldInfo="{ title: 'University School', required: true, span: 3, validation: $v.form.university }"
          />
          <FormField
            v-model="form.gradClass"
            :fieldInfo="{ title: 'Class', required: true, span: 3, type: 'number', validation: $v.form.gradClass  }"
          />
          <FormField
            v-model="form.birthDate"
            :fieldInfo="{ title: 'Date of Birth', span: 3, type: 'date' }"
          />
        </section>

        <section>
          <FormField
            v-model="form.bio"
            :fieldInfo="{ title: 'Bio', fieldType: 'textArea', type: 'text', span: 1 }"
          />
        </section>

        <section>
          <FormField
            v-model="form.social.facebook"
            :fieldInfo="{ title: 'Facebook', span: 2, type: 'text' }"
          />
          <FormField
            v-model="form.social.instagram"
            :fieldInfo="{ title: 'Instagram', span: 2, type: 'text' }"
          />
        </section>
        <section>
          <FormField
            v-model="form.social.linkedIn"
            :fieldInfo="{ title: 'LinkedIn', span: 2, type: 'text' }"
          />
          <FormField
            v-model="form.social.gmail"
            :fieldInfo="{ title: 'Gmail', span: 2, type: 'text' }"
          />
        </section>
        
      </div>

      <b-button
        slot="footer"
        variant="danger"
        size="sm"
        @click="handleSubmit"
      >
        Save
      </b-button>

    </modal>
  </div>
</template>

<script>
import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators';
import database from '@/services/database';
import modal from './Modal.vue';
import FormField from './Form/FormField.vue';
import ImageInput from './ImageInput.vue';

export default {
  name: 'ProfileEdit',
  components: {
    modal,
    FormField,
    ImageInput
  },
  data() {
    return {
      form: {
        avatar: null,
        firstName: null,
        lastName: null,
        location: null,
        company: null,
        position: null,
        university: null,
        gradClass: null,
        birthDate: null,
        bio: null,
        social: {
          facebook: null,
          instagram: null,
          linkedIn: null,
          gmail: null
        }
      }
    };
  },
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      location: { required },
      university: { required },
      gradClass: { required, numeric, minLength: minLength(4), maxLength: maxLength(4), between: between(2000, 2022) }
      // birthDate: {  },
    }
    
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.form);
      this.$v.form.$touch();
      if(this.$v.form.$error) {
        console.log("FORM HAS ERRORS!");
        console.log(this.$v.form);
      } else {
          this.$store.commit('setLoading', true);

          let locArr = this.form.location.split(',');
          let userCity = locArr[0];
          let userCountry = locArr[1].substring(1);

          let userRef = database.database().ref('users/' + this.currentUser.id);
          let prevLocationRef = database.database().ref(`locations/${this.currentUser.country}/${this.currentUser.city}/${this.currentUser.id}`);
          let locationRef = database.database().ref(`locations/${userCountry}/${userCity}/${this.currentUser.id}`);

          let user = {
            id: this.currentUser.id,
            name: `${this.form.firstName} ${this.form.lastName}`,
            email: this.currentUser.email,
            imageUrl: this.currentUser.imageUrl,
            city: userCity,
            country: userCountry,
            company: this.form.company,
            position: this.form.position,
            university: 'NYU Abu Dhabi', // Disable this field for now in the form
            class: this.form.gradClass,
            dob: this.form.birthDate,
            bio: this.form.bio,
            social: this.form.social
          };

          let updateLocation = (this.currentUser.country == userCountry && this.currentUser.city == userCity) ? false : true;

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
              if(updateLocation) {
                prevLocationRef.remove()
                .then(() => {
                  return locationRef.set({
                    id: this.currentUser.id,
                    name: `${this.form.firstName} ${this.form.lastName}`,
                    email: this.currentUser.email,
                    imageUrl: this.currentUser.imageUrl,
                    university: 'NYU Abu Dhabi',
                    class: this.form.gradClass
                  });
                });
              }
            })
            .then(() => {
              this.$store.dispatch('setUser', user);
              this.$store.dispatch('setLocation', this.form.location);
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
              if(updateLocation) {
                prevLocationRef.remove()
                .then(() => {
                  return locationRef.set({
                    id: this.currentUser.id,
                    name: `${this.form.firstName} ${this.form.lastName}`,
                    email: this.currentUser.email,
                    imageUrl: this.currentUser.imageUrl,
                    university: 'NYU Abu Dhabi',
                    class: this.form.gradClass
                  });
                });
              }
            })
            .then(() => {
              this.$store.dispatch('setUser', user);
              this.$store.dispatch('setLocation', this.form.location);
              this.$store.commit('setLoading', false);
              this.$store.dispatch('setEditProfile', false);
            })
            .catch((error) => {
              console.log(error);
              this.$store.commit('setLoading', false);
            });
          }
      }
    }
  },
  beforeMount() {
    // console.log(this.currentUser);
    let nameStr = this.currentUser.name.split(' ');
    this.form.firstName = nameStr[0];
    this.form.lastName = nameStr[nameStr.length - 1];
    this.form.location = (!this.currentUser.country) ? '' : `${this.currentUser.city}, ${this.currentUser.country}`;
    this.form.company = this.currentUser.company;
    this.form.position = this.currentUser.position;
    this.form.university = "NYU Abu Dhabi"//this.currentUser.university;
    this.form.gradClass = this.currentUser.class;
    this.form.birthDate = this.currentUser.dob;
    this.form.bio = this.currentUser.bio;
  }
}

</script>

<style lang="scss" scoped>

@import '../assets/theme.scss';

.modal-container {
  .form-header {
    display: flex;

    h3 {
      margin-top: 0;
      color: #515151;
      font-family: $font_title;
      font-size: 20px;
    }

    i {
      width: 20px;
      height: 20px;
      color: #515151;
    }
  }

  .body {
    .form {
      font-family: $font_secondary;
      display: flex;
      flex-direction: column;

      h5 {
        display: inline-block;
        font-family: $font_secondary;
        font-size: 15px;
        color: #515151;
        margin-bottom: 10px;
      }

      .photo-upload {
        position: relative;
        cursor: pointer;
        margin-bottom: 10px;
        border: 1px solid #979797;
        border-radius: 5px;
        width: 140px;
        height: 140px;

        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }

        &:after {
          content: '\A';
          width: 100%; height:100%;
          top:0; left:0;
          background: rgba(0,0,0,0.35);
        }

        &:before {
          content: 'Click to add new';
          font-size: 12px;
          width: 100%;
          color: #fff;
          z-index: 1;
          bottom: 0;
          padding:4px 10px;
          text-align: center;
          background: black;
          box-sizing:border-box;
          -moz-box-sizing:border-box;
        }

        &:after, &:before {
          position: absolute;
          opacity: 0;
          transition: all 0.4s;
          -webkit-transition: all 0.4s;
        }

        &:hover:after, &:hover:before {
          opacity: 1;
        }
      }

      section {
        flex: 1;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .footer {
    button {
      width: 88px;
      height: 42px;
      float: right;
      font-family: $font_secondary;
    }
  }
}

</style>
