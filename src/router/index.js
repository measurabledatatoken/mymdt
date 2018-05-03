import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import AutoLogin from '@/components/AutoLogin';
import Register from '@/components/Register';
import ForgetPassword from '@/components/ForgetPassword';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { // Route to Home page for route not defined
      path: '*', component: Home,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/autologin',
      component: AutoLogin,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/forgetpassword',
      component: ForgetPassword,
    },
    {
      path: '/',
      component: Home,
    },
  ],
});
