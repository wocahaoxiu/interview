import axios from "axios";
const instance = axios.create({
  baseURL: "https://192.168.2.21:9888",
  headers: {},
  withCredentials: true,
});

export default instance;
