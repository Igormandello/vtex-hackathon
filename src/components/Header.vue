<template>
  <v-toolbar dark flat color="primary">
    <v-avatar>
      <img :src="require('../assets/logo.png')"/>
    </v-avatar>
    <v-spacer></v-spacer>
    <div v-if="!logged">
      <v-btn @click="loginForm = true" flat round>Login</v-btn>
      <v-btn outline round>Sign up</v-btn>
    </div>
    <v-menu v-else :offset-y="false" transition="slide-y-transition" origin="top right">
      <v-btn round flat class="username body-2 font-weight-light" slot="activator">
        {{ username }}
        <v-icon small>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>Logout</v-list-tile-title>
          <v-icon small class="ml-2">logout</v-icon>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-dialog v-model="loginForm" max-width="400px">
      <v-card class="pa-4">
        <h2>Log In</h2>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field label="Username" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Password" type="password" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat round @click="loginForm = false">Close</v-btn>
          <v-btn outline round color="primary" flat :loading="logging" @click="executeLogin">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'm-header',
  data: () => ({
    loginForm: false,
    logging: false
  }),
  methods: {
    ...mapActions([
      'login'
    ]),
    async executeLogin() {
      this.logging = true
      await new Promise(resolve => setTimeout(resolve, 750))
      this.login('Barack Obama')

      this.logging = false
      this.loginForm = false
    }
  },
  computed: {
    logged() {
      return this.$store.state.system.logged
    },
    username() {
      return this.$store.state.user.username
    }
  }
}
</script>

<style lang="scss" scoped>
  .username {
    text-transform: none;
  }
  
  .v-toolbar {
    z-index: 1;
  }
  
  .v-avatar img {
    filter: invert(1)
  }
</style>
