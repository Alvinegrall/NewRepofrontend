import { createStore } from "vuex";

import auth from "./modules/auth";

import articles from "./modules/articles";
import category from "./modules/category";
import fournisseur from "./modules/fournisseur";
import beneficiaire from "./modules/beneficiaire";
import magasins from "./modules/magasins";
import entre from "./modules/entre";
import sortie from "./modules/sortie";
import cycles from "./modules/cycles";

export default createStore({
  state: {
    globalLoading: true,
    containLoading: true,
    lastPosition: "common.home",
    searchQuery: "",
    loadingSpinner: false,
  },
  mutations: {
    SET_GLOBAL_LOADING(state, loading) {
      state.globalLoading = loading;
    },
    SET_CONTAIN_LOADING(state, loading) {
      state.containLoading = loading;
    },
    SET_SEARCH_QUERY(state, data) {
      state.searchQuery = data;
    },
    SET_LOADING_SPINNER(state, status) {
      state.loadingSpinner = status;
    },
  },
  getters: {
    searchQuery: (state) => state.searchQuery,
  },

  actions: {
    setGlobalLoading({ commit }, loading) {
      commit("SET_GLOBAL_LOADING", loading);
    },
    setLoadingSpinner({ commit }, loading) {
      commit("SET_LOADING_SPINNER", loading);
    },
    setGlobalLoading({ commit }, loading) {
      commit("SET_GLOBAL_LOADING", loading);
      if (loading) {
        document.body.classList.add("is-loading");
        document.querySelector(".root-loader").style.display = "";
      } else {
        document.body.classList.remove("is-loading");
        document.querySelector(".root-loader").style.display = "none";
      }
    },
    setContainLoading({ commit }, loading) {
      commit("SET_CONTAIN_LOADING", loading);
    },
    setLastPosition({ commit }, position) {
      commit("SET_LAST_POSITION", position);
    },
    searchQuery({ commit }, data) {
      commit("SET_SEARCH_QUERY", data);
    },
  },
  modules: {
    auth,

    articles,
    category,
    fournisseur,
    beneficiaire,
    magasins,
    entre,
    sortie,
    cycles,
  },
  strict: process.env.NODE_ENV !== "production",
});
