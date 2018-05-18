// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// 请求封装文件
import api from './api/index.js'
import state from './vuex/state'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import common from './components/common/common'

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.use(ElementUI);
Vue.use(Vuex);
const store = new Vuex.Store({
	state
})


Vue.component('common',common)

// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false;

//路由校验

router.beforeEach((to, from, next) => {
  if(to.path=="/login"||to.path=="/rslogin"){
  	next()
  }else{
  	if(!sessionStorage.getItem("token")){
  		next({path: '/login'})
  	}else{
  		next();
  	}
  	
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
