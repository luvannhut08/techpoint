import CriteriaGroupsApi from "@/api/CriteriaGroupsApi";

const state = {
    isLoading: false,
    list: [],
    errors: {}
}

const mutations = {
    SET_LIST: (state, list) => {
        state.list = list
    },
    SET_ERRORS: (state, errors) => {
        state.errors = errors
    }
}

const actions = {
    fetchCriteriaGroupList: async ({commit}) => {
        try {
            const res = await CriteriaGroupsApi.getAll()
            if (res.status === 200) {
                commit("SET_LIST", res.data.data)
            }
        }
        catch (e) {

        }
    }
}

const getters = {
    getList: (state) => state.list,
    getErrors: (state) => state.errors
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
