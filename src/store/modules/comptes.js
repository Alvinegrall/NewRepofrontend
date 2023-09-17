import store from "..";
import CompteService from "@/services/CompteService";


const state = { 
  comptes: [],
  colors: [],
  generatedColors: new Set(),
};

// getters
const getters = {
  comptes: (state) => {
    return state.comptes || [];
  }
 
};

// privileges
const actions = {
  async getAllComptes({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return CompteService.getAllComptes(urlcode).then((response) => {
      console.log("response", response);
      if (!response.data.error) {
       commit("SET_COMPTE", response.data.data);
      }
    })
    .catch((error) => {
      console.log("error", error);
    })
  },
  

  async createCompte({  }, compte) {
    return CompteService.createCompte(compte);
  },
  async getCompte({  },code) {
    return CompteService.getCompte(code);
  },
  generate_random_unique_color({ state, commit }) {
    let randomColor;
    for (let i = 0; i < 20; i++) {
      do {
        randomColor = '#' + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
      } while (state.generatedColors.has(randomColor));

      
      commit('ADD_COLOR', randomColor);
    }
    }
    



  
};

// mutations
const mutations = {
  SET_COMPTE(state, comptes) {
    // add color to each compte
    comptes = comptes.map((compte) => {
      return { ...compte, color: state.colors[Math.floor(Math.random() * state.colors.length)]  }
    })
    state.comptes = comptes;
  },
  ADD_COLOR(state, color) {
    state.generatedColors.add(color);
    state.colors.push(color);
  },
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
