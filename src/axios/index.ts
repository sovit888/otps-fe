import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://6645dfd143c20f8dde15359b--relaxed-starlight-c10e31.netlify.app/api",
});
export default axiosInstance;
