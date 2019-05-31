import Header from './Header'
import Item from './Item'

export default {
  install(Vue) {
    Vue.component('m-header', Header)
    Vue.component('m-item', Item)
  }
}