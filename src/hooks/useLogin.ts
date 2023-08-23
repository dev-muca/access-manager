import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import { ICredentials, IError } from "@/interfaces/generics";

const useLogin = () => {
  const { Authentication } = useContext(AuthContext);

  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ field: "", message: "" });
  const [credentials, setCredentials] = useState<ICredentials>({ username: "", password: "" });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoader(true);

    const response = await Authentication(credentials);
    console.log(response);

    if (response) {
      const { field, message } = response;
      if (field && error) setError({ field, message });
    }

    setLoader(false);
  }

  return { error, loader, credentials, handleInputChange, handleSubmitForm };
};

export default useLogin;
