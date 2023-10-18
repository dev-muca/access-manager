import { useState, useEffect, useContext } from "react";

import useApi from "@/hooks/useApi";

import { Requests } from "@/interfaces/request";
import { AuthContext } from "@/context/AuthContext";

const useRequests = () => {
  const { session } = useContext(AuthContext);
  const { getRequestsInfo } = useApi();

  const [loader, setLoader] = useState<boolean>(true);
  const [requests, setRequests] = useState<Requests[]>();

  useEffect(() => {
    getRequestsInfo(session?.id)
      .then(({ requests, error }) => {
        if (error) throw new Error(error.message);
        setRequests(requests);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);

  return { loader, requests };
};

export default useRequests;
