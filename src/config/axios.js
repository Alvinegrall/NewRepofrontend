import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.crossDomain = true;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // config.baseURL = `http://localhost:57653/api/v1`;
    config.baseURL = `https://api.kelon.adoobin.com/api/v1`;
    const token = localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;



