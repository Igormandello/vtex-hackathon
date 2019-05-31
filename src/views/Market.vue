<template>
  <v-container class="market-view pb-4 mb-4">
    <v-progress-circular v-if="loading" color="primary" indeterminate/>
    <div v-else>
      <h1 class="mb-2">{{ market.name }}</h1>

      <v-text-field type="search" prepend-inner-icon="search"/>

      <h3 class="mb-1">Recomendado para você</h3>
      <m-item v-model="items[i]" :key="i" v-for="(item, i) in items.slice(0, 3)"/>

      <h3 class="mt-4 mb-1">Todos os items</h3>
      <m-item v-model="items[3 + i]" :key="3 + i" v-for="(item, i) in items.slice(3, items.length)"/>
    </div>

    <v-fab-transition>
      <v-btn
        v-show="items.some(item => item.count > 0)"
        :to="{ name: 'route', params: { marketId, items: items.filter(item => item.count != 0) } }"
        color="primary"
        fab
        fixed
        right
        bottom
        dark
      >
        <v-icon>check</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
export default {
  name: 'market',
  props: {
    marketId: String
  },
  data: () => ({
    market: {
      name: 'Mercado',
    },
    items: [
      { 
        image: '../assets/logo.png',
        name: 'Farofa',
        count: 0
      }, { 
        image: '../assets/logo.png',
        name: 'Cerveja',
        count: 0
      }, { 
        image: '../assets/logo.png',
        name: 'Fralda',
        count: 0
      }, { 
        image: '../assets/logo.png',
        name: 'Água',
        count: 0
      }, { 
        image: '../assets/logo.png',
        name: 'Refrigerante',
        count: 0
      }
    ],
    loading: false
  }),
  created() {
    this.loading = true
    this.loading = false
  }
}
</script>

<style lang="scss">
.market-view {
  h3 {
    text-align: left;
  }
}
</style>
