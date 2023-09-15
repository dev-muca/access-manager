import axios, { isAxiosError } from "axios";

import { User } from "@/interfaces/user";
import { Request } from "@/interfaces/request";
import { Credentials } from "@/interfaces/credentials";

const baseAPI = axios.create({
  baseURL: process.env.API_BASE_URL,
});

interface AuthResponse {
  user: User;
  error: Error;
}

const useApi = () => {
  const getAuth = async ({ username, password }: Credentials) => {
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

  const getAccessApprover = async (id?: number) => {
    try {
      const response = await baseAPI.get("/api/access/approver", { params: { reqId: id } });
      return response.data;
    } catch (err: any) {
      if (isAxiosError(err)) return err.response?.data;
      return null;
    }
  };

  const createRequest = async ({
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

  return { getAuth, getUserInfo, getAccessInfo, getAccessApprover, createRequest, getRequestsInfo };
};

export default useApi;
