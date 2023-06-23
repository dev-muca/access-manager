import { isAxiosError } from "axios";
import baseAPI from "./config";

const API = {
  signInRequest: async (credentials) => {
    try {
      const response = await baseAPI.post("/api/auth", credentials);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  getUserDataRequest: async (token) => {
    try {
      const response = await baseAPI.get(`/api/user/${token}`);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  getUsersByDepartament: async (departament) => {
    try {
      const response = await baseAPI.post(`/api/user/departament`, { departament });
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  getAllRoles: async () => {
    try {
      const response = await baseAPI.get(`/api/roles/all`);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },
};

export default API;
