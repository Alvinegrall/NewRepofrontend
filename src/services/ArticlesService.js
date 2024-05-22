import axios from "@/config/axios";
import store from "../store";
export default {
  getAllSortie(cycle_code) {
    return axios.get(`/sortie/${cycle_code}/all`);
  },

  handleGetAllSortie({
    page,
    per_page,
    category = null,
    start = null,
    end = null,
    limit_date,
    type,
    start_date,
    end_date,
    beneficiaire_id,
    article_id,
    // source_name,
    // source_ref,
    mode,
    search_value,
  }) {
    const cycle_code = store.getters["cycles/cycle_code"];
    return axios.get(
      `/sortie/${cycle_code}/all?page=${page}&per_page=${per_page}&category=${
        category ?? ""
      }&start_date=${start_date ?? ""}&end_date=${end_date ?? ""}&start=${start ?? ""}&end=${end ?? ""}&beneficiaire_id=${beneficiaire_id ?? ""}&article_id=${article_id ?? ""}&limit_date=${limit_date}&type=${
        type ?? ""
      }&search_value=${search_value}`
    );
    
  },


  handleGetAllSortiPdf({
    page,
    per_page,
    category = null,
    start = null,
    end = null,
    limit_date,
    type,
    start_date,
    end_date,
    beneficiaire_id,
    article_id,
    title,
    // source_name,
    // source_ref,
    mode,
    search_value,
  }){
    const cycle_code = store.getters["cycles/cycle_code"];
    return axios.get(
      `/sortie/${cycle_code}/all-sortie-pdf?page=${page}&per_page=${per_page}&category=${
        category ?? ""
      }&start_date=${start_date ?? ""}&end_date=${end_date ?? ""}&start=${start ?? ""}&end=${end ?? ""}&beneficiaire_id=${beneficiaire_id ?? ""}&article_id=${article_id ?? ""}&limit_date=${limit_date}&type=${
        type ?? ""
      }&search_value=${search_value}&title=${title}`
    );
  },
  handleGetAllEntre({
    page,
    per_page,
    category = null,
    start = null,
    end = null,
    limit_date,
    type,
    start_date,
    end_date,
    fournisseur_id,
    article_id,
    show_report,
    mode,
    search_value,
  }) {
    const cycle_code = store.getters["cycles/cycle_code"];
    return axios.get(
      `/entre/${cycle_code}/all-paginate?page=${page}&per_page=${per_page}&category=${
        category ?? ""
      }&start_date=${start_date ?? ""}&end_date=${end_date ?? ""}&start=${start ?? ""}&end=${end ?? ""}&fournisseur_id=${fournisseur_id ?? ""}&article_id=${article_id ?? ""}&limit_date=${limit_date}&type=${
        type ?? ""
      }&search_value=${search_value}&show_report=${show_report}`
    );
    
  },
  handleGetAllEntrePdf({
    page,
    per_page,
    category = null,
    start = null,
    end = null,
    limit_date,
    type,
    start_date,
    end_date,
    fournisseur_id,
    article_id,
    show_report,
    title,
    mode,
    search_value,
  }) {
    const cycle_code = store.getters["cycles/cycle_code"];
    return axios.get(
      `/entre/${cycle_code}/all-genarate-pdf?page=${page}&per_page=${per_page}&category=${
        category ?? ""
      }&start_date=${start_date ?? ""}&end_date=${end_date ?? ""}&start=${start ?? ""}&end=${end ?? ""}&fournisseur_id=${fournisseur_id ?? ""}&article_id=${article_id ?? ""}&limit_date=${limit_date}&type=${
        type ?? ""
      }&search_value=${search_value}&show_report=${show_report}&title=${title}`
    );
    
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
  getAllArticles_pagination({
    page,
    per_page,
    category = null,
    start = null,
    end = null,
    limit_date,
    type,
    // source_name,
    // source_ref,
    mode,
    search_value,
  }) {
    return axios.get(
      `/article?page=${page}&per_page=${per_page}&category=${
        category ?? ""
      }&start=${start ?? ""}&end=${end ?? ""}&limit_date=${limit_date}&type=${
        type ?? ""
      }&search_value=${search_value}`
    );
  },

  getAllArticles() {
    return axios.get(`/article-no-pagination`);
  },
  createArticle(data) {
    return axios.post("/article", data);
  },
  getAllEntre(cycle_code) {
    return axios.get(`/entre/${cycle_code}/all`);
  },
  getAllEntreNonConforme() {
    const cycle_code = store.getters["cycles/cycle_code"];
    return axios.get(`/entre/${cycle_code}/all-non-conforme`);
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
  genaratePdf(item) {
    return axios.get(`/genaratePdf/${item}`);
  },
  updateArticle(data, id) {
    return axios.put(`/article/${id}/update`, data);
  },
};
