// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueToast from 'vue2-toast'
import App from './App'
import store from './store/index'

import 'vue2-toast/lib/toast.css';

Vue.config.productionTip = false

Vue.use(VueToast, {
	detaultType: 'center'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
