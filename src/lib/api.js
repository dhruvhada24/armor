import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ Correct port + /api prefix
});

export default api;
