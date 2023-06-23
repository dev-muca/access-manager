import { Header } from "@/components/Colaboradores/Header";
import { Dropdown } from "@/components/Form/Dropdown";
import { InputFloating } from "@/components/Form/InputFloating";
import { Button } from "@/components/Login/Button";
import { AuthContext } from "@/context/AuthContext";
import API from "@/services/web-api/methods";
import { useContext, useEffect, useState } from "react";

export default function Detalhes() {
  const { userSession } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: null,
    fullname: null,
    role: 0,
  });

  const [roles, setRoles] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setFormData({ fullname: userSession.fullname });

    API.getAllRoles()
      .then((response) => setRoles(response.roles))
      .catch((err) => setRoles([]));
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleRole(value) {
    setFormData((prevData) => ({ ...prevData, role: value }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    setLoader(true);
  }

  return (
    <main className="w-full flex flex-col lg:flex-row">
      <section className="flex-1 px-12 py-8">
        <Header title="Dados do seu perfil" />

        <form onSubmit={handleSubmitForm} className="mt-6 flex flex-col gap-8">
          <InputFloating text="Nome Completo" name="fullname" value={formData.fullname} onChange={handleInput} />
          <Dropdown label="Cargo:" options={roles} onOptionSelect={handleRole} />
          <Button text="Salvar" loader={loader} />
        </form>
      </section>
    </main>
  );
}
