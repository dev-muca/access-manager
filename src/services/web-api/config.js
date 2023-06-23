import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.API_URL,
  headers: { "Content-Type": "application/json" },
});

export default baseAPI;
