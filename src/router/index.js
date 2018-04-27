import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { // Route to Home page for route not defined
      path: '*', component: Home,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});
