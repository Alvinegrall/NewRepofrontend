import { createStore } from "vuex";

import auth from "./modules/auth";

import articles from "./modules/articles";

export default createStore({
  state: {
    globalLoading: true,
    containLoading: true,
    lastPosition: "common.home",
  },
  mutations: {
    SET_GLOBAL_LOADING(state, loading) {
      state.globalLoading = loading;
    },
    SET_CONTAIN_LOADING(state, loading) {
      state.containLoading = loading;
    },
  },
  actions: {
    setGlobalLoading({ commit }, loading) {
      commit("SET_GLOBAL_LOADING", loading);
    },
    setContainLoading({ commit }, loading) {
      commit("SET_CONTAIN_LOADING", loading);
    },
    setLastPosition({ commit }, position) {
      commit("SET_LAST_POSITION", position);
    },
  },
  modules: {
    auth,

    articles
    ,
  },
  strict: process.env.NODE_ENV !== "production",
});
