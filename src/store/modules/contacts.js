import store from "..";
import ContactsService from "@/services/ContactsService";

const state = {
  contacts: [],
  current_contact: {},
};

// getters
const getters = {
  contacts: (state) => {
    return state.contacts || [];
  },
  current_contact: (state) => {
    return state.current_contact;
  },
};

// privileges
const actions = {
  async listcontacts({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return ContactsService.listcontacts(urlcode).then(({ data }) => {
      if (!data.error) {
        commit("SET_CONTACTS", data.contacts);
      }

      return data;
    });
  },
  async get_contact({ commit, dispatch }, id) {
    await dispatch("listcontacts");
    const contact = state.contacts.find((contact) => contact.id == id);
    commit("SET_CURRENT_CONTACT", contact);
  },
  async set_contact({ commit }, contact) {
    commit("SET_CURRENT_CONTACT", contact);
  },
};

// mutations
const mutations = {
  SET_CONTACTS(state, contacts) {
    state.contacts = contacts;
  },
  SET_CURRENT_CONTACT(state, contact) {
    state.current_contact = contact;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
