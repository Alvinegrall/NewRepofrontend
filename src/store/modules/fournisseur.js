import store from "..";
import ArticlesService from "@/services/ArticlesService";

const state = {
  fournisseur: null,
};

// getters
const getters = {
  fournisseur: (state) => {
    return state.fournisseur || [];
  },
};

// privileges
const actions = {
  async getAllFournisseurs({ commit }) {
    return ArticlesService.getAllFournisseurs()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_FOURNISSEUR", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async createFournisseur({}, cat) {
    return ArticlesService.createFournisseur(cat);
  },
  async getCat({}, code) {
    return ArticlesService.getCat(code);
  },
};

// mutations
const mutations = {
  SET_FOURNISSEUR(state, val) {
    // add color to each compte
    state.fournisseur = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
