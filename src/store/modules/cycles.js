import store from "..";
import ArticlesService from "@/services/ArticlesService";

const state = {
  cycles: null,
  current_cycle: {},
  entres: null,
  logs: null,
  sortie: null,
};

// getters
const getters = {
  cycles: (state) => {
    return state.cycles || [];
  },
  current_cycle: (state) => {
    return state.current_cycle || {};
  },
  cycle_code: (state) => {
    return state?.current_cycle?.code;
  },
  entres: (state) => {
    return state?.current_cycle?.entres || [];
  },
  sortie: (state) => {
    return state.current_cycle.sortie || [];
  },
  logs: (state) => {
    return state.current_cycle.logs || [];
  },
};

// privileges
const actions = {
  async getAllCycle({ commit }) {
    return await ArticlesService.getAllCycle()
      .then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_CYCLE", response.data.data);
        }
      })
      .catch((error) => {
        // if(error.request.status == 401){
        //   location.href = "/login"
        // }
      });
  },

  async getCurrentCycle({ commit }, cycle_code) {
    return await ArticlesService.getCurrentCycle(cycle_code);
    // .then((response) => {
    //   if (!response.data.error) {
    //     console.log("response", response.data.data);
    //     commit("SET_CURRENT_CYCLE", response.data.data);
    //   }
    // })
    // .catch((error) => {
    //   console.log("error", error);
    // });
  },

  async getActiveCycle({ commit }) {
    return ArticlesService.getActiveCycle()
      .then((response) => {
        if (!response.data.error) {
          console.log("response", response.data.data);
          commit("SET_CURRENT_CYCLE", response.data.data);
        }
      })
      .catch((error) => {
        // if(error.request.status == 401){
        //   location.href = "/login"
        // }
        console.log("error", error);
      });
  },
};

// mutations
const mutations = {
  SET_CYCLE(state, val) {
    state.cycles = val;
  },
  SET_CURRENT_CYCLE(state, val) {
    state.current_cycle = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
