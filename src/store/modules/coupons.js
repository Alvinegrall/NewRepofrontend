import store from "..";
import CouponsService from "@/services/CouponsService";

const state = {
  coupons: [],
  current_coupon: {},
  loading: false,
};

// getters
const getters = {
  coupons: (state) => {
    return state.coupons || [];
  },
  current_coupon: (state) => {
    return state.current_coupon;
  },
  loading: (state) => {
    return state.loading;
  },
};

// privileges
const actions = {
  async listcoupons({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return CouponsService.listcoupons(urlcode).then(({ data }) => {
      if (!data.error) {
        commit("SET_COUPONS", data.coupons);
      }

      return data;
    });
  },
  async get_coupon({ commit }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return CouponsService.getcoupon({ coupon: hashid, urlcode }).then(
      ({ data }) => {
        if (!data.error) {
          commit("SET_CURRENT_COUPON", data.coupon);
        }

        return data;
      }
    );
  },

  async delete_coupon({ dispatch }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return CouponsService.deletecoupon({ coupon: hashid, urlcode }).then(() => {
      return dispatch("listcoupons");
    });
  },

  async suspend_coupon({ dispatch }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return CouponsService.suspendcoupon({ coupon: hashid, urlcode }).then(
      () => {
        return dispatch("listcoupons");
      }
    );
  },

  async unsuspend_coupon({ dispatch }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return CouponsService.unsuspendcoupon({ coupon: hashid, urlcode }).then(
      () => {
        return dispatch("listcoupons");
      }
    );
  },

  set_loading({ commit }, loading) {
    commit("SET_LOADING", loading);
  },
};

// mutations
const mutations = {
  SET_CURRENT_COUPON(state, current_coupon) {
    state.current_coupon = current_coupon;
  },
  SET_COUPONS(state, coupons) {
    state.coupons = coupons;
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
