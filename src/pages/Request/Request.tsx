import { useRouter } from "next/router";

import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Container from "@/components/Container";
import Group from "@/components/Group";
import Input from "@/components/Input";

import IAccess from "@/@types/IAccess";
import IError from "@/@types/IError";
import IRequest from "@/@types/IRequest";
import { AuthContext } from "@/context/AuthContext";
import useDate from "@/hooks/useDate";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

export default function Request() {
  const router = useRouter();
  const { id } = router.query;

  const { getTime } = useDate();
  const { session } = useContext(AuthContext);

  const [access, setAccess] = useState<IAccess>();
  const [request, setRequest] = useState<IRequest>();
  const [pageLoader, setPageLoader] = useState<boolean>(true);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [approverOwner, setApproverOwner] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ field: "", message: "" });

  useEffect(() => {
    fetch(`http://localhost:3000/api/access?id=${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setAccess(data[0]))
      .catch((err) => console.log(err))
      .finally(() => setPageLoader(false));
  }, [id]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setRequest((prevData) => ({ ...prevData, [name]: value }));
  };

  const onChangeJustification = () => {
    setRequest((prevData) => ({ ...prevData, approverOwner: !approverOwner, justification: "" }));
    setApproverOwner(!approverOwner);
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoader(true);

    const res = await fetch(`http://localhost:3000/api/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idAccess: access?.id,
        requestDate: getTime(),
        idRequester: session?.id,
        approver: access?.approver,
        justification: request?.justification,
        approverOwner: request?.approverOwner,
      }),
    });

    const { requestNumber, error } = await res.json();
    setButtonLoader(false);

    if (error) return setError(error);
    setRequest({ id: requestNumber });
  };

  return (
    <Container title={request?.id ? "Solicitação criada" : "Solicitação de novos acessos:"} loading={pageLoader}>
      <form onSubmit={onSubmitForm} className="w-full h-full flex flex-col justify-between">
        <Group label="Dados do acesso:" className="flex-1">
          <div className="w-full p-4 pl-6 flex flex-col gap-2">
            <p className="flex gap-2">
              <span className="font-medium">Nome:</span>
              <span>{access?.name}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-medium">Descrição:</span>
              <span>{access?.description}</span>
            </p>
            <ul className="mt-4">
              <span className="font-medium">Aprovadores:</span>
              {access?.approver?.length ? (
                access?.approver?.map((approver, i) => (
                  <li key={i} className="even:bg-gray-100 odd:bg-white px-2 py-0.5">
                    {approver.fullname}
                  </li>
                ))
              ) : (
                <span className="w-fit text-red-600 font-medium rounded-md px-2 py-0.5 animate-pulse">
                  ERRO | Não á aprovadores
                </span>
              )}
            </ul>
          </div>
        </Group>

        <Group label="Dados complementares:" className="flex-1">
          <div className="w-full p-4 px-6 flex flex-col justify-start">
            <Input
              name="justification"
              label="Justificativa:"
              placeholder={
                approverOwner
                  ? "Solicitações para aprovador não requerem justificativa"
                  : "Insira aqui uma justificativa para sua solicitação"
              }
              value={request?.justification}
              onChange={onInputChange}
              disabled={approverOwner}
              error={error?.field === "justification" && error.message}
              multiline
            />

            <Checkbox
              label="Aprovador"
              hasInfo
              infoMessage="Ao marcar esta opção, você irá solicitar para ser aprovador deste acesso."
              onChange={onChangeJustification}
            />
          </div>
        </Group>

        <Button className="w-full mb-10" loader={buttonLoader}>
          Solicitar
        </Button>

        {request?.id && (
          <Alert
            title="Solicitação criada!"
            subtitle={`O número da sua solicitação é: #${request?.id}`}
            hasConfirm
            onConfirm={() => router.push("/Requests")}
          />
        )}
      </form>
    </Container>
  );
}
