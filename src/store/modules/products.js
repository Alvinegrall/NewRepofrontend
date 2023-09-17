import store from "..";
import ProductsService from "@/services/ProductsService";

const state = {
  products: [],
  categories: [],
  current_product: {},
  loading: false,
};

// getters
const getters = {
  products: (state) => {
    return state.products || [];
  },
  categories: (state) => {
    return state.categories || [];
  },
  current_product: (state) => {
    return state.current_product;
  },
  loading: (state) => {
    return state.loading;
  },
};

// privileges
const actions = {
  async listproducts({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return ProductsService.listproducts(urlcode).then(({ data }) => {
      if (!data.error) {
        commit("SET_PRODUCTS", data.products);
      }

      return data;
    });
  },
  async listcategories({ commit }) {
    const urlcode = store.getters["partners/urlcode"];
    return ProductsService.productcategories(urlcode).then(({ data }) => {
      if (!data.error) {
        commit("SET_CATEGORIES", data.categories);
      }

      return data;
    });
  },

  async get_product({ commit }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return ProductsService.getproduct({ product: hashid, urlcode }).then(
      ({ data }) => {
        if (!data.error) {
          commit("SET_CURRENT_PRODUCT", data.product);
        }

        return data;
      }
    );
  },

  async delete_product({ dispatch }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return ProductsService.deleteproduct({ product: hashid, urlcode }).then(
      () => {
        return dispatch("listproducts");
      }
    );
  },

  async suspend_product({ dispatch }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return ProductsService.suspendproduct({ product: hashid, urlcode }).then(
      () => {
        return dispatch("listproducts");
      }
    );
  },

  async unsuspend_product({ dispatch }, hashid) {
    const urlcode = store.getters["partners/urlcode"];
    return ProductsService.unsuspendproduct({ product: hashid, urlcode }).then(
      () => {
        return dispatch("listproducts");
      }
    );
  },

  set_loading({ commit }, loading) {
    commit("SET_LOADING", loading);
  },
};

// mutations
const mutations = {
  SET_CURRENT_PRODUCT(state, current_product) {
    state.current_product = current_product;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
