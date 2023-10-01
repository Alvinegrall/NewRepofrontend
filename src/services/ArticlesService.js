import axios from "@/config/axios";

export default {
  getAllSortie() {
    return axios.get("/sortie");
  },

  getAllLogs() {
    return axios.get("/logs");
  },
  deleteLogs(params) {
    return axios.delete(`logs/${params}/delete`);
  },
  deleteSortie(params) {
    return axios.delete(`sortie/${params}/delete`);
  },
  deleteArticle(params) {
    return axios.delete(`article/${params}/delete`);
  },
  deleteCat(params) {
    return axios.delete(`cat/${params}/delete`);
  },

  deleteFournisseur(params) {
    return axios.delete(`fournisseur/${params}/delete`);
  },

  deleteEntre(params) {
    return axios.delete(`entre/${params}/delete`);
  },

  deleteBeneficiaire(params) {
    return axios.delete(`beneficiaire/${params}/delete`);
  },
  deleteMagasin(params) {
    return axios.delete(`magasin/${params}/delete`);
  },

  getHomepageData() {
    return axios.get("/home-page-data");
  },
  getStatique() {
    return axios.post("/article/stats");
  },
  getAllStatique() {
    return axios.get("/article/stats/all");
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
