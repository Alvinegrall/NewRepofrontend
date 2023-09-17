import axios from "@/config/axios";

export default {
  register(credentials) {
    const data = {
      name: credentials.fullname,
      phone: credentials.phone_number,
      email: "",
      ind: 237,
      image_string: "",
      dob: "2002-08-05",
    };

    return axios.post("/setprofile", JSON.stringify(data));
  },

  login(credentials) {
    const data = {
      email: "",
      ind: 237,
      image_string: "",
      dob: "2002-08-05",
      name: "",
      phone: credentials.phone_number,
    };

    return axios.post("/setprofile", JSON.stringify(data));
  },

  confirm_phone(confirm_code) {
    const data = {
      confirmCode: confirm_code,
    };

    return axios.post("/confirmuser", data);
  },

  set_setting(column, value) {
    const data = {
      column,
      value,
    };

    return axios.post("/setsetting", data);
  },

  resend_code() {
    const data = {};
    return axios.post("/newconfirmationcode", JSON.stringify(data));
  },

  init() {
    const data = {
      name: "Visitor",
      phone: "",
      email: "",
      phonecode: 237,
      lang: "fr",
      utc: 1,
      iso3: "CM",
      token: "",
    };

    return axios.post("/inituser", JSON.stringify(data));
  },

  getuid(hash_id) {
    const data = { uid: hash_id };
    return axios.post("/getuid", JSON.stringify(data));
  },
};
