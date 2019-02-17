<template>
  <section
    class="card-container"
    :style="{ background:`url('${propData.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center'}"
  >
    <div class="card-button-container">
      <router-link class="card-button" :to="`/home/profile/${propData.id}`"></router-link>
    </div>
    <div class="card-content">
      <h1 class="card-content-title">{{ propData.name }}</h1>
      <p class="card-content-subtitle">{{ propData.university }} - {{ propData.class }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Profile-Card',
  props: ['propData'],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';
.card-container {
  display: flex;
  flex-wrap: wrap;
  background-size: contain;
  align-items: flex-end;
  width: 165px;
  height: 238px;
  border-radius: 7px;
  .card-button-container {
    flex: 1 1 100%;
    display: flex;
    justify-content: flex-end;
    align-self: flex-start;
    .card-button {
      background-color: rgba(0, 0, 0, 0.6);
      border: 1px solid #ffffff;
      border-radius: 100%;
      width: 28px;
      height: 28px;
      margin: 9px 9px 0 0;
      cursor: pointer;
    }
  }
  .card-content {
    flex: 1 1 100%;
    background-color: #0000008a;
    padding: 5px 0 14px 11px;
    border-radius: 7px;
    font-family: $font_main;
    color: white;
    .card-content-title {
      font-size: 15px;
      font-weight: 500;
    }
    .card-content-subtitle {
      font-size: 11px;
      font-weight: 300;
    }
  }
}
</style>

