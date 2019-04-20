<template>
  <div
    v-bind:style="{ flexBasis: width }"
    class="field-container">

    <div class="field-title" :style="error ? { color: 'red' } : false">
      <h5>{{ fieldInfo.title }}</h5>
      <p v-if="fieldInfo.required">
        <i class="fas fa-asterisk"></i>
      </p>
    </div>

    <div class="field-input">
      <input
        :class="{ hasError: error }"
        v-bind:type="fieldInfo.type"
        v-bind:value="value"
        v-bind:min="(fieldInfo.type === 'number') ? 2000 : false"
        v-bind:max="(fieldInfo.type === 'number') ? 2022 : false"
        v-bind:ref="(fieldInfo.fieldType === 'location') ? 'autocomplete' : false"
        v-on:input="$emit('input', $event.target.value)"
        v-bind:style="{ height: fieldHeight }"
      />
      <p v-if="error" class="error-msg">
        This field is required
      </p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'FormField',
  props: ['fieldInfo', 'value'],
  data() {
    return {
      fieldHeight: (this.fieldInfo.fieldType === 'textArea') ? '60px' : '30px'
    };
  },
  mounted() {
    if(this.fieldInfo.fieldType === 'location') {
      this.autocomplete = new google.maps.places.Autocomplete(
        (this.$refs.autocomplete), { types: ['geocode'] }
      );

      this.autocomplete.addListener('place_changed', () => {
        let place = this.autocomplete.getPlace();
        let addressComponents = place.address_components;
        let city = addressComponents[0]["long_name"];
        let country = addressComponents[(addressComponents.length - 1)]["long_name"];
        //console.log(city + " " + country);
        this.$emit('input', `${city}, ${country}`);
      });
    }
  },
  computed: {
    width() {
      switch(this.fieldInfo.span) {
        case 1:
          return '100%';
        case 2:
          return '49%';
        case 3:
          return '32%';
      }
    },
    error() {
      return (this.fieldInfo.validation) ? this.fieldInfo.validation.$error : false;
    }
  }
}

</script>

<style lang="scss" scoped>

@import '../../assets/theme.scss';

.field-container {
  display: flex;
  flex-direction: column;

  .field-title {
    color: #515151;

    h5 {
      display: inline-block;
      font-family: $font_secondary;
      font-size: 15px;
    }
    p {
      display: inline-block;
      position: relative;
      margin-left: 3px;
      width: 8px;
      height: 15px;
      i {
        position: absolute;
        font-size: 8px;
      }
    }
    
  }

  .hasError {
    h5 {
      color: red;
    }
  }

  .field-input {
    input {
      width: 100%;
      background-color: #FFFFFF;
      border: 1px solid #979797;
      border-radius: 5px;
      padding: 5px;
      font-family: $font_main;
      font-size: 20px;
    }

    input.hasError {
        border-color: red;
    }

    .error-msg {
      color: red;
      font-size: 10px;
    }
  }
}

</style>
