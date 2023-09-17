import store from "..";
import SanctionService from "@/services/SanctionService";

const state = {
  client: [],
  sanctions:[]
 
};

// getters
const getters = {
  clients: (state) => {
    return state.clients || [];
  },

  sanctions: (state) => {
    return state.sanctions || [];
  }
};

// privileges
const actions = {
  async getAllSanctions({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return SanctionService.getAllSanctions(urlcode).then((response) => {
      if (!response.data.error) {
       commit("SET_SANCTION", response.data.data.sanctions);
      }
    })
    .catch((error) => {
      
      console.log("error", error);
    })
  },
  async createSanction({  }, sanction) {
    const urlcode = store.getters["partners/urlcode"];
    sanction.partner_urlcode = urlcode;
    return SanctionService.createSanction(sanction);
  },

  async alertSanction({  },code) {
    return SanctionService.alertSanction(code);
  },
};

// mutations
const mutations = {
    SET_SANCTION(state, sanctions) {
    state.sanctions = sanctions;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
