import store from "..";
import CotisationService from "@/services/CotisationService";

const state = {
  client: [],
  cotisations:[],
  infoCotisation: {}
 
};

// getters
const getters = {
  clients: (state) => {
    return state.clients || [];
  },
  info_cotisation: (state) => {
    return state.infoCotisation || {};
  },

  cotisations: (state) => {
    return state.cotisations || [];
  }
};

// privileges
const actions = {
  async getAllCotisations({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return CotisationService.getAllCotisations(urlcode).then((response) => {
      console.log("response", response);
      if (!response.data.error) {
       commit("SET_COTISATION", response.data.data);
      }
    })
    .catch((error) => {
      
      console.log("error", error);
    })
  },
  async createCotisation({  }, cotisation) {
    return CotisationService.createCotisation(cotisation);
  },
  async getCotisation({  },code) {
    return CotisationService.getCotisation(code);
  },
  setInfoCotisations({ commit }, data) {
    commit("SET_INFO_COTISATION", data);
  },
};

// mutations
const mutations = {
    SET_COTISATION(state, cotisations) {
    state.cotisations = cotisations;
  },
  SET_INFO_COTISATION(state, infoCotisation) {
    state.infoCotisation = infoCotisation;
  }
    
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
