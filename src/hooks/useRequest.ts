import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, ChangeEvent, useContext, FocusEventHandler } from "react";

import useApi from "./useApi";
import useDate from "./useDate";

import { Access } from "@/interfaces/access";
import { Request } from "@/interfaces/request";
import { AuthContext } from "@/context/AuthContext";
import { Errors } from "@/interfaces/errors";

const useRequest = () => {
  const { session } = useContext(AuthContext);

  const { getTime } = useDate();
  const { getAccessApprover, createRequest } = useApi();

  const router = useRouter();
  const { reqId } = router.query;

  const [access, setAccess] = useState<Access>(null!);
  const [loader, setLoader] = useState<boolean>(true);
  const [request, setRequest] = useState<Request>(null!);
  const [loaderBtn, setLoaderBtn] = useState<boolean>(false);
  const [approverOwner, setApproverOwner] = useState<boolean>(false);
  const [error, setError] = useState<Errors>({ field: "", message: "" });

  useEffect(() => {
    getAccessApprover(Number(reqId))
      .then(({ access }) => setAccess(access))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    setRequest((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleChangeJustification() {
    setRequest((prevData) => ({ ...prevData, approverOwner: !approverOwner, justification: "" }));
    setApproverOwner(!approverOwner);
  }

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await createRequest({
      idAccess: access.id,
      requestDate: getTime(),
      idRequester: session?.id,
      approver: access.approver,
      justification: request?.justification,
      approverOwner: request?.approverOwner,
    })
      .then(({ requestNumber, error }) => {
        console.log({ requestNumber, error });

        if (error) setError(error);
        setRequest({ id: requestNumber });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }

  return {
    error,
    access,
    loader,
    request,
    loaderBtn,
    approverOwner,
    handleInputChange,
    handleChangeJustification,
    onSubmitForm,
  };
};

export default useRequest;
