import axios from "@/config/axios";

export default {
  getAllCat() {
    return axios.get("/cat");
  },

  createCat(category) {
    return axios.post("/cat", category);
  },

  getAllFournisseurs() {
    return axios.get("/fournisseur");
  },

  createFournisseur(data) {
    return axios.post("/fournisseur", data);
  },

  getAllBenefi() {
    return axios.get("/beneficiaire");
  },

  createBenefi(data) {
    return axios.post("/beneficiaire", data);
  },

  getAllMagasins() {
    return axios.get("/magasin");
  },
  createMagasin(data) {
    return axios.post("/magasin", data);
  },
};
