import axios from "@/config/axios";

export default {
  getAllMembres(urlcode) {
    return axios
    .get(`http://localhost:3333/api/v1/membre/${urlcode}`)
  },

  payRequest(paymentData){
    return axios
    .post("http://localhost:3333/api/v1/payment", paymentData)

  },

  createMembre(datas){
    return axios
    .post("http://localhost:3333/api/v1/membre", datas)
  }


};
