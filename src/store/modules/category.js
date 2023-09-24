import store from "..";
import ArticlesService from "@/services/ArticlesService";

const state = {
  cat: null,
};

// getters
const getters = {
  cat: (state) => {
    return state.cat || [];
  },
};

// privileges
const actions = {
  async getAllCat({ commit }) {
    return  ArticlesService.getAllCat()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_CAT", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async createCat({}, cat) {
    return ArticlesService.createCat(cat);
  },
  async getCat({}, code) {
    return ArticlesService.getCat(code);
  },
};

// mutations
const mutations = {
  SET_CAT(state, cat) {
    // add color to each compte
    state.cat = cat;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
