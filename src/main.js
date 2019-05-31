import Vue from 'vue'
import Vuetify from 'vuetify'

import router from './router'
import properties from './theme'
import Store from './store'
import Components from './components'
import './registerServiceWorker'

import App from './App.vue'

Vue.use(Vuetify, properties)
Vue.use(Components)
Vue.use(Store)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
