import axios from "@/config/axios";

export default {
  productcategories(urlcode) {
    const data = { urlcode };
    return axios.post("/productcategories", data);
  },

  listproducts(urlcode, category = false) {
    if (category) {
      return axios.post("/listproducts", { urlcode, category });
    } else {
      return axios.post("/listproducts", { urlcode });
    }
  },

  newproduct(data) {
    return axios.post("/newproduct", data);
  },

  getproduct(data) {
    return axios.post("/getproduct", data);
  },

  deleteproduct(data) {
    return axios.post("/deleteproduct", data);
  },

  suspendproduct(data) {
    return axios.post("/suspendproduct", data);
  },

  unsuspendproduct(data) {
    return axios.post("/unsuspendproduct", data);
  },
};
