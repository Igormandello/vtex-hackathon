import Vue from 'vue'
import Vuetify from 'vuetify'

import router from './router'
import store from './store'
import './registerServiceWorker'

import App from './App.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
