import Container from "@/components/Container";
import Link from "next/link";

import IRequests from "@/@types/IRequests";
import Badge from "@/components/Badge";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

import Group from "@/components/Group";
import useFetch from "@/hooks/useFetch";

const Requests = () => {
  const { session } = useContext(AuthContext);
  const [filter, setFilter] = useState("pendente");

  const { data, pageLoader } = useFetch({
    endpoint: `/api/request?session=${session?.id}&status=${filter}`,
    method: "GET",
    dependencies: [session?.id, filter],
  });

  const statusToColor: any = {
    Pendente: "yellow",
    Aprovado: "green",
    Reprovado: "red",
  };

  return (
    <Container title="Minhas Solicitações" loading={pageLoader}>
      <Group label="Filtrar:" className="px-4">
        <Badge
          color="yellow"
          className={`cursor-pointer hover:opacity-100 ${filter == "pendente" ? "opacity-100" : "opacity-25"}`}
          onClick={() => setFilter("pendente")}
        >
          Pendentes
        </Badge>
        <Badge
          color="green"
          className={`cursor-pointer hover:opacity-100 ${filter == "aprovado" ? "opacity-100" : "opacity-25"}`}
          onClick={() => setFilter("aprovado")}
        >
          Aprovados
        </Badge>
        <Badge
          color="red"
          className={`cursor-pointer hover:opacity-100 ${filter == "reprovado" ? "opacity-100" : "opacity-25"}`}
          onClick={() => setFilter("reprovado")}
        >
          Reprovados
        </Badge>
      </Group>
      {data?.length ? (
        <section className="relative overflow-x-auto sm:rounded-md max-h-[calc(100vh-240px)] border-b">
          <table className="w-full text-sm text-left text-gray-50 overflow-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 text-center font-bold">
                  ###
                </th>
                <th scope="col" className="px-6 py-3 text-center font-bold hidden sm:block">
                  Acesso
                </th>
                <th scope="col" className="px-6 py-3 text-center font-bold">
                  Data da Solicitação
                </th>
                <th scope="col" className="px-6 py-3 pr-8 text-center font-bold">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center font-bold">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row: IRequests) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
                  <td className="px-6 py-4 text-center">{row.id}</td>
                  <td className="px-6 py-4 hidden sm:block">{row.name}</td>
                  <td className="px-6 py-4 text-center">
                    {row.requestDate?.split(" ")[0].split("-").reverse().join("/")}
                  </td>
                  <td className="flex justify-center items-center px-6 py-4 font-bold text-center">
                    <Badge color={statusToColor[row?.status!]} className="flex w-24 justify-center">
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={{ pathname: "/Progress", query: { requestId: row.id } }}
                      className="text-blue-700 underline"
                    >
                      {filter === "pendente" ? "Ver andamento" : "Ver solicitação"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="bg-red-200 border-b-red-800 text-red-500 px-6 py-4 rounded">
          {filter === "pendente" && "Você não possuí solicitações pendentes."}
          {filter === "aprovado" && "Você não possuí solicitações aprovadas."}
          {filter === "reprovado" && "Você não possuí solicitações reprovadas."}
        </div>
      )}
    </Container>
  );
};

export default Requests;
