import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { MdOutlineBlock, MdOutlineCheck } from "react-icons/md";

import { AuthContext } from "@/context/AuthContext";

import IApprovals from "@/@types/IApprovals";
import Alert from "@/components/Alert";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Group from "@/components/Group";
import Input from "@/components/Input";
import useFetch from "@/hooks/useFetch";
import useDate from "@/hooks/useDate";
import IError from "@/@types/IError";

interface IActionsProps {
  approvalId: number;
  approve: boolean;
}

interface ApproveProps {
  status: boolean;
  approvalId: number;
  comment?: string;
}

const Approvals = () => {
  const { getTime } = useDate();
  const { session } = useContext(AuthContext);
  const [filter, setFilter] = useState("pendente");
  const [approve, setApprove] = useState<ApproveProps | null>(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [error, setError] = useState<IError>({ field: "", message: "" });

  const { data, pageLoader } = useFetch({
    endpoint: `/api/user/approval?userId=${session?.id}&status=${filter}`,
    method: "GET",
    dependencies: [session?.id, filter],
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setApprove((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const onApproveRequest = async () => {
    setButtonLoader(true);

    const body = {
      approvalId: approve?.approvalId,
      approvalDate: getTime(),
      comment: approve?.comment,
      status: approve?.status,
    };

    const res = await fetch("http://localhost:3000/api/request/approval", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const { error } = await res.json();
    if (error) {
      setError(error);
      setButtonLoader(false);
      return;
    } else {
      setButtonLoader(false);
      setApprove(null);
      return;
    }
  };

  return (
    <Container title="Minhas Aprovações" loading={pageLoader}>
      {approve?.status != null && (
        <Alert
          title={
            <p className="flex flex-row gap-2">
              Você está
              {approve.status ? (
                <span className="text-green-500 border-b-2 border-b-green-500"> APROVANDO</span>
              ) : (
                <span className="text-red-500 border-b-2 border-b-red-500"> REPROVANDO</span>
              )}
              essa solicitação!
            </p>
          }
          className="w-4/6"
          onClose={() => {
            setApprove(null);
            setError({ field: "", message: "" });
          }}
        >
          <div className="flex flex-col gap-4">
            <Input
              name="comment"
              label={`Comentários${approve ? "" : "*"}:`}
              placeholder={
                approve.status
                  ? "Espaço destinado a comentários"
                  : "Justifique o motivo da sua reprovação desta solicitação"
              }
              onChange={onInputChange}
              error={error.field === "comment" && error.message}
              multiline
            />
            <Button color={approve.status ? "green" : "red"} onClick={onApproveRequest} loader={buttonLoader}>
              {approve.status ? "APROVAR" : "REPROVAR"}
            </Button>
          </div>
        </Alert>
      )}
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
                  Solicitante
                </th>
                <th scope="col" className="px-6 py-3 text-center font-bold">
                  Data da Solicitação
                </th>
                <th scope="col" className="px-6 py-3 pr-8 text-center font-bold">
                  Status
                </th>
                {filter == "pendente" && (
                  <th scope="col" className="px-6 py-3 text-center font-bold">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.map((row: IApprovals) => (
                <tr key={row.approvalId} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
                  <td className="px-6 py-4 text-center">{row.requestId}</td>
                  <td className="px-6 py-4 hidden sm:block">{row.accessName}</td>
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
                  {filter == "pendente" && (
                    <td className="px-6 py-4 text-center">
                      <span className="flex justify-center items-center gap-2">
                        <MdOutlineCheck
                          size={24}
                          className="text-green-600 cursor-pointer hover:scale-125 hover:bg-gray-200 duration-100"
                          onClick={() => setApprove({ approvalId: row.approvalId, status: true })}
                        />
                        <MdOutlineBlock
                          size={22}
                          className="text-red-600 cursor-pointer hover:scale-125 hover:bg-gray-200 duration-100"
                          onClick={() =>
                            setApprove({
                              approvalId: row.approvalId,
                              status: false,
                            })
                          }
                        />
                      </span>
                    </td>
                  )}
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
