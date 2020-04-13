import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 设置事件总线
Vue.prototype.$bus = new Vue()

// 将toast组件变成toast插件来进行安装
// Vue.use就相当于与执行了toast的install函数
Vue.use(toast)

// 用于图片懒加载
Vue.use(VueLazyLoad, {
  // 设置图片未加载出来时的占位图
  loading: require('assets/img/common/placeholder.png')
})

// 用于解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
