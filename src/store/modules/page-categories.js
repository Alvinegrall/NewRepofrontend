import PageService from "@/services/PageService";

const state = {
  categories: [],
};

// getters
const getters = {
  categories: (state) => {
    return state.categories;
  },
};

// privileges
const actions = {
  async get_categories({ commit }) {
    return PageService.get_categories().then(({ data }) => {
      if (!data.error) {
        commit("SET_CATEGORIES", data.categories);
      }
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
