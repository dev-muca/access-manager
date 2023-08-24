import { IAccess } from "@/interfaces/access";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import useApi from "./useApi";

const useRequest = () => {
  const { getAcessApprover } = useApi();
  const [loader, setLoader] = useState<boolean>(true);
  const [access, setAccess] = useState<IAccess | null>(null);
  const [justification, setJustification] = useState<boolean>(false);

  const router = useRouter();
  const { reqId } = router.query;

  useEffect(() => {
    getAcessApprover(Number(reqId))
      .then((response) => {
        setAccess(response.access);
        console.log(response.access);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoader(true);

    setTimeout(() => setLoader(false), 2300);
  }

  return { loader, access, justification, setJustification, onSubmitForm };
};

export default useRequest;
