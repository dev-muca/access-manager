import { FaInfoCircle } from "react-icons/fa";

import useLogin from "@/hooks/useLogin";

import { Input } from "@/components/Form/Input";
import { Title } from "@/components/Form/Title";
import { Button } from "@/components/Form/Button";
import { Center } from "@/components/Layout/Center";
import { FormCard } from "@/components/Form/FormCard";

export default function Home() {
  const { error, loader, credentials, handleInputChange, handleSubmitForm } = useLogin();

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
          error={error.field === "username" && error.message}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={credentials?.password}
          onChange={handleInputChange}
          error={error.field === "password" && error.message}
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
