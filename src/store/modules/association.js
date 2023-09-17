import store from "..";
import AssociationService from "@/services/AssociationService";

const state = {
  client: [],
  tournois:[],
  seances:[],
  currentTournoi:{},
  associations: [],

 
};

// getters
const getters = {
  clients: (state) => {
    return state.clients || [];
  },
  associations: (state) => {
    return state.associations || [];
  },

  tournois: (state) => {
    return state.tournois || [];
  },

  seances: (state) => {
    return state.seances || [];
  },

  currentTournoi: ()=>{
    return state.currentTournoi || {};
  }

};

// privileges
const actions = {

  async getUserAssociations({ commit }) {
    const urlcodes = store.getters["auth/urlcodes"];
    const hash_id = store.getters["auth/hash_id"];
    // const datas = {
    //   urlcodes,
    //   hash_id
    // }

      AssociationService.getUserAssociations(urlcodes).then((response) => {
        console.log("response", response);
        if (!response.data.error) {
          commit("SET_ASSOCIATION", response.data.data);
        }
      });
  },

  async set_page_as_default({}, urlcode) {
    return AssociationService.setpageasdefault(urlcode);
    // .then(
    //   ({ data }) => {
    //     if (!data.error) {
    //       return true
    //     }

    //     return !data.error
    //   }
    // )
  },


  async getAllTournois({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return AssociationService.getAllTournois(urlcode).then((response) => {
      // console.log("response", response);
      if (!response.data.error) {
       commit("SET_TOURNOIS", response.data.data);
      }
    })
    .catch((error) => {
      console.log("error ", error);
    })
  },

  async getAllSeances({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return AssociationService.getAllSeances(urlcode).then((response) => {
      // console.log("response", response);
      if (!response.data.error) {
       commit("SET_SEANCE", response.data.data);
      }
    })
    .catch((error) => {
      console.log("error", error);
    })
  },

  async getTournoi({  },code) {
    return AssociationService.getTournois(code);
  },

  async getSingleSeance({},code){
    return AssociationService.getSingleSeance(code)
  },

  async attendanceList({},code){
    return AssociationService.attendanceList(code)
  },

  async saveAttendance({  }, datas) {
    const urlcode = store.getters["partners/urlcode"];
    datas.partner_urlcode = urlcode;
    return AssociationService.saveAttendance(datas);
  },

  async saveTournois({  }, tournois) {
    return AssociationService.saveTournois(tournois);
  }
};

// mutations
const mutations = {
    SET_TOURNOIS(state, tournois) {
    state.tournois = tournois;
  },
  SET_SEANCE(state,seances){
    state.seances = seances;
  },
  SET_CURRENT_TOUNOIS(state,tournoi){
    state.currentTournoi = tournoi;
  },
  SET_ASSOCIATION(state, association) {
    state.associations = association;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
