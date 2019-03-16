<template>
  <section class="profileInfo-container">
    <div class="profileInfo-left">
      <div class="profileInfo-imageContainer">
        <img :src="propsData.imageUrl" alt="Profile Image" class="imageContainer__image">
      </div>
      <h1 class="profileInfo-left__name">{{ this.nameCapitalized }}</h1>
      <p class="profileInfo-left__city">
        Current City:
        <span class="profileInfo-left__location">{{ propsData.location }}</span>
      </p>
      <button
        v-if="isEditable"
        @click="toggleProfileEdit()"
        class="profileInfo-left__button"
      >EDIT PROFILE</button>
    </div>
    <div class="profileInfo-right">
      <div class="profileInfo-right__top">
        <subInfo
          class="profileInfo-right__top-about"
          :receivedTitle="subinfo_title[0]"
          :userData="propsData"
        ></subInfo>
        <subInfo
          class="profileInfo-right__top-links"
          :receivedTitle="subinfo_title[1]"
          :userData="propsData"
        ></subInfo>
      </div>
      <div class="profileInfo-right__bottom">
        <p class="profileInfo-right__bottom-title">Bio</p>
        <div class="profileInfo-right__bottom-container">{{ propsData.bio }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import subInfo from '@/components/Profile/ProfileHeaderInfo';
export default {
  name: 'Profile-Information-container',
  props: {
    propsData: Object
  },
  mounted() {
    console.log(this.propsData);
  },
  data() {
    return {
      subinfo_title: ['About', 'Links']
    };
  },
  components: {
    subInfo
  },
  computed: {
    isEditable() {
      return this.$store.state.currentUser.id == this.propsData.id
        ? true
        : false;
    },
    nameCapitalized() {
      return this.propsData.name.toUpperCase();
    }
  },
  methods: {
    toggleProfileEdit() {
      this.$store.dispatch('setEditProfile', true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/theme.scss';
.profileInfo-container {
  font-family: $font_main;
  display: flex;
  height: auto;
  width: 100%;
  .profileInfo-left {
    width: 25%;
    padding: 58px 0 0 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .profileInfo-imageContainer {
      display: flex;
      justify-content: center;
      width: 100%;
      .imageContainer__image {
        border-radius: 100%;
        width: 120px;
        height: 120px;
      }
    }
    .profileInfo-left__name {
      font-size: 1.5vw;
      font-weight: 800;
      letter-spacing: 1.05px;
      line-height: 28px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    .profileInfo-left__city {
      text-align: center;
      font-size: 18px;
      font-weight: 300;
      letter-spacing: 0.82px;
      line-height: 22px;
      margin-bottom: 18px;
      .profileInfo-left__location {
        font-weight: 800;
      }
    }
    .profileInfo-left__button {
      border-radius: 5px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
      padding: 10px 26px;
      font-size: 17px;
      font-weight: 300;
      letter-spacing: 0.77px;
    }
  }
  .profileInfo-right {
    width: 75%;
    padding: 0 8.5vw 0 7vw;
    .profileInfo-right__top {
      display: flex;
      flex-wrap: wrap;
      .profileInfo-right__top-about {
        flex: 1 1 55%;
        padding-top: 58px;
        padding-bottom: 20px;
      }
      .profileInfo-right__top-links {
        flex: 1 1 45%;
        padding-top: 58px;
        padding-bottom: 20px;
      }
    }
    .profileInfo-right__bottom {
      height: 150px;
      .profileInfo-right__bottom-title {
        font-size: 23px;
        font-weight: 300;
        letter-spacing: 1.05px;
        line-height: 28px;
        margin-bottom: 12px;
      }
      .profileInfo-right__bottom-container {
        width: 100%;
        padding: 7px 16px;
        border: 0.5px solid #979797;
        border-radius: 24px;
        opacity: 0.3953450520833333;
        font-size: 16px;
        font-weight: 300;
        letter-spacing: -0.21px;
        line-height: 19px;
      }
    }
  }
}
</style>

