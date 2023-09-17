import axios from "@/config/axios";
export default {

    getAllCotisations(urlcode) {
    return axios
    .get("http://localhost:3333/api/v1/cotisation/"+urlcode)
  },

  createCotisation(cotisation) {
    return axios
    .post("http://localhost:3333/api/v1/cotisation", cotisation);
  },

  getCotisation(code) {
    return axios
    .get(`http://localhost:3333/api/v1/cotisation/${code}/show`)
  },
}