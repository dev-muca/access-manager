import { InputFloating } from "@/components/InputFloating";
import { AuthContext } from "@/context/AuthContext";
import { getCurrentDate } from "@/utils/data";
import { useContext } from "react";

export default function Novo() {
  const { userSession } = useContext(AuthContext);

  return (
    <main className="w-full px-8 py-4">
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
      <form className="mt-4">
        <InputFloating name="Nome Completo" />
      </form>
    </main>
  );
}
