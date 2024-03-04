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

};

// privileges
const actions = {

  async getCurrentUser({ commit }) {
    await AuthService.profile()
      .then(async (response) => {
        if (!response.data.error) {
          console.log("response", response.data.data);
          commit("SET_CURRENT_USER", response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
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

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
