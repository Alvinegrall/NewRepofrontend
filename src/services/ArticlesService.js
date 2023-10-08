import axios from "@/config/axios";

export default {
  getAllSortie(cycle_code) {
    return axios.get(`/sortie/${cycle_code}/all`);
  },

  getAllLogs(cycle_code) {
    return axios.get(`/logs/${cycle_code}/all`);
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

  getHomepageData(cycle_code) {
    return axios.get(`/home-page-data/${cycle_code}`);
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
  getAllEntre(cycle_code) {
    return axios.get(`/entre/${cycle_code}/all`);
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

  getAllCycle() {
    return axios.get(`/cycles`);
  },

  getCurrentCycle(cycle_code) {
    return axios.get(`/cycles/${cycle_code}/show`);
  }, 
  
  getActiveCycle() {
    return axios.get(`/cycles/active`);
  },
  getArchives() {
    return axios.get(`/archives`);
  },
};
