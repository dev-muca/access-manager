import { FaInfoCircle } from "react-icons/fa";

import Center from "@/components/Center";
import Form from "@/components/Form";
import Title from "@/components/Title";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ICredentials from "@/@types/ICredentials";
import IError from "@/@types/IError";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState, ChangeEvent, FormEvent } from "react";

const Login = () => {
  const { Auth } = useContext(AuthContext);

  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ field: "", message: "" });
  const [credentials, setCredentials] = useState<ICredentials>({ username: "", password: "" });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const response = await Auth(credentials);

    if (response) {
      const { field, message } = response;
      if (field && error) setError({ field, message });
    }

    setLoader(false);
  };

  return (
    <Center>
      <Form onSubmit={onSubmitForm}>
        <Title />
        <Input
          type="text"
          name="username"
          placeholder="Usuário"
          value={credentials?.username}
          onChange={onInputChange}
          error={error.field === "username" && error.message}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={credentials?.password}
          onChange={onInputChange}
          error={error.field === "password" && error.message}
        />
        <Button type="submit" loader={loader}>
          Entrar
        </Button>
        {error.field === "message" && (
          <span className="w-full flex justify-center items-center gap-1 text-sm text-red-600 mt-1 pl-0.5">
            <FaInfoCircle />
            <p>{error.message}</p>
          </span>
        )}
      </Form>
    </Center>
  );
};

export default Login;
