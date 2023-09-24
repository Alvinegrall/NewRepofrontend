import store from "..";
import ArticlesService from "@/services/ArticlesService";

const state = {
  benefi: null,
};

// getters
const getters = {
  benefi: (state) => {
    return state.benefi || [];
  },
};

// privileges
const actions = {
  async getAllBenefi({ commit }) {
    return ArticlesService.getAllBenefi()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_BENEFI", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async createBenefi({}, cat) {
    return ArticlesService.createBenefi(cat);
  },
  async getBenefi({}, code) {
    return ArticlesService.getCat(code);
  },
};

// mutations
const mutations = {
  SET_BENEFI(state, val) {
    // add color to each compte
    state.benefi = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
