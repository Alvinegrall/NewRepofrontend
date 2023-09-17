import axios from "axios";
import store from "../store";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.crossDomain = true;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // config.baseURL = `http://192.168.100.57:8080/farotyapi/index.php/api`;
    // config.baseURL = `http://api.faroty.com/index.php/api`;
    config.baseURL = `https://api.farotygo.com/index.php/api`

    const token = store.getters["auth/token"] ?? null;
    const password = store.getters["auth/password"] ?? null;

    if (token) config.headers.common["username"] = `${token}`;
    if (password) config.headers.common["password"] = `${password}`;

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;

