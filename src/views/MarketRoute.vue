<template>
  <v-container>
    <h2 class="mb-1 mt-2">Caminho recomendado</h2>
    <canvas ref="map" class="map"/>

    <v-card elevation=6 class="mt-3 mx-3">
      <div :key="i" v-for="(item, i) in items">
        <v-layout row class="item">
          <v-avatar class="mr-2">
            <v-img :src="item.image"/>
          </v-avatar>

          <h3>{{ item.name }}</h3>

          <v-flex>
            {{ item.count }}
          </v-flex>

          <v-btn @click="toggleItem(i)" round small :outline="!item.checked" :color="item.checked ? 'success' : ''" fab class="check-item">
            <v-icon>check</v-icon>
          </v-btn>
        </v-layout>
        <v-divider/>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { isNumber } from 'util';
export default {
  name: 'marketRoute',
  props: {
    items: Array
  },
  methods: {
    toggleItem(i) {
      this.items[i].checked = !this.items[i].checked
      this.$forceUpdate()
    }
  },
  mounted() {
    this.items.forEach(item => item.checked = false)

    let map = this.$refs.map

    let size = 10
    let tileSize = 32

    map.height = map.width = size * tileSize

    let ctx = map.getContext('2d')

    let categoryToColor = {
      'bebidas': '#89a5d2',
      'carnes': '#da6c6c',
      'congelados': '#75d1a9',
      'hortifruti': '#96e094',
      'lacticinios': '#e1e774',
    }

    let marketMap = [
      ['bebidas', 0, 0, 'lacticinios', 'lacticinios', 0, 0, 'carnes', 'carnes', 0],
      ['bebidas', 0, 0, 'lacticinios', 'lacticinios', 0, 0, 'carnes', 'carnes', 0],
      ['bebidas', 0, 0, 'lacticinios', 'lacticinios', 0, 0, 'carnes', 'carnes', 0],
      ['bebidas', 0, 0, 'lacticinios', 'lacticinios', 3, 6, 'carnes', 'carnes', 0],
      ['bebidas', 0, 0, 0, 0, 2, 2, 0, 0, 0],
      ['bebidas', 0, 3, 4, 4, 5, 2, 0, 0, 0],
      ['bebidas', 0, 2, 'hortifruti', 'hortifruti', 0, 2, 'congelados', 'congelados', 0],
      ['bebidas', 0, 2, 'hortifruti', 'hortifruti', 0, 2, 'congelados', 'congelados', 0],
      ['bebidas', 0, 2, 'hortifruti', 'hortifruti', 0, 2, 'congelados', 'congelados', 0],
      ['bebidas', 0, 2, 'hortifruti', 'hortifruti', 0, 2, 0, 0, 0],
    ]

    ctx.strokeWidth = 2
    ctx.strokeStyle = '#000'
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let tile = marketMap[y][x]

        if (!isNumber(tile)) {
          ctx.fillStyle = categoryToColor[tile]
        } else {
          ctx.fillStyle = '#666'
        }

        let tileX = x * tileSize
        let tileY = y * tileSize
        ctx.fillRect(tileX, tileY, tileSize, tileSize)

        if (isNumber(tile) && tile != 0) {
          let centerX = tileX + tileSize / 2 + 1
          let centerY = tileY + tileSize / 2 + 1

          ctx.beginPath()
          if (tile == 2) {
            ctx.moveTo(centerX, tileY)
            ctx.lineTo(centerX, tileY + tileSize)
          } else if (tile == 3) {
            ctx.moveTo(centerX, tileY + tileSize)
            ctx.lineTo(centerX, centerY)
            ctx.lineTo(tileX + tileSize, centerY)
          } else if (tile == 4) {
            ctx.moveTo(tileX, centerY)
            ctx.lineTo(tileX + tileSize, centerY)
          } else if (tile == 5) {
            ctx.moveTo(tileX, centerY)
            ctx.lineTo(centerX, centerY)
            ctx.lineTo(centerX, tileY)
          } else if (tile == 6) {
            ctx.moveTo(tileX, centerY)
            ctx.lineTo(centerX, centerY)
            ctx.lineTo(centerX, tileY + tileSize)
          }
          ctx.stroke()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.map {
  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);
}

.item {
  align-items: center;

  h3 {
    flex-grow: 1;
    text-align: left;
  }

  .v-btn--floating.v-btn--small.check-item {
    width: 32px;
    height: 32px;
  }

  .item-counter {
    width: 75px;
    flex-grow: 0;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;

    span {
      margin: 0 4px;
      font-size: 1.4rem;
    }
  }
}
</style>
