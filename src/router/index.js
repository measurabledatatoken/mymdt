import Vue from 'vue';
import Router from 'vue-router';

import AppLayout from '@/container/AppLayout';

import Home from '@/components/Home';
import Login from '@/components/Login';
import AutoLogin from '@/components/AutoLogin';
import Register from '@/components/Register';
import ForgetPassword from '@/components/ForgetPassword';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'layout',
      component: AppLayout,
      children: [
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'login',
          component: Login,
        },
        {
          path: 'autologin',
          component: AutoLogin,
        },
        {
          path: 'register',
          component: Register,
        },
        {
          path: 'forgetpassword',
          component: ForgetPassword,
        },
        { // Route to Home page for route not defined
          path: '*', component: Home,
        },
      ],
    },
  ],
});
