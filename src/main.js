// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import myAxios from './utils/axios/myaxios'
import store from './store' //导入store
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './common/lang/en'
import zh from './common/lang/zh'
import {
  lang
} from '@/utils'
import './assets/icon/iconfont.css'
import echarts from 'echarts'
import vSelectPage from 'v-selectpage';


Vue.use(vSelectPage,
  //   {
  //   dataLoad: function (vue, data, params) 
  //   {
  //     return new Promise((resolve, reject) => {
  //       var currentParams = {
  //         page: params.pageNumber,
  //         nick_name: params.nick_name ? params.nick_name : "",
  //         user_id: 111
  //       }
  //       this.$axios.get(data, currentParams).then(resp => resolve(resp)).then(resp => reject(resp));
  //     });
  //   }
  // }
);
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识
  messages: {
    'zh-CN': Object.assign(zh, zhLocale), // 中文语言包
    'en-US': Object.assign(en, enLocale), // 英文语言包
  }
})

// // 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }

//路由拦截器
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { // 判断该路由是否需要登录权限
    next({
      path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next();
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
