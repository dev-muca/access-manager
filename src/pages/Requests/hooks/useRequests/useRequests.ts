import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import IRequest from "@/@types/IRequest";

const useRequests = () => {
  const { session } = useContext(AuthContext);

  const [loader, setLoader] = useState<boolean>(true);
  const [requests, setRequests] = useState<IRequest[]>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/request?reqId=${session?.id}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);

  return { loader, requests };
};

export default useRequests;
