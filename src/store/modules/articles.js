import store from "..";
import ArticlesService from "@/services/ArticlesService";

const state = {
  article: null,
  logs: null,
  homePageData: null,
};

// getters
const getters = {
  article: (state) => {
    return state.article || [];
  },
  logs: () => {
    return state.logs || [];
  },
  homePageData: () => {
    return state.homePageData;
  },
};

// privileges
const actions = {
  async getAllArticles({ commit }) {
    return ArticlesService.getAllArticles()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_ARTICLE", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async getHomepageData({ commit }) {
    return ArticlesService.getHomepageData()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_HOME_PAGE_DATA", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async getAllLogs({ commit }) {
    return ArticlesService.getAllLogs()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_LOGS", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async createArticle({}, data) {
    return ArticlesService.createArticle(data);
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
  SET_ARTICLE(state, val) {
    state.article = val;
  },
  SET_LOGS(state, val) {
    state.logs = val;
  },
  ADD_COLOR(state, color) {
    state.generatedColors.add(color);
    state.colors.push(color);
  },
  SET_HOME_PAGE_DATA(state, datas) {
    state.homePageData = datas;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
