<template>
  <section class="userDetails-container">
    <h1 class="userDetails-header">{{ this.receivedTitle }}</h1>
    <table class="userDetails-table">
      <tr class="userDetails-row" v-for="detail in this.userInformation" :key="detail.index">
        <td class="userDetails-title">{{ detail.title }}</td>
        <td class="userDetails-subtitle">{{ detail.subtitle }}</td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: 'profile-headerInfo',
  props: {
    receivedTitle: String,
    userData: Object
  },
  mounted() {
    console.log(this.$props);
  },
  computed: {
    userInformation() {
      if (this.$props.receivedTitle == 'About') {
        return [
          {
            title: 'Age',
            subtitle: this.$props.userData.age || '-'
          },
          {
            title: 'Nationality',
            subtitle: this.$props.userData.nationality || '-'
          },
          {
            title: 'City',
            subtitle: this.$props.userData.location || '-'
          },
          {
            title: 'Position',
            subtitle: this.$props.userData.vocation || '-'
          },
          {
            title: 'Education',
            subtitle:
              `${this.$props.userData.university}, ${
                this.$props.userData.class
              }` || '-'
          }
        ];
      } else {
        return [
          {
            title: 'Website',
            subtitle: this.$props.userData.website || '-'
          },
          {
            title: 'LinkedIn',
            subtitle: this.$props.userData.linkedIn || '-'
          },
          {
            title: 'Facebook',
            subtitle: this.$props.userData.facebook || '-'
          },
          {
            title: 'Email',
            subtitle: this.$props.userData.email || '-'
          },
          {
            title: 'Instagram',
            subtitle: this.$props.userData.instagram || '-'
          }
        ];
      }
    }
  }
  /*
    receivedData: title-name ("About", "Links")
  */
};
</script>
<style lang="scss">
@import '../../assets/theme.scss';
.userDetails-container {
  font-family: $font_secondary;
  .userDetails-header {
    font-size: 23px;
    font-weight: 300;
    letter-spacing: 1.05px;
    line-height: 28px;
    margin-bottom: 12px;
  }
  .userDetails-table {
    .userDetails-row {
      height: 24px;
      font-size: 16px;
      letter-spacing: 0.16px;
      line-height: 19px;
      .userDetails-title {
        padding-right: 16px;
        font-weight: 500;
      }
      .userDetails-subtitle {
        font-weight: 300;
      }
    }
  }
}
</style>
