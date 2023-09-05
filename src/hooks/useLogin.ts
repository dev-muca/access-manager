import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import { Credentials, Error } from "@/interfaces/generics";

const useLogin = () => {
  const { Authentication } = useContext(AuthContext);

  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<Error>({ field: "", message: "" });
  const [credentials, setCredentials] = useState<Credentials>({ username: "", password: "" });

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
