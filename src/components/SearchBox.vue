<template>
  <section>
    <div class="searchbox-container">
      <form id="searchbox" class="searchbox-form" @submit="onSubmit">
        <p class="searchbox-form-heading">Find university members in your city.</p>
        <label>UNIVERSITY</label>
        <input
          required
          type="text"
          id="university"
          v-model="form.university"
          placeholder="New York University Abu Dhabi"
        >
        <label>CITY</label>
        <input
          required
          type="text"
          ref="autocomplete"
          id="city"
          v-model="form.city"
          placeholder="London"
        >
        <label>FILTER</label>
        <section class="searchbox-form-selectors">
          <select class="searchbox-form-selector" v-model="form.gradType">
            <option
              required
              v-for="option in gradType"
              :value="option.value"
              :key="option.index"
            >{{ option.text }}</option>
          </select>
          <select class="searchbox-form-selector" v-model="form.gradClass">
            <option
              required
              v-for="option in gradClass"
              :value="option.value"
              :key="option.index"
            >{{ option.text }}</option>
          </select>
        </section>
        <button type="submit" form="searchbox" value="submit" class="searchbox-form-button">Search</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchBox',
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ['geocode'] }
    );

    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      let ac = place.address_components;
      let lat = place.geometry.location.lat();
      let lon = place.geometry.location.lng();
      let city = ac[0]['short_name'];
      console.log(place);
      console.log(
        `The user picked ${city} with the coordinates ${lat}, ${lon}`
      );
    });
  },
  data() {
    return {
      form: {
        university: '',
        city: '',
        gradType: null,
        gradClass: null
      },
      gradType: [
        { text: 'Select type', value: null },
        { text: 'Alumni', value: 'Alumni' },
        { text: 'Current Student', value: 'Current' }
      ],
      gradClass: [
        { text: 'Class', value: null },
        { text: '2014', value: 2014 },
        { text: '2015', value: 2015 },
        { text: '2016', value: 2016 },
        { text: '2017', value: 2017 },
        { text: '2018', value: 2018 },
        { text: '2019', value: 2019 },
        { text: '2020', value: 2020 },
        { text: '2021', value: 2021 }
      ],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.university = '';
      this.form.city = '';
      this.form.gradType = null;
      this.form.gradClass = null;
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';
.searchbox-container {
  background-color: white;
  height: 65vh;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  .searchbox-form {
    display: flex;
    flex-direction: column;
    label {
      color: #414141;
      font-family: $font_secondary;
      font-size: 15px;
      font-weight: 700;
      line-height: 38px;
      text-align: justify;
    }
    input + label {
      margin-top: 15px;
    }
    input {
      height: 44px;
      padding: 12px 12px;
      border: 0.5px solid #979797;
      border-radius: 5px;
    }
    .searchbox-form-heading {
      color: #484848;
      font-family: $font_secondary;
      font-size: 30px;
      line-height: 38px;
      margin-bottom: 20px;
    }
    .searchbox-form-selectors {
      display: flex;
      .searchbox-form-selector {
        height: 44px;
        flex: 1;
      }
    }
    .searchbox-form-button {
      color: white;
      margin: 30px 0;
      padding: 10px 30px;
      border-radius: 6px;
      background: #ff5a5f;
      align-self: flex-end;
    }
  }
}

</style>