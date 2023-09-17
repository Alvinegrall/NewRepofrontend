import axios from "@/config/axios";

export default {
  get_categories() {
    const data = {
      foo: "bar",
    };

    return axios.post("/pagecategories", data);
  },

  create(fields) {
    return axios.post("/newpage", fields);
  },
  // createAssociation(fields) {
  //   return axios.post("/newpage", fields);
  // },

  post(fields) {
    return axios.post("/pagepost", fields);
  },

  sendconfirmcode(fields) {
    return axios.post("/sendconfirmcode", fields);
  },

  confirmcodevalidation(fields) {
    return axios.post("/confirmcodevalidation", fields);
  },

  pagecashoutrequest(fields) {
    return axios.post("/pagecashoutrequest", fields);
  },

  pageupdatecolumn(column, value, urlcolde) {
    return axios.post("/pageupdatecolumn", {
      column,
      value,
      urlcolde,
      urlcode: urlcolde,
    });
  },
};
