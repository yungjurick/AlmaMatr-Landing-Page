import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let app = '';

// Initialize Firebase
const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SEND_ID'
};

firebase.initializeApp(config);

// Init app iff Firebase Object has been initialized 
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

