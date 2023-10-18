import { FaInfoCircle } from "react-icons/fa";

import Center from "@/components/Center";
import Form from "@/components/Form";
import Title from "@/components/Title";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const { error, loader, credentials, onInputChange, onSubmitForm } = useLogin();

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
        <Button type="submit" label="Entrar" loader={loader} />
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
