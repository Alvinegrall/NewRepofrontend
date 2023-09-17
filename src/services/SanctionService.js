import axios from "@/config/axios";
export default {

    getAllSanctions(urlcode) {
    return axios
    .get("http://localhost:3333/api/v1/sanction/"+ urlcode)
  },

  createSanction(sanction) {
    return axios
    .post("http://localhost:3333/api/v1/sanction", sanction)
  },
  alertSanction(code) {
    return axios
    .get("http://localhost:3333/api/v1/sanction/"+code+"/toggle")
  }
}