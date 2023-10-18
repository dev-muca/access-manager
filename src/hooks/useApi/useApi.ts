import IAccess from "@/@types/IAccess";
import ICredentials from "@/@types/ICredentials";
import IError from "@/@types/IError";
import { isArray } from "util";

const useApi = () => {
  const getAccess = async (id?: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/access?id=${id}`, { method: "GET" });
      const data = await res.json();

      return data;
    } catch (err: any) {}
  };

  const AuthUser = ({}: ICredentials) => {
    return null;
  };

  return { getAccess };
};

export default useApi;
