import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

import { Input } from "@/components/Login/Input";
import { Title } from "@/components/Login/Title";
import { Button } from "@/components/Login/Button";
import { Card } from "@/components/Login/Card";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({ field: null, message: null });

  function clearErrors(amount = 0) {
    setTimeout(() => {
      setError({ field: null, message: null });
    }, amount);
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.toLowerCase() }));
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    setLoader(true);

    const { error } = await signIn(formData);

    if (!!error) {
      setError({ field: error.field, message: error.message });
    }

    setLoader(false);
  }

  return (
    <form onSubmit={handleSubmitForm} className="w-screen h-screen flex justify-center items-center bg-slate-500">
      <Card>
        <Title />
        <Input
          type="text"
          name="username"
          placeholder="Usuário"
          value={formData.username}
          onChange={handleInput}
          onClick={clearErrors}
          error={error.field === "username" ? true : false}
          errorMessage={error.message}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleInput}
          onClick={clearErrors}
          error={error.field === "password" ? true : false}
          errorMessage={error.message}
        />
        <Button text="Entrar" loader={loader} />
      </Card>
    </form>
  );
}
