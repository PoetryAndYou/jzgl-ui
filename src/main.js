// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
// import axios from 'axios'
import store from './store/store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(ViewUI);
Vue.config.productionTip = false
// Vue.config.$axios=axios
Axios.defaults.headers.post["content-type"]="application/json;charset=UTF-8"
Vue.use(ElementUI)
/* eslint-disable no-new */

// 在请求头中加token
Axios.defaults.headers.common['token'] = store.state.token;

  new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>'
  })
  // 添加请求拦截器
Axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if(store.state.token){
  config.headers.common['token']=store.state.token
  }
   
  return config;
  }, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
  });
   
  // http response 拦截器
  Axios.interceptors.response.use(
  response => {
   
  return response;
  },
  error => {
   
  if (error.response) {
  switch (error.response.status) {
  case 401:
  this.$store.commit('del_token');
  router.replace({
  path: '/login',
  query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
  })
  }
  }
  return Promise.reject(error.response.data)
  });
  