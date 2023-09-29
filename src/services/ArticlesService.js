import axios from "@/config/axios";

export default {
  getAllSortie() {
    return axios.get("/sortie");
  },
  getAllLogs() {
    return axios.get("/logs");
  },
  getHomepageData() {
    return axios.get("/home-page-data");
  },
  createSortie(data) {
    return axios.post("/sortie", data);
  },
  getAllArticles() {
    return axios.get("/article");
  },
  createArticle(data) {
    return axios.post("/article", data);
  },
  getAllEntre() {
    return axios.get("/entre");
  },
  createEntre(data) {
    return axios.post("/entre", data);
  },
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
