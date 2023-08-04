import { ICredentials, IError } from "@/interfaces/generics";
import { IUser } from "@/interfaces/user";
import axios, { isAxiosError } from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

interface AuthResponse {
  user: IUser;
  error: IError;
}

const ApiRequest = {
  Authenticate: async ({ username, password }: ICredentials): Promise<AuthResponse | null> => {
    try {
      const response = await API.post("/api/user/auth", { username, password });
      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  },

  GetInfo: async (token: string): Promise<AuthResponse | null> => {
    try {
      const response = await API.get("/api/user/auth", { params: { validationToken: token } });
      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  },
};

export default ApiRequest;
