import PartnersService from "@/services/PartnersService";

async function _listpagestransactions(commit, getters, type = "main") {
  return PartnersService.listpagestransactions(getters.urlcode, type).then(
    ({ data }) => {
      if (!data.error) {
        if (type == "main") {
          commit("SET_TRANSACTIONS", data.transactions);
        } else {
          commit("SET_PENDING_TRANSACTIONS", data.transactions);
        }
      }
      return data;
    }
    
  );
}

const state = {
  JsonApiBaseUrl : "http://countries.faroty.com",
  // JsonApiBaseUrl : "http://localhost:4000",
  current_partner: {},
  categories: [],
  transactions: [],
  orders: [],
  pending_transactions: [],
  current_transaction: {},
  current_order: {},
  countries: [],
  currentStates: [],
  currentCities: [],
};

// getters
const getters = {
  current_partner: (state) => {
    return state.current_partner;
  },
  transactions: (state) => {
    return state.transactions;
  },
  orders: (state) => {
    return state.orders;
  },
  pending_transactions: (state) => {
    return state.pending_transactions;
  },
  urlcode: (state) => {
    return state.current_partner?.urlcode;
  },
  current_transaction: (state) => {
    return state.current_transaction;
  },
  current_order: (state) => {
    return state.current_order;
  },
  countries: (state) => {
    return state.countries;
  },
  currentStates: (state) => {
    return state.currentStates;
  },
  currentCities: (state) => {
    return state.currentCities;
  },
};

// privileges
const actions = {
  async getCountries({ commit,state }) {
    return await fetch(state.JsonApiBaseUrl+"/countries")
      .then((response) => response.json())
      .then((result) => {
        commit("SET_COUNTRIES", result);
        return result;
      })
      .catch((error) => console.log("error", error));
  },

  async getStateByCountry({ commit,state }, datas) {
    return await fetch(state.JsonApiBaseUrl+"/states?country_id=" + datas.id)
      .then((response) => response.json())
      .then((result) => {
        commit("SET_NEW_STATES", result);
        return result;
      })
      .catch((error) => console.log("error", error));
  },

  async getCitiesByStates({ commit,state }, datas) {
    return await fetch(state.JsonApiBaseUrl+"/cities?state_id=" + datas.id)
      .then((response) => response.json())
      .then((result) => {
        commit("SET_NEW_CITIES", result);
        return result;
      })
      .catch((error) => console.log("error", error));
  },

  async get_partner({ commit }, urlcode) {
    return PartnersService.getpartner(urlcode).then(({ data }) => {
      if (!data.error) {
        commit("SET_CURRENT_PARTNER", data.partner);
      }

      return data;
    });
  },
  async listpagestransactions({ commit, getters }, type = "main") {
    _listpagestransactions(
      commit,
      getters,
      type == "main" ? "blocked" : "main"
    );
    return _listpagestransactions(commit, getters, type);
  },
  async getorder({ commit, getters }, order_ref) {
    return PartnersService.getorder(order_ref, getters.urlcode).then(
      ({ data }) => {
        if (!data.error) {
          commit("SET_CURRENT_TRANSACTION", data.transaction);
        }

        return data;
      }
    );
  },
  async listpageorders({ commit, getters }) {
    return PartnersService.listpageorders(getters.urlcode).then(({ data }) => {
      if (!data.error) {
        commit("SET_ORDERS", data.orders);
      }

      return data.orders;
    });
  },
  setCurrentTransaction({ commit }, transaction) {
    commit("SET_CURRENT_TRANSACTION", transaction);
  },
  setCurrentOrder({ commit }, order) {
    commit("SET_CURRENT_ORDER", order);
  },
};

// mutations
const mutations = {
  SET_NEW_STATES(state, data) {
    state.currentStates = data;
  },
  SET_NEW_CITIES(state, data) {
    state.currentCities = data;
  },
  SET_COUNTRIES(state, countries) {
    state.countries = countries;
  },

  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions;
  },
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
  SET_PENDING_TRANSACTIONS(state, pending_transactions) {
    state.pending_transactions = pending_transactions;
  },
  SET_CURRENT_TRANSACTION(state, current_transaction) {
    state.current_transaction = current_transaction;
  },
  SET_CURRENT_ORDER(state, current_order) {
    state.current_order = current_order;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_CURRENT_PARTNER(state, current_partner) {
    state.current_partner = current_partner;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
