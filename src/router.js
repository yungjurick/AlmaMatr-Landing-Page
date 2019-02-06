import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('./views/LandingView')
  },
  {
    path: '/home',
    component: () => import('./views/HomeView.vue'),
    beforeEnter: (to, from, next) => {
      if(from.name !== 'Main') { next('/') }
      next()
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('./components/HomeContent.vue')
      },
      {
        path: 'meetups',
        name: 'Meetups',
        component: () => import('./components/Meetups.vue')
      }
    ]
  }
];

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router;
