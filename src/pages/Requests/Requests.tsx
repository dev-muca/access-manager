import Container from "@/components/Container";
import Link from "next/link";

import IRequest from "@/@types/IRequest";
import IRequests from "@/@types/IRequests";
import Badge from "@/components/Badge";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

const Requests = () => {
  const { session } = useContext(AuthContext);

  const [loader, setLoader] = useState<boolean>(true);
  const [requests, setRequests] = useState<IRequest[]>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/request?reqId=${session.id}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, [session.id]);

  return (
    <Container title="Minhas Solicitações" loading={loader}>
      {requests?.length ? (
        <section className="relative overflow-x-auto sm:rounded-md max-h-[calc(100vh-120px)] border-b">
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
              {requests?.map((row: IRequests) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
                  <td className="px-6 py-4 text-center">{row.id}</td>
                  <td className="px-6 py-4 hidden sm:block">{row.name}</td>
                  <td className="px-6 py-4 text-center">
                    {row.requestDate?.split(" ")[0].split("-").reverse().join("/")}
                  </td>
                  <td className="flex justify-center items-center px-6 py-4 font-bold text-center">
                    <Badge
                      color={
                        row?.status === "Pendente"
                          ? "yellow"
                          : row?.status === "Aprovado"
                          ? "green"
                          : row?.status === "Reprovado"
                          ? "red"
                          : "default"
                      }
                      className="flex w-24 justify-center"
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`#${row.id}`} className="text-blue-700 underline">
                      Ver andamento
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="bg-red-200 border-b-red-800 text-red-500 px-6 py-4 rounded">Você não possui solicitações</div>
      )}
    </Container>
  );
};

export default Requests;
