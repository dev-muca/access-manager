import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, ChangeEvent, useContext, FocusEventHandler } from "react";

import useApi from "./useApi";
import useDate from "./useDate";

import { Access } from "@/interfaces/access";
import { Request } from "@/interfaces/request";
import { AuthContext } from "@/context/AuthContext";
import { Error } from "@/interfaces/generics";

const useRequest = () => {
  const { session } = useContext(AuthContext);

  const { getTime } = useDate();
  const { getAccessApprover, postRequest } = useApi();

  const router = useRouter();
  const { reqId } = router.query;

  const [access, setAccess] = useState<Access>(null!);
  const [loader, setLoader] = useState<boolean>(true);
  const [request, setRequest] = useState<Request>(null!);
  const [loaderBtn, setLoaderBtn] = useState<boolean>(false);
  const [approverOwner, setApproverOwner] = useState<boolean>(false);
  const [error, setError] = useState<Error>({ field: "", message: "" });

  useEffect(() => {
    getAccessApprover(Number(reqId))
      .then(({ access }) => setAccess(access))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);

  // useEffect(() => {
  //   if (request?.idAccess && request?.idRequester && request?.requestDate) {
  //     setLoaderBtn(true);

  //     postRequest(request)
  //       .then(({ requestNumber }) => setRequest({ id: requestNumber }))
  //       .catch((err) => console.log(err))
  //       .finally(() => setLoader(false));
  //   }
  // }, [request]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    setRequest((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleChangeJustification() {
    setRequest((prevData) => ({ ...prevData, approverOwner: !approverOwner, justification: "" }));
    setApproverOwner(!approverOwner);
  }

  // async function fillRequest() {
  //   setRequest((prevData) => ({
  //     ...prevData,
  //     idAccess: access.id,
  //     idRequester: session?.id,
  //     approver: access.approver,
  //     requestDate: getTime(),
  //   }));
  // }

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await postRequest({
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
