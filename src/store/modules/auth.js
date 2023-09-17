import AuthService from "@/services/AuthService";
import store from "..";

const state = {
  currentUser: null,
};

// getters
const getters = {
  currentUser: (state) => {
    return state.currentUser?.user;
  },
  is_confirm: (state) => {
    return Number(state.currentUser?.user?.is_confirm || "0");
  },
  is_wallet_confirm: (state) => {
    return Number(state.currentUser?.user?.is_wallet_confirm || "0");
  },
  hash_id: (state) => {
    return state.currentUser?.user?.hash_id;
  },
  has_page: (state) => {
    return state.currentUser?.user?.has_page == 1;
  },
  urlcode: (state) => {
    return state.currentUser?.user?.pages[0];
  },
  urlcodes: (state) => {
    return state.currentUser?.user?.pages;
  },
  token: (state) => {
    return state.currentUser?.user?.api_token ?? "";
  },
  password: (state) => {
    return state.currentUser?.api_password ?? "";
  },
  currentUserEmail: (state, getters) => getters.currentUser?.email,
};

// privileges
const actions = {
  async refreshuser({ getters, commit }, temp_hash_id) {
    const hash_id = temp_hash_id || getters.currentUser?.hash_id;
    return AuthService.getuid(hash_id).then(async ({ data }) => {
      if (!data.error) {
        // if (data.user.has_page == 1) {
        //   await store.dispatch("partners/get_partner", data.user.pages[0]);
        // }
        commit("SET_CURRENT_USER", data);
      }
      return data;
    });
  },
  async setCurrentUser({ commit }, user) {
    commit("SET_CURRENT_USER", user);
  },
  init({ commit, getters }, credential) {
    if (getters.currentUser?.hash_id) return;
    return AuthService.init(credential).then(({ data }) => {
      if (!data.error) {
        commit("SET_CURRENT_USER", data);
      }
      return data;
    });
  },
  async resend_code() {
    return AuthService.resend_code();
  },
  async confirmuser({ commit }, confirm_code) {
    return AuthService.confirm_phone(confirm_code).then(({ data }) => {
      if (!data.error) {
        commit("SET_CURRENT_USER", data);
      }
      return data;
    });
  },
  logout({ commit }) {
    commit("SET_CURRENT_USER", null);
  },
};

// mutations
const mutations = {
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
    setTimeout(() => {
      if (user.is_confirm) {
        location.reload();
      }
    }, 3000);
  },
  UPDATE_CURRENT_USER(state, user) {
    user = {
      ...JSON.parse(state.currentUser),
      ...user,
    };
    state.currentUser = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
