import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import HomePage from './components/HomePage';
import Home from './components/Home';
import Meetups from './components/Meetups';

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
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: Meetups
    }
  ]
});

export default router;
