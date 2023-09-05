import axios, { isAxiosError } from "axios";

import { User } from "@/interfaces/user";
import { Credentials, Error } from "@/interfaces/generics";
import { Request } from "@/interfaces/request";

const baseAPI = axios.create({
  baseURL: process.env.API_BASE_URL,
});

interface AuthResponse {
  user: User;
  error: Error;
}

const useApi = () => {
  const postAuth = async ({ username, password }: Credentials): Promise<AuthResponse | null> => {
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

  const postRequest = async ({
    idAccess,
    idRequester,
    justification,
    approverOwner,
    requestDate,
    approver,
  }: Request) => {
    try {
      const response = await baseAPI.post("/api/request/", {
        idAccess,
        idRequester,
        justification,
        approverOwner,
        requestDate,
        approver,
      });

      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  };

  const getRequestsInfo = async (id?: number) => {
    try {
      const response = await baseAPI.get("/api/request", { params: { reqId: id } });
      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  };

  return { postAuth, getUserInfo, getAccessInfo, getAcessApprover, postRequest, getRequestsInfo };
};

export default useApi;
