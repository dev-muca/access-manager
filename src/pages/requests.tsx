import Link from "next/link";

import useRequests from "@/hooks/useRequests";

import { Container } from "@/components/Form/Container";
import { Requests } from "@/interfaces/request";

export default function Request() {
  const { loader, requests } = useRequests();

  return (
    <Container title="Minhas solicitações" loading={loader}>
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
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((row: Requests) => (
              <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
                <td className="px-6 py-4 text-center">{row.id}</td>
                <td className="px-6 py-4 hidden sm:block">{row.name}</td>
                <td
                  className={`px-6 py-4 font-bold text-center ${
                    row?.status == "Pendente"
                      ? "text-amber-500"
                      : row?.status == "Aprovado"
                      ? "text-emerald-600"
                      : row?.status == "Reprovado"
                      ? "text-red-600"
                      : "text-black"
                  }`}
                >
                  {row.status}
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
    </Container>
  );
}
