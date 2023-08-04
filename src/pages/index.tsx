import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { Title } from "@/components/Title";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Center } from "@/components/Center";
import { FormCard } from "@/components/FormCard";
import { UserContext } from "@/context/AuthContext";
import { ICredentials, IError } from "@/interfaces/generics";

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
      </FormCard>
    </Center>
  );
}
