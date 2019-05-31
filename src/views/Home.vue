<template>
  <div>
    <v-content class="intro">
      <div class="background"/>
      <v-container fill-height>
        <v-flex>
          <h1 class="mx-3">
            Suas compras</br>
            num piscar de olhos.
          </h1>
        </v-flex>
      </v-container>
    </v-content>
    <v-container class="markets">
      <h2 class="mb-2">Mercados por perto</h2>
      <v-layout column>
        <ApolloQuery
          :query="gql => gql`{
              allMarkets {
                id,
                name,
                asset
              }
            }
          `"
        >
          <template v-slot="{ result: { data }, isLoading }">
            <v-progress-circular v-if="isLoading" color="primary" indeterminate/>
            <v-flex v-else xs-4 ma-4 mt-3 :key="i" v-for="(market, i) in data.allMarkets">
              <v-card elevation=6>
                <v-flex py-3>
                  <h3>{{ market.name }}</h3>
                  <v-img class="my-3" :src="market.asset"/>
                  <v-btn outline round :to="{ name: 'market', params: { marketId: market.id, market } }" color="success">
                    Acessar
                  </v-btn>
                </v-flex>
              </v-card>
            </v-flex>
          </template>
        </ApolloQuery>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'

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
