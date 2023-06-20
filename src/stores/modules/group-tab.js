const state = {
  group: [],
}

const mutations = {
  setGroup(state, obj) {
    state.group = obj
  },
}

const actions = {
  updateGroup({ commit }, obj) {
    commit('setGroup', obj)
  },
}

const getters = {
  getGroup(state) {
    return state.group
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
