import store from "..";
import ArticlesService from "@/services/ArticlesService";

const state = {
  magasins: null,
};

// getters
const getters = {
  magasin: (state) => {
    return state.magasins || [];
  },
};

// privileges
const actions = {
  async getAllMagasins({ commit }) {
    return  ArticlesService.getAllMagasins()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_MAGASINS", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async createMagasin({}, cat) {
    return ArticlesService.createMagasin(cat);
  },
  async getCat({}, code) {
    return ArticlesService.getCat(code);
  },
};

// mutations
const mutations = {
  SET_MAGASINS(state, val) {
    // add color to each compte
    state.magasins = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
