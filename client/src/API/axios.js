import axios from "axios";

const axiosBaseUrl = axios.create({
  baseURL: "https://evangadi-forum-backened.onrender.com",
});

export default axiosBaseUrl;
