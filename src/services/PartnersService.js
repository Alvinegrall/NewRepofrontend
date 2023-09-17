import axios from "@/config/axios";

export default {
  partnercategories() {
    const data = {
      foo: "bar",
    };

    return axios.post("/partnercategories", data);
  },

  getpartner(urlcode) {
    return axios.post("/getpartner", { urlcode });
  },

  listpagestransactions(urlcode, type = "main") {
    return axios.post("/listpagestransactions", { urlcode, type });
  },

  listpageorders(urlcode) {
    return axios.post("/listpageorders", { urlcode });
  },

  getorder(order_ref, urlcode) {
    return axios.post("/getorder", { order_ref, urlcode });
  },

  cancelorder(order_ref, urlcode, reason) {
    return axios.post("/cancelorder", { order_ref, urlcode, reason });
  },

  getpayment(payment_ref, urlcode) {
    return axios.post("/getpayment", { payment_ref, urlcode });
  },

  cancelpayment(payment_ref, urlcode, reason) {
    return axios.post("/cancelpayment", { payment_ref, urlcode, reason });
  },

  getproduct(data) {
    return axios.post("/getproduct", data);
  },

  newproduct(data) {
    return axios.post("/newproduct", data);
  },
};
