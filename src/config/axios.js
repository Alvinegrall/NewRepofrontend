import axios from "axios";
import store from "../store";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.crossDomain = true;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.baseURL = `http://localhost:3333/api/v1`;
    // config.baseURL = `http://api.kelon.adoobin.com/api/v1`;
    const token = localStorage.getItem("jwt");
    config.headers.common["Authorization"] = "Bearer " + token;

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;
