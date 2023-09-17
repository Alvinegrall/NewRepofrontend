import store from "..";
import ClientsService from "@/services/ClientsService";

const state = {
  client: [],
  clients: [
    {
      id: 19,
      avatar: "https:\/\/avatars.dicebear.com\/v2\/gridy\/Howell-Hand.svg",
      login: "percy64",
      name: "Howell Hand",
      company: "Kiehn-Green",
      city: "Emelyside",
      progress: 70,
      created: "Mar 3, 2021",
      created_mm_dd_yyyy: "03-03-2021",
    },
    {
      id: 11,
      avatar: "https:\/\/avatars.dicebear.com\/v2\/gridy\/Hope-Howe.svg",
      login: "dare.concepcion",
      name: "Hope Howe",
      company: "Nolan Inc",
      city: "Paristown",
      progress: 68,
      created: "Dec 1, 2021",
      created_mm_dd_yyyy: "12-01-2021",
    },
    {
      id: 32,
      avatar: "https:\/\/avatars.dicebear.com\/v2\/gridy\/Nelson-Jerde.svg",
      login: "geovanni.kessler",
      name: "Nelson Jerde",
      company: "Nitzsche LLC",
      city: "Jailynbury",
      progress: 49,
      created: "May 18, 2021",
      created_mm_dd_yyyy: "05-18-2021",
    },
    {
      id: 22,
      avatar: "https:\/\/avatars.dicebear.com\/v2\/gridy\/Kim-Weimann.svg",
      login: "macejkovic.dashawn",
      name: "Kim Weimann",
      company: "Brown-Lueilwitz",
      city: "New Emie",
      progress: 38,
      created: "May 4, 2021",
      created_mm_dd_yyyy: "05-04-2021",
    },
    {
      id: 34,
      avatar:
        "https:\/\/avatars.dicebear.com\/v2\/gridy\/Justice-OReilly.svg",
      login: "hilpert.leora",
      name: "Justice O'Reilly",
      company: "Lakin-Muller",
      city: "New Kacie",
      progress: 38,
      created: "Mar 27, 2021",
      created_mm_dd_yyyy: "03-27-2021",
    },
    {
      id: 48,
      avatar:
        "https:\/\/avatars.dicebear.com\/v2\/gridy\/Adrienne-Mayer-III.svg",
      login: "ferry.sophia",
      name: "Adrienne Mayer III",
      company: "Kozey, McLaughlin and Kuhn",
      city: "Howardbury",
      progress: 39,
      created: "Mar 29, 2021",
      created_mm_dd_yyyy: "03-29-2021",
    },
    {
      id: 20,
      avatar:
        "https:\/\/avatars.dicebear.com\/v2\/gridy\/Mr.-Julien-Ebert.svg",
      login: "gokuneva",
      name: "Mr. Julien Ebert",
      company: "Cormier LLC",
      city: "South Serenaburgh",
      progress: 29,
      created: "Jun 25, 2021",
      created_mm_dd_yyyy: "06-25-2021",
    },
   
  ],
};

// getters
const getters = {
  clients: (state) => {
    return state.clients || [];
  },
};

// privileges
const actions = {
  // async listclients({ commit }) {
  //   const urlcode = store.getters["partners/urlcode"];
  //   return ClientsService.listclients(urlcode).then(({ data }) => {
  //     if (!data.error) {
  //       commit("SET_CLIENTS", data.clients);
  //     }

  //     return data;
  //   });
  // },
};

// mutations
const mutations = {
  // SET_CLIENTS(state, clients) {
  //   state.clients = clients;
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
