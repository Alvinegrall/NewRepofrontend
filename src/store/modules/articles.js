import store from "..";
import ArticlesService from "@/services/ArticlesService";

const state = {
  article: null,
  logs: null,
  homePageData: null,
  statisque: null,
  allStats: null,
  archives: null,
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
    return state.homePageData || {};
  },
  statisque: () => {
    return state.statisque;
  },
  allStats: () => {
    return state.allStats;
  },
  archives: () => {
    return state.archives;
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
    const cycle_code = store.getters["cycles/cycle_code"];

    return ArticlesService.getHomepageData(cycle_code)
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
    const cycle_code = store.getters["cycles/cycle_code"];
    return ArticlesService.getAllLogs(cycle_code)
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

  async getAllStatique({ commit }) {
    return ArticlesService.getAllStatique()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_ALL_STATS", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async getArchives({ commit }) {
    return ArticlesService.getArchives()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_ARCHIVE", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  async getStatique({ commit }) {
    return ArticlesService.getStatique()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_STATS", response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  async createArticle({}, data) {
    return ArticlesService.createArticle(data);
  },
  async deleteLogs({}, data) {
    return ArticlesService.deleteLogs(data);
  },
  async deleteArticle({}, data) {
    return ArticlesService.deleteArticle(data);
  },

  // async getAllArticles({}, data) {
  //   return ArticlesService.getAllArticles(data);
  // },

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
  SET_STATS(state, val) {
    state.statisque = val;
  },
  SET_ALL_STATS(state, val) {
    state.allStats = val;
  },
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
  SET_ARCHIVE(state, datas) {
    state.archives = datas;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
