import axios from "@/config/axios";

export default {
  checkpromo(urlcode, data) {
    return axios.post("/checkpromo", { urlcode, ...data });
  },

  newcoupon(data) {
    return axios.post("/newcoupon", data);
  },

  listcoupons(urlcode) {
    return axios.post("/listcoupons", { urlcode });
  },

  getcoupon(data) {
    return axios.post("/getcoupon", data);
  },

  confirmcoupon(data) {
    return axios.post("/confirmcoupon", data);
  },

  deletecoupon(data) {
    return axios.post("/deletecoupon", data);
  },

  suspendcoupon(data) {
    return axios.post("/suspendcoupon", data);
  },

  unsuspendcoupon(data) {
    return axios.post("/unsuspendcoupon", data);
  },
};
