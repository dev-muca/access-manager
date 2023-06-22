import { InputFloating } from "@/components/InputFloating";
import { Button } from "@/components/Login/Button";
import { AuthContext } from "@/context/AuthContext";
import API from "@/services/web-api/methods";
import { getCurrentDate } from "@/utils/data";
import { useContext, useEffect, useState } from "react";

export default function Colaboradores({ users }) {
  const { userSession } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullname: "",
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
    <>
      <section className="flex-1 px-12 py-8">
        <div className="w-full space-y-2 border-b pb-2">
          <h1 className="text-gray-700 text-2xl">Cadastro de Novo Colaborador</h1>
          <p className="text-gray-500 pl-0.5">
            Prencha todos os campos abaixos para criar credenciais de acesso para um novo colaborador
          </p>
        </div>
        <div className="text-sm py-2 px-1 flex flec-row justify-between items-center">
          <p>Departamento: {userSession?.departament}</p>
          <p>Data: {getCurrentDate()}</p>
        </div>
        <form onSubmit={handleSubmitForm} className="mt-4 px-1">
          <InputFloating text="Nome Completo" name="fullname" value={formData.fullname} onChange={handleInput} />
          <Button text="Cadastrar" loader={false} />
        </form>
      </section>
      <section className="flex-1 px-12 py-8">
        <div className="w-full space-y-2 border-b pb-2">
          <h1 className="text-gray-700 text-2xl">Colaboradores do {userSession?.departament}</h1>
          <p className="text-gray-500 pl-0.5">
            Lista com todos os colaboradores vínculados ao {userSession?.departament}
          </p>
        </div>
        <div>
          <ul>
            {users.length ? (
              users.map((user) => (
                <li
                  className="py-1 px-2 border-b flex justify-between items-center hover:bg-gray-100"
                  key={user.username}
                >
                  <span>{user.fullname}</span>
                  <span className="text-xs font-medium text-green-500 uppercase">Ativo</span>
                </li>
              ))
            ) : (
              <li className="py-1 px-2 flex text-red-300 justify-center items-center">
                Nenhum colaborador neste setor
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const response = await API.getUsersByDepartament("Tecnologia da Informação");

  return {
    props: {
      users: response.users,
    },
  };
}
