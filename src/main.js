import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
//import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
//import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
//import VueFullPage from 'vue-fullpage.js'

// Global styles shared by all components
require('./assets/theme.scss');

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(Loading, {
  loader: 'dots',
  color: '#fffcfe',
  backgroundColor: '#505050'
});
//Vue.use(VueFullPage)

Vue.config.productionTip = false;

let app;

const initialize = () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
};

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    store.dispatch('autoSignIn', firebaseUser);
  } else {
    store.dispatch('setUser', null);
  }
  initialize();
});
