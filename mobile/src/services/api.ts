import axios from "axios";
import { Platform } from "react-native";

const api = axios.create({
  baseURL: "http://10.0.2.2:8000",
  withCredentials: false,
});

export default api;