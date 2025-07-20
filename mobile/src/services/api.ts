import axios from "axios";
import { Platform } from "react-native";

const api = axios.create({
  baseURL: "https://mentuca-back-production.up.railway.app",
  withCredentials: false,
});

export default api;