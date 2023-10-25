import { useContext, useState } from "react";
import { MdOutlineBlock, MdOutlineCheck } from "react-icons/md";

import { AuthContext } from "@/context/AuthContext";

import IApprovals from "@/@types/IApprovals";
import Alert from "@/components/Alert";
import Badge from "@/components/Badge";
import Container from "@/components/Container";
import Group from "@/components/Group";
import useFetch from "@/hooks/useFetch";

const Approvals = () => {
  const { session } = useContext(AuthContext);
  const [filter, setFilter] = useState("pendente");
  const [action, setAction] = useState<boolean | null>(null);
  const [appear, setAppear] = useState(false);

  const { data, pageLoader } = useFetch({
    endpoint: `/api/user/approval?id=${session?.id}&status=${filter}`,
    method: "GET",
    dependencies: [session?.id, filter],
  });

  return (
    <Container title="Minhas Aprovações" loading={pageLoader}>
      {action != null && <Alert title="Ações" className="w-4/6" onClose={() => setAction(null)}></Alert>}
      <Group label="Filtrar:" className="px-4">
        <Badge
          color="yellow"
          className={`cursor-pointer ${filter == "pendente" ? "opacity-100" : "opacity-25"} hover:opacity-100`}
          onClick={() => setFilter("pendente")}
        >
          Pendentes
        </Badge>
        <Badge
          color="green"
          className={`cursor-pointer ${filter == "aprovado" ? "opacity-100" : "opacity-25"} hover:opacity-100`}
          onClick={() => setFilter("aprovado")}
        >
          Aprovados
        </Badge>
        <Badge
          color="red"
          className={`cursor-pointer ${filter == "reprovado" ? "opacity-100" : "opacity-25"} hover:opacity-100`}
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
                  Solicitante
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
              {data?.map((row: IApprovals) => (
                <tr key={row.requestNumber} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
                  <td className="px-6 py-4 text-center">{row.requestNumber}</td>
                  <td className="px-6 py-4 hidden sm:block">{row.access}</td>
                  <td className="px-6 py-4 text-center">{row.requesterName}</td>
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
                    <span className="flex justify-center items-center gap-2">
                      <MdOutlineCheck
                        size={24}
                        className="text-green-600 cursor-pointer hover:scale-125 hover:bg-gray-200 duration-100"
                        onClick={() => {
                          setAction(true);
                          console.log(action);
                        }}
                      />
                      <MdOutlineBlock
                        size={22}
                        className="text-red-600 cursor-pointer hover:scale-125 hover:bg-gray-200 duration-100"
                        onClick={() => {
                          setAction(false);
                          console.log(action);
                        }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="bg-red-200 border-b-red-800 text-red-500 px-6 py-4 rounded">
          {filter === "pendente" && "Você não possuí aprovações pendentes."}
          {filter === "aprovado" && "Você não possuí aprovações aprovadas."}
          {filter === "reprovado" && "Você não possuí aprovações reprovadas."}
        </div>
      )}
    </Container>
  );
};

export default Approvals;
