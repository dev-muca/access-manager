import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, ChangeEvent, useContext } from "react";

import useApi from "./useApi";
import useDate from "./useDate";

import { IAccess } from "@/interfaces/access";
import { IRequest } from "@/interfaces/request";
import { AuthContext } from "@/context/AuthContext";

const useRequest = () => {
  const { session } = useContext(AuthContext);

  const { getTime } = useDate();
  const { getAcessApprover, postRequest } = useApi();

  const router = useRouter();
  const { reqId } = router.query;

  const [loader, setLoader] = useState<boolean>(true);
  const [access, setAccess] = useState<IAccess>(null!);
  const [approverOwner, setApproverOwner] = useState<boolean>(false);
  const [request, setRequest] = useState<IRequest>({ approverOwner });

  useEffect(() => {
    getAcessApprover(Number(reqId))
      .then((response) => {
        setAccess(response.access);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);

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
    // setLoader(true);

    const currentDate = getTime();

    setRequest((prevData) => ({
      ...prevData,
      idAccess: access.id,
      idRequester: session?.id,
      approver: access.approver,
      requestDate: String(currentDate),
    }));

    console.log(request);

    // const response = await postRequest();
  }

  return {
    loader,
    access,
    request,
    approverOwner,
    setJustification: setApproverOwner,
    handleInputChange,
    handleChangeJustification,
    onSubmitForm,
  };
};

export default useRequest;
