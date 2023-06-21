import { InputFloating } from "@/components/InputFloating";
import { AuthContext } from "@/context/AuthContext";
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
      <form>
        <InputFloating name="Nome Completo" />
        <p>Departamento: {userSession?.departament}</p>
      </form>
    </main>
  );
}
