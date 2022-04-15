import axios from "axios";

axios.defaults.baseURL = "http://singre.wzhyuming.top";

// axios.defaults.headers

// axios.interceptors.request.use
// axios.interceptors.response.use
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
