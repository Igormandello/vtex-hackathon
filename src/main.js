import Vue from 'vue'
import Vuetify from 'vuetify'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import router from './router'
import properties from './theme'
import Store from './store'
import Components from './components'
import './registerServiceWorker'

import App from './App.vue'

Vue.use(Vuetify, properties)
Vue.use(Components)
Vue.use(Store)
Vue.use(VueApollo)
Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider: new VueApollo({
    defaultClient: new ApolloClient({
      link: createHttpLink({ uri: 'http://f4b8fbd8.ngrok.io/graphql' }),
      cache: new InMemoryCache(),
    })
  }),
  render: h => h(App)
}).$mount('#app')
