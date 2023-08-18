import { ICredentials, IError } from "@/interfaces/generics";
import { IUser } from "@/interfaces/user";
import axios, { isAxiosError } from "axios";

const baseAPI = axios.create({
  baseURL: "http://10.10.203.91:3000",
});

interface AuthResponse {
  user: IUser;
  error: IError;
}

const API = {
  User: {
    Authenticate: async ({ username, password }: ICredentials): Promise<AuthResponse | null> => {
      try {
        const response = await baseAPI.post("/api/user/auth", { username, password });
        return response.data;
      } catch (err: any) {
        if (isAxiosError(err)) return err.response?.data;
        return null;
      }
    },

    GetInfo: async (token: string): Promise<AuthResponse | null> => {
      try {
        const response = await baseAPI.get("/api/user/auth", { params: { validationToken: token } });
        return response.data;
      } catch (err: any) {
        if (isAxiosError(err)) return err.response?.data;
        return null;
      }
    },
  },

  Access: {
    GetInfo: async (id?: number) => {
      try {
        const response = await baseAPI.get("/api/access", { params: { reqId: id } });
        return response.data;
      } catch (err: any) {
        if (isAxiosError(err)) return err.response?.data;
        return null;
      }
    },

    GetApprover: async (id?: number) => {
      try {
        const response = await baseAPI.get("/api/access/approver", { params: { reqId: id } });
        return response.data;
      } catch (err: any) {
        if (isAxiosError(err)) return err.response?.data;
        return null;
      }
    },
  },
};

export default API;
