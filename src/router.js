import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Market from './views/Market.vue'
import MarketRoute from './views/MarketRoute.vue'

Vue.use(Router)

const getParams = route => ({ ...route.params, ...route.query })

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/market/:marketId',
      name: 'market',
      props: getParams,
      component: Market
    }, {
      path: '/market/:marketId/route',
      name: 'route',
      props: getParams,
      component: MarketRoute
    }
  ]
})
