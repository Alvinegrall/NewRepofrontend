import axios from "@/config/axios";

export default {
  newpagelink(data) {
    return axios.post("/newpagelink", data);
  },

  listpagelinks(data) {
    return axios.post("/listpagelinks", data);
  },

  getpagelink(data) {
    return axios.post("/getpagelink", data);
  },

  deletelink(data) {
    return axios.post("/deletelink", data);
  },

  deletelinkrow(data) {
    return axios.post("/deletelinkrow", data);
  },

  newpagelinkrow(data) {
    return axios.post("/newpagelinkrow", data);
  },
};
