import { isAxiosError } from "axios";
import baseAPI from "./config";

const API = {
  signInRequest: async (credentials) => {
    try {
      const response = await baseAPI.post(`/api/auth`, credentials);
      return response.data;
    } catch (err) {
      console.log(`WEB-API: Erro ao autenticar: ${JSON.stringify(err.message)}`);
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  getDecodedTokenData: async (token) => {
    try {
      const response = await baseAPI.get(`/api/user/${token}`);
      return response.data;
    } catch (err) {
      console.log(`WEB-API: Erro ao obter dados do usuário via token: ${JSON.stringify(err.message)}`);
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  getUsersByDepartamentRequest: async (departament) => {
    try {
      const response = await baseAPI.post(`/api/departament/members`, { departament });
      return response.data;
    } catch (err) {
      console.log(`WEB-API: Erro ao obter usuários do departamento ${departament}: ${JSON.stringify(err.message)}`);
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  getAllRolesRequest: async () => {
    try {
      const response = await baseAPI.get(`/api/roles/all`);
      return response.data;
    } catch (err) {
      console.log(`WEB-API: Erro ao obter todos os cargos: ${JSON.stringify(err.message)}`);
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  getProfileInfoByUsernameRequest: async (username) => {
    try {
      const response = await baseAPI.get(`/api/user/profile/${username}`);
      return response.data;
    } catch (err) {
      console.log(
        `WEB-API: Erro ao obter informações do perfil do usuário ${username}: ${JSON.stringify(err.message)}`
      );
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  getUsersProfilesByDepartamentRequest: async (departament) => {
    try {
      const response = await baseAPI.post(`/api/departament/profiles`, { departament });
      return response.data;
    } catch (err) {
      console.log(
        `WEB-API: Erro ao obter informações dos perfils dos usuário do departamento ${departament}: ${JSON.stringify(
          err.message
        )}`
      );
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },

  updateProfileInfoRequest: async (username, data) => {
    try {
      const response = await baseAPI.post(`/api/user/profile/edit`, { username, data });
      return response.data;
    } catch (err) {
      console.log(
        `WEB-API: Erro ao atualizar informações do perfil do usuário ${username}: ${JSON.stringify(err.message)}`
      );
      if (isAxiosError(err)) {
        return err.response.data;
      }
      return null;
    }
  },
};

export default API;
