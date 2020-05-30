import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Announcement from '@/components/Announcement'
import Registered from '@/components/Registered'
import ViewDoctor from '@/components/ViewDoctor'
import Drug from '@/components/Drug'
import System from '@/components/System'
import Login from '@/components/Login'
import Personal from '@/components/Personal'
import store from '@/store/store'


Vue.use(Router)
// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
  }
   
  const router = new Router({
  mode: "history",
  routes:[
      {
      path: '/',
      name: 'Announcement',
      component: Announcement
    },
    {
      path: '/announcement',
      name: 'Announcement',
      component: Announcement
    },
    {
      path: '/registered',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/view_doctor',
      name: 'ViewDoctor',
      component: ViewDoctor
    },
    {
      path: '/drug',
      name: 'Drug',
      component: Drug
    },
    {
      path: '/system',
      name: 'System',
      component: System
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    ,
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    }
  ]
  });
   
  router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {   //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
  if (store.state.token) {
  next();
  }
  else {
  next({
  path: '/login',
  query: {redirect: to.fullPath}
  })
  }
  }
  else {
  next();
  }
  })
  export default router