import { ChangeEvent, FormEvent, useContext, useState } from "react";

import IError from "@/@types/IError";
import { AuthContext } from "@/context/AuthContext";
import ICredentials from "@/@types/ICredentials";

const useLogin = () => {
  const { Auth } = useContext(AuthContext);

  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ field: "", message: "" });
  const [credentials, setCredentials] = useState<ICredentials>({ username: "", password: "" });

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  }

  async function onSubmitForm(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoader(true);

    const response = await Auth(credentials);

    if (response) {
      const { field, message } = response;
      if (field && error) setError({ field, message });
    }

    setLoader(false);
  }

  return { error, loader, credentials, onInputChange, onSubmitForm };
};

export default useLogin;
