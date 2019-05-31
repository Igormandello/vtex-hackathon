<template>
  <v-container>
    <v-layout column>
      <v-card elevation=4 class="my-2" :key="i" v-for="(item, i) in items">
        <v-layout row pa-2 px-3 class="item">
          <v-avatar class="mr-2">
            <v-img :src="item.asset"/>
          </v-avatar>

          <h3>{{ item.id }}</h3>

          <span>{{ item.count }}</span>

          <h3 class="priceText">R${{ item.count * item.price / 100 }}</h3>
        </v-layout>
      </v-card>

      <h2>Total: R${{ items.reduce((s, i) => s + i.price * i.count / 100, 0).toFixed(2) }}</h2>
    </v-layout>

    <v-btn round outline color="primary" :to="{ name: 'home' }" class="mt-4" v-if="finished">
      <v-icon class="mr-2">payment</v-icon>
      Finalizar compra
    </v-btn>
  </v-container>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'qrcode',
  props: {
    selectedProducts: Array
  },
  data: () => ({
    finished: false,
    items: []
  }),
  created() {
    this.selectedProducts.forEach((item, i) => {
      setTimeout(() => {
        let product = { ...item }
        if (!product.count) product.count = 1

        this.items.push(product)
      }, (i + 1) * 2000)
    })
    
    setTimeout(() => this.finished = true, this.selectedProducts.length * 2500)
  }
}
</script>

<style lang="scss" scoped>
.priceText {
  max-width: 100px;
  text-align: right;
  padding-right: 4px;
}

h2 {
  margin-top: 8px;
  text-align: right;
}
</style>
