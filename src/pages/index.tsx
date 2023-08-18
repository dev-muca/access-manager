import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/Form/Button";
import { Center } from "@/components/Layout/Center";
import { UserContext } from "@/context/AuthContext";
import { ICredentials, IError } from "@/interfaces/generics";
import { FaInfoCircle } from "react-icons/fa";
import { FormCard } from "@/components/Form/FormCard";
import { Title } from "@/components/Form/Title";
import { Input } from "@/components/Form/Input";

export default function Home() {
  const { Authentication } = useContext(UserContext);

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
    console.log("Front-end Response:", response);

    if (response) {
      const { field, message } = response;
      if (field && error) setError({ field, message });
    }

    setLoader(false);
  }

  return (
    <Center>
      <FormCard onSubmit={handleSubmitForm}>
        <Title />
        <Input
          type="text"
          name="username"
          placeholder="Usuário"
          value={credentials?.username}
          onChange={handleInputChange}
          error={error.field === "username" ? error.message : undefined}
          // error={"username"}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={credentials?.password}
          onChange={handleInputChange}
          error={error.field === "password" ? error.message : undefined}
        />
        <Button type="submit" label="Entrar" loader={loader} />
        {error.field === "message" && (
          <span className="w-full flex justify-center items-center gap-1 text-sm text-red-600 mt-1 pl-0.5">
            <FaInfoCircle />
            <p>{error.message}</p>
          </span>
        )}
      </FormCard>
    </Center>
  );
}
