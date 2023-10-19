import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, ChangeEvent, useContext } from "react";

import { AuthContext } from "@/context/AuthContext";

import useDate from "@/hooks/useDate";
import IError from "@/@types/IError";
import IAccess from "@/@types/IAccess";
import IRequest from "@/@types/IRequest";

const useRequest = () => {
  const { session } = useContext(AuthContext);

  const { getTime } = useDate();

  const router = useRouter();
  const { id } = router.query;

  const [access, setAccess] = useState<IAccess>();
  const [request, setRequest] = useState<IRequest>();
  const [pageLoader, setPageLoader] = useState<boolean>(true);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [approverOwner, setApproverOwner] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ field: "", message: "" });

  useEffect(() => {
    fetch(`http://localhost:3000/api/access?id=${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setAccess(data[0]))
      .catch((err) => console.log(err))
      .finally(() => setPageLoader(false));
  }, []);

  function onInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    setRequest((prevData) => ({ ...prevData, [name]: value }));
  }

  function onChangeJustification() {
    setRequest((prevData) => ({ ...prevData, approverOwner: !approverOwner, justification: "" }));
    setApproverOwner(!approverOwner);
  }

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setButtonLoader(true);

    const res = await fetch(`http://localhost:3000/api/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idAccess: access?.id,
        requestDate: getTime(),
        idRequester: session?.id,
        approver: access?.approver,
        justification: request?.justification,
        approverOwner: request?.approverOwner,
      }),
    });

    const { requestNumber, error } = await res.json();
    setButtonLoader(false);

    if (error) return setError(error);
    setRequest({ id: requestNumber });
  }

  return {
    error,
    access,
    request,
    pageLoader,
    buttonLoader,
    approverOwner,
    onSubmitForm,
    onInputChange,
    onChangeJustification,
  };
};

export default useRequest;
