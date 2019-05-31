<template>
  <v-card elevation=4 class="mb-3">
    <v-layout row class="pa-2 item">
      <v-avatar class="mr-2">
        <v-img :src="value.image"/>
      </v-avatar>

      <h2>{{ value.name }}</h2>

      <v-flex class="item-counter">
        <v-icon @click="value.count -= 1">remove</v-icon>
        <span>{{ value.count }}</span>
        <v-icon @click="value.count += 1">add</v-icon>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'm-item',
  props: {
    value: Object
  }
}
</script>

<style lang="scss" scoped>
.item {
  align-items: center;

  h2 {
    flex-grow: 1;
    text-align: left;
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

