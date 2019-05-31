<template>
  <div>
    <v-content class="intro">
      <div class="background"/>
      <v-container fill-height>
        <v-flex>
          <h1>
            <p>Suas compras</p>
            <p>num piscar de olhos.</p>
          </h1>
        </v-flex>
      </v-container>
    </v-content>
    <v-container class="markets">
      <h2>Mercados por perto</h2>
      <v-layout column>
        <v-flex xs-4 ma-4 :key="i" v-for="i in [1, 2, 3]">
          <v-card elevation=6>
            <v-flex py-3>
              <h3>Mercado {{ i }}</h3>
              <v-img class="my-3" :src="require('../assets/market.jpg')"/>
              <v-btn outline round :to="{ name: 'market', params: { marketId: i } }" color="success">
                Acessar
              </v-btn>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss">
  .intro {
    position: relative;
    min-height: 250px;
    max-height: 300px;
    height: 75vh;
    
    .background {
      position: absolute;
      left: 0;
      top: -64px;
      height: 100%;
      width: 100%;
      transform: skewY(-10deg);
      transform-origin: 0;
      background-color: #845ec2;
    }

    .container {
      height: 70%;
      text-align: left;

      h1 {
        color: white;
      }
    }

    .flex {
      z-index: 0;
    }
  }

  .container.markets {
    margin-top: -40px;
  }
</style>
