// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import MintUI from 'mint-ui'
import babel from 'babel-polyfill'
import VueClipboard from 'vue-clipboard2'
import store from './store'
import 'mint-ui/lib/style.css'
import '@/common/css/app.scss'

Vue.use(babel);
Vue.use(MintUI);
Vue.use(VueClipboard);
Vue.use(VueLazyLoad,{
  loading:require('@/common/image/default.jpg')
});
Vue.filter('myPrice', function (value) {
  if (!value) return '0.00';
  return (value/100).toFixed(2);
});
Vue.directive('title', {
  inserted: function (el, binding) {
      document.title = binding.value;

  }
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
