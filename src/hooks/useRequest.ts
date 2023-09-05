import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, ChangeEvent, useContext } from "react";

import useApi from "./useApi";
import useDate from "./useDate";

import { Access } from "@/interfaces/access";
import { Request } from "@/interfaces/request";
import { AuthContext } from "@/context/AuthContext";

const useRequest = () => {
  const { session } = useContext(AuthContext);

  const { getTime } = useDate();
  const { getAccessApprover, postRequest } = useApi();

  const router = useRouter();
  const { reqId } = router.query;

  const [loader, setLoader] = useState<boolean>(true);
  const [access, setAccess] = useState<Access>(null!);
  const [approverOwner, setApproverOwner] = useState<boolean>(false);
  const [request, setRequest] = useState<Request>({ approverOwner });

  useEffect(() => {
    getAccessApprover(Number(reqId))
      .then(({ access }) => setAccess(access))
      .catch((err) => console.log("ERRO:", err))
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    if (request?.idAccess && request?.idRequester && request?.requestDate) {
      postRequest(request)
        .then(({ requestNumber }) => setRequest({ id: requestNumber }))
        .catch((err) => console.log(err));
    }
  }, [request]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setRequest((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleChangeJustification() {
    setRequest((prevData) => ({ ...prevData, approverOwner: !approverOwner, justification: "" }));
    setApproverOwner(!approverOwner);
  }

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setRequest((prevData) => ({
      ...prevData,
      idAccess: access.id,
      idRequester: session?.id,
      approver: access.approver,
      requestDate: getTime(),
    }));
  }

  return {
    loader,
    access,
    request,
    approverOwner,
    handleInputChange,
    handleChangeJustification,
    onSubmitForm,
  };
};

export default useRequest;
