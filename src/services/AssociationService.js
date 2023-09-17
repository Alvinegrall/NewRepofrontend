import axios from "@/config/axios";
export default {

  getAllTournois(urlcode) {
    return axios
    .get(`http://localhost:3333/api/v1/tournois/${urlcode}`)
  },

  getAllSeances(urlcode) {
    return axios
    .get(`http://localhost:3333/api/v1/seance/${urlcode}`)
  },

  getTournois(code) {
    return axios
    .get(`http://localhost:3333/api/v1/tournois/${code}/show`)
  },

  getSingleSeance(code) {
    return axios
    .get(`http://localhost:3333/api/v1/seance/${code}/show`)
  },
  attendanceList(code) {
    return axios
    .get(`http://localhost:3333/api/v1/seance/attendance/${code}/show`)
  },

  saveTournois(tournois) {
    return axios
    .post("http://localhost:3333/api/v1/tournois", tournois)
  },
  saveAttendance(datas) {
    return axios
    .post("http://localhost:3333/api/v1/seance/attendance", datas)
  },
  saveSeance(seance) {
    return axios
    .post("http://localhost:3333/api/v1/seance", seance)
  },

  createNewGroupe(groupe) {
    return axios
    .post("http://localhost:3333/api/v1/usergroupe", groupe)
  },

  closeSeance(code) {
    return axios
    .put(`http://localhost:3333/api/v1/seance/${code}/close`)
  },
  getUserAssociations(urlcodes) {
    return axios
    .post(`http://localhost:3333/api/v1/usergroupe/userpages`,urlcodes)
  },
  setpageasdefault(urlcode) {
    const data = { urlcode }

    return axios.post('/setpageasdefault', data)
  },

}