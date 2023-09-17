import store from "..";

import MembreService from "@/services/MembreService";



const state = {
  JsonApiBaseUrl : "http://countries.faroty.com",
  // JsonApiBaseUrl : "http://localhost:4000",
 
  currentCities: [],
  membres: [],
};

// getters
const getters = {
  membres: (state) => {
    return state.membres || [];
  },
  membresList: (state) => {
    return state.membres.data || [];
  }
 
};

// privileges
const actions = {
  async getAllMembres({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return MembreService.getAllMembres(urlcode).then((response) => {
      console.log("response", response);
      if (!response.data.error) {
       commit("SET_MEMBRE", response.data.data);
      }
    })
    .catch((error) => {
      console.log("error", error);
    })
  },

  async payRequest({  }, paymentData) {
    return MembreService.payRequest(paymentData);
  },

  async createMembre({  }, datas) {
    return MembreService.createMembre(datas);
  },

  // async payCotisation({  }, paymentData) {
  //   return MembreService.payCotisation(paymentData);
  // },

  
};

// mutations
const mutations = {
  SET_MEMBRE(state, membres) {
    state.membres = membres;
  }
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
