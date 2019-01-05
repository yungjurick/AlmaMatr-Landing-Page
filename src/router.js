import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import HomePage from './components/HomePage';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    }
  ]
});

export default router;
