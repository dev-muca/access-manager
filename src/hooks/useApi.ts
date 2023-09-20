import axios from "axios";

import { Request } from "@/interfaces/request";
import * as Response from "@/interfaces/responses";
import { Credentials } from "@/interfaces/credentials";

const baseAPI = axios.create({
  baseURL: process.env.API_BASE_URL,
});

const useApi = () => {
  const getAuth = async ({ username, password }: Credentials): Promise<Response.UserOrError> => {
    try {
      const response = await baseAPI.post("/api/user/auth", { username, password });
      return response.data;
    } catch (err: any) {
      return err.response?.data;
    }
  };

  const getUserInfo = async (token: string): Promise<Response.UserOrError> => {
    try {
      const response = await baseAPI.get("/api/user/auth", { params: { validationToken: token } });
      return response.data;
    } catch (err: any) {
      return err.response?.data;
    }
  };

  const getAccessInfo = async (id?: number): Promise<Response.AccessOrError> => {
    try {
      const response = await baseAPI.get("/api/access", { params: { reqId: id } });
      return response.data;
    } catch (err: any) {
      return err.response?.data;
    }
  };

  const getAccessApprover = async (id?: number): Promise<Response.AccessOrError> => {
    try {
      const response = await baseAPI.get("/api/access/approver", { params: { reqId: id } });
      return response.data;
    } catch (err: any) {
      return err.response?.data;
    }
  };

  const createRequest = async ({
    idAccess,
    idRequester,
    justification,
    approverOwner,
    requestDate,
    approver,
  }: Request): Promise<Response.RequestOrError> => {
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
      return err.response?.data;
    }
  };

  // const getRequestsInfo = async (id?: number) => {
  //   try {
  //     const response = await baseAPI.get("/api/request", { params: { reqId: id } });
  //     return response.data;
  //   } catch (err: any) {
  //     if (isAxiosError(err)) return err.response?.data;
  //     return null;
  //   }
  // };

  // return { getAuth, getUserInfo, getAccessInfo, getAccessApprover, createRequest, getRequestsInfo };
  return { getAuth, getUserInfo, getAccessInfo, getAccessApprover, createRequest };
};

export default useApi;
