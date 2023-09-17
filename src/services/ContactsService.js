import axios from "@/config/axios";

export default {
  listcontacts(urlcode) {
    return axios.post("/listcontacts", { urlcode });
  },
  setcontactasread({ contact_id, urlcode }) {
    return axios.post("/setcontactasread", { contact_id, urlcode });
  },
  setcontactresponse({ contact_id, urlcode, response }) {
    return axios.post("/setcontactresponse", { contact_id, urlcode, response });
  },
};
