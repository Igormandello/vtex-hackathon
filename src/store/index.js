import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

export default {
  install(Vue) {
    Vue.use(Vuex)

    const store = new Vuex.Store({
      state: {
        user: {
          username: ''
        },
        system: {
          logged: null,
          loading: false
        }
      },
      actions,
      mutations
    })

    Vue.store = store
    Vue.prototype.$store = store
  }
}