import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Title } from "@/components/Title";
import { useState } from "react";

export default function Home() {
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    field: null,
    message: null,
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    setLoader(true);

    console.log(formData);

    setTimeout(() => {
      setLoader(false);
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmitForm} className="w-screen h-screen flex justify-center items-center bg-slate-500">
      <div className="w-96 p-14 flex flex-col gap-8 shadow-2xl rounded-md bg-white">
        <Title />
        <Input
          type="text"
          name="username"
          placeholder="Usuário"
          value={formData.username}
          onChange={handleInput}
          error={error.field === "username" ? true : false}
          errorMessage={error.message}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleInput}
          error={error.field === "password" ? true : false}
          errorMessage={error.message}
        />
        <Button type="submit" text="Entrar" loader={loader} />
      </div>
    </form>
  );
}
