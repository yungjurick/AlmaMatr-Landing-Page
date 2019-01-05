<template>
  <div class="search-form">
    <b-form @submit="onSubmit" v-if="show">

      <b-form-row style="margin-bottom: 18px;">
        <b-col class="form-heading">
          Find university students in your city.
        </b-col>
      </b-form-row>
      
      <b-form-group id="exampleInputGroup1"
                    label="UNIVERSITY"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="form.university"
                      required
                      placeholder="New York University Abu Dhabi">
        </b-form-input>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="CITY"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.city"
                      required
                      placeholder="London">
        </b-form-input>
      </b-form-group>

      <b-form-group id="exampleInputGroup3"
                    label="FILTER"
                    label-for="exampleInput3">
        <b-form-row no-gutters>
          <b-col>
            <b-form-select id="exampleInput3"
                          :options="gradType"
                          required
                          v-model="form.gradType">
            </b-form-select>
          </b-col>
          <b-col>
            <b-form-select id="exampleInput3"
                          :options="gradClass"
                          required
                          v-model="form.gradClass">
            </b-form-select>
          </b-col>
        </b-form-row>
      </b-form-group>

      <b-row style="text-align: right;">
        <b-col>
          <b-button type="submit" variant="danger">Search</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'SearchBox',
    data () {
      return {
        form: {
          university: '',
          city: '',
          gradType: null,
          gradClass: null
        },
        gradType: [
          { text: 'Select type', value: null },
          'Alumni', 'Current Student', 'Faculty'
        ],
        gradClass: [
          { text: 'Class', value: null },
          '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'
        ],
        show: true
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      },
      onReset (evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.university = '';
        this.form.city = '';
        this.form.gradType = null;
        this.form.gradClass = null;
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => { this.show = true });
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.search-form {
  background-color: white;
  padding: 32px;
  border-radius: 10px;
  border: 1px solid #979797;
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);

  .form-heading {
    color: #484848;
    font-family: $font_secondary;
    font-size: 30px;
    font-weight: 400;
    line-height: 36px;
    width: 350px;
    text-align: justify;
  }

  .col-form-label {
    color: #414141;
    font-family: OpenSans;
    font-size: 15px;
    font-weight: 700;
    line-height: 38px;
    text-align: justify;
  }
}

</style>