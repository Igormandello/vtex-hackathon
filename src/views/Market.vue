<template>
  <v-container class="market-view pb-4 mb-4">
    <ApolloQuery
      :query="gql => gql`query FetchMarket ($marketId: ID!) {
          market(id: $marketId) {
            name
          }
        }
      `"
      :variables="{ marketId }"
    >
      <template v-slot="{ result: { data }, isLoading }">
        <v-progress-circular v-if="isLoading" color="primary" indeterminate/>
        <div v-else>
          <h1 class="mb-2">{{ data.market.name }}</h1>
          <v-text-field type="search" prepend-inner-icon="search"/>

          <ApolloQuery
            :query="gql => gql`{
                allProducts {
                  id,
                  asset,
                  description,
                  price
                }
              }
            `"
          >
            <template v-slot="{ result: { data }, isLoading }">
              <v-progress-circular v-if="isLoading" color="primary" indeterminate/>
              <div v-else>
                <h3 class="mb-1">Recomendado para você</h3>
                <m-item 
                  :key="i"
                  v-model="data.allProducts[i]"
                  v-for="(item, i) in data.allProducts.slice(0, 3)"
                />

                <h3 class="mt-4 mb-1">Todos os items</h3>
                <m-item
                  :key="3 + i"
                  v-model="data.allProducts[3 + i]"
                  v-for="(item, i) in data.allProducts.slice(3, data.allProducts.length)"
                />

                <v-fab-transition>
                  <v-btn
                    v-show="data.allProducts.some(item => item.count > 0)"
                    :to="{ name: 'route', params: { 
                        marketId,
                        items: data.allProducts.filter(item => item.count != 0),
                        allProducts: data.allProducts 
                      } 
                    }"
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
              </div>

            </template>
          </ApolloQuery>
        </div>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'market',
  props: {
    marketId: String
  },
  apollo: {
    allMarkets: gql`{
      allMarkets {
        id,
        name,
        asset
      }
    }`,
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
