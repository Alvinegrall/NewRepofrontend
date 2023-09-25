import store from "..";
import ArticlesService from "@/services/ArticlesService";

const state = {
  entre: null,
};

// getters
const getters = {
  entre: (state) => {
    return state.entre || [];
  },
};

// privileges
const actions = {
  async getAllEntre({ commit }) {
    return ArticlesService.getAllEntre()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_ENTRE", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async createEntre({}, data) {
    return ArticlesService.createEntre(data);
  },
  async getCompte({}, code) {
    return ArticlesService.getCompte(code);
  },
  generate_random_unique_color({ state, commit }) {
    let randomColor;
    for (let i = 0; i < 20; i++) {
      do {
        randomColor =
          "#" +
          Math.floor(Math.random() * 16777216)
            .toString(16)
            .padStart(6, "0");
      } while (state.generatedColors.has(randomColor));

      commit("ADD_COLOR", randomColor);
    }
  },
};

// mutations
const mutations = {
  SET_ENTRE(state, val) {
    state.entre = val;
  },
  ADD_COLOR(state, color) {
    state.generatedColors.add(color);
    state.colors.push(color);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
