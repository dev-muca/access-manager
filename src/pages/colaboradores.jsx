import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

import { Button } from "@/components/Login/Button";
import { Header } from "@/components/Colaboradores/Header";
import { InputFloating } from "@/components/Form/InputFloating";
import { CollabList } from "@/components/Colaboradores/CollabList";
import { PreviewCard } from "@/components/Colaboradores/PreviewCard";
import { GenerateButton } from "@/components/Colaboradores/GenerateButton";

import API from "@/services/web-api/methods";
import { generateRandomPassword } from "@/utils/user";

export default function Colaboradores() {
  const { userSession } = useContext(AuthContext);
  const [members, setMembers] = useState(null);
  const [hidden, setHidden] = useState(false);

  // console.log("Renderizou!");

  useEffect(() => {
    API.getUsersProfilesByDepartamentRequest(userSession?.departament).then((response) => {
      setMembers(response.profilesInfos);
    });
  }, [userSession?.departament]);

  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    console.log(formData);
  }

  return (
    <main className="w-full flex flex-col lg:flex-row">
      <section className="flex-1 px-12 py-8">
        <Header
          title="Cadastro de Novo Colaborador"
          subtitle="Prencha todos os campos abaixos para criar credenciais de acesso para um novo colaborador"
          departament={userSession?.departament}
        />

        <form onSubmit={handleSubmitForm} className="mt-6 px-1">
          <InputFloating text="Nome Completo" name="fullname" value={formData.fullname} onChange={handleInput} />
          <PreviewCard
            fullname={formData.fullname}
            password={
              <>
                <span>{formData.password}</span>
                <GenerateButton
                  text="Gerar senha"
                  hiddenText={hidden}
                  onClick={() => {
                    setHidden(true);
                    setFormData((prevData) => ({ ...prevData, password: generateRandomPassword() }));
                  }}
                />
              </>
            }
          />
          <Button text="Cadastrar" loader={false} />
        </form>
      </section>
      <section className="flex-1 px-12 py-8">
        <Header
          title={userSession?.departament ? `Colaboradores em ${userSession?.departament}` : "Colaboradores"}
          subtitle="Lista com todos os colaboradores vínculados ao setor/departamento"
          noData
        />
        <CollabList collabs={members} />
      </section>
    </main>
  );
}
