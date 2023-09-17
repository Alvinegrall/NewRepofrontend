import axios from "@/config/axios";

export default {
  listclients(urlcode) {
    return axios.post("/listclients", { urlcode });
  },
};
