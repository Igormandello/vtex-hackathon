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

          <v-flex class="item-counter">
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
import { setInterval, clearInterval } from 'timers';
export default {
  name: 'marketRoute',
  props: {
    items: Array
  },
  data: () => ({
    map: null,
    size: 10,
    tileSize: 32,
    ctx: null,
    completed: 0,

    categoryToColor: {
      'bebidas': '#89a5d2',
      'carnes': '#da6c6c',
      'congelados': '#75d1a9',
      'hortifruti': '#96e094',
      'lacticinios': '#e1e774',
    },

    marketMap: [
      ['bebidas', 0, 0, 'lacticinios', 'lacticinios', 0, 0, 'carnes', 'carnes', 0],
      ['bebidas', 0, 0, 'lacticinios', 'lacticinios', 0, 0, 'carnes', 'carnes', 0],
      ['bebidas', 0, 0, 'lacticinios', 'lacticinios', 0, 0, 'carnes', 'carnes', 0],
      ['bebidas', 0, 0, 'lacticinios', 'lacticinios', 0, 0, 'carnes', 'carnes', 0],
      ['bebidas', 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['bebidas', 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['bebidas', 0, 0, 'hortifruti', 'hortifruti', 0, 0, 'congelados', 'congelados', 0],
      ['bebidas', 0, 0, 'hortifruti', 'hortifruti', 0, 0, 'congelados', 'congelados', 0],
      ['bebidas', 0, 0, 'hortifruti', 'hortifruti', 0, 0, 'congelados', 'congelados', 0],
      ['bebidas', 0, 0, 'hortifruti', 'hortifruti', 0, 0, 0, 0, 0],
    ],

    route: [
      { x: 2, y: 9, type: 'UP' },
      { x: 2, y: 8, type: 'UP' },
      { x: 2, y: 7, type: 'UP' },
      { x: 2, y: 6, type: 'UP' },
      { x: 2, y: 5, type: 'UP_RIGHT' },
      { x: 3, y: 5, type: 'RIGHT' },
      { x: 4, y: 5, type: 'RIGHT' },
      { x: 5, y: 5, type: 'RIGHT_UP' },
      { x: 5, y: 4, type: 'UP' },
      { x: 5, y: 3, type: 'UP_RIGHT' },
      { x: 6, y: 3, type: 'RIGHT_DOWN' },
      { x: 6, y: 4, type: 'DOWN' },
      { x: 6, y: 5, type: 'DOWN' },
      { x: 6, y: 6, type: 'DOWN' },
      { x: 6, y: 7, type: 'DOWN' },
      { x: 6, y: 8, type: 'DOWN' },
      { x: 6, y: 9, type: 'DOWN' }
    ]
  }),
  methods: {
    toggleItem(i) {
      this.items[i].checked = !this.items[i].checked
      this.$forceUpdate()
    },
    drawLine(x, y, type, percentage) {
      let tileX = x * this.tileSize
      let tileY = y * this.tileSize

      let centerX = tileX + this.tileSize / 2 + 2
      let centerY = tileY + this.tileSize / 2 + 2

      this.ctx.beginPath()
      if (type === 'UP') {
        this.ctx.moveTo(centerX, tileY + this.tileSize - this.tileSize * percentage)
        this.ctx.lineTo(centerX, tileY + this.tileSize)
      } else if (type === 'RIGHT') {
        this.ctx.moveTo(tileX, centerY)
        this.ctx.lineTo(tileX + this.tileSize * percentage, centerY)
      } else if (type === 'DOWN') {
        this.ctx.moveTo(centerX, tileY)
        this.ctx.lineTo(centerX, tileY + this.tileSize * percentage)
      } else if (type === 'UP_RIGHT') {
        this.ctx.moveTo(centerX, tileY + this.tileSize)

        if (percentage <= 0.5) {
          this.ctx.lineTo(centerX, tileY + this.tileSize - this.tileSize * percentage)
        } else {
          this.ctx.lineTo(centerX, centerY)
          this.ctx.lineTo(tileX + this.tileSize * percentage, centerY)
        }
      } else if (type === 'RIGHT_UP') {
        this.ctx.moveTo(tileX, centerY)

        if (percentage <= 0.5) {
          this.ctx.lineTo(tileX + this.tileSize * percentage, centerY)
        } else {
          this.ctx.lineTo(centerX, centerY)
          this.ctx.lineTo(centerX, tileY + this.tileSize - this.tileSize * percentage)
        }
      } else if (type === 'DOWM_RIGHT') {
        this.ctx.moveTo(centerX, tileY + this.tileSize)

        if (percentage <= 0.5) {
          this.ctx.lineTo(centerX, tileY + this.tileSize - this.tileSize * percentage)
        } else {
          this.ctx.lineTo(centerX, centerY)
          this.ctx.lineTo(centerX, tileY + this.tileSize - this.tileSize * percentage)
        }
      } else if (type === 'RIGHT_DOWN') {
        this.ctx.moveTo(tileX, centerY)

        if (percentage <= 0.5) {
          this.ctx.lineTo(tileX + this.tileSize * percentage, centerY)
        } else {
          this.ctx.lineTo(centerX, centerY)
          this.ctx.lineTo(centerX, tileY + this.tileSize * percentage)
        }
      }
      this.ctx.stroke()
    },
    drawMap() {
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          let tile = this.marketMap[y][x]

          if (!isNumber(tile)) {
            this.ctx.fillStyle = this.categoryToColor[tile]
          } else {
            this.ctx.fillStyle = '#666'
          }

          let tileX = x * this.tileSize
          let tileY = y * this.tileSize
          this.ctx.fillRect(tileX, tileY, this.tileSize, this.tileSize)
        }
      }
    }
  },
  mounted() {
    this.items.forEach(item => item.checked = false)
    this.map = this.$refs.map
    this.map.height = this.map.width = this.size * this.tileSize

    this.ctx = this.map.getContext('2d')
    this.drawMap()

    let framesPerTile = 12
    this.ctx.lineWidth = 4
    this.ctx.strokeStyle = '#000'
    let interval = setInterval(() => {
      this.drawMap()

      let completionValue = 1 / this.route.length
      this.completed += completionValue / framesPerTile

      this.route.forEach((route, i) => {
        let lastCompletion = i * completionValue
        if (this.completed > lastCompletion)
          this.drawLine(route.x, route.y, route.type, Math.min((this.completed - lastCompletion) / completionValue, 1))
      })

      if (this.completed >= 1)
        clearInterval(interval)
    }, 16)
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
    text-align: right;
    margin-right: 10px;
  }
}
</style>
