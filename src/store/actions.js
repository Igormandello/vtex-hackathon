export default {
  login ({ commit }, username) {
    commit('setUsername', username)
    commit('setLogged', true)
  },
  logout ({ commit }) {
    commit('setUsername', '')
    commit('setLogged', false)
  }
}