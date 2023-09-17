import { createStore } from "vuex";

import auth from "./modules/auth";
import partners from "./modules/partners";
import products from "./modules/products";
import coupons from "./modules/coupons";
import clients from "./modules/clients";
import contacts from "./modules/contacts";
import page_categories from "./modules/page-categories";
import payment_links from "./modules/payment-links";
import association from "./modules/association";
import membres from "./modules/membres";
import comptes from "./modules/comptes";
import cotisations from  "./modules/cotisations"
import sanctions from  "./modules/sanctions"

export default createStore({
  state: {
    globalLoading: true,
    containLoading: true,
    lastPosition:"common.home"
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
    partners,
    products,
    coupons,
    clients,
    contacts,
    page_categories,
    payment_links,
    association,
    membres,
    comptes,
    cotisations,
    sanctions
  },
  strict: process.env.NODE_ENV !== "production",
});
