import axios, { isAxiosError } from "axios";

import { IUser } from "@/interfaces/user";
import { ICredentials, IError } from "@/interfaces/generics";

const baseAPI = axios.create({
  baseURL: process.env.API_BASE_URL,
});

interface AuthResponse {
  user: IUser;
  error: IError;
}

const useApi = () => {
  const authentication = async ({ username, password }: ICredentials): Promise<AuthResponse | null> => {
    try {
      const response = await baseAPI.post("/api/user/auth", { username, password });
      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  };

  const getUserInfo = async (token: string): Promise<AuthResponse | null> => {
    try {
      const response = await baseAPI.get("/api/user/auth", { params: { validationToken: token } });
      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  };

  const getAccessInfo = async (id?: number) => {
    try {
      const response = await baseAPI.get("/api/access", { params: { reqId: id } });
      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  };

  const getAcessApprover = async (id?: number) => {
    try {
      const response = await baseAPI.get("/api/access/approver", { params: { reqId: id } });
      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  };

  return { authentication, getUserInfo, getAccessInfo, getAcessApprover };
};

export default useApi;
