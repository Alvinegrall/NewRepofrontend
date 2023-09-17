import store from "..";
import PaymentLinksService from "@/services/PaymentLinksService";

const state = {
  payment_links: [],
  current_link: {},
  loading: false,
};

// getters
const getters = {
  payment_links: (state) => {
    return state.payment_links || [];
  },
  current_link: (state) => {
    return state.current_link;
  },
  loading: (state) => {
    return state.loading;
  },
};

// privileges
const actions = {
  async listpagelinks({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return PaymentLinksService.listpagelinks({ urlcode }).then(({ data }) => {
      if (!data.error) {
        commit("SET_PAYMENT_LINKS", data.links);
      }

      return data.links;
    });
  },

  async getlink({ commit }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return PaymentLinksService.getpagelink({ link: hashid, urlcode }).then(
      ({ data }) => {
        if (!data.error) {
          commit("SET_CURRENT_LINK", data.link);
        }

        return data;
      }
    );
  },

  set_loading({ commit }, loading) {
    commit("SET_LOADING", loading);
  },

  setCurrentLink({ commit }, link) {
    commit("SET_CURRENT_LINK", link);
  },
};

// mutations
const mutations = {
  SET_CURRENT_LINK(state, current_link) {
    state.current_link = current_link;
  },
  SET_PAYMENT_LINKS(state, payment_links) {
    state.payment_links = payment_links;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
