
import axios from "@/config/axios";

export default {
  getAllComptes(urlcode) {
    return axios
    .get(`http://localhost:3333/api/v1/compte/${urlcode}`)
  },

  createCompte(compte){
    return axios
    .post("http://localhost:3333/api/v1/compte", compte)

  },

  getCompte(code) {
    return axios
    .get(`http://localhost:3333/api/v1/compte/${code}/show`)
  },

};
