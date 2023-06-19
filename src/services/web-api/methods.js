import { isAxiosError } from "axios";
import baseAPI from "./config";

const API = {
  signInRequest: async (credentials) => {
    try {
      const response = await baseAPI.post("/auth", credentials);
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
      const response = await baseAPI.get(`/user/${token}`);
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
